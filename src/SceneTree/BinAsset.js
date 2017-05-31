import {
    Signal,
    isMobileDevice
} from '../Math';
import {
    AssetItem
} from './AssetItem.js';
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

    readBinaryBuffer(buffer) {
        return this.readBinary(new BinReader(buffer, 0, isMobileDevice()));
    }

    loadURL(filePath) {

        let numGeomsFiles = 1;
        this.__resourceLoader.addWork(4); // first geom file (load + parse + extra)

        // Load the tree file. This file contains
        // the scene tree of the asset, and also
        // tells us how many geom files will need to be loaded.
        this.__resourceLoader.loadResource(filePath,
            (entries) => {
                let treeData = entries[Object.keys(entries)[0]];
                numGeomsFiles = this.readBinaryBuffer(treeData.buffer);
                // add the work for the rest of the geom files....
                // (load + parse)
                this.__resourceLoader.addWork((numGeomsFiles-1) * 4); 
                loadNextGeomFile();
                this.loaded.emit();
            });

        // Now load the geom files in sequence, parsing and loading
        // the next..
        let geomFileID = 0;
        let loadNextGeomFile = ()=>{
            if (geomFileID < numGeomsFiles) {
                let nextGeomFileName = filePath.split('.')[0] + geomFileID + '.vlageoms';
                if (this.__resourceLoader.resourceAvailable(nextGeomFileName))
                    loadGeomsfile(nextGeomFileName);
            }
        }
        let loadGeomsfile = (geomsResourceName) => {
            geomFileID++;
            this.__resourceLoader.loadResource(geomsResourceName,
                (entries) => {
                    let geomsData = entries[Object.keys(entries)[0]];
                    this.__geoms.readBinaryBuffer(geomsResourceName, geomsData.buffer);
                    loadNextGeomFile();
                },
                false);
                // Note: Don't add load work as we already pre-added it at the begining
                // and after the Tree file was loaded...
        }

        let geomFileName = filePath.split('.')[0] + geomFileID + '.vlageoms';
        loadGeomsfile(geomFileName);

        // To enture tha the resource loader konws when 
        // parsing is done, we listen to the GeomLibrary streamFileLoaded
        // signal. This is fired every time a file in the stream is finshed parsing.
        this.__geoms.streamFileParsed.connect((fraction)=>{
            // A chunk of geoms are now parsed, so update the resource loader.
            this.__resourceLoader.addWorkDone(fraction);
        })
    }
};

// export default BinAsset;
export {
    BinAsset
};