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

    loadURL(filePath) {

        let numGeomsFiles = 1;
        this.__resourceLoader.loadResources(filePath, 
            (path, entries) => {
                let treeData = entries[Object.keys(entries)[0]];
                numGeomsFiles = this.readBinary(new BinReader(treeData.buffer, 0, isMobileDevice()));
                this.loaded.emit();
            });

        let geomFileID = 0;
        let loadGeomsfile = (geomsResourceName)=>{
            this.__resourceLoader.loadResources(geomsResourceName, 
                (path, entries) => {
                    let geomsData = entries[Object.keys(entries)[0]];
                    this.__geoms.readBinary(geomsData.buffer);
                    numGeomsFiles--;
                    if(numGeomsFiles > 0) {
                        geomFileID++;
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