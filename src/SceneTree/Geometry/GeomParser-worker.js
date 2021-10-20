import { parseGeomsBinary } from './parseGeomsBinary'

self.onmessage = function (event) {
  parseGeomsBinary(event.data, (data, transferables) => {
    self.postMessage(data, transferables)
  })
}
