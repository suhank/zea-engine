
self.onmessage = function(event) {
	let geomBuffers = event.data;
    let memSize =  this.__buffers.indices.byteLength;
    let transferables = [this.__buffers.indices];
    for (let attrName in this.__buffers.attrBuffers) {
        let attrData = this.__buffers.attrBuffers[attrName];
        memSize += attrData.values.byteLength;
    }
    console.log("Freeing:" + memSize);
}
