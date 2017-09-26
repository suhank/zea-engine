
import {
    isMobileDevice
} from '../BrowserDetection.js';
import {
    AssetItem
} from './AssetItem.js';
import {
    GeomItem
} from './GeomItem.js';
import {
    BinReader
} from './BinReader.js';

class VLAAsset extends AssetItem {
    constructor(name, resourceLoader) {
        super(name, resourceLoader);
    }

    readBinary(reader, flags) {
        let numGeomsFiles = reader.loadUInt32();

        this.__materials.readBinary(reader, flags);

        super.readBinary(reader, flags, this);

        this.__atlasSize = reader.loadFloat32Vec2();
        if(reader.remainingByteLength == 4){
            this.__geomLibrary.setExpectedNumGeoms(reader.loadUInt32());
        }
        this.loaded.emit();
        return numGeomsFiles;
    }

    readBinaryBuffer(buffer) {
        return this.readBinary(new BinReader(buffer, 0, isMobileDevice()));
    }

    __loadURL(url, filePath){

        let numGeomsFiles = 1;
        this.__resourceLoader.addWork(filePath+'geoms', 4); // first geom file (load + parse + extra)

        // Load the tree file. This file contains
        // the scene tree of the asset, and also
        // tells us how many geom files will need to be loaded.
        this.__resourceLoader.loadResource(filePath,
            (entries) => {
                let treeData = entries[Object.keys(entries)[0]];
                numGeomsFiles = this.readBinaryBuffer(treeData.buffer);
                this.__resourceLoader.freeData(treeData.buffer);
                console.log("Asset:" +this.getName() + " numGeomsFiles:" + numGeomsFiles);
                // add the work for the rest of the geom files....
                // (load + parse)
                this.__resourceLoader.addWork(filePath+'geoms', (numGeomsFiles - 1) * 4);
                loadNextGeomFile();
            });

        // Now load the geom files in sequence, parsing and loading
        // the next..
        let geomFileID = 0;
        let loadNextGeomFile = () => {
            if (geomFileID < numGeomsFiles) {
                let nextGeomFileName = filePath.split('.')[0] + geomFileID + '.vlageoms';
                if (this.__resourceLoader.resourceAvailable(nextGeomFileName))
                    loadGeomsfile(nextGeomFileName);
            }
        }
        let loadGeomsfile = (geomsFileName) => {
            geomFileID++;
            this.__resourceLoader.loadResource(geomsFileName,
                (entries) => {
                    let geomsData = entries[Object.keys(entries)[0]];
                    this.__geomLibrary.readBinaryBuffer(geomsFileName, geomsData.buffer);
                    this.__resourceLoader.freeData(geomsData.buffer);
                    loadNextGeomFile();
                },
                false); // <----
            // Note: Don't add load work as we already pre-added it at the begining
            // and after the Tree file was loaded...
        }

        let geomFileName = filePath.split('.')[0] + geomFileID + '.vlageoms';
        loadGeomsfile(geomFileName);

        // To enture tha the resource loader konws when 
        // parsing is done, we listen to the GeomLibrary streamFileLoaded
        // signal. This is fired every time a file in the stream is finshed parsing.
        this.__geomLibrary.streamFileParsed.connect((fraction) => {
            // A chunk of geoms are now parsed, so update the resource loader.
            this.__resourceLoader.addWorkDone(filePath+'geoms', fraction);
        })
    }
};

export {
    VLAAsset
};