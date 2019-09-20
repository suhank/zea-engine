import { Vec2, Vec3, Color } from '../Math';
import { Signal } from '../Utilities';
import { sgFactory } from './SGFactory.js';

import { ValueSetMode } from './Parameters/Parameter.js';
import { ParameterOwner } from './ParameterOwner.js';

const ItemFlags = {
  USER_EDITED: 1 << 1,
  IGNORE_BBOX: 1 << 2,
  BIN_NODE: 1 << 3, // This node was generated when loading a binary file.
};
let numBaseItems = 0;

/** Class representing a base item.
 * @extends ParameterOwner
 */
class BaseItem extends ParameterOwner {
  /**
   * Create a base item.
   * @param {any} name - The name value.
   */
  constructor(name) {
    super();
    if (name == undefined) name = sgFactory.getClassName(this);
    this.__name = name;
    this.__path = [name];
    this.__ownerItem = undefined; // TODO: will create a circular ref. Figure out and use weak refs
    this.__flags = 0;

    this.__metaData = {};

    this.nameChanged = new Signal();
    // this.flagsChanged = new Signal();

    this.parameterValueChanged.connect((param, mode) => {
      if (mode == ValueSetMode.USER_SETVALUE) {
        this.setFlag(ItemFlags.USER_EDITED);
      }
    });

    numBaseItems++;
  }

  /**
   * The destroy method.
   */
  destroy() {
    super.destroy();
  }

  /**
   * The clone method.
   * @param {any} flags - The flags param.
   */
  clone(flags) {
    throw new Error(
      this.constructor.name + ' does not implment its clone method'
    );
  }

  /**
   * The copyFrom method.
   * @param {any} src - The src param.
   * @param {any} flags - The flags param.
   */
  copyFrom(src, flags) {
    super.copyFrom(src, flags);
    this.setName(src.getName());
  }

  // ////////////////////////////////////////
  // Name and Path

  /**
   * The getName method.
   * @return {any} - The return value.
   */
  getName() {
    return this.__name;
  }

  /**
   * The setName method.
   * @param {any} name - The name param.
   */
  setName(name) {
    if (this.__name != name) {
      const oldName = this.__name;
      this.__name = name;
      this.__updatePath();
      this.nameChanged.emit(name, oldName);
    }
  }

  /**
   * The __updatePath method.
   * @private
   */
  __updatePath() {
    if (this.__ownerItem == undefined) this.__path = [this.__name];
    else {
      this.__path = this.__ownerItem.getPath().slice();
      this.__path.push(this.__name);
    }
  }

  /**
   * The getPath method.
   * @return {any} - The return value.
   */
  getPath() {
    return this.__path;
  }

  // ////////////////////////////////////////
  // Flags

  /**
   * The setFlag method.
   * @param {any} flag - the flag param.
   */
  setFlag(flag) {
    this.__flags |= flag;
    // this.flagsChanged.emit(this.__flags);
  }

  /**
   * The testFlag method.
   * @param {any} flag - The flag param.
   * @return {any} - The return value.
   */
  testFlag(flag) {
    return (this.__flags & flag) != 0;
  }

  // ////////////////////////////////////////
  // Path Traversial

  /**
   * The resolvePath method.
   * @param {any} path - The path param.
   * @param {any} index - The index param.
   * @return {any} - The return value.
   */
  resolvePath(path, index) {
    if (index == path.length) {
      return this;
    }
    if (path[index] == '>' && index == path.length - 1) {
      return this.getParameter(path[index + 1]);
    }

    // Maybe the name is a parameter name.
    const param = this.getParameter(path[index]);
    if (param) {
      return param;
    }
    throw new Error('Invalid path:' + path + ' member not found');
  }

  // ////////////////////////////////////////
  // Owner Item

  /**
   * The getOwner method.
   * @return {any} - The return value.
   */
  getOwner() {
    // return this.__private.get('ownerItem');
    return this.__ownerItem;
  }

  /**
   * The setOwner method.
   * @param {any} ownerItem - The ownerItem param.
   */
  setOwner(ownerItem) {
    // this.__private.set(ownerItem, ownerItem);
    if (this.__ownerItem !== ownerItem) {
      // Note: to avoid having no owners for a moment
      // we add the new owner first, then remove the previous
      // So we have 2 owners for brief moment.
      const prevOwner = this.__ownerItem;

      this.__ownerItem = ownerItem;
      if (this.__ownerItem) {
        this.addRef(this.__ownerItem);
      }
      if (prevOwner) {
        this.removeRef(prevOwner);
      }
      this.__updatePath();
    }
  }

  // ////////////////////////////////////////
  // Metadata

  /**
   * The getMetadata method.
   * @param {any} key - The key param.
   * @return {any} - The return value.
   */
  getMetadata(key) {
    return this.__metaData[key];
  }

  /**
   * The hasMetadata method.
   * @param {any} key - The key param.
   * @return {any} - The return value.
   */
  hasMetadata(key) {
    return key in this.__metaData;
  }

  /**
   * The setMetadata method.
   * @param {any} key - The key param.
   * @param {any} metaData - The metaData param.
   */
  setMetadata(key, metaData) {
    this.__metaData[key] = metaData;
  }

  /**
   * The deleteMetadata method.
   * @param {any} key - The key param.
   */
  deleteMetadata(key) {
    delete this.__metaData[key];
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method.
   * @param {any} context - The context param.
   * @param {any} flags - The flags param.
   * @return {any} - The return value.
   */
  toJSON(context, flags) {
    let j = super.toJSON(context, flags);
    if (!j && this.testFlag(ItemFlags.USER_EDITED)) j = {};
    if (j) {
      j.name = this.__name;

      // Binary Tree nodes should only be re-created
      // by loading binary data. The JSON tree just stores
      // modifications to those items, and if, when loading
      // the node no longer exists, then the json loader
      // simply keeps going. (no errors).
      if (!this.testFlag(ItemFlags.BIN_NODE))
        j.type = sgFactory.getClassName(this);
    }
    return j;
  }

  /**
   * The fromJSON method.
   * @param {any} j - The j param.
   * @param {any} context - The context param.
   * @param {any} flags - The flags param.
   */
  fromJSON(j, context, flags) {
    if (j.name) this.__name = j.name;
    super.fromJSON(j, context, flags);
    // Note: JSON data is only used to store user edits, so
    // parameters loaded from JSON are considered user edited.
    this.__flags |= ItemFlags.USER_EDITED;
  }

  /**
   * The readBinary method.
   * @param {any} reader - The reader param.
   * @param {any} context - The context param.
   */
  readBinary(reader, context) {
    const type = reader.loadStr();
    this.setName(reader.loadStr());

    // Note: parameters follow name...
    super.readBinary(reader, context);
  }

  /**
   * The toString method.
   * @return {any} - The return value.
   */
  toString() {
    return JSON.stringify(this.toJSON(), null, 2);
  }

  /**
   * The getNumBaseItems method.
   * @return {any} - The return value.
   */
  getNumBaseItems() {
    return numBaseItems;
  }
}

export { ItemFlags, BaseItem };
