import { GLViewport } from '../..'
import { Xfo } from '../../Math/Xfo'
import { GLBaseViewport } from '../../Renderer/GLBaseViewport'
import { BaseEvent } from '../BaseEvent'

class ViewChangedEvent extends BaseEvent {
  interfaceType: string
  viewXfo: Xfo
  focalDistance: number
  fieldOfView: number

  hmd: any
  controllers: any[]
  viewport: GLBaseViewport
  vrviewport: GLBaseViewport
  
  constructor(interfaceType: string, viewXfo: Xfo, focalDistance?: number, fieldOfView?: number) {
    super()
    this.interfaceType = interfaceType
    this.viewXfo = viewXfo

    this.focalDistance = focalDistance
    this.fieldOfView = fieldOfView
  }
}

export { ViewChangedEvent }
