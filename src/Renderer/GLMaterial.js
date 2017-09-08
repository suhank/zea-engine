import {
    Signal
} from '../Math';
import {
    Image2D,
    HDRImage2D
} from '../SceneTree';
import {
    bindParam
} from './GLShader.js';
import {
    GLTexture2D
} from './GLTexture2D.js';
import {
    GLLDRAlphaImage
} from './GLLDRAlphaImage.js';
import {
    GLHDRImage
} from './GLHDRImage.js';

class GLMaterial {
    constructor(gl, material, glshader) {
        this.__gl = gl;
        this.__material = material;
        this.__glshader = glshader;

        this.updated = new Signal();
        this.destructing = new Signal();

        // emit a notification telling the renderer to redraw.
        this.__material.updated.connect(() => {
            this.updated.emit();
        });
        this.__material.textureConnected.connect(() => {
            this.updateGLTextures(gl);
        });

        this.__material.destructing.connect(() => {
            this.destructing.emit(this); // Note: propagate this signal so the GLPass can remove the item.
        });

        this.gltextures = {};
        if (this.__material) {
            this.updateGLTextures();
        }
    }

    getMaterial() {
        return this.__material;
    }
    
    getShader() {
        return this.__glshader;
    }

    updateGLTextures() {
        const attachTexture = (texName, texture) => {
            const genGLTex = () => {
                let gltexture;
                if (texture instanceof HDRImage2D || texture.format === "FLOAT"){
                    gltexture = new GLHDRImage(this.__gl, texture);
                }
                else if (texture.hasAlpha()){
                    gltexture = new GLLDRAlphaImage(this.__gl, texture);
                }
                else{
                    gltexture = new GLTexture2D(this.__gl, texture);
                }
                this.gltextures[texName] = gltexture;
                this.updated.emit();
            }
            if (!texture.isLoaded()) {
                texture.loaded.connect(() => {
                    genGLTex();
                });
            } else {
                genGLTex();
            }
        }
        const textures = this.__material.getParamTextures();
        for (let texName in textures) {
            if (texName in this.gltextures && this.gltextures[texName].getTexture() == texture)
                continue;
            attachTexture(texName, textures[texName]);
        }
        this.updated.emit();
    }

    bind(renderstate) {

        // console.log("Material:" + this.__material.name);
        this.__boundTexturesBeforeMaterial = renderstate.boundTextures;
        let gl = this.__gl;
        let params = this.__material.getParameters();
        for (let [paramName, param] of Object.entries(params)) {
            bindParam(gl, param, renderstate, this.gltextures);
        }
        return true;
    }

    unbind(renderstate) {
        // Enable texture units to be re-used by resetting the count back
        // to what it was. 
        renderstate.boundTextures = this.__boundTexturesBeforeMaterial;
    }
};

export {
    GLMaterial
};
// export default GLMaterial;