import { Signal } from '../Math/Signal';
import { shaderLibrary } from '../SceneTree/ShaderLibrary';

class GLShader {
    constructor(gl, shader) {
        this.__gl = gl;
        this.__shader = shader;
        // This instance of GLShader is only for this hash of the GLSL
        // code. If the code changes, then we generate a new GLShader.
        this.__hash = shader.hash;

        this.__shaderProgramHdls = {};

        this.updated = new Signal();
    }

    compileShaderStage(gl, glsl, stageID, name) {
        // console.log("compileShaderStage:" + this.__shader.name+"."+name + " glsl:\n" + glsl);
        let shaderHdl = gl.createShader(stageID);
        gl.shaderSource(shaderHdl, glsl);

        // Compile the shader program.
        gl.compileShader(shaderHdl);

        // See if it compiled successfully
        if (!gl.getShaderParameter(shaderHdl, gl.COMPILE_STATUS)) {
            console.log("Errors in :" + this.__shader.constructor.name);
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
                        for(let j=-3; j<3; j++){
                            if(j==0)
                                buggyLines.push(">>>"+shaderLibrary.getLine(shaderName, lineNum));
                            else
                                buggyLines.push(shaderLibrary.getLine(shaderName, lineNum+j))
                        }
                        errors[i] = parts.join(':\n') + buggyLines.join('\n');
                    }
                }
                console.log(errors[i]);
            }
            console.warn("An error occurred compiling the shader '" + this.__shader.constructor.name + "." + name + "': \n\n" + errors.join('\n'));
            console.warn(glsl);
            return null;
        }
        return shaderHdl;
    }

    createProgram(preproc) {
        let gl = this.__gl;
        this.__shaderCompilationAttempted = true;
        let shaderProgramHdl = gl.createProgram();
        let vertexShaderGLSL = this.__shader.vertexShader;
        if (vertexShaderGLSL != undefined) {
            if (preproc){
                if (preproc.repl){
                    for(let key in preproc.repl)
                        vertexShaderGLSL = vertexShaderGLSL.replaceAll(key, preproc.repl[key]);
                }
                if (preproc.defines)
                    vertexShaderGLSL = preproc.defines + vertexShaderGLSL;
            }
            let vertexShader = this.compileShaderStage(gl, vertexShaderGLSL, gl.VERTEX_SHADER, 'vertexShader', preproc);
            gl.attachShader(shaderProgramHdl, vertexShader);
        }
        let fragmentShaderGLSL = this.__shader.fragmentShader;
        if (fragmentShaderGLSL != undefined) {
            if (preproc){
                if (preproc.repl){
                    for(let key in preproc.repl)
                        fragmentShaderGLSL = fragmentShaderGLSL.replaceAll(key, preproc.repl[key]);
                }
                if (preproc.defines)
                    fragmentShaderGLSL = preproc.defines + fragmentShaderGLSL;
            }
            let fragmentShader = this.compileShaderStage(gl, fragmentShaderGLSL, gl.FRAGMENT_SHADER, 'fragmentShader', preproc);
            gl.attachShader(shaderProgramHdl, fragmentShader);
        }
        gl.linkProgram(shaderProgramHdl);

        if (!gl.getProgramParameter(shaderProgramHdl, gl.LINK_STATUS)) {
            console.warn("Unable to initialize the shader program.");
            gl.deleteProgram(shaderProgramHdl);
            return false;
        }

        let result = this.extractAttributeAndUniformLocations(gl, shaderProgramHdl, preproc);
        result.shaderProgramHdl = shaderProgramHdl;
        return result;
    }

    extractAttributeAndUniformLocations(gl, shaderProgramHdl, preproc) {
        let attrs = this.__shader.getAttributes();
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
        let unifs = this.__shader.getUniforms();
        for (let uniformName in unifs) {
            let unifType = unifs[uniformName];
            if(unifType instanceof Array){
                for(let member of unifType){
                    let structMemberName = uniformName+'.'+member.name;
                    let location = gl.getUniformLocation(shaderProgramHdl, structMemberName);
                    if (location == undefined) {
                        // console.warn(this.__shader.constructor.name + " uniform not found:" + uniformName);
                        continue;
                    }
                    result.unifs[structMemberName] = {
                        location: location,
                        type: member.type
                    };
                }
            }
            if (preproc){
                if (preproc.repl){
                    for(let key in preproc.repl)
                        uniformName = uniformName.replace(key, preproc.repl[key]);
                }
            }

            let location = gl.getUniformLocation(shaderProgramHdl, uniformName);
            if (location == undefined) {
                // console.warn(this.__shader.constructor.name + " uniform not found:" + uniformName);
                continue;
            }
            result.unifs[uniformName] = {
                location: location,
                type: unifType
            };
        }
        return result;
    }

    compileForTarget(key, preproc){
        let shaderCompilationResult = this.__shaderProgramHdls[key];
        if (!shaderCompilationResult) {
            if (shaderCompilationResult !== false) {
                shaderCompilationResult = this.createProgram(preproc);
                this.__shaderProgramHdls[key] = shaderCompilationResult;
            }
        }
        return shaderCompilationResult;
    }

    getUniformLocations(key) {
        let shaderCompilationResult = this.__shaderProgramHdls[key];
        return shaderCompilationResult.unifs;
    }

    getAttributeLocations(key) {
        let shaderCompilationResult = this.__shaderProgramHdls[key];
        return shaderCompilationResult.attrs;
    }

    bind(renderstate, key, preproc) {
        let gl = this.__gl;
        let shaderCompilationResult = this.compileForTarget(key ? key : this.__shader.constructor.name, preproc);
        if (shaderCompilationResult === false) {
            console.warn(this.__shader.constructor.name + " is not compiled for " + key);
            return false;
        }

        let shaderProgramHdl = shaderCompilationResult.shaderProgramHdl;

        gl.useProgram(shaderProgramHdl);
        renderstate.shaderkey = this.__hash;
        renderstate.boundTextures = 0;

        renderstate.unifs = shaderCompilationResult.unifs;
        renderstate.attrs = shaderCompilationResult.attrs;

        let unifs = shaderCompilationResult.unifs;
        if ('viewMatrix' in unifs)
            gl.uniformMatrix4fv(unifs.viewMatrix.location, false, renderstate.viewMatrix.asArray());
        if ('cameraMatrix' in unifs)
            gl.uniformMatrix4fv(unifs.cameraMatrix.location, false, renderstate.cameraMatrix.asArray());
        if ('projectionMatrix' in unifs)
            gl.uniformMatrix4fv(unifs.projectionMatrix.location, false, renderstate.projectionMatrix.asArray());

        if ('atlasEnvMap.image' in unifs && renderstate.envMap != undefined) {
            renderstate.envMap.bindforReading(renderstate);
        }
        if ('exposure' in unifs)
            gl.uniform1f(unifs.exposure.location, renderstate.exposure ? renderstate.exposure : 1.0);

        return true;
    }

    destroy(){
        let gl = this.__gl;
        for(let key in this.__shaderProgramHdls){
            let shaderCompilationResult = this.__shaderProgramHdls[key];
            gl.deleteProgram(shaderCompilationResult.shaderProgramHdl);
        }
        this.__shaderProgramHdls = {};
    }
};

export {
    GLShader
};
// export default GLShader;