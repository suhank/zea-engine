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
    Image2D,
    HDRImage2D,
    makeParameterTexturable
} from '../SceneTree';
import {
    shaderLibrary
} from './ShaderLibrary.js';
import {
    GLTexture2D
} from './GLTexture2D.js';

let bindParam = (gl, param, renderstate, gltextures = {}) => {
    let name = param.getName();
    // console.log("bindParam:" + name);
    if (param.getValue() instanceof Image2D) {
        let gltexture = gltextures[name];
        let unif = renderstate.unifs['_' + name + 'Tex'];
        if (gltexture && unif && gltexture.bindToUniform(renderstate, unif)) {
            return;
        }
        // If the texture didn't bind, then let the regular value be bound...continue into the rest of the function.
        // return;
    }

    let unif = renderstate.unifs['_' + name];
    if (unif == undefined)
        return;

    // Note: we must set the texConnected value to 0 here so texutres bound for one
    // Material do not stay bound for subsequent materials.
    let textureConnctedUnif = renderstate.unifs[unif.name + 'TexConnected'];
    if (textureConnctedUnif) {
        gl.uniform1i(textureConnctedUnif.location, 0);
    }

    let value = param.getValue(false);
    switch (unif['type']) {
        case Boolean:
            // gl.uniform1ui(unif.location, value);// WebGL 2
            gl.uniform1i(unif.location, value);
            break;
        case UInt32:
            // gl.uniform1ui(unif.location, value);// WebGL 2
            gl.uniform1i(unif.location, value);
            break;
        case SInt32:
            // gl.uniform1si(unif.location, value);// WebGL 2
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
                console.warn("Param :" + name + " has unhandled data type:" + unif['type']);
                return;
            }
    }
    return;
}

class GLShader extends BaseItem {
    constructor(gl) {
        super();
        if (!gl) {
            throw ("gl context must be passed to shader constructor");
        }
        this.__gl = gl;
        this.__shaderStages = {
            'VERTEX_SHADER': {
                'glsl': "",
                'lines': 0,
                'uniforms': {},
                'attributes': {}
            },
            'FRAGMENT_SHADER': {
                'glsl': "",
                'lines': 0,
                'uniforms': {},
                'attributes': {}
            }
        };

        this.__shaderProgramHdls = {};
        this.__gltextures = {};
        this.updated = new Signal();
    }


    isTransparent() {
        return false;
    }

    isOverlay() {
        return false;
    }

    ///////////////////////////////
    // Parameters

    getParamTextures() {
        let textures = {};
        for (let param of this.__params) {
            if (param.getImage())
                textures[param.getName()] = param.getImage();
        }
        return textures;
    }

    __makeParameterTexturable(param) {
        makeParameterTexturable(param);
        // param.textureConnected.connect(this.textureConnected.emit);
        // param.textureDisconnected.connect(this.textureDisconnected.emit);
        param.valueChanged.connect(this.updated.emit);
    }

    addParameter(paramName, defaultValue) {
        let image;
        if (defaultValue instanceof Image2D) {
            image = defaultValue;
            defaultValue = new Color();
        }
        let param = super.addParameter(paramName, defaultValue);
        this.__makeParameterTexturable(param);
        if (image) {
            param.setImage(image)
        }
        return param;
    }

    addParameterInstance(param) {
        super.addParameterInstance(param);
        this.__makeParameterTexturable(param);
    }

    ///////////////////////////////////
    // Compilation

    __compileShaderStage(glsl, stageID, name) {
        let gl = this.__gl;
        // console.log("__compileShaderStage:" + this.name+"."+name + " glsl:\n" + glsl);
        let shaderHdl = gl.createShader(stageID);
        gl.shaderSource(shaderHdl, glsl);

        // Compile the shader program.
        gl.compileShader(shaderHdl);

        // See if it compiled successfully
        if (!gl.getShaderParameter(shaderHdl, gl.COMPILE_STATUS)) {
            console.log("Errors in :" + this.constructor.name);
            let errors = gl.getShaderInfoLog(shaderHdl).split('\n');
            let errorLines = {};
            for (let i in errors) {
                if (errors[i].startsWith("'")) {
                    errors[i - 1] = errors[i - 1] + errors[i];
                    delete errors[i];
                    i--;
                    continue;
                }
                let parts = errors[i].split(':');
                if (parts.length >= 2) {
                    let lineNum = parseInt(parts[2]); // TODO check against ATI and intel cards
                    if (!isNaN(lineNum)) {
                        errorLines[lineNum] = errors[i];
                    }
                }
            }
            let numberedLinesWithErrors = [];
            let lines = glsl.split('\n');
            for (let i = 0; i < lines.length; i++) {
                numberedLinesWithErrors.push(((i + 1) + ":").lpad(' ', 3) + lines[i]);
                if ((i + 1) in errorLines) {
                    let error = errorLines[(i + 1)];
                    numberedLinesWithErrors.push(error);
                    numberedLinesWithErrors.push('-'.lpad('-', error.length));
                }
            }
            console.warn("An error occurred compiling the shader \n\n" + numberedLinesWithErrors.join('\n') + "\n\n=================\n" + this.constructor.name + "." + name + ": \n\n" + errors.join('\n'));
            return null;
        }
        return shaderHdl;
    }

