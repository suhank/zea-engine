/* eslint-disable prefer-promise-reject-errors */
import { Vec4 } from '../../Math/index'
import { loadBinfile } from '../Utils'
import { Registry } from '../../Registry'
import { FileImage } from './FileImage'

import { GIF } from '../../external/gifuct-js'
import { resourceLoader } from '../resourceLoader'

import { NumberParameter, Vec4Parameter } from '../Parameters/index'
import { MathFunctions } from '../../Utilities/MathFunctions'

const imageDataLibrary: { [key: string]: any } = {}
/**
 * Class representing a GIF image.
 *
 * ```
 * const image = new GIFImage()
 * image.getParameter('FilePath').setUrl("https://storage.googleapis.com/zea-playground-assets/zea-engine/texture.gif")
 * ```
 *
 * **Parameters**
 * * **StreamAtlasDesc:**
 * * **StreamAtlasIndex:**
 *
 * **Events**
 * * **loaded:** Triggered when the gif data is loaded.
 *
 * **File Types:** gif
 *
 * @extends FileImage
 */
class GIFImage extends FileImage {
  protected __streamAtlas: any
  protected play: any
  protected stop: any
  protected __resourcePromise: any
  protected __unpackedData: any
  /**
   * Create a GIF image.
   * @param {string} name - The name value.
   * @param {string|Record<any,any>} filePath - The filePath value.
   * @param {Record<any,any>} params - The params value.
   */

  streamAtlasDescParam = new Vec4Parameter('StreamAtlasDesc')
  streamAtlasIndexParam = new NumberParameter('StreamAtlasIndex', 0)
  constructor(name?: string, filePath = '', params = {}) {
    super(name, filePath, params)

    this.format = 'RGBA'
    this.type = 'UNSIGNED_BYTE'
    this.__streamAtlas = true

    this.addParameter(this.streamAtlasDescParam)
    this.addParameter(this.streamAtlasIndexParam)

    const frameParam = this.streamAtlasIndexParam
    frameParam.setRange([0, 1])

    let playing: any
    let frame = 0
    const incrementFrame = (numFrames: number) => {
      frameParam.setValue(frame)
      if (playing) setTimeout(() => incrementFrame(numFrames), this.getFrameDelay(frame))
      frame = (frame + 1) % numFrames
    }
    this.play = () => {
      this.__resourcePromise.then(() => {
        playing = true
        let frameParam_check = frameParam.getRange()
        if (!frameParam_check) {
          // should range be always be intialized?
          console.warn('numFrames is null')
          return
        }
        const numFrames = frameParam_check[1]
        incrementFrame(numFrames)
      })
    }
    this.stop = () => {
      playing = false
    }
  }

  /**
   * The getFrameDelay method.
   * @param {number} index - The index value.
   * @return {number} - The return value.
   */
  getFrameDelay(index: number) {
    // Note: Frame delays are in centisecs (not millisecs which the timers will require.)
    return this.__unpackedData.frameDelays[index] * 10
  }

