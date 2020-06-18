import { parseGeomsBinary } from './parseGeomsBinary.js'

globalThis.onmessage = function(event) {
  parseGeomsBinary(event.data, (data, transferables) => {
    globalThis.postMessage(data, transferables)
  })
}
