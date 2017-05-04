import {
    isMobileDevice,
    Async,
    Signal
} from '../Math';
import {
    AssetItem
} from './AssetItem.js';

import {
    loadTextfile,
    loadBinfile
} from './Utils.js';

import {
    BinReader
} from './BinReader.js';


class BinAsset extends AssetItem {
    constructor(name, resourceLoader) {
        super(name);
        this.__resourceLoader = resourceLoader;
        this.loaded = new Signal();
    }

    //////////////////////////////////////////
    // Persistence

    readBinaryBuffer(buffer){
        return this.readBinary(new BinReader(buffer, 0, isMobileDevice()));
    }

    loadURL(filePath) {

        let numGeomsFiles = 1;
        this.__resourceLoader.loadResources(filePath, 
            (path, entries) => {
                let treeData = entries[Object.keys(entries)[0]];
                numGeomsFiles = this.readBinaryBuffer(treeData.buffer);
                this.loaded.emit();
            });

        let geomFileID = 0;
        let loadGeomsfile = (geomsResourceName)=>{
            this.__resourceLoader.loadResources(geomsResourceName, 
                (path, entries) => {
                    let geomsData = entries[Object.keys(entries)[0]];
                    this.__geoms.readBinaryBuffer(geomsData.buffer);
                    geomFileID++;
                    if(geomFileID < numGeomsFiles) {
                        let nextGeomFileName = filePath.split('.')[0] + geomFileID + '.geoms';
                        if(this.__resourceLoader.resourceAvailable(nextGeomFileName))
                           loadGeomsfile(nextGeomFileName);
                    }
                },
                () => {

                },
                this);
        }

        let geomFileName = filePath.split('.')[0] + geomFileID + '.geoms';
        loadGeomsfile(geomFileName);
    }
};

export {
    BinAsset
};