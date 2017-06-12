import {
    Signal,
    hashStr
} from '../Math';
import {
    RefCounted,
    MaterialParam,
    sgFactory
} from '../SceneTree';

///////////////////////////////////
// Shader

class Shader extends RefCounted {
    constructor(name, filePath) {
        super();
        if (name == undefined)
            this.name = this.constructor.name;
        else
            this.name = name;
        // console.log("Shader:" + this.name);

        this.updated = new Signal();

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
    }

    isTransparent() {
        return false;
    }

    get loaded() {
        return true;
    }

    get vertexShader() {
        return this.__shaderStages['VERTEX_SHADER'].glsl;
    }

    get fragmentShader() {
        return this.__shaderStages['FRAGMENT_SHADER'].glsl;
    }

    //////////////////////
    // 

    addParameter(paramName, defaultValue, texturable = true) {
        let param = new MaterialParam(paramName, defaultValue);
        let get = () => {
            return param.getValue();
        };
        let set = (value) => {
            param.setValue(value);
            this.updated.emit();
        };
        Object.defineProperty(this, paramName, {
            'configurable': false,
            'enumerable': true,
            'get': get,
            'set': set
        });

        // param.textureConnected.connect(this.textureConnected.emit);
        // param.textureDisconnected.connect(this.textureDisconnected.emit);
        // param.parameterChanged.connect(this.updated.emit);
        this.__params[paramName] = param;
    }

    getParameters() {
        return this.__params;
    }

    getParameter(index) {
        return this.__params[index];
    }

    ////////////////////////////

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
        let hash = 0;
        for (let stageName in this.__shaderStages) {
            let shaderStageBlock = this.__shaderStages[stageName];
            hash = ((hash << 5) - hash) + hashStr(shaderStageBlock['glsl']);
        }
        this.__hash = Math.abs(hash);
    }

    get hash() {
        return this.__hash;
    }

    bind(gl, renderstate) {
        return true;
    }
}

export {
    Shader
};
// Shader;