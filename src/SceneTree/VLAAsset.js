
import {
    Signal,
    Async
} from '../Utilities';
import {
    SystemDesc
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
import {
    resourceLoader
} from './ResourceLoader.js';

class VLAAsset extends AssetItem {
    constructor(name) {
        super(name);
        this.allPartsLoaded = new Signal();
    }

    readBinary(reader, flags) {
        let numGeomsFiles = reader.loadUInt32();

        this.__materials.readBinary(reader, flags);

        super.readBinary(reader, flags, this);

        this.__atlasSize = reader.loadFloat32Vec2();
        if(reader.remainingByteLength != 4){
            throw("File needs to be re-exported:" + this.getParameter('FilePath').getValue());
        }
        // Perpare the geom library for loading
        // This helps with progress bars, so we know how many geoms are coming in total.
        this.__geomLibrary.setNumGeoms(reader.loadUInt32());
        
        this.loaded.emit();
        return numGeomsFiles;
    }

    readBinaryBuffer(buffer) {
        return this.readBinary(new BinReader(buffer, 0, SystemDesc.isMobileDevice));
    }

    __loadURL(url, filePath){
        let async = new Async();
        async.incAsyncCount(2);
        async.ready.connect(()=>{
            this.allPartsLoaded.emit(); 
        });
        // const parts = filePath.split('/');
        // const stem = parts[parts.length-1].split('.')[0];
        const stem = filePath.substring(0, filePath.lastIndexOf('.'));
        let numGeomsFiles = 0;

        // TODO: one day the resourcecs tree could include meta data to indicate how
        // manhy files make up the geom stream. 

        // Load the tree file. This file contains
        // the scene tree of the asset, and also
        // tells us how many geom files will need to be loaded.
        resourceLoader.loadResource(filePath,
            (entries) => {
                let treeData = entries[Object.keys(entries)[0]];
                numGeomsFiles = this.readBinaryBuffer(treeData.buffer);
                resourceLoader.freeData(treeData.buffer);

                if(numGeomsFiles == 0 && Object.keys(entries)[1].endsWith('geoms')) {
                    resourceLoader.addWork(filePath+'geoms', 1); // (load + parse + extra)
                    let geomsData = entries[Object.keys(entries)[1]];
                    this.__geomLibrary.readBinaryBuffer(filePath, geomsData.buffer);
                    resourceLoader.freeData(geomsData.buffer);
                }
                else {
                    // add the work for the the geom files....
                    resourceLoader.addWork(filePath+'geoms', 4*numGeomsFiles); // (load + parse + extra)
                    loadNextGeomFile();
                }

                async.decAsyncCount();
            });

        // Now load the geom files in sequence, parsing and loading
        // the next..
        let geomFileID = 0;
        let loadNextGeomFile = () => {
            if (geomFileID < numGeomsFiles) {
                let nextGeomFileName = stem + geomFileID + '.vlageoms';
                // console.log("loadNextGeomFile:" + nextGeomFileName);
                if (resourceLoader.resourceAvailable(nextGeomFileName))
                    loadGeomsfile(nextGeomFileName);
            }
        }
        let loadGeomsfile = (geomsFileName) => {
            geomFileID++;
            resourceLoader.loadResource(geomsFileName,
                (entries) => {
                    let geomsData = entries[Object.keys(entries)[0]];
                    this.__geomLibrary.readBinaryBuffer(geomsFileName, geomsData.buffer);
                    resourceLoader.freeData(geomsData.buffer);
                    loadNextGeomFile();
                },
                false); // <----
            // Note: Don't add load work as we already pre-added it at the begining
            // and after the Tree file was loaded...
        }

        // To ensure that the resource loader knows when 
        // parsing is done, we listen to the GeomLibrary streamFileLoaded
        // signal. This is fired every time a file in the stream is finshed parsing.
        this.__geomLibrary.streamFileParsed.connect((fraction) => {
            // A chunk of geoms are now parsed, so update the resource loader.
            resourceLoader.addWorkDone(filePath+'geoms', fraction);
        });
        this.__geomLibrary.loaded.connect(() => {
            async.decAsyncCount();
        });
    }
};

export {
    VLAAsset
};