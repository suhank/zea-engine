import { BinReader } from '../SceneTree/BinReader'

export interface IBinaryReader {
  /**
   * The readBinary method.
   *
   * @param {BinReader} reader - The reader value.
   * @param {Record<string, unknown>} [context] - The context value.
   */
  readBinary(reader: BinReader, context?: Record<string, unknown>): void
}
