import {
    Signal,
    isMobileDevice
} from '../Math';
import {
    Mesh
} from './Geometry/Mesh.js';
import {
    BinReader
} from './BinReader.js';
import {
    loadBinfile
} from './Utils.js';
import {
    PointsProxy,
    LinesProxy,
    MeshProxy,
} from './Geometry/GeomProxies.js';

let GeomParserWorker = require("worker-loader?inline!./Geometry/GeomParserWorker.js");

class GeomLibrary {
    constructor() {
        this.rangeLoaded = new Signal();
        this.loaded = new Signal(true);
        this.geoms = [];
    }

    __constructWorker() {
        let worker = new GeomParserWorker();
        worker.onmessage = (event) => {
            this.__revieveGeomDatas(event.data.geomDatas, event.data.geomIndexOffset, event.data.geomsRange);
            worker.terminate();
        };
        return worker;
    }

    getNumGeoms() {
        return this.__numGeoms;
    }

    getGeom(index) {
        if (index >= this.geoms.length) {
            //console.warn("Geom index invalid:" + index);
            return null;
        }
        return this.geoms[index];
    }

    loadURL(fileUrl) {
        let onLoad = this.loadBin;
        loadBinfile(
            fileUrl,
            function(fileUrl, data) {
                this.loadBin(data);
            },
            function(statusText) {
                console.warn(statusText);
            },
            this
        );
    }

    readBinaryBuffer(buffer) {
        let reader = new BinReader(buffer, 0, isMobileDevice());
        this.__numGeoms = reader.loadUInt32();
        this.__loaded = 0;
        let geomIndexOffset = reader.loadUInt32();
        let toc = reader.loadUInt32Array(this.__numGeoms);
        // TODO: Use SharedArrayBuffer once available.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer 
        let numGeomsPerWorkload = Math.max(1, Math.floor((this.__numGeoms / window.navigator.hardwareConcurrency) + 1));
        let offset = 0;
        while (offset < this.__numGeoms) {
            let geomsRange;
            let bufferSlice;
            let bufferSlice_start = toc[offset];
            let bufferSlice_end;
            if (offset + numGeomsPerWorkload >= this.__numGeoms) {
                geomsRange = [offset, this.__numGeoms];
                bufferSlice_end = buffer.byteLength;
                // console.log("core:" +this.__mostResentlyHired + " geomsRange:" + geomsRange + " start:" +bufferSlice_start);
            } else {
                geomsRange = [offset, offset + numGeomsPerWorkload];
                bufferSlice_end = toc[geomsRange[1]];
                // console.log("core:" +this.__mostResentlyHired + " geomsRange:" + geomsRange + " start:" +bufferSlice_start + " end:" + bufferSlice_end);
            }
            bufferSlice = buffer.slice(bufferSlice_start, bufferSlice_end);

            let worker = this.__constructWorker();
            worker.postMessage({
                toc,
                geomIndexOffset,
                geomsRange,
                isMobileDevice: reader.isMobileDevice,
                bufferSlice,
            }, [bufferSlice]);
            // this.__mostResentlyHired = (this.__mostResentlyHired + 1) % this.workers.length;

            offset += numGeomsPerWorkload;
        }

    }

    __revieveGeomDatas(geomDatas, geomIndexOffset, geomsRange) {

        // We are storing a subset of the geoms from a binary file
        // which is a subset of the geoms in an asset.
        // geomIndexOffset: the offset of the file geoms in the asset.
        // geomsRange: the range of geoms in the bin file.
        let offset = geomIndexOffset + geomsRange[0];
        let storedRange = [offset, geomIndexOffset + geomsRange[1]];

        for (let i = 0; i < geomDatas.length; i++) {
            let geomData = geomDatas[i];
            let proxy;
            switch (geomData.type) {
                case 'Points':
                    proxy = new PointsProxy(geomData);
                    break;
                case 'Lines':
                    proxy = new LinesProxy(geomData);
                    break;
                case 'Mesh':
                    proxy = new MeshProxy(geomData);
                    break;
                default:
                    throw ("Unsupported Geom type:" + className);
            }
            this.geoms[offset + i] = proxy;
        }
        this.rangeLoaded.emit(storedRange);

        this.__loaded += storedRange[1] - storedRange[0];
        if(this.__loaded == this.__numGeoms)
            this.loaded.emit();
    }

    toJSON() {
        return {
            "numGeoms": this.geoms.length()
        }
    }

    toString() {
        return JSON.stringify(this.toJSON(), null, 2)
    }

};
export {
    GeomLibrary
};
// GeomLibrary;