import {
    Signal
} from '../Math';
import {
    RefCounted
} from './RefCounted.js';
import {
    FileImage2D
} from './FileImage2D.js';
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


export {
    Lightmap,
    LightmapMixer
};