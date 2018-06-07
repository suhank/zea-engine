
import {
    Vec2
} from '../Math';
import {
    Signal
} from '../Utilities';
import {
    FilePathParameter
} from './Parameters';
import {
    TreeItem,
    LOADFLAGS_SKIP_MATERIALS
} from './TreeItem.js';
import {
    GeomLibrary
} from './GeomLibrary.js';
import {
    MaterialLibrary
} from './MaterialLibrary.js';

class AssetItem extends TreeItem {
    constructor(name) {
        super(name);
        this.__name = name;
        this.__geomLibrary = new GeomLibrary(this.__name);
        this.__materials = new MaterialLibrary();
        this.__atlasSize = new Vec2();


        let fileParam = this.addParameter(new FilePathParameter('FilePath'));
        fileParam.valueChanged.connect(()=>{
            this.loaded.untoggle();
            let filePath = fileParam.getValue()
            let url = fileParam.getURL();
            this.__loadURL(url, filePath);
        });

        this.loaded = new Signal(true);
    }

    __loadURL(url, filePath) {
        console.error("TODO: Implement me... url:" +url);
    }

    getGeometryLibrary() {
        return this.__geomLibrary;
    }

    getMaterialLibrary() {
        return this.__materials;
    }



    //////////////////////////////////////////
    // Groups

    getLightmapSize() {
        return this.__atlasSize;
    }
    // Note: the atlas can be used for more than just lightmaps.
    getAtlasSize() {
        return this.__atlasSize;
    }

    //////////////////////////////////////////
    // Persistence

    toJSON(flags = 0) {
        let j = super.toJSON(flags);
        return j;
    }

    fromJSON(j, flags = 0) {
        if(j.params && j.params.FilePath) {
            const filePathJSON = j.params.FilePath;
            delete j.params.FilePath;
            const onload = ()=>{
              this.loaded.disconnect(onload);
              super.fromJSON(j, flags, this);
            }
            this.loaded.untoggle();
            this.loaded.connect(onload)
            this.getParameter('FilePath').fromJSON(filePathJSON);
        }
    }

};

export {
    AssetItem
};
