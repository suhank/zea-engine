import {
    Signal,
    JSON_stringify_fixedPrecision
} from '../Math';
import {
    TreeItem
} from './TreeItem.js';
import {
    BinAsset
} from './BinAsset.js';
import {
    Sphere
} from './Geometry/Shapes/Sphere.js';
import {
    GeomItem
} from './GeomItem.js';
import {
    SelectionManager
} from './SelectionManager.js';
import {
    ResourceLoader
} from './ResourceLoader.js';


class Scene {
    constructor(resources) {

        this.cameras = [];
        this.__root = new TreeItem("root");
        this.__envMap = undefined;
        this.__lightmaps = {};
        this.__selectionManager = new SelectionManager();
        this.__resourceLoader = new ResourceLoader(resources);

        this.commonResourcesLoaded = new Signal(true);

        if (this.__resourceLoader.resourceAvailable('commonResources/Resources.vlr')) {
            this.__resourceLoader.loadResources('commonResources/Resources.vlr',
                (path, entries) => {

                    let viveAsset = new BinAsset("ViveResources");
                    viveAsset.getMaterialLibary().forceMaterialType('FlatMaterial');
                    viveAsset.getGeometryLibary().readBinaryBuffer(entries['Vive0.geoms'].buffer);
                    viveAsset.readBinaryBuffer(entries['Vive.tree'].buffer);
                    entries['viveAsset'] = viveAsset;

                    let sphere = new Sphere('VRControllerTip', 0.015);
                    entries['VRControllerTip'] = sphere;

                    this.commonResourcesLoaded.emit(entries);
                });
        }
    }

    getRoot() {
        return this.__root;
    }

    getResourceLoader() {
        return this.__resourceLoader;
    }

    // getCommonResources() {
    //     // let aval = this.__resourceLoader.resourceAvailable('commonResources/Resources.vlr');
    //     return new Promise((resolve, reject) => {
    //         if (this.__resourceLoader.resourceAvailable('commonResources/Resources.vlr')) {
    //             this.__resourceLoader.loadResources('commonResources/Resources.vlr',
    //                 (path, entries) => {

    //                     let viveAsset = new BinAsset("ViveResources");
    //                     viveAsset.getMaterialLibary().forceMaterialType('FlatMaterial');
    //                     viveAsset.getGeometryLibary().readBinaryBuffer(entries['Vive.geoms'].buffer);
    //                     viveAsset.readBinaryBuffer(entries['Vive.tree'].buffer);
    //                     entries['viveAsset'] = viveAsset;

    //                     let sphere = new Sphere('VRControllerTip', 0.015);
    //                     entries['VRControllerTip'] = sphere;

    //                     resolve(entries);
    //                 });
    //         } else {
    //             reject(Error("Resources not provided"));
    //         }
    //     });
    // }

    getEnvMap() {
        return this.__envMap;
    }

    setEnvMap(envMap) {
        this.__envMap = envMap;
    }

    getLightMap(name) {
        return this.__lightmaps[name];
    }

    setLightMap(name, lightmap) {
        this.__lightmaps[name] = lightmap;
    }

    getLightMaps() {
        return this.__lightmaps;
    }

    getCamera(index = 0) {
        return this.cameras[index];
    }

    getSelectionManager() {
        return this.__selectionManager;
    }

    fromJSON(json) {

    }

    toJSON(json) {
        return {
            "root": this.__root.toJSON(),
            "boundingBox": this.boundingBox.toJSON(),
        }
    }

    toString() {
        return JSON_stringify_fixedPrecision(this.toJSON(), 2)
    }
};

// export default Scene;
export {
    Scene
};