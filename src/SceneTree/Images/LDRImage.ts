/* eslint-disable require-jsdoc */
import { Registry } from '../../Registry'
import { FileImage } from './FileImage'

/**
 * Class representing a LDR (low dynamic range) image.
 *
 * ```
 * const image = new LDRImage()
 * image.getParameter('FilePath').setUrl("https://storage.googleapis.com/zea-playground-assets/zea-engine/texture.png")
 * ```
 *
 * **Parameters**
 * * **PreferredSize(`NumberParameter`):** _todo_
 *
 * **Events:**
 * * **loaded:** Triggered when image data is loaded.
 *
 * **File Types:** jpg, jpeg, png
 *
 * @extends FileImage
 */
class LDRImage extends FileImage {
  /**
   * Create a LDR image.
   * @param {string} name - The name value.
   * @param {string} filePath - The filePath value.
   * @param {Record<string, any>} params - The params value.
   */
  constructor(name?: string, filePath?: string, params?: Record<string, any>) {
    super(name, filePath, params)
  }
}
Registry.register('LDRImage', LDRImage)

export { LDRImage }