  /**
   * Uses the specify url to load an Image element and adds it to the data library.
   * Sets the state of the current object.
   *
   * @param {string} url - The url value.
   * @param {string} format - The format value.
   * @return {Promise} Returns a promise that resolves once the image is loaded.
   */
  load(url: string, format = 'RGB'): Promise<void> {
    // this.__streamAtlasDesc = new Vec4();

    if (url in imageDataLibrary) {
      this.__resourcePromise = imageDataLibrary[url]
      return this.__resourcePromise
    } else {
      this.__resourcePromise = new Promise((resolve, reject) => {
        resourceLoader.incrementWorkload(1)

        // if (fileDesc.assets && fileDesc.assets.atlas) {
        //   const imageElem = new Image()
        //   imageElem.crossOrigin = 'anonymous'
        //   imageElem.src = fileDesc.assets.atlas.url
        //   imageElem.addEventListener('load', () => {
        //     resolve({
        //       width: fileDesc.assets.atlas.width,
        //       height: fileDesc.assets.atlas.height,
        //       atlasSize: fileDesc.assets.atlas.atlasSize,
        //       frameDelays: fileDesc.assets.atlas.frameDelays,
        //       frameRange: [0, fileDesc.assets.atlas.frameDelays.length],
        //       imageData: imageElem,
        //     })
        //     resourceLoader.incrementWorkDone(1)
        //   })
        //   return
        // }

        loadBinfile(
          url,
          (data: any) => {
            console.warn('Unpacking Gif client side:' + url)

            const start = performance.now()

            // Decompressing using: https://github.com/matt-way/gifuct-js
            //@ts-ignore
            const gif = new GIF(data)
            const frames = gif.decompressFrames(true)

            // do something with the frame data
            const sideLength = Math.sqrt(frames.length)
            const atlasSize = [sideLength, sideLength]
            if (MathFunctions.fract(sideLength) > 0.0) {
              atlasSize[0] = Math.floor(atlasSize[0] + 1)
              if (MathFunctions.fract(sideLength) > 0.5) {
                atlasSize[1] = Math.floor(atlasSize[1] + 1)
              } else {
                atlasSize[1] = Math.floor(atlasSize[1])
              }
            }

            const width = frames[0].dims.width
            const height = frames[0].dims.height

            // gif patch canvas
            const tempCanvas = document.createElement('canvas')
            const tempCtx = tempCanvas.getContext('2d')
            // full gif canvas
            const gifCanvas = document.createElement('canvas')
            const gifCtx = gifCanvas.getContext('2d')

            gifCanvas.width = width
            gifCanvas.height = height

            // The atlas for all the frames.
            const atlasCanvas = document.createElement('canvas')
            const atlasCtx = atlasCanvas.getContext('2d')
            atlasCanvas.width = atlasSize[0] * width
            atlasCanvas.height = atlasSize[1] * height

            let frameImageData: any
            const frameDelays: any[] = []
            const renderFrame = (frame: any, index: any) => {
              const dims = frame.dims

              // Note: the server side library returns centisecs (1/100 second) for
              // frame delays, so normalize here so that client and servers
              // valueus are in the
              frameDelays.push(frame.delay / 10)

              if (!frameImageData || dims.width != frameImageData.width || dims.height != frameImageData.height) {
                tempCanvas.width = dims.width
                tempCanvas.height = dims.height
                frameImageData = tempCtx?.createImageData(dims.width, dims.height)
              }

              // set the patch data as an override
              frameImageData.data.set(frame.patch)
              tempCtx?.putImageData(frameImageData, 0, 0)

              // Note: undocumented disposal method.
              // See Ids here: https://github.com/theturtle32/Flash-Animated-GIF-Library/blob/master/AS3GifPlayer/src/com/worlize/gif/constants/DisposalType.as
              // From what I can gather, 2 means we should clear the background first.
              // this seems to work with Gifs featuring moving transparency.
              // For fully opaque gifs, we should avoid this.
              if (frame.disposalType == 2) gifCtx?.clearRect(0, 0, gifCanvas.width, gifCanvas.height)

              gifCtx?.drawImage(tempCanvas, dims.left, dims.top)

              atlasCtx?.drawImage(gifCanvas, (index % atlasSize[0]) * width, Math.floor(index / atlasSize[0]) * height)
            }

            for (let i = 0; i < frames.length; i++) {
              // console.log(frame);
              renderFrame(frames[i], i)
            }
            resourceLoader.incrementWorkDone(1)

            const imageData = atlasCtx?.getImageData(0, 0, atlasCanvas.width, atlasCanvas.height)

            const ms = performance.now() - start
            console.log(`Decode GIF '${url}' time:` + ms)

            resolve({
              width: atlasCanvas.width,
              height: atlasCanvas.height,
              atlasSize,
              frameRange: [0, frames.length],
              frameDelays,
              imageData,
            })
          },
          (statusText: any) => {
            const msg = 'Unable to Load URL:' + statusText + ':' + url
            console.warn(msg)
            reject(msg)
          }
        )
      })

      imageDataLibrary[url] = this.__resourcePromise
    }

    this.__resourcePromise.then((unpackedData: any) => {
      this.width = unpackedData.width
      this.height = unpackedData.height

      this.streamAtlasDescParam.value = new Vec4(unpackedData.atlasSize[0], unpackedData.atlasSize[1], 0, 0)
      this.streamAtlasIndexParam.setRange(unpackedData.frameRange)

      this.__unpackedData = unpackedData
      this.__data = unpackedData.imageData

      // ////////////////////////
      // Playback
      this.loaded = true

      this.emit('loaded', {})
    })
    return this.__resourcePromise
  }
}

Registry.register('GIFImage', GIFImage)

export { GIFImage }
