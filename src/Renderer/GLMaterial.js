import {
    SInt32,
    UInt32,
    Float32,
    Vec2,
    Vec3,
    Vec4,
    Color,
    Mat4,
    Signal
} from '../Math';
import {
    Image2D,
    HDRImage2D
} from '../SceneTree';
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
    constructor(gl, material) {
        this.__gl = gl;
        this.__material = material;

        this.updated = new Signal();
        this.destructing = new Signal();

        // emit a notification telling the renderer to redraw.
        this.__material.updated.connect(() => {
            this.updated.emit();
        }, this);
        this.__material.textureConnected.connect(() => {
            this.updateGLTextures(gl);
        }, this);

        this.__material.destructing.connect(() => {
            this.destructing.emit(this); // Note: propagate this signal so the GLPass can remove the item.
        }, this);

        this.gltextures = {};
        if (this.__material) {
            this.updateGLTextures();
        }
    }

    getMaterial() {
        return this.__material;
    }

    isTransparent() {
        return this.__material.isTransparent();
    }

    updateGLTextures() {
        const attachTexture = (texName, texture) => {
            const genGLTex = () => {
                let gltexture;
                if (texture instanceof HDRImage2D || texture.isHDR())
                    gltexture = new GLHDRImage(this.__gl, texture);
                else if (texture.hasAlpha())
                    gltexture = new GLLDRAlphaImage(this.__gl, texture);
                else
                    gltexture = new GLTexture2D(this.__gl, texture);
                this.gltextures[texName] = gltexture;
            }
            if (!texture.isLoaded()) {
                texture.loaded.connect(() => {
                    genGLTex();
                });
            } else {
                genGLTex();
            }
        }
        const textures = this.__material.textures;
        for (let texName in textures) {
            if (texName in this.gltextures && this.gltextures[texName].getTexture() == texture)
                continue;
            attachTexture(texName, textures[texName]);
        }
        this.updated.emit();
    }

    bind(renderstate) {

        // console.log("Material:" + this.__material.name);
        this.__boundTexturesBeforeMaterial = renderstate['boundTextures'];
        let gl = this.__gl;
        let unifs = renderstate['unifs'];
        let params = this.__material.getParameters();
        for (let [paramName, param] of Object.entries(params)) {
            let unif = unifs['_'+paramName];
            if (unif == undefined)
                continue;
            // console.log("Param:" + paramName + " value:" + value);

            if(param.texture != undefined){
                let gltexture = this.gltextures[paramName];
                if (gltexture){
                    gltexture.bind(renderstate, unifs['_'+paramName+'Tex'].location);
                    gl.uniform1i(unifs['_'+paramName+'TexConnected'].location, 1);
                    continue;
                }
            }

            switch (unif['type']) {
            case Boolean:
                // gl.uniform1ui(unif.location, param.value);// WebGL 2
                gl.uniform1i(unif.location, param.value);
                break;
            case UInt32:
                // gl.uniform1ui(unif.location, param.value);// WebGL 2
                gl.uniform1i(unif.location, param.value);
                break;
            case SInt32:
                // gl.uniform1si(unif.location, param.value);// WebGL 2
                gl.uniform1i(unif.location, param.value);
                break;
            case Float32:
                gl.uniform1f(unif.location, param.value);
                break;
            case Vec2:
                gl.uniform2fv(unif.location, param.value.asArray());
                break;
            case Vec3:
                gl.uniform3fv(unif.location, param.value.asArray());
                break;
            case Vec4:
            case Color:
                gl.uniform4fv(unif.location, param.value.asArray());
                break;
            case Mat4:
                gl.uniformMatrix4fv(unif.location, false, param.value.asArray());
                break;
            default:
                {
                    console.warn("Param :" + paramName + " has unhandled data type:" + unif['type']);
                }
            }
        }
        return true;
    }

    unbind(renderstate) {
        // Enable texture units to be re-used by resetting the count back
        // to what it was. 
        renderstate['boundTextures'] = this.__boundTexturesBeforeMaterial;
    }
};

export {
    GLMaterial
};
// export default GLMaterial;