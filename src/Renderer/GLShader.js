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
    RefCounted,
    Image2D,
    HDRImage2D,
    makeParameter,
    makeParameterTexturable
} from '../SceneTree';
import {
    shaderLibrary
} from './ShaderLibrary.js';
import {
    GLTexture2D
} from './GLTexture2D.js';

let bindParam = (gl, param, renderstate, gltextures={})=>{
    let name =  param.getName();
    let value =  param.getValue();
    let unifName = '_'+name;
    // console.log("bindParam:" + name + ":" + value);
    if(value instanceof Image2D){
        let gltexture = gltextures[name];
        let textureUnifName = unifName+'Tex';
        if (gltexture && gltexture.isLoaded() && renderstate.unifs[textureUnifName]){
            // console.log("bindParam:"+name + ": gltexture" );
            gltexture.bindTexture(renderstate, textureUnifName);
            return;
        }
        return;
    }
    let unif = renderstate.unifs[unifName];
    if (unif == undefined)
        return;
    let textureConnctedUnif = renderstate.unifs['_'+name+'TexConnected'];
    if (textureConnctedUnif){
        gl.uniform1i(textureConnctedUnif.location, 0);
    }
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

class GLShader extends RefCounted {
    constructor(gl) {
        super();
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

        this.__params = [];
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

    //////////////////////
    // 

    addParameter(paramName, defaultValue, texturable = true) {
        let param = makeParameter(paramName, defaultValue);
        this.addParameterInstance(param);
        return param;
    }

    addParameterInstance(param, texturable = true) {
        if(texturable) {
            makeParameterTexturable(param);
            // Note: GLShader does not have textureConnected signal etc..
            // param.textureConnected.connect(this.textureConnected.emit);
            // param.textureDisconnected.connect(this.textureDisconnected.emit);
            // param.valueChanged.connect(this.updated.emit);
        }
        this.__params[param.getName()] = param;
    }

    getParameters() {
        return this.__params;
    }

    getParameter(index) {
        return this.__params[index];
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
            for (let i in errors) {
                if (errors[i].startsWith("'")) {
                    errors[i - 1] = errors[i - 1] + errors[i];
                    delete errors[i];
                    i--;
                    continue;
                }
                let parts = errors[i].split(':');
                if (parts.length >= 2) {
                    let shaderHash = parts[1].trim();
                    let shaderName = shaderLibrary.getShaderNameFromHash(shaderHash);
                    parts[1] = shaderName;
                    errors[i] = parts.join(':');
                    let lineNum = parseInt(parts[2]); // TODO check against ATI and intel cards
                    if (!isNaN(lineNum)) {
                        // find the line where this error occured and display it. 
                        let buggyLines = [];
                        for (let j = -3; j < 3; j++) {
                            if (j == 0)
                                buggyLines.push(">>>" + shaderLibrary.getLine(shaderName, lineNum));
                            else
                                buggyLines.push(shaderLibrary.getLine(shaderName, lineNum + j))
                        }
                        errors[i] = parts.join(':\n') + buggyLines.join('\n');
                    }
                }
                console.log(errors[i]);
            }
            console.warn("An error occurred compiling the shader '" + this.constructor.name + "." + name + "': \n\n" + errors.join('\n'));
            console.warn(glsl);
            return null;
        }
        return shaderHdl;
    }

    __createProgram(preproc) {
        let gl = this.__gl;
        this.__shaderCompilationAttempted = true;
        let shaderProgramHdl = gl.createProgram();
        let vertexShaderGLSL = this.__shaderStages['VERTEX_SHADER'].glsl;
        if (vertexShaderGLSL != undefined) {
            if (preproc) {
                if (preproc.repl) {
                    for (let key in preproc.repl)
                        vertexShaderGLSL = vertexShaderGLSL.replaceAll(key, preproc.repl[key]);
                }
                if (preproc.defines)
                    vertexShaderGLSL = preproc.defines + vertexShaderGLSL;
            }
            let vertexShader = this.__compileShaderStage(vertexShaderGLSL, gl.VERTEX_SHADER, 'vertexShader', preproc);
            if (!vertexShader) {
                return false;
            }
            gl.attachShader(shaderProgramHdl, vertexShader);
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
            let fragmentShader = this.__compileShaderStage(fragmentShaderGLSL, gl.FRAGMENT_SHADER, 'fragmentShader', preproc);
            if (!fragmentShader) {
                return false;
            }
            gl.attachShader(shaderProgramHdl, fragmentShader);
        }
        gl.linkProgram(shaderProgramHdl);

        if (!gl.getProgramParameter(shaderProgramHdl, gl.LINK_STATUS)) {
            console.warn("Unable to initialize the shader program.");
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
                        console.warn(this.constructor.name + " uniform found in shader code but not in compiled program:" + uniformName);
                        continue;
                    }
                    result.unifs[structMemberName] = {
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
                console.warn(this.constructor.name + " uniform found in shader code but not in compiled program:" + uniformName);
                continue;
            }
            result.unifs[uniformName] = {
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
                let gltexture;
                if (texture instanceof HDRImage2D || texture.format === "FLOAT"){
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
            let value =  param.getValue();
            if(value instanceof Image2D){
                if (paramName in this.__gltextures && this.__gltextures[paramName].getTexture() == value)
                    continue;
                attachTexture(paramName, value);
            }
        }
    }


    compileForTarget(key, preproc) {
        if(!key){
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

        renderstate.unifs = shaderCompilationResult.unifs;
        renderstate.attrs = shaderCompilationResult.attrs;

        let unifs = shaderCompilationResult.unifs;
        if ('viewMatrix' in unifs){
            gl.uniformMatrix4fv(unifs.viewMatrix.location, false, renderstate.viewMatrix.asArray());
        }
        if ('cameraMatrix' in unifs){
            gl.uniformMatrix4fv(unifs.cameraMatrix.location, false, renderstate.cameraMatrix.asArray());
        }
        if ('projectionMatrix' in unifs){
            gl.uniformMatrix4fv(unifs.projectionMatrix.location, false, renderstate.projectionMatrix.asArray());
        }
        if ('atlasEnvMap_image' in unifs && renderstate.envMap != undefined) {
            renderstate.envMap.bindforReading(renderstate);
        }
        if ('exposure' in unifs){
            gl.uniform1f(unifs.exposure.location, renderstate.exposure ? renderstate.exposure : 1.0);
        }
        if ('eye' in unifs){
            // Left or right eye, when rendering sterio VR.
            gl.uniform1i(unifs.eye.location, renderstate.eye);
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