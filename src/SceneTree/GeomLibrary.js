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
    parseGeomsBinary
} from './Geometry/GeomParserWorker.js';
import {
    MeshProxy
} from './Geometry/MeshProxy.js';

class GeomLibrary {
    constructor() {
        this.loaded = new Signal();
        this.geoms = [];
    }

    get numGeoms() {
        return this.geoms.length;
    }

    getGeom(index) {
        if(index >= this.geoms.length){
            console.warn("Geom index invalid:" + index);
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
        let toc = reader.loadUInt32Array(numGeoms);
        /*
        let printProgress = numGeoms > 500;
        let progress = 0;
        let geomsRange = [this.geoms.length, this.geoms.length+numGeoms];
        for (let i = 0; i < numGeoms; i++) {

            let geomReader = new BinReader(reader.data, toc[i], reader.isMobileDevice);
            let className = geomReader.loadStr();
            let geom;
            switch (className) {
                case 'Points':
                    geom = new Points();
                    break;
                case 'Lines':
                    geom = new Lines();
                    break;
                case 'Mesh':
                    geom = new Mesh();
                    break;
                default:
                    throw ("Unsupported Geom type:" + className);
            }
            geom.readBinary(geomReader);
            this.geoms.push(geom);

            if(printProgress){
                // Avoid printing too much as it slows things down.
                let curr = Math.round((i / numGeoms) * 100);
                if(curr != progress){
                    progress = curr;
                    console.log("Loading Geoms: " + progress + "%");
                }
            }
        }*/

        // TODO: Use SharedArrayBuffer once available.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer 
        let dataSlice = data.slice(toc[0]);
        let geomsRange = [this.geoms.length, this.geoms.length+numGeoms];
        let geomDatas = parseGeomsBinary(dataSlice, toc, geomsRange, reader.isMobileDevice);
        for (let geomData of geomDatas) {
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
            this.geoms.push(proxy);
        }
        this.loaded.emit(geomsRange);
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