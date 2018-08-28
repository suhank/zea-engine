
import {
    Vec2
} from '../Math';
import {
    Signal
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
import {
    GeomLibrary
} from './GeomLibrary.js';
import {
    MaterialLibrary
} from './MaterialLibrary.js';


function VLADataLoader(asset, fileParam, onDone, onGeomsLoaded) {

    const geomLibrary = new GeomLibrary();
    const materials = new MaterialLibrary();
    let atlasSize = new Vec2();


    asset.getGeometryLibrary = () => {
        return geomLibrary;
    }

    asset.getMaterialLibrary = () => {
        return materials;
    }

    asset.getLightmapSize = () => {
        return atlasSize;
    }
    // Note: the atlas can be used for more than just lightmaps.
    asset.getAtlasSize = () => {
        return atlasSize;
    }

    asset.getLightmapPath = (lightmapName, lightmapLOD) => {
        const stem = fileParam.getStem();
        const lightmapPath = fileParam.getFileFolder() + stem + "_" + lightmapName + "_Lightmap" + lightmapLOD + ".vlh";
                
        return lightmapPath;
    }



    const readBinary = (reader, context) => {
        if(!context) 
            context = {};
        context.assetItem = asset;

        let numGeomsFiles = reader.loadUInt32();

        materials.readBinary(reader, context);

        asset.readBinary(reader, context);

        atlasSize = reader.loadFloat32Vec2();
        if(reader.remainingByteLength != 4){
            throw("File needs to be re-exported:" + this.getParameter('FilePath').getValue());
        }
        // Perpare the geom library for loading
        // This helps with progress bars, so we know how many geoms are coming in total.
        geomLibrary.setNumGeoms(reader.loadUInt32());
        
        // this.loaded.emit();
        onDone(); 
        return numGeomsFiles;
    }

    const readBinaryBuffer = (buffer) => {
        return readBinary(new BinReader(buffer, 0, SystemDesc.isMobileDevice));
    }

    const loadBinFile = () => {

        const file = fileParam.getFileDesc();
        if(!file)
            return;

        const fileId = fileParam.getValue();
        const stem = fileParam.getStem();
        const url = fileParam.getURL();
        let numGeomsFiles = 0;

        // TODO: one day the resourcecs tree could include meta data to indicate how
        // manhy files make up the geom stream. 

        // Load the tree file. This file contains
        // the scene tree of the asset, and also
        // tells us how many geom files will need to be loaded.
        resourceLoader.loadResource(fileId,
            (entries) => {
                let treeData = entries[Object.keys(entries)[0]];
                numGeomsFiles = readBinaryBuffer(treeData.buffer);
                resourceLoader.freeData(treeData.buffer);

                if(numGeomsFiles == 0 && Object.keys(entries)[1].endsWith('geoms')) {
                    resourceLoader.addWork(fileId+'geoms', 1); // (load + parse + extra)
                    let geomsData = entries[Object.keys(entries)[1]];
                    geomLibrary.readBinaryBuffer(fileId, geomsData.buffer);
                    resourceLoader.freeData(geomsData.buffer);
                }
                else {
                    // add the work for the the geom files....
                    resourceLoader.addWork(fileId+'geoms', 4*numGeomsFiles); // (load + parse + extra)
                    loadNextGeomFile();
                }
            });

        // Now load the geom files in sequence, parsing and loading
        // the next..
        let geomFileID = 0;
        const loadNextGeomFile = () => {
            if (geomFileID < numGeomsFiles) {
                const folder = fileParam.getFileFolderPath()
                const nextGeomFileName = folder + stem + geomFileID + '.vlageoms';
                const fileId = resourceLoader.resolveFilePathToId(nextGeomFileName);
                // console.log("loadNextGeomFile:" + nextGeomFileName);
                if (resourceLoader.resourceAvailable(fileId))
                    loadGeomsfile(fileId);
                else {
                    throw("VLA Geoms file not found:" + nextGeomFileName)
                }
            }
            else {
                onGeomsLoaded();
            }
        }
        const loadGeomsfile = (fileId) => {
            geomFileID++;
            resourceLoader.loadResource(fileId,
                (entries) => {
                    let geomsData = entries[Object.keys(entries)[0]];
                    geomLibrary.readBinaryBuffer(fileId, geomsData.buffer);
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
        geomLibrary.streamFileParsed.connect((fraction) => {
            // A chunk of geoms are now parsed, so update the resource loader.
            resourceLoader.addWorkDone(fileId+'geoms', fraction);
        });
    }

    loadBinFile();
    fileParam.valueChanged.connect(loadBinFile);
}

AssetItem.registerDataLoader('.vla', VLADataLoader);

class VLAAsset extends AssetItem {
    constructor(name) {
        super(name);
        this.loaded.setToggled(false);
        // const binfileParam = this.addParameter(new Visualive.FilePathParameter('BinFilePath'));

        this.__loader = VLADataLoader;
        this.__loader(this, binfileParam, ()=>{
            this.loaded.emit();
        },
        ()=>{
            this.geomsLoaded.emit();
        });
    }

};

export {
    VLAAsset
};