import { Registry } from '../Registry'

/* eslint-disable @typescript-eslint/no-explicit-any */
let counter = 0

/**
 * Class representing a BaseClass.
 * The BaseClass is the foundation class of the SceneTree, as almost all classes derive from it.
 */
class BaseClass {
  protected __id: number
  /**
   * Create an BaseClass.
   */
  constructor() {
    this.__id = ++counter
  }

  /**
   * Every instance of each class based on BaseClass is assigned a unique number.
   * This number is not persistent in between different loads of a scene.
   * Returns the unique id of the object.
   * @return - The Id of the object.
   */
  getId(): number {
    return this.__id
  }

  /**
   * Returns the unmangled name of the class.
   * @return - The name of the class definition.
   */
  getClassName(): string {
    return Registry.getClassName(Object.getPrototypeOf(this).constructor)
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param context - The context value.
   * @return - Returns the json object.
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
   * @param j - The json object this item must decode.
   * @param context - The context value.
   */
  fromJSON(j: Record<string, any>, context?: Record<string, any>): void {}
}

export { BaseClass }
