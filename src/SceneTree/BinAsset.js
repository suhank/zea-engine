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
        this.__resourceLoader.loadResource(filePath,
            (entries) => {
                let treeData = entries[Object.keys(entries)[0]];
                numGeomsFiles = this.readBinaryBuffer(treeData.buffer);
                loadNextGeomFile();
                this.loaded.emit();
            });

        let geomFileID = 0;
        let loadNextGeomFile = ()=>{
            if (geomFileID < numGeomsFiles) {
                let nextGeomFileName = filePath.split('.')[0] + geomFileID + '.vlageoms';
                if (this.__resourceLoader.resourceAvailable(nextGeomFileName))
                    loadGeomsfile(nextGeomFileName);
            }
        }
        let loadGeomsfile = (geomsResourceName) => {
            this.__resourceLoader.loadResource(geomsResourceName,
                (entries) => {
                    let geomsData = entries[Object.keys(entries)[0]];
                    this.__geoms.readBinaryBuffer(geomsData.buffer);
                    geomFileID++;
                    loadNextGeomFile();
                },
                () => {

                },
                this);
        }

        let geomFileName = filePath.split('.')[0] + geomFileID + '.vlageoms';
        loadGeomsfile(geomFileName);
    }
};

// export default BinAsset;
export {
    BinAsset
};