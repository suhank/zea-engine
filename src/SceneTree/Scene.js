import {
    getSystemDesc
} from '../BrowserDetection.js';
import {
    Signal,
    JSON_stringify_fixedPrecision
} from '../Math';
import {
    TreeItem
} from './TreeItem.js';
import {
    VLAAsset
} from './VLAAsset.js';
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
    Lightmap,
    LightmapMixer
} from './Lightmap.js';


class Scene {
    constructor(resources) {

        let systemDesc = getSystemDesc();

        this.cameras = [];
        this.__root = new TreeItem('root');
        this.__assets = [];

        // Env map used for background and reflections.
        this.__envMap = undefined;
        // Background map used only for backgrounds. Overrides env map.
        this.__backgroundMap = undefined;
        this.__lightmaps = {};

        if (systemDesc.isMobileDevice || systemDesc.browserName != 'Chrome')
            this.__lightmapLOD = 2;
        else
            this.__lightmapLOD = 0;

        this.__selectionManager = new SelectionManager();
        this.__resourceLoader = new ResourceLoader(resources);

        // Common resources are used by systems such at the renderer and VR controllers.
        // Any asset that will probably be used my multiple differeint independent objects
        // should be loaded here. (For now, it is being used to laod VR Controller assets.)
        this.__commonResources = {};

        /////////////////////////////
        // Time
        this.__sceneTime = 0.0;
        this.__sceneDuration = 10.0;
        this.__playing = false;

        this.backgroundMapChanged = new Signal();
        this.envMapChanged = new Signal();
        this.lightmapAdded = new Signal();
        this.commonResourcesLoaded = new Signal(true);
        this.sceneTimeChanged = new Signal();
        this.sceneDurationChanged = new Signal();
    }

    getRoot() {
        return this.__root;
    }

    getResourceLoader() {
        return this.__resourceLoader;
    }

    loadCommonAssetResource(path) {
        if (path in this.__commonResources) {
            return this.__commonResources[path];
        }
        let asset = new VLAAsset(path, this.__resourceLoader);
        asset.getParameter('FilePath').setValue(path);
        this.__commonResources[path] = asset;
        return asset;
    }

    getSelectionManager() {
        return this.__selectionManager;
    }

    getEnvMap() {
        return this.__envMap;
    }

    setEnvMapName(envMapName) {
        if(envMapName.endsWith('.vlh'))
            envMapName = envMapName.splice(0, envMapName.length = 4);
        let envMap = new Visualive.FileImage2D(envMapName + this.__lightmapLOD + ".vlh", this.__resourceLoader);
        this.setEnvMap(envMap);
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
            throw ("Object passed is not a Lightmap:" + lightmap.constructor.name);
        }
        this.__lightmaps[name] = lightmap;
        this.lightmapAdded.emit(name, lightmap);
    }

    getLightMaps() {
        return this.__lightmaps;
    }

    addAsset(asset) {
        asset.loaded.connect(() => {
            if (this.__envMap) {
                let path = asset.getParameter('FilePath').getValue();

                let lightmapName = path.split('.')[0] + "_" + this.__envMap.getName() + "_Lightmap" + this.__lightmapLOD + ".vlh";
                if (!this.getLightMap(lightmapName) && this.__resourceLoader.resourceAvailable(lightmapName)) {
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

    setSceneTime(sceneTime, stopPlaying = true) {
        this.__sceneTime = sceneTime;
        this.sceneTimeChanged.emit(this.__sceneTime);
        if (stopPlaying)
            this.__playing = false;
    }

    getSceneDuration() {
        return this.__sceneDuration;
    }

    setSceneDuration(sceneDuration) {
        this.__sceneDuration = sceneDuration;
        this.sceneDurationChanged.emit(this.__sceneDuration);
    }

    startPlaying(sceneTime) {
        let prev = Date.now();
        let onAnimationFrame = () => {
            let now = Date.now();
            let newTime = this.__sceneTime + ((now - prev) / 1000);
            if (newTime > this.__sceneDuration) {
                // newTime = 0;
                this.__playing = false;
            }
            if (this.__playing) {
                window.requestAnimationFrame(onAnimationFrame);
            }
            this.setSceneTime(newTime, false);
            prev = now;
        }

        this.__playing = true;
        window.requestAnimationFrame(onAnimationFrame);
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