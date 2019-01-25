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
    BaseImage
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
import {
    GLImageStream
} from './GLImageStream.js';

class SimpleUniformBinding {
    constructor(gl, glmaterial, param, unif) {
        this.__unif = unif;

        switch (unif.type) {
            case Boolean:
                // gl.uniform1ui(unif.location, value);// WebGL 2
                this.uniformXX = gl.uniform1i.bind(gl);
                break;
            case UInt32:
                if (gl.name == 'webgl2')
                    this.uniformXX = gl.uniform1ui.bind(gl);
                else
                    this.uniformXX = gl.uniform1i.bind(gl);
                break;
            case SInt32:
                this.uniformXX = gl.uniform1i.bind(gl);
                break;
            case Float32:
                this.uniformXX = gl.uniform1f.bind(gl);
                break;
        }

        this.__val = param.getValue();
        param.valueChanged.connect(() => {
            this.__val = param.getValue();
            glmaterial.updated.emit();
        })
    }

    bind(renderstate) {
        this.uniformXX(this.__unif.location, this.__val);
    }

    unbind() {}

    destroy() {}
}

class ComplexUniformBinding {
    constructor(gl, glmaterial, param, unif) {
        this.__unif = unif;

        switch (unif.type) {
            case Vec2:
                this.uniformXX = gl.uniform2fv.bind(gl);
                break;
            case Vec3:
                this.uniformXX = gl.uniform3fv.bind(gl);
                break;
            case Vec4:
                this.uniformXX = gl.uniform4fv.bind(gl);
                break;
        }

        this.__vals = param.getValue().asArray();
        param.valueChanged.connect(() => {
            this.__vals = param.getValue().asArray();
            glmaterial.updated.emit();
        })
    }
    bind(renderstate) {
        this.uniformXX(this.__unif.location, this.__vals);
    }
    unbind() {}

    destroy() {}
}

class MatrixUniformBinding {
    constructor(gl, glmaterial, param, unif) {
        this.__unif = unif;

        switch (unif.type) {
            case Mat3:
                this.uniformMatrixXXX = gl.uniformMatrix3fv.bind(gl);
                break;
            case Mat4:
                this.uniformMatrixXXX = gl.uniformMatrix4fv.bind(gl);
                break;
        }

        this.__vals = param.getValue().asArray();
        param.valueChanged.connect(() => {
            this.__val = param.getValue().asArray();
            glmaterial.updated.emit();
        })
    }
    bind(renderstate) {
        this.uniformMatrixXXX(this.__unif.location, false, this.__val);
    }
    unbind() {}

    destroy() {}
}


class ColorUniformBinding {
    constructor(gl, glmaterial, param, unif, unifs) {
        this.__gl = gl;
        this.__unif = unif;
        this.__textureUnif = unifs[unif.name + 'Tex'];
        this.__textureTypeUnif = unifs[unif.name + 'TexType'];

        this.__vals = [0,0,0,0];

        const updateBinding = () => {
            let image;

            // Sometimes the value of a color param is an image.
            const value = param.getValue(false);
            if(value instanceof BaseImage)
                image = value;
            else
                this.__vals = value.asArray();
            this.bind = this.bindValue;

            if (!image && param.getImage) {
                image = param.getImage();
            }

            if (this.__textureUnif) {
                const genGLTex = (image) => {
                    let gltexture = image.getMetadata('gltexture');
                    const textureType = 1;
                    if (!gltexture) {
                        if (image.type === 'FLOAT') {
                            gltexture = new GLHDRImage(this.__gl, image);
                        } else if (image.isStreamAtlas()) {
                            gltexture = new GLImageStream(this.__gl, image);
                        }
                        // else if (image.hasAlpha()){
                        //     gltexture = new GLLDRAlphaImage(this.__gl, image);
                        // }
                        else {
                            gltexture = new GLTexture2D(this.__gl, image);
                        }
                    }
                    this.texBinding = gltexture.preBind(this.__textureUnif, unifs)
                    gltexture.updated.connect(()=>{
                        glmaterial.updated.emit()
                    });
                    this.gltexture = gltexture;
                    this.textureType = textureType;
                    this.bind = this.bindTexture;
                    glmaterial.updated.emit();
                }
                const connectImage = (image)=>{
                    if (!image.isLoaded()) {
                        image.loaded.connect(() => {
                            genGLTex(image);
                        });
                    } else {
                        genGLTex(image);
                    }

                }
                if(image) {
                    connectImage(image);
                }
                if(param.textureConnected){
                    param.textureConnected.connect(()=>{
                        connectImage(param.getImage());
                    });
                }
            } else {
                glmaterial.updated.emit();
            }
        }
        updateBinding();
        param.valueChanged.connect(updateBinding);

        this.uniform1i = gl.uniform1i.bind(gl);
        this.uniform4fv = gl.uniform4fv.bind(gl);
    }

    bindValue(renderstate) {
        this.uniform4fv(this.__unif.location, this.__vals);
        if (this.__textureTypeUnif)
            this.uniform1i(this.__textureTypeUnif.location, 0);
    }

    bindTexture(renderstate) {
        this.gltexture.bindToUniform(renderstate, this.__textureUnif, this.texBinding);
    }
}


class MaterialShaderBinding {
    constructor(gl, glmaterial, unifs) {
        this.__uniformBindings = [];

        const bindParam = (param) => {
            const name = param.getName();
            const unif = unifs[name];
            if (unif == undefined){
                // Note: this silent error caused me a lot of searching. make it noisy.
                console.warn("Param has no unif", name)
                return;
            }
            switch (unif.type) {
                case Boolean:
                case UInt32:
                case SInt32:
                case Float32:
                    this.__uniformBindings.push(new SimpleUniformBinding(gl, glmaterial, param, unif))
                    break;
                case Vec2:
                case Vec3:
                case Vec4:
                    this.__uniformBindings.push(new ComplexUniformBinding(gl, glmaterial, param, unif))
                    break;
                case Color:
                    this.__uniformBindings.push(new ColorUniformBinding(gl, glmaterial, param, unif, unifs));
                    break;
                case Mat4:
                    this.__uniformBindings.push(new MatrixUniformBinding(gl, glmaterial, param, unif))
                    break;
                default:
                    console.warn("Param :" + name + " has unhandled data type:" + unif.type);
                    return;
            }
            return;
        }
        const params = glmaterial.getMaterial().getParameters();
        for (let param of params) {
            bindParam(param)
        }
    }


    bind(renderstate) {
        for (let uniformBinding of this.__uniformBindings) {
            uniformBinding.bind(renderstate)
        }
        return true;
    }

    unbind() {
        for (let uniformBinding of this.__uniformBindings) {
            uniformBinding.unbind(renderstate)
        }
    }

    destroy() {
        for (let uniformBinding of this.__uniformBindings) {
            uniformBinding.destroy(renderstate)
        }
    }
};


export {
    MaterialShaderBinding
};