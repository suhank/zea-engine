
import {
    Signal,
    Vec2
} from '../Math';
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
    constructor(name, resourceLoader) {
        super(name, resourceLoader);
        this.__name = name;
        this.__resourceLoader = resourceLoader;
        this.__geomLibrary = new GeomLibrary(this.__name);
        this.__materials = new MaterialLibrary(this.__resourceLoader);
        this.__atlasSize = new Vec2();

        let fileParam = this.addParameter(new FilePathParameter('FilePath', this.__resourceLoader));
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

    getLightmapSize() {
        return this.__atlasSize;
    }
    // Note: the atlas can be used for more than just lightmaps.
    getAtlasSize() {
        return this.__atlasSize;
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

};

export {
    AssetItem
};