    __createProgram(preproc) {
        let gl = this.__gl;
        this.__shaderCompilationAttempted = true;
        let shaderProgramHdl = gl.createProgram();
        let vertexShaderGLSL = this.__shaderStages['VERTEX_SHADER'].glsl;
        const shaderHdls = {};
        if (vertexShaderGLSL != undefined) {
            if (preproc) {
                if (preproc.repl) {
                    for (let key in preproc.repl)
                        vertexShaderGLSL = vertexShaderGLSL.replaceAll(key, preproc.repl[key]);
                }
                if (preproc.defines)
                    vertexShaderGLSL = preproc.defines + vertexShaderGLSL;
            }
            let vertexShader = this.__compileShaderStage(vertexShaderGLSL, gl.VERTEX_SHADER, 'vertexShader');
            if (!vertexShader) {
                return false;
            }
            gl.attachShader(shaderProgramHdl, vertexShader);
            shaderHdls[gl.VERTEX_SHADER] = vertexShader;
        }
        let fragmentShaderGLSL = this.__shaderStages['FRAGMENT_SHADER'].glsl;
        if (fragmentShaderGLSL != undefined) {
            if (preproc) {
                if (preproc.repl) {
                    for (let key in preproc.repl)
                        fragmentShaderGLSL = fragmentShaderGLSL.replaceAll(key, preproc.repl[key]);
                }
                if (preproc.defines)
                    fragmentShaderGLSL = preproc.defines + fragmentShaderGLSL;
            }
            let fragmentShader = this.__compileShaderStage(fragmentShaderGLSL, gl.FRAGMENT_SHADER, 'fragmentShader');
            if (!fragmentShader) {
                return false;
            }
            gl.attachShader(shaderProgramHdl, fragmentShader);
            shaderHdls[gl.FRAGMENT_SHADER] = fragmentShader;
        }
        gl.linkProgram(shaderProgramHdl);

        if (!gl.getProgramParameter(shaderProgramHdl, gl.LINK_STATUS)) {
            let info = gl.getProgramInfoLog(shaderProgramHdl);

            if (info.includes("D3D shader compilation failed")) {
                // Usefull for debugging very nasty compiler errors generated only in the ANGL layer.
                const debug_ext = gl.getExtension("WEBGL_debug_shaders");
                if (debug_ext) {
                    let hlsl = debug_ext.getTranslatedShaderSource(shaderHdls[gl.VERTEX_SHADER]);
                    console.log(hlsl);
                }
            }

            throw ("Unable to link the shader program:" + this.constructor.name + '\n==================\n' + info);



            gl.deleteProgram(shaderProgramHdl);
            return false;
        }

        let result = this.__extractAttributeAndUniformLocations(shaderProgramHdl, preproc);
        result.shaderProgramHdl = shaderProgramHdl;
        return result;
    }

    __extractAttributeAndUniformLocations(shaderProgramHdl, preproc) {
        let gl = this.__gl;
        let attrs = this.getAttributes();
        let result = {
            'attrs': {},
            'unifs': {}
        }
        for (let attrName in attrs) {
            let location = gl.getAttribLocation(shaderProgramHdl, attrName);
            if (location == undefined) {
                console.warn("Shader attribute not found:" + attrName);
                continue;
            }
            let attrDesc = attrs[attrName];
            result.attrs[attrName] = {
                name: attrName,
                location: location,
                type: attrDesc.type,
                instanced: attrDesc.instanced
            };
        }
        let unifs = this.getUniforms();
        for (let uniformName in unifs) {
            let unifType = unifs[uniformName];
            if (unifType instanceof Array) {
                for (let member of unifType) {
                    let structMemberName = uniformName + '.' + member.name;
                    let location = gl.getUniformLocation(shaderProgramHdl, structMemberName);
                    if (location == undefined) {
                        // console.warn(this.constructor.name + " uniform found in shader code but not in compiled program:" + uniformName);
                        continue;
                    }
                    result.unifs[structMemberName] = {
                        name: structMemberName,
                        location: location,
                        type: member.type
                    };
                }
            }
            if (preproc) {
                if (preproc.repl) {
                    for (let key in preproc.repl)
                        uniformName = uniformName.replace(key, preproc.repl[key]);
                }
            }

            let location = gl.getUniformLocation(shaderProgramHdl, uniformName);
            if (location == undefined) {
                // console.warn(this.constructor.name + " uniform found in shader code but not in compiled program:" + uniformName);
                continue;
            }
            result.unifs[uniformName] = {
                name: uniformName,
                location: location,
                type: unifType
            };
        }
        return result;
    }

    getAttributes() {
        let attributes = {};
        for (let stageName in this.__shaderStages) {
            let shaderStageBlock = this.__shaderStages[stageName];
            for (let attrName in shaderStageBlock['attributes'])
                attributes[attrName] = shaderStageBlock['attributes'][attrName];
        }
        return attributes;
    }

