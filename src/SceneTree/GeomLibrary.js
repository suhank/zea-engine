import {
    isMobileDevice,
    Signal
} from '../Math';
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

// import {
//     parseGeomsBinary
// } from './Geometry/GeomParserWorker.js';
let GeomParserWorker = require("worker-loader?inline!./Geometry/GeomParserWorker.js");

class GeomLibrary {
    constructor() {
        this.loaded = new Signal();
        this.geoms = [];

        this.workers = [];
        let logicalProcessors = window.navigator.hardwareConcurrency;
        for (let i = 0; i < logicalProcessors; i++) {
            this.workers[i] = this.__constructWorker();
        }
        this.__mostResentlyHired = 0;
    }

    __constructWorker() {
        let worker = new GeomParserWorker();
        worker.onmessage = (event) => {
            this.__revieveGeomDatas(event.data.geomDatas, event.data.geomIndexOffset, event.data.geomsRange);
        };
        return worker;
    }

    getNumGeoms() {
        return this.geoms.length;
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

    readBinary(data) {
        let reader = new BinReader(data, 0, isMobileDevice());
        let numGeoms = reader.loadUInt32();
        let geomIndexOffset = reader.loadUInt32();
        let toc = reader.loadUInt32Array(numGeoms);
        // TODO: Use SharedArrayBuffer once available.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer 
        let numGeomsPerWorkload = Math.floor((numGeoms / window.navigator.hardwareConcurrency) + 1);
        let offset = 0;
        while (offset < numGeoms) {
            let geomsRange;
            let dataSlice;
            let dataSlice_start = toc[offset];
            let dataSlice_end;
            if(offset+numGeomsPerWorkload >= numGeoms){
                geomsRange = [offset, numGeoms];
                dataSlice_end = data.byteLength;
                // console.log("core:" +this.__mostResentlyHired + " geomsRange:" + geomsRange + " start:" +dataSlice_start);
            }
            else {
                geomsRange = [offset, offset+numGeomsPerWorkload];
                dataSlice_end = toc[geomsRange[1]];
                // console.log("core:" +this.__mostResentlyHired + " geomsRange:" + geomsRange + " start:" +dataSlice_start + " end:" + dataSlice_end);
            }
            dataSlice = data.slice(dataSlice_start, dataSlice_end);
            
            this.workers[this.__mostResentlyHired].postMessage({
                toc,
                geomIndexOffset,
                geomsRange,
                isMobileDevice: reader.isMobileDevice,
                dataSlice,
            }, [dataSlice]);
            this.__mostResentlyHired = (this.__mostResentlyHired + 1) % this.workers.length;

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
        this.loaded.emit(storedRange);
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