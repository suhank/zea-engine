import { Signal } from '../Utilities';

let counter = 0;

/** Class representing ref counted. */
class RefCounted {
  /**
   * Create ref counted.
   */
  constructor() {
    if (this.constructor.name == 'RefCounted') {
      throw new Error('RefCounted should not be instantiated directly.');
    }
    this.__id = ++counter;
    this.__refs = [];
    this.destructing = new Signal();
    this.__destroyed = false;
  }

  /**
   * The getId method.
   * @return {any} - The return value.
   */
  getId() {
    return this.__id;
  }

  /**
   * The numRefs method.
   * @return {any} - The return value.
   */
  numRefs() {
    return this.__refs.length;
  }

  /**
   * The addRef method.
   * @param {any} referer - The referer param.
   * @return {any} - The return value.
   */
  addRef(referer) {
    if (!referer)
      throw new Error('Error in RefCounted.addRef: Must provide a referer');

    // Note: an object can be reffeed multiple times.
    // e.g. we can create a temporary ref while we re-attach a tree item to a new parent.
    this.__refs.push(referer);
    return true;
  }

  /**
   * The removeRef method.
   * @param {any} referer - The referer param.
   */
  removeRef(referer) {
    if (!referer)
      throw new Error('Error in RefCounted.removeRef: Must provide a referer');
    // console.log(this.constructor.name + " removeRef:" + referer.constructor.name);
    const index = this.__refs.indexOf(referer);
    if (index == -1)
      throw new Error(
        'Error in RefCounted.removeRef: referer not found in refs list.'
      );

    this.__refs.splice(index, 1);
    if (this.__refs.length == 0) {
      this.destroy();
    }
  }

  /**
   * The getRefer method.
   * @param {any} index - The index param.
   * @return {any} - The return value.
   */
  getRefer(index) {
    return this.__refs[index];
  }

  /**
   * The getRefIndex method.
   * @param {any} referer - The referer param.
   * @return {any} - The return value.
   */
  getRefIndex(referer) {
    return this.__refs.indexOf(referer);
  }

  /**
   * The isDestroyed method.
   * @return {any} - The return value.
   */
  isDestroyed() {
    return this.__destroyed;
  }

  /**
   * The destroy method.
   */
  destroy() {
    this.__destroyed = true;
    // console.log(this.constructor.name + " destructing");
    this.destructing.emit(this);
  }
}
export { RefCounted };
