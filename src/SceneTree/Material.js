import {
    Vec2,
    Vec3,
    Color
} from '../Math';
import {
    Signal
} from '../Utilities';
import {
    BaseItem
} from './BaseItem.js';
import {
    BaseImage
} from './BaseImage.js';
import {
    sgFactory
} from './SGFactory.js';
import {
    Parameter,
    NumberParameter,
    Vec2Parameter,
    Vec3Parameter,
    ColorParameter
} from './Parameters';

const generateParameterInstance = (paramName, defaultValue)=>{

    let param;
    if (typeof defaultValue == 'boolean' || defaultValue === false || defaultValue === true) {
        param = new Parameter(paramName, defaultValue, 'Boolean');
    } else if (typeof defaultValue == 'string') {
        param = new Parameter(paramName, defaultValue, 'String');
    } else if (Number.isNumeric(defaultValue)) {
        param = new NumberParameter(paramName, defaultValue);
    } else if (defaultValue instanceof Vec2) {
        param = new Vec2Parameter(paramName, defaultValue);
    } else if (defaultValue instanceof Vec3) {
        param = new Vec3Parameter(paramName, defaultValue);
    } else if (defaultValue instanceof Color) {
        param = new ColorParameter(paramName, defaultValue);
    } else {
        param = new Parameter(paramName, defaultValue);
    }
    return param;
}

const makeParameterTexturable = (parameter) => {
    let image = undefined;
    parameter.textureConnected = new Signal();
    parameter.textureDisconnected = new Signal();

    let basegetValue = parameter.getValue;
    parameter.getValue = (getTexIfAvailable = true) => {
        if (getTexIfAvailable && image != undefined)
            return image;
        else
            return basegetValue();
    }
    parameter.getImage = () => {
        return image;
    }

    let imageUpdated = () => {
        parameter.valueChanged.emit(image);
    }
    
    parameter.setImage = (value, mode=0) => {
        let disconnectImage = () => {
            image.removeRef(parameter);
            image.loaded.disconnect(imageUpdated);
            image.updated.disconnect(imageUpdated);
            parameter.textureDisconnected.emit();
        }
        if (value) {
            if (image != undefined && image !== value) {
                disconnectImage();
            }
            image = value;
            image.addRef(parameter);
            image.loaded.connect(imageUpdated);
            image.updated.connect(imageUpdated);
            parameter.textureConnected.emit();
            parameter.valueChanged.emit(mode);
        } else {
            if (image != undefined) {
                disconnectImage();
                image = undefined;
                parameter.textureDisconnected.emit();
            }
        }
    }

    let basesetValue = parameter.setValue;
    parameter.setValue = (value) => {
        if (value instanceof BaseImage) {
            parameter.setImage(value);
        } else {
            if (image != undefined) {
                parameter.setImage(undefined);
            }
            basesetValue(value);
        }
    }

    // Invoke the setter so if the value is a texture, the parmater is updated.
    // Can we avoid this? it flags the parameter as edited.
    // parameter.setValue(basegetValue());
};


class Material extends BaseItem {
    constructor(name, shaderName) {
        super(name);

        // this.updated = new Signal();
        this.textureConnected = new Signal();
        this.textureDisconnected = new Signal();
        this.shaderNameChanged = new Signal();

        if(shaderName)
            this.setShaderName(shaderName);
    }

    getShaderName() {
        return this.__shaderName;
    }

    setShaderName(shaderName) {

        if(this.__shaderName == shaderName)
            return;

        const shaderClass = sgFactory.getClass(shaderName);
        if(!shaderClass)
            throw("Error setting Shader. Shader not found:" + shaderName);
        
        const paramDescs = shaderClass.getParamDeclarations();
        for(let desc of paramDescs) {
            // Note: some shaders specify default images. Like the speckle texture
            // on the car paint shader.
            // let image;
            // let defaultValue = desc.defaultValue;
            // if (desc.defaultValue instanceof BaseImage) {
            //     image = desc.defaultValue;
            //     defaultValue = new Color();
            // }
            let param = this.getParameter(desc.name);
            // if(param && param.getType() != desc.defaultValue)
            // removePArameter
            if(!param)
                param = this.addParameter(generateParameterInstance(desc.name, desc.defaultValue));
            if(desc.texturable != false) {// By default, parameters are texturable. texturable must be set to false to disable texturing.
                if(!param.getImage)  
                    this.__makeParameterTexturable(param);
                // if(image)
                //     param.setImage(image)
            }


        }
        this.__shaderName = shaderName;
        this.shaderNameChanged.emit(this.__shaderName);
    }

