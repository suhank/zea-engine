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
import {
    Lightmap, LightmapMixer
} from './Lightmap.js';


class Scene {
    constructor(resources) {

        this.cameras = [];
        this.__root = new TreeItem('root');
        this.__assets = [];

        // Env map used for background and reflections.
        this.__envMap = undefined;
        // Background map used only for backgrounds. Overrides env map.
        this.__backgroundMap = undefined;
        this.__lightmaps = {};
        this.__lightmapLOD = 1;
        this.__selectionManager = new SelectionManager();
        this.__resourceLoader = new ResourceLoader(resources);

        this.backgroundMapChanged = new Signal();
        this.envMapChanged = new Signal();
        this.lightmapAdded = new Signal();
        this.commonResourcesLoaded = new Signal(true);

        let resourceName = 'commonResources/Resources.vlr';
        if (this.__resourceLoader.resourceAvailable(resourceName)) {
            this.__resourceLoader.loadResource(resourceName,
                (entries) => {

                    let viveAsset = new BinAsset('ViveResources');
                    let materialTypeMapping = {};
                    materialTypeMapping['*'] = 'SimpleSurfaceShader';
                    viveAsset.getMaterialLibrary().setMaterialTypeMapping(materialTypeMapping);
                    viveAsset.getGeometryLibrary().readBinaryBuffer(resourceName, entries['Vive0.geoms'].buffer);
                    viveAsset.readBinaryBuffer(entries['Vive.tree'].buffer);
                    viveAsset.setSelectable(false, true);
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

    getSelectionManager() {
        return this.__selectionManager;
    }

    getEnvMap() {
        return this.__envMap;
    }

    setEnvMap(envMap) {
        this.__envMap = envMap;
        this.envMapChanged.emit(this.__envMap);
    }

    getBackgroundMap() {
        return this.__backgroundMap;
    }

    setBackgroundMap(backgroundMap) {
        this.__backgroundMap = backgroundMap;
        this.backgroundMapChanged.emit(this.__backgroundMap);
    }

    getCamera(index = 0) {
        return this.cameras[index];
    }

    //////////////////////////////////
    // Lightmaps

    getLightMapLOD() {
        return this.__lightmapLOD;
    }

    setLightMapLOD(lod) {
        this.__lightmapLOD = lod;
    }

    getLightMap(name) {
        return this.__lightmaps[name];
    }

    setLightMap(name, lightmap) {
        if (!(lightmap instanceof Lightmap || lightmap instanceof LightmapMixer)) {
            console.error("Object passed is not a Lightmap:" + lightmap.constructor.name);
        }
        this.__lightmaps[name] = lightmap;
        this.lightmapAdded.emit(name, lightmap);
    }

    getLightMaps() {
        return this.__lightmaps;
    }

    addAsset(asset){
        asset.loaded.connect(()=>{
            if(this.__envMap) {
                let lightmapName = asset.getName() + "_" + this.__envMap.getName() + "_Lightmap"+this.__lightmapLOD+".vlh";
                if(!this.getLightMap(lightmapName) && this.__resourceLoader.resourceAvailable(lightmapName)) {
                    let lightmap = new Visualive.Lightmap(lightmapName, asset.getLightmapSize(), this.__resourceLoader);
                    this.setLightMap(asset.getName(), lightmap);
                }
            }
        });
        this.__assets.push(asset);
        this.__root.addChild(asset);
    }

    getAssets() { 
        return this.__assets;
    }


    ///////////////////////////////////////
    // Time

    getSceneTime() {
        return this.__sceneTime;
    }

    setSceneTime(sceneTime) {
        this.__sceneTime = sceneTime;
        this.sceneTimeChanged.emit(this.__sceneTime);
    }

    getSceneDuration() {
        return this.__sceneDuration;
    }

    setSceneDuration(sceneDuration) {
        this.__sceneDuration = sceneDuration;
        this.sceneDurationChanged.emit(this.__sceneDuration);
    }

    ///////////////////////////////////////
    // Persistence

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
    Scene,
    Lightmap,
    LightmapMixer
};