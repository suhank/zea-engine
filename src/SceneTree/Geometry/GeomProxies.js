import {
    Signal
} from '../../Math';
import {
    RefCounted
} from '../RefCounted.js';

let FreeMemWorker = require("worker-loader?inline!../FreeMemWorker.js");

class BaseProxy extends RefCounted {
    constructor(data) {
        super();
        this.name = data.name;
        this.__buffers = data.geomBuffers;
        this.boundingBox = data.bbox;

        this.__metaData = new Map();

        this.boundingBoxChanged = new Signal();
        this.geomDataChanged = new Signal();
        this.geomDataTopologyChanged = new Signal();
    }
    genBuffers() {
        return this.__buffers;
    }
    freeData(){

        // Note: Explicitly transfer data to a web worker and then 
        // terminate the worker. (hacky way to free TypedArray memory explicitly)
        let transferables = [this.__buffers.indices.buffer];
        for (let attrName in this.__buffers.attrBuffers) {
            let attrData = this.__buffers.attrBuffers[attrName];
            transferables.push(attrData.values.buffer);
        }
        let worker = new FreeMemWorker();
        worker.postMessage(this.__buffers, transferables);
        worker.terminate();

        this.__buffers = undefined;
    }

    //////////////////////////////////////////
    // Metadata

    getMetadata(key) {
        return this.__metaData.get(key)
    }

    hasMetadata(key) {
        return this.__metaData.has(key)
    }

    setMetadata(key, metaData) {
        this.__metaData.set(key, metaData);
    }
}

class PointsProxy extends BaseProxy {
    constructor(data) {
        super(data);
    }
};

class LinesProxy extends BaseProxy {
    constructor(data) {
        super(data);
    }
};

class MeshProxy extends BaseProxy {
    constructor(data) {
        super(data);
    }
};

export {
    PointsProxy,
    LinesProxy,
    MeshProxy
};