    destroy() {
        this.removeAllTextures();
        super.destroy();
    }

    removeAllTextures() {
        for (let param of this.__params) {
            if (param.getImage && param.getImage()) {
                param.getImage().removeRef(this);
                param.setImage(undefined);
            }
        }
    }

    clone() {
        const cloned = new GeomItem();
        this.copyTo(cloned);
        return cloned;
    }

    copyTo(cloned) {
        super.copyTo(cloned);
        cloned.setShaderName(this.getShaderName())
        for (let param of this.__params) {
            let srcParam = cloned.getParameter(param.getName())
            if (srcParam == undefined)
                cloned.addParameter(srcParam.clone());
            else {
                const value = param.getValue();
                srcParam.setValue(value.clone ? value.clone() : value)
            }
        }
    }


    ///////////////////////////////
    // Parameters

    getParamTextures() {
        let textures = {};
        for (let param of this.__params) {
            if (param.getImage && param.getImage())
                textures[param.getName()] = param.getImage();
        }
        return textures;
    }


    __makeParameterTexturable(param) {
        makeParameterTexturable(param);
        param.textureConnected.connect(this.textureConnected.emit);
        param.textureDisconnected.connect(this.textureDisconnected.emit);
    }


    isTransparent() {
        let opacity = this.getParameter('Opacity');
        if (opacity && (opacity.getValue() < 0.99 || opacity.getImage()))
            return true;
        let baseColor = this.getParameter('BaseColor');
        if (baseColor && baseColor.getImage() && baseColor.getImage().format == 'RGBA')
            return true;
        return false;
    }

    //////////////////////////////////////////
    // Persistence

    toJSON(context) {
        return super.toJSON(context);
    }

    fromJSON(j, context={}) {
        if(!j.shader){
            console.warn("Invalid Material JSON");
            return;
        }
        this.setShaderName(j.shader)
        super.fromJSON(j, context);
        // let props = this.__params;
        // for (let key in j) {
        //     let value;
        //     if (j[key] instanceof Object) {
        //         value = new Color();
        //         value.fromJSON(j[key]);
        //     } else {
        //         value = j[key];
        //     }
        //     this.addParameter(paramName, value);
        // }
    }

    readBinary(reader, context) {
        super.readBinary(reader, context);

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        const numParams = reader.loadUInt32();
        for (let i = 0; i < numParams; i++) {
            const paramName = capitalizeFirstLetter(reader.loadStr());
            const paramType = reader.loadStr();
            let value;
            if (paramType == "MaterialColorParam") {
                value = reader.loadRGBAFloat32Color();
                // If the value is in linear space, then we should convert it to gamma space.
                // Note: !! this should always be done in preprocessing...
                value.applyGamma(2.2);
            } else {
                value = reader.loadFloat32();
            }
            // console.log(paramName +":" + value);
            let param = this.getParameter(paramName);
            if(param)
                param.setValue(value)
            else
                param = this.addParameter(generateParameterInstance(paramName, value));
            const textureName = reader.loadStr();
            if(textureName!= ''){
                if(!param.setImage)
                    this.__makeParameterTexturable(param);

                if (context.materialLibrary.hasImage(textureName)) {
                    // console.log(paramName +":" + textureName + ":" + context.materialLibrary[textureName].resourcePath);
                    param.setImage(context.materialLibrary.getImage(textureName));
                }
                else {
                    console.warn("Missing Texture:" + textureName)
                }
            }
        }
    }

};
export {
    makeParameterTexturable,
    Material
};
// Material;