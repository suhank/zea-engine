import { Color } from '../Math/Color';
import { Signal } from '../Math/Signal';
import { Image2D } from './Image2D.js';
import { RefCounted } from './RefCounted';

class MaterialParam {
    constructor(name, value) {
        this.name = name;
        this.texture = undefined;
        this.textureConnected = new Signal();
        this.textureDisconnected = new Signal();
        this.parameterChanged = new Signal();

        this.setValue(value);
    }

    getValue() {
        if(this.texture != undefined)
            return this.texture;
        else
            return this.value;
    }
    setValue(value) {
        if (value instanceof Image2D){
            if(this.texture != undefined && this.texture !== value) {
                this.texture.removeRef(this);
                this.textureDisconnected.emit(this);
            }
            this.texture = value;
            this.texture.addRef(this);
            this.texture.updated.connect(()=>{
                this.parameterChanged.emit();
            });
            this.textureConnected.emit(this);
        }
        else{
            if(this.texture != undefined) {
                this.texture.removeRef(this);
                this.texture = undefined;
                this.textureDisconnected.emit(this);
            }
            this.value = value;
        }
        this.parameterChanged.emit();
    }
};


class Material extends RefCounted {
    constructor(name, shaderName) {
        super();
        if (name == undefined)
            this.name = this.constructor.name;
        else
            this.name = name;
        this.__shaderName = shaderName;
        this.__params = {};

        this.__metaData = new Map();

        this.updated = new Signal();
        this.textureConnected = new Signal();
        this.textureDisconnected = new Signal();
        this.shaderNameChanged = new Signal();
        this.destructing = new Signal();
    }

    getShaderName(){
        return this.__shaderName;
    }
    

    setShaderName(shaderName){
        this.__shaderName = shaderName;
        this.shaderNameChanged.emit(this.__shaderName);
    }

    destroy() {
        this.removeAllTextures();
        super.destroy();
    }

    removeAllTextures() {
        for (let paramName in this.__params) {
            if(this.__params[paramName].texture != undefined){
                this.__params[paramName].texture.removeRef(this);
                this.__params[paramName].texture = undefined;
            }
        }
    }

    copyFrom(srcMaterial){
        for (let paramName in this.__params) {
            let prop = this.__params[paramName];
            let srcParam = srcMaterial.getParameter(paramName)
            if (srcParam != undefined)
                this.__params[paramName] = srcParam;
        }
    }


    getParamTextures() {
        let textures = {};
        for (let paramName in this.__params) {
            if(this.__params[paramName].texture != undefined)
                textures[paramName] = this.__params[paramName].texture;
        }
        return textures;
    }

    addParameter(paramName, defaultValue, texturable=true) {
        let param = new MaterialParam(paramName, defaultValue);
        let get = ()=>{ 
            return param.getValue();
        };
        let set = (value)=>{
            param.setValue(value);
            this.updated.emit();
        };
        Object.defineProperty(this, paramName, {
            'configurable': false,
            'enumerable': true,
            'get': get,
            'set': set
        });

        param.textureConnected.connect(this.textureConnected.emit);
        param.textureDisconnected.connect(this.textureDisconnected.emit);
        param.parameterChanged.connect(this.updated.emit);
        this.__params[paramName] = param;

        return param;
    }

    getParameters() {
        return this.__params;
    }

    getParameter(paramName) {
        return this.__params[paramName];
    }

    isTransparent() {
        if ('opacity' in this && (this.opacity < 0.99 || this.opacity instanceof Image2D))
            return true;
        if (this.baseColor && this.baseColor.hasAlpha && this.baseColor.hasAlpha())
            return true;
        return false;
    }

    //////////////////////////////////////////
    // Persistence

    toJSON() {
        let json = {
            "name": this.name

        };
        return json
    }

    fromJSON(json) {
        this.__name = json.name;
        let props = this.__params;
        for(let key in json){
            let value;
            if(json[key] instanceof Object){
                value = new Color();
                value.fromJSON(json[key]);
            }
            else{
                value = json[key];
            }
            this.addParameter(paramName, value);
        }
    }

    readBinary(reader, flags, textureLibrary){
        // super.readBinary(reader, flags);
        let type = reader.loadStr();
        this.name = reader.loadStr();

        let numParams = reader.loadUInt32();
        for(let i=0; i<numParams; i++){
            let paramName = reader.loadStr();
            let paramType = reader.loadStr();
            let value;
            if(paramType == "MaterialColorParam"){
                value = reader.loadRGBAFloat32Color();
                // If the value is in linear space, then we should convert it to gamma space.
                // Note: !! this should always be done in preprocessing...
                value.applyGamma(2.2);
            }
            else{
                value = reader.loadFloat32();
            }
            let param = this.addParameter(paramName, value);
            let textureName = reader.loadStr();
            // console.log(paramName +":" + value);
            if(textureName != ''){
                // console.log(paramName +":" + textureName + ":" + textureLibrary[textureName].resourcePath);
                param.texture = textureLibrary[textureName];
            }
        }
    }
    
    //////////////////////////////////////////
    // Metadata

    getMetadata(key) {
        return this.__metaData.get(key)
    }

    hasMetadata(key) {
        return this.__metaData.has(key)
    }

    setMetadata(key, metaData) {
        this.__metaData.set(key, metaData);
    }

};
export {
    MaterialParam,
    Material
};
// Material;