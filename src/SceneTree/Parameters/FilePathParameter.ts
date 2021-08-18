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
   * @param {string} name - The name of the file path parameter.
   * @param {string} exts - The exts value.
   */
  constructor(name: string = '') {
    super(name, '', 'FilePath')
  }

  /**
   * Returns complete file path.
   *
   * @return {string} - The return value.
   */
  getFilepath(): string {
    if (this.value) {
      return (resourceLoader as any).getFilepath(this.value)
    }

    return ''
  }

  /**
   * Resolves resourceId using the specified path and sets its value to the parameter.
   *
   * @param {string} filePath - The filePath value.
   */
  setFilepath(filePath: string): void {
    this.setValue(resourceLoader.resolveFileId(filePath))
  }

  /**
   * Returns parameter's file name
   *
   * @return {string} - The return value.
   */
  getFilename(): string {
    if (!this.value) throw 'No file value'

    return resourceLoader.resolveFilename(this.value)
  }

  /**
   * Returns parameter's file extension
   *
   * @return {string} - The return value.
   */
  getExt(): string | undefined {
    const filename = this.getFilename()
    const suffixSt = filename.lastIndexOf('.')
    if (suffixSt != -1) return filename.substring(suffixSt).toLowerCase()
  }

  /**
   * Returns parameter's file name without extension
   *
   * @return {string} - The return value.
   */
  getStem(): string | null{
    const filename = this.getFilename()
    if (filename) {
      const parts = filename.split('.')
      if (parts.length == 2) return parts[0]
      else return filename
    }
    return null
  }

  /**
   * Returns file object, which contains the url, resourceId and the name.
   *
   * @return {Record<string, string | undefined>} - The return value.
   */
  getFileDesc(): Record<string, string | undefined> {
    return this.getFile()
  }

  /**
   * Returns file object, which contains the url, resourceId and the name.
   *
   * @return {Record<string, string | undefined>} - The return value.
   */
  getFile(): Record<string, string | undefined> {
    return { id: this.value, url: this.getUrl(), name: this.getFilename() }
  }

  /**
   * Sets file data.
   *
   * @param {string} url - the url value of the
   * @param {string} name - (optional) the name of the file that the Url points to.
   */
  setUrl(url: string, name: string): void {
    this.setValue(resourceLoader.resolveFileId(url))
  }

  /**
   * Returns the file url string.
   *
   * @return {string} - The return value.
   */
  getUrl(): string {
    if (!this.value) throw 'No file value'
    return resourceLoader.resolveURL(this.value)
  }

  /**
   * Sets file parameter value
   *
   * @param {string} value - The value param.
   */
  setValue(value: string): void {
    if (!value) {
      throw new Error('Invalid value for setValue.')
    }

    // Important here because file changes cause reloads.
    // Note: equality tests only work on simple types.
    if (value == this.value) {
      return
    }

    this.value = value

    this.emit('valueChanged', {})
  }
  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param {Record<string, any>} [context] - The context value.
   * @return {Record<string, unknown>} - Returns the json object.
   */
  toJSON(context?: Record<string, any>): Record<string, unknown> {
    return { value: this.value }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {Record<string, unknown>} j - The json object this item must decode.
   * @param {Record<string, any>} [context] - The context value.
   */
  fromJSON(j: Record<string, unknown>, context?: Record<string, any>): void {
    if (j.value) {
      this.value = j.value as string
    }
  }

  // ////////////////////////////////////////
  // Clone and Destroy

  /**
   * The clone method constructs a new file path parameter,
   * copies its values from this parameter and returns it.
   *
   * @return {FilePathParameter} - Returns a new cloned file path parameter.
   */
  clone(): FilePathParameter {
    const clone = new FilePathParameter(this.name)
    if (this.value) clone.setValue(this.value)

    return clone
  }
}

Registry.register('FilePathParameter', FilePathParameter)

export { FilePathParameter }
