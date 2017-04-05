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

class GeomLibrary {
    constructor() {
        this.loaded = new Signal();
        this.geoms = [];
    }

    get numGeoms() {
        return this.geoms.length;
    }

    getGeom(index) {
        return this.geoms[index];
    }

    loadURL(fileUrl) {
        let onLoad = this.loadBin;
        loadBinfile(
            fileUrl,
            function(fileUrl, data) {
                this.loadBin(new BinReader(data));
            },
            function(statusText) {
                console.warn(statusText);
            },
            this
        );
    }

    loadBin(reader) {
        let numGeoms = reader.loadUInt32();
        let toc = reader.loadUInt32Array(numGeoms);
        let printProgress = numGeoms > 1000;
        let progress = 0;
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
            geom.loadBin(geomReader);
            this.geoms.push(geom);

            if(printProgress){
                // Avoid printing too much as it slows things down.
                let curr = Math.round((i / numGeoms) * 100);
                if(curr != progress){
                    progress = curr;
                    console.log("Loading Geoms: " + progress + "%");
                }
            }
        }
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