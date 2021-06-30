/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ISerializable {
  /**
   * The toJSON method serializes this instance as a JSON.
   * It can be used for persistence, data transfer, etc.
   *
   * @param {Record<string, any>} [context] - The context value.
   * @return {Record<string, any>} - Returns the json object.
   */
  toJSON(context?: Record<string, any>): Record<string, any>

  /**
   * The fromJSON method takes a JSON and deserializes into an instance of this type.
   *
   * @param {Record<string, any>} j - The json object this item must decode.
   * @param {Record<string, any>} [context] - The context value.
   */
  fromJSON(j: Record<string, any>, context?: Record<string, any>): void
}
