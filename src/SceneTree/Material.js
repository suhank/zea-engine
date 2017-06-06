import { Color } from '../Math/Color';
import { Signal } from '../Math/Signal';
import { Image2D } from './Image2D.js';
import { Shader } from './Shader.js';

class Material extends Shader {
    constructor(name) {
        super(name);
        this.__props = {};

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
        for (let propName in this.__props) {
            let prop = this.__props[propName];
            if (prop instanceof Image2D)
                prop.removeRef(this);
        }
    }

    copyFrom(srcMaterial){
        for (let propName in this.__props) {
            let prop = this.__props[propName];
            let srcProp = srcMaterial.getParameter(propName)
            if (srcProp != undefined)
                this.__props[propName] = srcProp;
        }
    }


    get textures() {
        let textures = {};
        for (let propName in this.__props) {
            let prop = this.__props[propName];
            if (prop instanceof Image2D)
                textures[propName] = prop
        }
        return textures;
    }

    addParameter(name, defaultValue, texturable=true) {
        this.__props['_'+name] = defaultValue;
        let get, set;
        if(texturable){
            this.__props['_'+name+'Tex'] = undefined;
            this.__props['_'+name+'TexConnected'] = false;
            get = ()=>{ 
                    if(this.__props['_'+name+'TexConnected'])
                        return this.__props['_'+name+'Tex'];
                    else
                        return this.__props['_'+name];
                };
            set = (val)=>{
                if (val instanceof Image2D){
                    let texture = val;
                    if (this.__props['_'+name+'TexConnected'] && this.__props['_'+name+'Tex'] === texture){
                        this.__props['_'+name+'Tex'].removeRef(this);
                        this.textureDisconnected.emit(name);
                    }
                    texture.addRef(this);
                    this.__props['_'+name+'TexConnected'] = true;
                    this.__props['_'+name+'Tex'] = texture;
                    texture.updated.connect(()=>{
                        this.__props['_'+name+'TexConnected'] = true;
                        this.__props['_'+name+'Tex'] = texture;
                        this.updated.emit();
                    });
                    this.textureConnected.emit(name);
                }
                else{
                    if (this.__props['_'+name+'TexConnected']){
                        this.__props['_'+name+'Tex'].removeRef(this);
                        this.textureDisconnected.emit(name);
                        this.updated.emit();
                    }
                    this.__props['_'+name+'TexConnected'] = false;
                    this.__props['_'+name] = val;
                }
                this.updated.emit();
            };
        }
        else{
            get = ()=>{ 
                    return this.__props['_'+name];
                };
            set = (val)=>{
                this.__props['_'+name] = val;
                this.updated.emit();
            };
        }
        Object.defineProperty(this, name, {
            'configurable': false,
            'enumerable': true,
            'get': get,
            'set': set
        });
    }

    getParameter(name) {
        return this.__props[name];
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
        let props = this.__props;
        for(let key in json){
            let propName = '_'+key;
            if(propName in props){
                if(props[propName] instanceof Color)
                    props[propName].fromJSON(json[key]);
                else{
                    props[propName] = json[key];
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
                value.applyGamma(2.2);
            }
            else{
                value = reader.loadFloat32();
            }
            let textureName = reader.loadStr();
            if('_'+paramName in this.__props){
                this.__props['_'+paramName] = value;
                if(textureName != ''){
                    this.__props['_'+paramName+'Tex'] = textureLibrary[textureName];
                    this.__props['_'+name+'TexConnected'] = true;
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