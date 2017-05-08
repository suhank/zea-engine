import {
  SInt32,
  UInt32,
  Float32,
} from '../Math/Common';

import { Vec2 } from '../Math/Vec2';
import { Vec3 } from '../Math/Vec3';
import { Vec4 } from '../Math/Vec4';
import { Color } from '../Math/Color';
import { Mat4 } from '../Math/Mat4';
import { Signal } from '../Math/Signal';
import { Image2D } from '../SceneTree/Image2D.js';
import '../SceneTree/Material.js';
import '../SceneTree';
import { GLTexture2D } from './GLTexture2D.js';

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
        if(this.__material){
            this.updateGLTextures();
        }
    }

    getMaterial() {
        return this.__material;
    }

    isTransparent(){
        return ('opacity' in this.__material && (this.__material.opacity < 0.99 || this.__material.opacity instanceof Image2D));
    }

    updateGLTextures() {
        let textures = this.__material.textures;
        for (let texName in textures) {
            let texture = textures[texName];
            if (texName in this.gltextures && this.gltextures[texName].getTexture() == texture)
                continue;
            let gltexture = new GLTexture2D(this.__gl, texture);
            this.gltextures[texName] = gltexture;
        }
        this.updated.emit();
    }

    bind(renderstate) {

        this.__boundTexturesBeforeMaterial = renderstate['boundTextures'];
        let gl = this.__gl;
        let unifs = renderstate['unifs'];
        for (let unifName in unifs) {
            let unif = unifs[unifName];
            let value = this.__material.getParameter(unifName);
            if (value == undefined)
                continue;
            // let checkType = function(expectedType){
            //     if (expectedType != unif['type']) {
            //         let valueType = value.constructor.name;
            //         let expectedType = ((unif['type'] != undefined) ? unif['type'].name : "Unknown");
            //         throw("Invalid type for uniform:" + unifName + " valueType:" + valueType + " expected:" + expectedType);
            //     }
            // }
            switch (unif['type']) {
                case Boolean:
                    // gl.uniform1ui(unif['location'], value);// WebGL 2
                    gl.uniform1i(unif['location'], value);
                    break;
                case UInt32:
                    // gl.uniform1ui(unif['location'], value);// WebGL 2
                    gl.uniform1i(unif['location'], value);
                    break;
                case SInt32:
                    // gl.uniform1si(unif['location'], value);// WebGL 2
                    gl.uniform1i(unif['location'], value);
                    break;
                case Float32:
                    gl.uniform1f(unif['location'], value);
                    break;
                case Vec2:
                    gl.uniform2fv(unif['location'], value.asArray());
                    break;
                case Vec3:
                    gl.uniform3fv(unif['location'], value.asArray());
                    break;
                case Vec4:
                case Color:
                    gl.uniform4fv(unif['location'], value.asArray());
                    break;
                case Mat4:
                    gl.uniformMatrix4fv(unif['location'], false, value.asArray());
                    break;
                case Image2D:
                    let gltexture = this.gltextures[unifName];
                    if (gltexture)
                        gltexture.bind(renderstate, unif['location']);
                    break;
                default:
                    {
                        console.warn("Uniform :" + unifName + " has unhandled data type:" + unif['type']);
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