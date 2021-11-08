import { BaseEvent } from '../BaseEvent'

class StreamFileParsedEvent extends BaseEvent {
  geomFileID: any
  geomCount: number
  constructor(geomFileID: any, geomCount: number) {
    super()
    this.geomFileID = geomFileID
    this.geomCount = geomCount
  }
}
export { StreamFileParsedEvent }
