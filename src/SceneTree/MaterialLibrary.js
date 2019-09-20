import { SystemDesc } from '../BrowserDetection.js';
import { Signal } from '../Utilities';
import { sgFactory } from './SGFactory.js';
import { Material } from './Material.js';
import { FileImage } from './Images';

/** Class representing a material library. */
class MaterialLibrary {
  /**
   * Create a material library.
   * @param {any} name - The name value.
   */
  constructor(name = 'MaterialLibrary') {
    this.__name = name;

    this.lod = 0;
    if (SystemDesc.isMobileDevice) this.lod = 1;
    this.loaded = new Signal();

    this.clear();
  }

  /**
   * The clear method.
   */
  clear() {
    this.__images = {};
    this.__materials = {
      Default: new Material('Default', 'SimpleSurfaceShader'),
    };
  }

  /**
   * The getPath method.
   * @return {any} - The return value.
   */
  getPath() {
    return [this.__name];
  }

  /**
   * The getNumMaterials method.
   * @return {any} - The return value.
   */
  getNumMaterials() {
    return Object.keys(this.__materials).length;
  }

  /**
   * The getMaterials method.
   * @return {any} - The return value.
   */
  getMaterials() {
    return Object.values(this.__materials);
  }

  /**
   * The getMaterialNames method.
   * @return {any} - The return value.
   */
  getMaterialNames() {
    const names = [];
    for (const name in this.__materials) {
      names.push(name);
    }
    return names;
  }

  /**
   * The hasMaterial method.
   * @param {any} name - The name param.
   * @return {any} - The return value.
   */
  hasMaterial(name) {
    return name in this.__materials;
  }

  /**
   * The addMaterial method.
   * @param {any} material - The material param.
   */
  addMaterial(material) {
    material.setOwner(this);
    this.__materials[material.getName()] = material;
  }

  /**
   * The getMaterial method.
   * @param {any} name - The name param.
   * @param {Boolean} assert - The assert param.
   * @return {any} - The return value.
   */
  getMaterial(name, assert = true) {
    const res = this.__materials[name];
    if (!res && assert) {
      throw new Error(
        'Material:' + name + ' not found in library:' + this.getMaterialNames()
      );
    }
    return res;
  }

  /**
   * The hasImage method.
   * @param {any} name - The name param.
   * @return {any} - The return value.
   */
  hasImage(name) {
    return name in this.__images;
  }

  /**
   * The addImage method.
   * @param {any} image - The image param.
   */
  addImage(image) {
    image.setOwner(this);
    this.__images[image.getName()] = image;
  }

  /**
   * The getImage method.
   * @param {any} name - The name param.
   * @param {boolean} assert - The assert param.
   * @return {any} - The return value.
   */
  getImage(name, assert = true) {
    const res = this.__images[name];
    if (!res && assert) {
      throw new Error(
        'Image:' + name + ' not found in library:' + this.getImageNames()
      );
    }
    return res;
  }

  /**
   * The getImageNames method.
   * @return {any} - The return value.
   */
  getImageNames() {
    const names = [];
    for (const name in this.__images) {
      names.push(name);
    }
    return names;
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The load method.
   * @param {any} filePath - The filePath param.
   */
  load(filePath) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    xhr.ontimeout = () => {
      throw new Error('The request for ' + filePath + ' timed out.');
    };
    xhr.onload = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.fromJSON(JSON.parse(xhr.responseText));
        } else {
          console.warn(xhr.statusText);
        }
      }
    };
    xhr.send(null);
  }

  /**
   * The fromJSON method.
   * @param {any} j - The j param.
   * @param {any} context - The context param.
   * @param {any} flags - The flags param.
   */
  fromJSON(j, context = {}, flags = 0) {
    context.lod = this.lod;
    for (const name in j.textures) {
      const image = new FileImage(name);
      image.fromJSON(j.textures[name]);
      this.__images[name] = texture;
    }
    for (const name in j.materials) {
      const material = new Material(name);
      material.fromJSON(j.materials[name]);
      this.addMaterial(material);
    }
  }

  /**
   * The toJSON method.
   * @param {any} context - The context param.
   * @param {any} flags - The flags param.
   * @return {any} - The return value.
   */
  toJSON(context = {}, flags = 0) {
    return {
      numMaterials: this.geoms.length(),
    };
  }

  /**
   * The readBinary method.
   * @param {any} reader - The reader param.
   * @param {any} context - The context param.
   */
  readBinary(reader, context = {}) {
    if (context.version == undefined) context.version = 0;

    this.name = reader.loadStr();

    // Specify the Lod to load the images in this library.
    context.lod = this.lod;
    context.materialLibrary = this;

    const numTextures = reader.loadUInt32();
    for (let i = 0; i < numTextures; i++) {
      const type = reader.loadStr();
      const texture = sgFactory.constructClass(type, undefined);
      texture.readBinary(reader, context);
      this.__images[texture.getName()] = texture;
    }
    const numMaterials = reader.loadUInt32();
    if (numMaterials > 0) {
      const toc = reader.loadUInt32Array(numMaterials);
      for (let i = 0; i < numMaterials; i++) {
        const material = new Material('');
        reader.seek(toc[i]); // Reset the pointer to the start of the item data.
        material.readBinary(reader, context, this.__images);
        this.addMaterial(material);
      }
    }

    this.loaded.emit();
  }

  /**
   * The toString method.
   * @return {any} - The return value.
   */
  toString() {
    return JSON.stringify(this.toJSON(), null, 2);
  }
}
export { MaterialLibrary };
