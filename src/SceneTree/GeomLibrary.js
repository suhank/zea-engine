import {
    isMobileDevice
} from '../BrowserDetection.js';
import {
    Signal
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
// import {
//     parseGeomsBinary
// } from './Geometry/parseGeomsBinary.js';

class GeomLibrary {
    constructor(name) {
        this.__name = name;
        this.rangeLoaded = new Signal();
        this.streamFileParsed = new Signal();
        this.loaded = new Signal(true);
        this.__loaded = 0;
        this.__expectedNumGeoms = 0;
        this.__numGeoms = 0;
        this.geoms = [];

        this.__streamInfos = {};

        this.__workers = [];
        for (let i = 0; i < 3; i++)
            this.__workers.push(this.__constructWorker());
        this.__nextWorker = 0;
    }

    __constructWorker() {
        let worker = new GeomParserWorker();
        worker.onmessage = (event) => {
            this.__recieveGeomDatas(
                event.data.key,
                event.data.geomDatas,
                event.data.geomIndexOffset,
                event.data.geomsRange
            );
        };
        return worker;
    }

    __terminateWorkers() {
        for (let worker of this.__workers)
            worker.terminate();
        this.__workers = [];
    }

    setExpectedNumGeoms(expectedNumGeoms) {
        this.__expectedNumGeoms = expectedNumGeoms;
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
            (data) => {
                this.loadBin(data);
            },
            (statusText) => {
                console.warn(statusText);
            }
        );
    }

    readBinaryBuffer(key, buffer) {
        let reader = new BinReader(buffer, 0, isMobileDevice());
        let numGeoms = reader.loadUInt32();
        let geomIndexOffset = reader.loadUInt32();
        this.__streamInfos[key] = {
            total: numGeoms,
            done: 0
        };
        this.__numGeoms += numGeoms;
        if(numGeoms == 0) {
            this.streamFileParsed.emit(1);
            return numGeoms;
        }
        if (this.__expectedNumGeoms == 0) {
            this.__expectedNumGeoms = this.__numGeoms;
        }

        let toc = reader.loadUInt32Array(numGeoms);
        // TODO: Use SharedArrayBuffer once available.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer 
        let numGeomsPerWorkload = Math.max(1, Math.floor((numGeoms / window.navigator.hardwareConcurrency) + 1));


        let offset = 0;
        while (offset < numGeoms) {
            let geomsRange;
            let bufferSlice;
            let bufferSlice_start = toc[offset];
            let bufferSlice_end;
            if (offset + numGeomsPerWorkload >= numGeoms) {
                geomsRange = [offset, numGeoms];
                bufferSlice_end = buffer.byteLength;
            } else {
                geomsRange = [offset, offset + numGeomsPerWorkload];
                bufferSlice_end = toc[geomsRange[1]];
            }
            bufferSlice = buffer.slice(bufferSlice_start, bufferSlice_end);
            offset += numGeomsPerWorkload;

            //////////////////////////////////////////////
            // Multi Threaded Parsing
            this.__workers[this.__nextWorker].postMessage({
                key,
                toc,
                geomIndexOffset,
                geomsRange,
                isMobileDevice: reader.isMobileDevice,
                bufferSlice,
            }, [bufferSlice]);
            this.__nextWorker = (this.__nextWorker + 1) % this.__workers.length;
            //////////////////////////////////////////////
            // Main Threaded Parsing
            // parseGeomsBinary(
            //     key,
            //     toc,
            //     geomIndexOffset,
            //     geomsRange,
            //     reader.isMobileDevice,
            //     bufferSlice,
            //     (data, transferables)=>{
            //         this.__recieveGeomDatas(
            //             data.key, 
            //             data.geomDatas, 
            //             data.geomIndexOffset, 
            //             data.geomsRange
            //             );
            //     });


        }
        return numGeoms;
    }

    __recieveGeomDatas(key, geomDatas, geomIndexOffset, geomsRange) {

        // We are storing a subset of the geoms from a binary file
        // which is a subset of the geoms in an asset.
        // geomIndexOffset: the offset of the file geoms in the asset.
        // geomsRange: the range of geoms in the bin file.
        let offset = geomIndexOffset + geomsRange[0];
        let storedRange = [offset, geomIndexOffset + geomsRange[1]];

        for (let i = 0; i < geomDatas.length; i++) {
            let geomData = geomDatas[i];
            if (!geomData.type)
                continue;
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

        let loaded = storedRange[1] - storedRange[0];

        // Each file in the stream has its own counter for the number of 
        // geoms, and once each stream file finishes parsing, we fire a signal.
        let streamInfo = this.__streamInfos[key];
        streamInfo.done += loaded;
        // console.log(key + " Loaded:" + streamInfo.done + " of :" + streamInfo.total);
        if (streamInfo.done == streamInfo.total){
            this.streamFileParsed.emit(1);
        }

        // Once all the geoms from all the files are loaded and parsed
        // fire the loaded signal.
        this.__loaded += loaded;
        if (this.__loaded == this.__expectedNumGeoms) {
            // console.log("GeomLibrary Loaded:" + this.__name + " count:" + geomDatas.length + " loaded:" + this.__loaded);
            if(this.__workers.length > 0){
                this.__terminateWorkers();
                this.loaded.emit();
            }
        }
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