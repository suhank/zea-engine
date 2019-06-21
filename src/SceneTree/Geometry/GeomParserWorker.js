
import {
  parseGeomsBinary
} from './parseGeomsBinary.js';

self.onmessage = function(event) {
  parseGeomsBinary(
    event.data.key,
    event.data.toc,
    event.data.geomIndexOffset,
    event.data.geomsRange,
    event.data.isMobileDevice, 
    event.data.bufferSlice, 
    event.data.genBuffersOpts, 
    event.data.context, 
    (data, transferables)=>{
      self.postMessage(data, transferables);
    });
}
