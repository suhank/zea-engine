/* eslint-disable constructor-super */
import { BooleanParameter, NumberParameter } from './Parameters/index'
import { TreeItem } from './TreeItem'
import { AudioSourceCreatedEvent } from '../Utilities/Events/AudioSourceCreatedEvent'

/**
 * A special type of `TreeItem` that let you handle audio files.
 * <br>
 * <br>
 * **Parameters**
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
  protected loaded: boolean
  private audioSource: any
  private audioBuffer: any
  autoplayParam = new BooleanParameter('Autoplay', false)
  playStateParam = new NumberParameter('PlayState', 0)
  muteParam = new BooleanParameter('Mute', false)
  gainParam = new NumberParameter('Gain', 1.0, [0, 5])
  loopParam = new BooleanParameter('Loop', false)
  spatializeAudioParam = new BooleanParameter('SpatializeAudio', true)
  refDistanceParam = new NumberParameter('refDistance', 2)
  maxDistanceParam = new NumberParameter('maxDistance', 10000)
  // Defaults taken from here.: https://github.com/mdn/webaudio-examples/blob/master/panner-node/main.js
  rolloffFactorParam = new NumberParameter('rolloffFactor', 1)
  coneInnerAngleParam = new NumberParameter('coneInnerAngle', 360)
  coneOuterAngleParam = new NumberParameter('coneOuterAngle', 0)
  coneOuterGainParam = new NumberParameter('coneOuterGain', 1)
  /**
   * Create an audio item.
   * @param {string} name - The name of the audio item.
   */
  constructor(name: string) {
    super(name)

    this.loaded = false

    this.addParameter(this.autoplayParam)
    this.addParameter(this.playStateParam)
    this.addParameter(this.muteParam)
    this.addParameter(this.gainParam)
    this.addParameter(this.loopParam)
    this.addParameter(this.spatializeAudioParam)
    this.addParameter(this.refDistanceParam)
    this.addParameter(this.maxDistanceParam)
    this.addParameter(this.rolloffFactorParam)
    this.addParameter(this.coneInnerAngleParam)
    this.addParameter(this.coneOuterAngleParam)
    this.addParameter(this.coneOuterGainParam)

    this.playStateParam.on('valueChanged', (event) => {
      switch (this.playStateParam.value) {
        case 0:
          if (this.loaded) {
            if (this.audioSource) {
              this.audioSource.stop(0)
              this.audioSource = undefined
            }
          }
          break
        case 1:
          if (this.loaded) {
            this.startAudioPlayback()
          }
          break
      }
    })
    this.muteParam.on('valueChanged', () => {
      if (this.audioSource) this.audioSource.muted = this.muteParam.value
    })
    this.loopParam.on('valueChanged', () => {
      if (this.audioSource) this.audioSource.loop = this.loopParam.value
    })

    // Note: Many parts of the code assume a 'loaded' signal.
    // We should probably deprecate and use only 'updated'.
    this.loaded = false
  }

  isPlaying() {
    return this.playStateParam.value != 0
  }

  play() {
    this.playStateParam.value = 1
  }

  stop() {
    this.playStateParam.value = 0
  }

  pause() {
    this.playStateParam.value = 0
  }

  mute(value: boolean) {
    this.muteParam.value = value
  }

  getAudioSource() {
    return this.audioSource
  }

  startAudioPlayback() {
    this.audioSource = window.ZeaAudioaudioCtx.createBufferSource()
    this.audioSource.buffer = this.audioBuffer
    this.audioSource.loop = this.loopParam.value
    this.audioSource.muted = this.muteParam.value
    this.audioSource.start(0)

    const event = new AudioSourceCreatedEvent(this.audioSource)
    this.emit('audioSourceCreated', event)
  }

  load(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest()
      request.open('GET', url, true)
      request.responseType = 'arraybuffer'

      request.onload = () => {
        const audioData = request.response
        // Note: this code is not pretty and should not access the global object
        // However, its difficult to handle this case.
        // TODO: clean this up.
        window.ZeaAudioaudioCtx.decodeAudioData(
          audioData,
          (buffer: any) => {
            this.audioBuffer = buffer
            this.loaded = true
            this.emit('loaded')
            if (this.autoplayParam.getValue()) this.startAudioPlayback()
            resolve()
          },
          (e: any) => {
            console.log('Error with decoding audio data' + e.err)
            reject()
          }
        )
      }

      request.send()
    })
  }

  /**
   * Returns loaded status of the audio item
   *
   * @return {boolean} - `The return value`.
   */
  isLoaded(): boolean {
    return this.loaded
  }

  /**
   * The setAudioStream method.
   * @param {any} audioSource - The audio value.
   */
  setAudioStream(audioSource: any) {
    this.loaded = true
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