    getUniforms() {
        let uniforms = {};
        for (let stageName in this.__shaderStages) {
            let shaderStageBlock = this.__shaderStages[stageName];
            for (let unifName in shaderStageBlock['uniforms'])
                uniforms[unifName] = shaderStageBlock['uniforms'][unifName];
        }
        return uniforms;
    }

    finalize() {
        // let hash = 0;
        // for (let stageName in this.__shaderStages) {
        //     let shaderStageBlock = this.__shaderStages[stageName];
        //     hash = ((hash << 5) - hash) + hashStr(shaderStageBlock['glsl']);
        // }
        // this.__hash = Math.abs(hash);

        const attachTexture = (paramName, texture) => {
            const genGLTex = () => {
                let gltexture = texture.getMetadata('gltexture');
                if (!gltexture) {
                    if (texture instanceof HDRImage2D || texture.format === "FLOAT") {
                        gltexture = new GLHDRImage(this.__gl, texture);
                    } else if (texture.isStreamAtlas()) {
                        gltexture = new GLImageStream(this.__gl, texture);
                    }
                    // else if (texture.hasAlpha()){
                    //     gltexture = new GLLDRAlphaImage(this.__gl, texture);
                    // }
                    else {
                        gltexture = new GLTexture2D(this.__gl, texture);
                    }
                }
                gltexture.updated.connect(this.updated.emit);
                this.__gltextures[paramName] = gltexture;
            }
            if (!texture.isLoaded()) {
                texture.loaded.connect(() => {
                    genGLTex();
                });
            } else {
                genGLTex();
            }
        }
        for (let paramName in this.__params) {
            let param = this.__params[paramName];
            let value = param.getValue();
            if (value instanceof Image2D) {
                if (paramName in this.__gltextures && this.__gltextures[paramName].getTexture() == value)
                    continue;
                attachTexture(paramName, value);
            }
        }
    }


    compileForTarget(key, preproc) {
        if (!key) {
            key = this.constructor.name;
        }
        let shaderCompilationResult = this.__shaderProgramHdls[key];
        if (!shaderCompilationResult) {
            if (shaderCompilationResult !== false) {
                shaderCompilationResult = this.__createProgram(preproc);
                this.__shaderProgramHdls[key] = shaderCompilationResult;
            }
        }
        return shaderCompilationResult;
    }


    bind(renderstate, key) {
        let gl = this.__gl;

        let shaderCompilationResult = this.compileForTarget(key, renderstate.shaderopts);
        if (shaderCompilationResult === false) {
            console.warn(this.constructor.name + " is not compiled for " + key);
            return false;
        }

        let shaderProgramHdl = shaderCompilationResult.shaderProgramHdl;

        gl.useProgram(shaderProgramHdl);
        renderstate.shaderkey = this.constructor.name;
        renderstate.boundTextures = 0;
        renderstate.boundLightmap = undefined;
        // Make sure we clear the binding cached.
        renderstate.glgeom = undefined;

        renderstate.unifs = shaderCompilationResult.unifs;
        renderstate.attrs = shaderCompilationResult.attrs;

        let unifs = shaderCompilationResult.unifs; {
            let unif = unifs.viewMatrix;
            if (unif) {
                gl.uniformMatrix4fv(unif.location, false, renderstate.viewMatrix.asArray());
            }
        } {
            let unif = unifs.cameraMatrix;
            if (unif) {
                gl.uniformMatrix4fv(unif.location, false, renderstate.cameraMatrix.asArray());
            }
        } {
            let unif = unifs.projectionMatrix;
            if (unif) {
                gl.uniformMatrix4fv(unif.location, false, renderstate.projectionMatrix.asArray());
            }
        } {
            let unif = unifs.envMap;
            if (unif && renderstate.envMap != undefined) {
                renderstate.envMap.bindToUniform(renderstate, unif);
            }
        } {
            let unif = unifs.exposure;
            if (unif) {
                gl.uniform1f(unif.location, renderstate.exposure ? renderstate.exposure : 1.0);
            }
        } {
            let unif = unifs.eye;
            if (unif) {
                // Left or right eye, when rendering sterio VR.
                gl.uniform1i(unif.location, renderstate.eye);
            }
        }

        // Bind the default params.
        let params = this.getParameters();
        for (let [paramName, param] of Object.entries(params)) {
            bindParam(gl, param, renderstate, this.__gltextures);
        }

        return true;
    }

    unbind(renderstate) {
        return true;
    }


    ///////////////////////////////////
    // Destroy

    destroy() {
        let gl = this.__gl;
        for (let key in this.__shaderProgramHdls) {
            let shaderCompilationResult = this.__shaderProgramHdls[key];
            gl.deleteProgram(shaderCompilationResult.shaderProgramHdl);
        }
        this.__shaderProgramHdls = {};
    }
};

export {
    GLShader,
    bindParam
};
// export default GLShader;