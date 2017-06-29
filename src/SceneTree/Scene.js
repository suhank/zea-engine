import {
    Signal,
    JSON_stringify_fixedPrecision
} from '../Math';
import {
    RefCounted
} from './RefCounted.js';
import {
    TreeItem
} from './TreeItem.js';
import {
    BinAsset
} from './BinAsset.js';
import {
    FileImage2D
} from './FileImage2D.js';
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


class Lightmap extends RefCounted {
    constructor(resourceName, atlasSize, resourceLoader, stream) {
        super();
        this.atlasSize = atlasSize;
        this.image = new FileImage2D(resourceName, resourceLoader, {stream});
        this.__stream = stream;
    }

    get width(){
        return this.atlasSize[0];
    }
    get height(){
        return this.atlasSize[1];
    }

    isStream(){
        return this.__stream
    }

    loadResource(resourceName) {
        this.image.loadResource(resourceName);
    }

    fromJSON(j, flags = 0) {
        this.__atlasSize = j.atlasSize;
    }
};

class LightmapMixer extends RefCounted {
    constructor(atlasSize, resourceLoader) {
        super();
        this.atlasSize = atlasSize;
        this.__resourceLoader = resourceLoader;
        this.__images = [];
        this.__weights = [];
        this.__stream = false;
        this.lightmapAdded = new Signal();
        this.lightmapResourceChanged = new Signal();
        this.lightmapWeightChanged = new Signal();
    }

    get width(){
        return this.atlasSize[0];
    }
    get height(){
        return this.atlasSize[1];
    }

    isStream(){
        return this.__stream
    }

    loadResource(index, resourceName, weight = undefined, stream=false) {
        if (!this.__images[index]) {
            this.__images[index] = new FileImage2D(resourceName, this.__resourceLoader, {stream});
            this.__weights[index] = weight ? weight : 1.0;
            this.lightmapAdded.emit(index);
        } else {
            this.__images[index].loadResource(resourceName);
            this.lightmapResourceChanged.emit(index, weight);
            if(weight){
                this.__weights[index] = weight;
                this.lightmapWeightChanged.emit(index, weight);
            }
        }
        this.__stream |= stream;
    }

    setWeight(index, weight) {
        this.__weights[index] = weight;
        this.lightmapWeightChanged.emit(index, weight);
    }

    numSubImages(){
        return this.__images.length;
    }
    getSubImage(index){
        return this.__images[index];
    }
    getSubImageWeight(index){
        return this.__weights[index];
    }

    fromJSON(j, flags = 0) {
        this.__atlasSize = j['atlasSize'];
    }
};

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
        this.__selectionManager = new SelectionManager();
        this.__resourceLoader = new ResourceLoader(resources);

        this.backgroundMapChanged = new Signal();
        this.envMapChanged = new Signal();
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

    getLightMap(name) {
        return this.__lightmaps[name];
    }

    setLightMap(name, lightmap) {
        if (!(lightmap instanceof Lightmap || lightmap instanceof LightmapMixer)) {
            console.error("Object passed is not a Lightmap:" + lightmap.constructor.name);
        }
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

    addAsset(asset){
        this.__assets.push(asset);
        this.__root.addChild(asset);
    }

    getAssets() { 
        return this.__assets;
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
    Scene,
    Lightmap,
    LightmapMixer
};