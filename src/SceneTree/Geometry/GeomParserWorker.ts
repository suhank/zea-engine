import { parseGeomsBinary } from './parseGeomsBinary'

self.onmessage = function (event) {
  parseGeomsBinary(event.data, (data: any, transferables: any) => {
    self.postMessage(data, transferables)
  })
}
