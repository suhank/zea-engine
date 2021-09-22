import { Registry } from '../Registry'

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
   * Returns the unmangled name of the class.
   * @private
   * @return {string} - The name of the class definition.
   */
  getClassName(): string {
    return Registry.getClassName(Object.getPrototypeOf(this).constructor)
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param {Record<string, unknown>} context - The context value.
   * @return {Record<string, unknown>} - Returns the json object.
   */
  toJSON(context?: Record<string, unknown>): Record<string, unknown> {
    const json = {
      type: this.getClassName(),
    }
    return json
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {Record<string, any>} j - The json object this item must decode.
   * @param {Record<string, any>} context - The context value.
   */
  fromJSON(j: Record<string, any>, context?: Record<string, any>): void {}
}

export { BaseClass }
