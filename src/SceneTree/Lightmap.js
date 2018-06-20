
import {
    Signal
} from '../Utilities';
import {
    RefCounted
} from './RefCounted.js';
import {
    FileImage
} from './FileImage.js';
import {
    ResourceLoader
} from './ResourceLoader.js';


class Lightmap extends RefCounted {
    constructor(resourceName, atlasSize, stream) {
        super();
        this.atlasSize = atlasSize;
        this.image = new FileImage(resourceName, {stream});
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

    fromJSON(j, context) {
        this.__atlasSize = j.atlasSize;
    }
};

class LightmapMixer extends RefCounted {
    constructor(atlasSize) {
        super();
        this.atlasSize = atlasSize;
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
            this.__images[index] = new FileImage(resourceName, {stream});
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

    fromJSON(j, context) {
        this.__atlasSize = j['atlasSize'];
    }
};


export {
    Lightmap,
    LightmapMixer
};