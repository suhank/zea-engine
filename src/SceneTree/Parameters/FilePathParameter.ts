/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Registry } from '../../Registry'
import { Parameter } from './Parameter'
import { resourceLoader } from '../resourceLoader'

/**
 * Represents a specific type of parameter, that only stores file data values.
 *
 * **Events**
 * * **valueChanged:** Triggered when setting file's URL.
 * * **fileUpdated:** Triggered when parameter's value is updated.
 *
 * @extends Parameter
 */
class FilePathParameter extends Parameter<string> {
  /**
   * Create a file path parameter.
   *
   * @param name - The name of the file path parameter.
   * @param exts - The exts value.
   */
  constructor(name: string = '') {
    super(name, '', 'FilePath')
  }

  /**
   * Returns parameter's file name
   *
   * @return - The return value.
   */
  getFilename(): string {
    if (!this.__value) throw 'No file value'
    return this.__value.lastIndexOf('/') > -1 ? this.__value.substring(this.__value.lastIndexOf('/') + 1) : ''
  }

  /**
   * Returns parameter's file extension
   *
   * @return - The return value.
   */
  getExt(): string | undefined {
    const filename = this.getFilename()
    const suffixSt = filename.lastIndexOf('.')
    if (suffixSt != -1) return filename.substring(suffixSt).toLowerCase()
    return undefined
  }

  /**
   * Returns parameter's file name without extension
   *
   * @return - The return value.
   */
  getStem(): string | null {
    const filename = this.getFilename()
    if (filename) {
      const parts = filename.split('.')
      if (parts.length == 2) return parts[0]
      else return filename
    }
    return null
  }

  /**
   * Sets file parameter value
   *
   * @param value - The value param.
   */
  setValue(value: string): void {
    if (!value) {
      throw new Error('Invalid value for setValue.')
    }

    // Important here because file changes cause reloads.
    // Note: equality tests only work on simple types.
    if (value == this.__value) {
      return
    }

    this.__value = value

    this.emit('valueChanged', {})
  }
  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param context - The context value.
   * @return - Returns the json object.
   */
  toJSON(context?: Record<string, any>): Record<string, unknown> {
    return { value: this.__value }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param j - The json object this item must decode.
   * @param context - The context value.
   */
  fromJSON(j: Record<string, unknown>, context?: Record<string, any>): void {
    if (j.value) {
      this.__value = j.value as string
    }
  }

  // ////////////////////////////////////////
  // Clone and Destroy

  /**
   * The clone method constructs a new file path parameter,
   * copies its values from this parameter and returns it.
   *
   * @return - Returns a new cloned file path parameter.
   */
  clone(): FilePathParameter {
    const clone = new FilePathParameter(this.name)
    if (this.__value) clone.setValue(this.__value)

    return clone
  }
}

Registry.register('FilePathParameter', FilePathParameter)

export { FilePathParameter }
