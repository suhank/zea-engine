/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseGeomsBinary } from './parseGeomsBinary'

self.onmessage = function (event: Record<string, any>) {
  parseGeomsBinary(event.data, (data: any, transferables: any) => {
    self.postMessage(data, transferables)
  })
}
