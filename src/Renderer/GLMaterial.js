import {
    SInt32,
    UInt32,
    Float32,
    Vec2,
    Vec3,
    Vec4,
    Color,
    Mat4
} from '../Math';
import {
    Signal
} from '../Utilities';
import {
    BaseItem,
    Image
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
import {
    GLImageStream
} from './GLImageStream.js';


const bindParam = (gl, param, renderstate, gltextures = {}) => {
    const name = param.getName();
    // console.log("bindParam:" + name);
    if (param.getValue() instanceof Image) {
        const gltexture = gltextures[name];
        const unif = renderstate.unifs['_' + name + 'Tex'];
        if (gltexture && unif && gltexture.bindToUniform(renderstate, unif)) {
            return;
        }
        // If the texture didn't bind, then let the regular value be bound...continue into the rest of the function.
        // return;
    }

    const unif = renderstate.unifs['_' + name];
    if (unif == undefined)
        return;

    // Note: we must set the texConnected value to 0 here so texutres bound for one
    // Material do not stay bound for subsequent materials.
    const textureConnctedUnif = renderstate.unifs[unif.name + 'TexConnected'];
    if (textureConnctedUnif) {
        gl.uniform1i(textureConnctedUnif.location, 0);
    }

    const value = param.getValue(false);
    if (value instanceof Image)
        return;

    switch (unif.type) {
        case Boolean:
            // gl.uniform1ui(unif.location, value);// WebGL 2
            gl.uniform1i(unif.location, value);
            break;
        case UInt32:
            if(gl.name == 'webgl2')
                gl.uniform1ui(unif.location, value);
            else
                gl.uniform1i(unif.location, value);
            break;
        case SInt32:
            if(gl.name == 'webgl2')
                gl.uniform1ui(unif.location, value);
            else
                gl.uniform1i(unif.location, value);
            break;
        case Float32:
            gl.uniform1f(unif.location, value);
            break;
        case Vec2:
            gl.uniform2fv(unif.location, value.asArray());
            break;
        case Vec3:
            gl.uniform3fv(unif.location, value.asArray());
            break;
        case Vec4:
        case Color:
            gl.uniform4fv(unif.location, value.asArray());
            break;
        case Mat4:
            gl.uniformMatrix4fv(unif.location, false, value.asArray());
            break;
        default:
            {
                console.warn("Param :" + name + " has unhandled data type:" + unif.type);
                return;
            }
    }
    return;
}


class GLMaterial extends BaseItem {
    constructor(gl, material, glshader) {
        super(name);
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
                let gltexture = texture.getMetadata('gltexture');
                if(!gltexture) {
                    if (texture.format === "FLOAT"){
                        gltexture = new GLHDRImage(this.__gl, texture);
                    }
                    else if (texture.isStreamAtlas()){
                        gltexture = new GLImageStream(this.__gl, texture);
                    }
                    // else if (texture.hasAlpha()){
                    //     gltexture = new GLLDRAlphaImage(this.__gl, texture);
                    // }
                    else{
                        gltexture = new GLTexture2D(this.__gl, texture);
                    }
                }
                gltexture.updated.connect(this.updated.emit);
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

        // console.log("Material:" + this.__material.getName());
        this.__boundTexturesBeforeMaterial = renderstate.boundTextures;
        const gl = this.__gl;
        const params = this.__material.getParameters();
        for (let param of params) {
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