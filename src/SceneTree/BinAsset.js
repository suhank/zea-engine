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

    fromJSON(j, flags = 0) {
        // We want to explicitly control the transform of the asset tree, 
        // so here we cache and then reset the value, because fromJSON will
        // load values into it. 
        let localXfo = this.localXfo.clone();
        super.fromJSON(j, flags);
        this.localXfo = localXfo;
    }

    loadURL(filePath) {

        let numGeomsFiles = 1;
        this.__resourceLoader.loadResources(filePath, 
            (path, entries) => {
                let treeData = entries[Object.keys(entries)[0]];
                numGeomsFiles = this.readBinary(new BinReader(treeData.buffer, 0, isMobileDevice()));
                this.loaded.emit();
            });

        let geomFileID = 0;
        let loadGeomsfile = (url)=>{
            this.__resourceLoader.loadResources(url, 
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

    loadURLs(fileUrl) {

        let jsonFileData, binFileData;
        let loadCount = 2;

        let fileLoaded = ()=>{
            loadCount--;
            if(loadCount>0)
                return;

            let start = performance.now();

            /////////////////////////////////
            // Parse the data.
            this.__geoms.readBinary(new BinReader(binFileData));
            this.fromJSON(JSON.parse(jsonFileData));

            console.log("Parse:" + (performance.now() - start).toFixed(2));

            this.loaded.emit();
        };

        loadTextfile(
            fileUrl+'.json',
            (path, data) => {
                jsonFileData = data;
                fileLoaded();
            },
            () => {

            },
            this);

        loadBinfile(
            fileUrl+'.bin',
            (path, data) => {
                binFileData = data;
                fileLoaded();
            },
            () => {

            },
            this);
    }
};

export {
    BinAsset
};