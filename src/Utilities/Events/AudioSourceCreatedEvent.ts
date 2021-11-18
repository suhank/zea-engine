import { BaseEvent } from '../BaseEvent'

class AudioSourceCreatedEvent extends BaseEvent {
  audioSource: any
  constructor(audioSource: any) {
    super()
    this.audioSource = audioSource
  }
}
export { AudioSourceCreatedEvent }
