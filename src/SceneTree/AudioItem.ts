/* eslint-disable constructor-super */
import { BooleanParameter, NumberParameter } from './Parameters/index'
import { FilePathParameter } from './Parameters/FilePathParameter'
import { TreeItem } from './TreeItem'
import { AudioSourceCreatedEvent } from '../Utilities/Events/AudioSourceCreatedEvent'

/**
 * A special type of `TreeItem` that let you handle audio files.
 * <br>
 * <br>
 * **Parameters**
 * * **FilePath(`FilePathParameter`):**
 * * **Autoplay(`BooleanParameter`):**
 * * **PlayState(`NumberParameter`):**
 * * **Mute(`BooleanParameter`):**
 * * **Gain(`NumberParameter`):**
 * * **Loop(`BooleanParameter):**
 * * **SpatializeAudio(`BooleanParameter`):**
 * * **refDistance(`NumberParameter`):**
 * * **maxDistance(`NumberParameter`):**
 * * **rolloffFactor(`NumberParameter`):**
 * * **coneInnerAngle(`NumberParameter`):**
 * * **coneOuterGain(`NumberParameter`):**
 *
 * **Events**
 * * **loaded**
 * * **audioSourceCreated**
 * @private
 * @extends TreeItem
 */
class AudioItem extends TreeItem {
  protected __loaded: boolean
  protected isPlaying: any
  protected play: any
  protected pause: any
  protected stop: any
  protected getAudioSource: any
  protected loaded: any
  protected mute: any

  fileParam = new FilePathParameter('FilePath')
  /**
   * Create an audio item.
   * @param {string} name - The name of the audio item.
   */
  constructor(name: string) {
    super(name)

    this.__loaded = false

    this.addParameter(this.fileParam)

    let audioSource: any
    let audioBuffer: any
    const startAudioPlayback = () => {
      audioSource = window.ZeaAudioaudioCtx.createBufferSource()
      audioSource.buffer = audioBuffer
      audioSource.loop = loopParam.value
      audioSource.muted = muteParam.value
      audioSource.start(0)

      const event = new AudioSourceCreatedEvent(audioSource)
      this.emit('audioSourceCreated', event)
    }
    this.fileParam.on('valueChanged', () => {
      const request = new XMLHttpRequest()
      request.open('GET', this.fileParam.getUrl(), true)
      request.responseType = 'arraybuffer'

      request.onload = () => {
        const audioData = request.response
        // Note: this code is not pretty and should not access the global object
        // However, its difficult to handle this case.
        // TODO: clean this up.
        window.ZeaAudioaudioCtx.decodeAudioData(
          audioData,
          (buffer: any) => {
            audioBuffer = buffer
            this.__loaded = true
            this.emit('loaded')
            if (autoplayParam.value) startAudioPlayback()
          },
          (e: any) => {
            console.log('Error with decoding audio data' + e.err)
          }
        )
      }

      request.send()
    })
    const autoplayParam = this.addParameter(new BooleanParameter('Autoplay', false))
    const playStateParam = this.addParameter(new NumberParameter('PlayState', 0))
    playStateParam.on('valueChanged', (event) => {
      switch (playStateParam.value) {
        case 0:
          if (this.__loaded) {
            if (audioSource) {
              audioSource.stop(0)
              audioSource = undefined
            }
          }
          break
        case 1:
          if (this.__loaded) {
            startAudioPlayback()
          }
          break
      }
    })

    this.isPlaying = () => {
      return playStateParam.value != 0
    }

    this.play = () => {
      playStateParam.value = 1
    }
    this.stop = () => {
      playStateParam.value = 0
    }
    this.pause = () => {
      playStateParam.value = 0
    }

    this.getAudioSource = () => {
      return audioSource
    }
    const muteParam = this.addParameter(new BooleanParameter('Mute', false))
    ;(<NumberParameter>this.addParameter(new NumberParameter('Gain', 1.0))).setRange([0, 5])
    const loopParam = this.addParameter(new BooleanParameter('Loop', false))
    this.addParameter(new BooleanParameter('SpatializeAudio', true))
    this.addParameter(new NumberParameter('refDistance', 2))
    this.addParameter(new NumberParameter('maxDistance', 10000))
    // Defaults taken from here.: https://github.com/mdn/webaudio-examples/blob/master/panner-node/main.js
    this.addParameter(new NumberParameter('rolloffFactor', 1))
    this.addParameter(new NumberParameter('coneInnerAngle', 360))
    this.addParameter(new NumberParameter('coneOuterAngle', 0))
    this.addParameter(new NumberParameter('coneOuterGain', 1))

    muteParam.on('valueChanged', () => {
      if (audioSource) audioSource.muted = muteParam.value
    })
    loopParam.on('valueChanged', () => {
      if (audioSource) audioSource.loop = loopParam.value
    })

    this.mute = (value: any) => {
      muteParam.value = value
    }

    // Note: Many parts of the code assume a 'loaded' signal.
    // We should probably deprecate and use only 'updated'.
    this.loaded = false
  }

  /**
   * Returns loaded status of the audio item
   *
   * @return {boolean} - `The return value`.
   */
  isLoaded(): boolean {
    return this.__loaded
  }

  /**
   * The setAudioStream method.
   * @param {any} audioSource - The audio value.
   */
  setAudioStream(audioSource: any) {
    this.__loaded = true
    this.emit('loaded')
    const event = new AudioSourceCreatedEvent(audioSource)
    this.emit('audioSourceCreated', event)
  }
}

/** Class representing a audio file item in a scene tree.
 * @ignore
 * @extends AudioItem
 */
class FileAudioItem extends AudioItem {
  /**
   * Create a audio file item.
   * @param {string} name - The name of the audio file.
   */
  constructor(name: string) {
    super(name)
  }
}

export { AudioItem, FileAudioItem }
