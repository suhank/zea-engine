import { parseGeomsBinary } from './Geometry/parseGeomsBinary'

self.onmessage = function(event: MessageEvent) {
  parseGeomsBinary(event.data, (data: any, transferables: any) => {
    self.postMessage(data, transferables)
  })
}

const foo: any = {}
export default foo
