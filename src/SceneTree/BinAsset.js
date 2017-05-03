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
    constructor(name = undefined) {
        super(name);
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

    loadURL(fileName, resources) {

        let numGeomsFiles = 1;
        let unpackBin = (data) => {
            let unpack = new Unpack(data);
            let entries = unpack.getEntries();
            if (!entries[0].name.endsWith('.bin'))
                throw ("Invalid Asset resource");
            let binData = unpack.decompress(entries[0].name);
            unpack.close();
            return binData;
        }

        loadBinfile(
            resources[fileName],
            (path, data) => {
                let start = performance.now();
                let treeData = unpackBin(data);
                let unpacked = performance.now();
                numGeomsFiles = this.readBinary(new BinReader(treeData.buffer, 0, isMobileDevice()));
                console.log(path+ " Unpack:" + (unpacked - start).toFixed(2) + " Parse:" + (performance.now() - unpacked).toFixed(2));
                //async.decAsyncCount();
                this.loaded.emit();
            },
            () => {

            },
            this);

        let geomFileID = 0;
        let loadGeomsfile = (url)=>{
            loadBinfile(
                url,
                (path, data) => {
                    let start = performance.now();
                    let geomsData = unpackBin(data);
                    let unpacked = performance.now();
                    this.__geoms.readBinary(geomsData.buffer);
                    console.log(url+ " Unpack:" + (unpacked - start).toFixed(2) + " Parse:" + (performance.now() - unpacked).toFixed(2));
                    
                    numGeomsFiles--;
                    if(numGeomsFiles > 0) {
                        geomFileID++;
                        let nextGeomFileName = fileName.split('.')[0] + geomFileID + '.geoms';
                        if(nextGeomFileName in resources)
                           loadGeomsfile(resources[nextGeomFileName]);
                    }
                },
                () => {

                },
                this);

        }

        let geomFileName = fileName.split('.')[0] + geomFileID + '.geoms';
        loadGeomsfile(resources[geomFileName]);
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