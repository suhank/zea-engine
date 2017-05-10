import { Signal } from '../Math/Signal';
import { hashStr } from '../Math';
import { RefCounted } from './RefCounted.js';

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
                'glsl':"",
                'lines': 0,
                'uniforms':{},
                'attributes':{}
            },
            'FRAGMENT_SHADER': {
                'glsl':"",
                'lines': 0,
                'uniforms':{},
                'attributes':{}
            }
        };
    }

    get loaded() {
        return true;
    }

    get vertexShader(){
        return this.__shaderStages['VERTEX_SHADER'].glsl;
    }

    get fragmentShader(){
        return this.__shaderStages['FRAGMENT_SHADER'].glsl;
    }

    getAttributes() {
        let attributes = {};
        for (let stageName in this.__shaderStages){
            let shaderStageBlock = this.__shaderStages[stageName];
            for (let attrName in shaderStageBlock['attributes'])
                attributes[attrName] = shaderStageBlock['attributes'][attrName];
        }
        return attributes;
    }

    getUniforms() {
        let uniforms = {};
        for (let stageName in this.__shaderStages){
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

    fromJSON(json) {

    }

    toJSON(json) {
        let result = {
            "vertexShader": this.tree['vertexShader'],
            "fragmentShader": this.tree['fragmentShader'],
            "attributes": {},
            "uniforms": {}
        }
        let attributes = this.getAttributes();
        let uniforms = this.getUniforms();
        for (let name in attributes)
            result["attributes"][name] = attributes[name].name;
        for (let name in uniforms)
            result["uniforms"][name] = uniforms[name].name;
        return result;
    }

    toString() {
        return JSON.stringify(this.toJSON(), null, 2);
    }
}

export {
    Shader
};
// Shader;