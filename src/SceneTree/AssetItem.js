
import {
    isMobileDevice
} from '../BrowserDetection.js';
import {
    Signal,
    Vec2
} from '../Math';
import {
    TreeItem,
    LOADFLAGS_SKIP_MATERIALS
} from './TreeItem.js';
import {
    GeomLibrary
} from './GeomLibrary.js';
import {
    GeomItem
} from './GeomItem.js';
import {
    MaterialLibrary
} from './MaterialLibrary.js';
import {
    BinReader
} from './BinReader.js';

class AssetItem extends TreeItem {
    constructor(name, resourceLoader) {
        super(name, resourceLoader);
        this.__name = name;
        this.__resourceLoader = resourceLoader;
        this.__geomLibrary = new GeomLibrary();
        this.__materials = new MaterialLibrary(this.__resourceLoader);

        this.lightmapName = 'Default';
        
        this.loaded = new Signal();
    }

    getGeometryLibrary() {
        return this.__geomLibrary;
    }

    getMaterialLibrary() {
        return this.__materials;
    }

    //////////////////////////////////////////
    // Persistence

    // toJSON(flags = 0) {
    //     let j = super.toJSON(flags);
    //     j['materialLibrary'] = this.__materials.toJSON(flags);
    //     return j;
    // }

    // fromJSON(j, flags = 0) {
    //     if ((flags & LOADFLAGS_SKIP_MATERIALS) == 0)
    //         this.__materials.fromJSON(j['materialLibrary'], flags);
    //     super.fromJSON(j, flags, this);

    //     // Note: the Scene owns the lightmaps. 
    //     // An AssetInstance might have a Lightmap name and an offset value. 
    //     //this.__lightmap.fromJSON(j);
    //     //this.__propagateLightmap();
    // }


    readBinary(reader, flags) {
        let numGeomsFiles = reader.loadUInt32();

        this.__materials.readBinary(reader, flags);

        super.readBinary(reader, flags, this);

        this.lightmapCoordsOffset = reader.loadFloat32Vec2();
        let numGeoms = 0;
        if(reader.remainingByteLength == 4)
            numGeoms = reader.loadUInt32();
        return [numGeomsFiles, numGeoms];
    }

    readBinaryBuffer(buffer) {
        return this.readBinary(new BinReader(buffer, 0, isMobileDevice()));
    }

    loadURL(resourcePath) {

        let numGeomsFiles = 1;
        this.__resourceLoader.addWork(resourcePath, 4); // first geom file (load + parse + extra)

        // Load the tree file. This file contains
        // the scene tree of the asset, and also
        // tells us how many geom files will need to be loaded.
        this.__resourceLoader.loadResource(resourcePath,
            (entries) => {
                let treeData = entries[Object.keys(entries)[0]];
                let res = this.readBinaryBuffer(treeData.buffer);
                numGeomsFiles = res[0];
                let numGeoms = res[1];
                console.log("Asset:" +this.name + " numGeomsFiles:" + numGeomsFiles + " numGeoms:" + numGeoms);
                this.__geomLibrary.setExpectedNumGeoms(numGeoms);
                // add the work for the rest of the geom files....
                // (load + parse)
                this.__resourceLoader.addWork(resourcePath, (numGeomsFiles - 1) * 4);
                loadNextGeomFile();
                this.loaded.emit();
            });

        // Now load the geom files in sequence, parsing and loading
        // the next..
        let geomFileID = 0;
        let loadNextGeomFile = () => {
            if (geomFileID < numGeomsFiles) {
                let nextGeomFileName = resourcePath.split('.')[0] + geomFileID + '.vlageoms';
                if (this.__resourceLoader.resourceAvailable(nextGeomFileName))
                    loadGeomsfile(nextGeomFileName);
            }
        }
        let loadGeomsfile = (geomsResourceName) => {
            geomFileID++;
            this.__resourceLoader.loadResource(geomsResourceName,
                (entries) => {
                    let geomsData = entries[Object.keys(entries)[0]];
                    this.__geomLibrary.readBinaryBuffer(geomsResourceName, geomsData.buffer);
                    loadNextGeomFile();
                },
                false);
            // Note: Don't add load work as we already pre-added it at the begining
            // and after the Tree file was loaded...
        }

        let geomFileName = resourcePath.split('.')[0] + geomFileID + '.vlageoms';
        loadGeomsfile(geomFileName);

        // To enture tha the resource loader konws when 
        // parsing is done, we listen to the GeomLibrary streamFileLoaded
        // signal. This is fired every time a file in the stream is finshed parsing.
        this.__geomLibrary.streamFileParsed.connect((fraction) => {
            // A chunk of geoms are now parsed, so update the resource loader.
            this.__resourceLoader.addWorkDone(resourcePath, fraction);
        })
    }
};

export {
    AssetItem
};
//export default AssetItem;