/* eslint-disable @typescript-eslint/no-explicit-any */
let counter = 0

/** Class representing a BaseClass. */
class BaseClass {
  __id: number
  /**
   * Create an BaseClass.
   */
  constructor() {
    this.__id = ++counter
  }

  /**
   * Returns the unique id of the object.
   * @private
   * @return {number} - The Id of the object.
   */
  getId(): number {
    return this.__id
  }

  /**
   * Returns the unmangled name of the class. Each class muc implement this method to support
   * the Registry factory  function.
   * @private
   * @return {string} - The name of the class definition.
   */
  getClassName(): string {
    return 'BaseClass'
  }
}

export { BaseClass }
