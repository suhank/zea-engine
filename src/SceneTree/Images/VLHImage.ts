/* eslint-disable require-jsdoc */
import { Registry } from '../../Registry'
import { HDRImage } from './HDRImage'

/**
 * Class representing a LDR (low dynamic range) image.
 *
 * ```
 * const image = new VLHImage()
 * image.load("https://storage.googleapis.com/zea-playground-assets/zea-engine/texture.png")
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
 * @extends HDRImage
 */
class VLHImage extends HDRImage {
  /**
   * Create a LDR image.
   * @param name - The name value.
   * @param filePath - The filePath value.
   * @param params - The params value.
   */
  constructor(name?: string, filePath?: string, params?: Record<string, any>) {
    super(name, params)
    console.warn('Deprecated class. Please use HDRImage instead.')
  }
}
Registry.register('VLHImage', VLHImage)

export { VLHImage }
