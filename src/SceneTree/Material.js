import { Color } from '../Math/Color';
import { Signal } from '../Math/Signal';
import { Image2D } from './Image2D.js';
import { Shader } from './Shader.js';


class MaterialParam {
    constructor(value) {
        this.value = value;
        this.texture = undefined;
    }
};


class Material extends Shader {
    constructor(name) {
        super(name);
        this.__params = {};

        this.__metaData = new Map();

        this.textureConnected = new Signal();
        this.textureDisconnected = new Signal();
        this.parameterChanged = new Signal();
        this.destructing = new Signal();
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


    get textures() {
        let textures = {};
        for (let paramName in this.__params) {
            if(this.__params[paramName].texture != undefined)
                textures[paramName] = this.__params[paramName].texture;
        }
        return textures;
    }

    addParameter(paramName, defaultValue, texturable=true) {
        this.__params[paramName] = new MaterialParam(defaultValue);
        let get, set;
        if(texturable){
            get = ()=>{ 
                    if(this.__params[paramName].texture != undefined)
                        return this.__params[paramName].texture;
                    else
                        return this.__params[paramName].value;
                };
            set = (value)=>{
                if (value instanceof Image2D){
                    if(this.__params[paramName].texture != undefined && this.__params[paramName].texture !== value) {
                        this.__params[paramName].texture.removeRef(this);
                        this.textureDisconnected.emit(paramName);
                    }
                    texture.addRef(this);
                    this.__params[paramName].texture = value;
                    texture.updated.connect(()=>{
                        this.__params[paramName].texture = value;
                        this.updated.emit();
                    });
                    this.textureConnected.emit(paramName);
                }
                else{
                    if(this.__params[paramName].texture != undefined) {
                        this.__params[paramName].texture.removeRef(this);
                        this.textureDisconnected.emit(paramName);
                        this.updated.emit();
                    }
                    this.__params[paramName].texture = undefined;
                    this.__params[paramName].value = value;
                }
                this.updated.emit();
            };
        }
        else{
            get = ()=>{ 
                    return this.__params[paramName].value;
                };
            set = (val)=>{
                this.__params[paramName].value = value;
                this.updated.emit();
            };
        }
        Object.defineProperty(this, paramName, {
            'configurable': false,
            'enumerable': true,
            'get': get,
            'set': set
        });
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
            let paramName = '_'+key;
            if(paramName in props){
                if(props[paramName] instanceof Color)
                    props[paramName].fromJSON(json[key]);
                else{
                    props[paramName] = json[key];
                }
            }
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
                ///value.applyGamma(2.2);
            }
            else{
                value = reader.loadFloat32();
            }
            let textureName = reader.loadStr();
            if(paramName in this.__params){
                this.__params[paramName].value = value;
                console.log(paramName +":" + value);
                if(textureName != ''){
                    console.log(paramName +":" + textureName + ":" + textureLibrary[textureName].resourcePath);
                    //if(paramName == 'baseColor')
                        this.__params[paramName].texture = textureLibrary[textureName];
                }
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
    Material
};
// Material;