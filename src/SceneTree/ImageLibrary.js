
import {
    Image2D
} from './Image2D.js';

///////////////////////////////////
// ImageLibrary
class ImageLibrary {
    constructor() {
        this.__textures = {};
    }

    hasTexture(name) {
        return name in this.__textures;
    }

    setTexture(texture) {
        // console.log("setTexture:" + name);
        this.__textures[texture.name] = texture;
        return texture;
    }

    getTexture(name) {
        return this.__textures[name];
    }

    getTextureNames() {
        let names = [];
        for(let name in this.__textures)
            names.push(name);
        return names;
    }
}
let textureLibrary = new ImageLibrary();

export {
    textureLibrary
};