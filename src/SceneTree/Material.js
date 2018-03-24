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
    Image2D
} from './Image2D.js';
import {
    RefCounted
} from './RefCounted.js';
import {
    Parameter,
    NumberParameter,
    Vec2Parameter,
    Vec3Parameter,
    ColorParameter
} from './Parameters';

let makeParameterTexturable = (parameter) => {
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
    
    parameter.setImage = (value) => {
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
            parameter.valueChanged.emit(image);
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
        if (value instanceof Image2D) {
            parameter.setImage(value);
        } else {
            if (image != undefined) {
                parameter.setImage(undefined);
            }
            basesetValue(value);
        }
    }

    // Invoke the setter so if the value is a texture, the parmater is updated.
    parameter.setValue(basegetValue());
};


class Material extends BaseItem {
    constructor(name, shaderName) {
        super(name);
        this.__shaderName = shaderName;

        this.updated = new Signal();
        this.textureConnected = new Signal();
        this.textureDisconnected = new Signal();
        this.shaderNameChanged = new Signal();
    }

    getShaderName() {
        return this.__shaderName;
    }

    setShaderName(shaderName) {
        this.__shaderName = shaderName;
        this.shaderNameChanged.emit(this.__shaderName);
    }

    destroy() {
        this.removeAllTextures();
        super.destroy();
    }

    removeAllTextures() {
        for (let paramName in this.__params) {
            if (this.__params[paramName].getImage()) {
                this.__params[paramName].getImage().removeRef(this);
                this.__params[paramName].setImage(undefined);
            }
        }
    }

    copyFrom(srcMaterial) {
        for (let paramName in this.__params) {
            let prop = this.__params[paramName];
            let srcParam = srcMaterial.getParameter(paramName)
            if (srcParam != undefined)
                this.__params[paramName] = srcParam;
        }
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
        param.textureConnected.connect(this.textureConnected.emit);
        param.textureDisconnected.connect(this.textureDisconnected.emit);
    }

    addParameter(paramName, defaultValue) {
        let image;
        if (defaultValue instanceof Image2D) {
            image = defaultValue;
            defaultValue = new Color();
        }
        let param = super.addParameter(paramName, defaultValue);
        param.valueChanged.connect(this.updated.emit);
        if(!param.setImage)
            this.__makeParameterTexturable(param);
        if (image) {
            param.setImage(image)
        }
        return param;
    }

    addParameterInstance(param) {
        super.addParameterInstance(param);
        this.__makeParameterTexturable(param);
        return param;
    }

    isTransparent() {
        let opacity = this.getParameter('opacity');
        if (opacity && (opacity.getValue() < 0.99 || opacity.getImage()))
            return true;
        let baseColor = this.getParameter('baseColor');
        if (baseColor && baseColor.getImage() && baseColor.getImage().channels == 'RGBA')
            return true;
        return false;
    }

    //////////////////////////////////////////
    // Persistence

    toJSON() {
        return super.toJSON();
    }

    fromJSON(j) {
        super.fromJSON(j);
        let props = this.__params;
        for (let key in j) {
            let value;
            if (j[key] instanceof Object) {
                value = new Color();
                value.fromJSON(j[key]);
            } else {
                value = j[key];
            }
            this.addParameter(paramName, value);
        }
    }

    readBinary(reader, flags, textureLibrary) {
        super.readBinary(reader, flags);

        const numParams = reader.loadUInt32();
        for (let i = 0; i < numParams; i++) {
            const paramName = reader.loadStr();
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
            const param = this.addParameter(paramName, value);
            const textureName = reader.loadStr();
            if (textureLibrary[textureName]) {
                // console.log(paramName +":" + textureName + ":" + textureLibrary[textureName].resourcePath);
                param.setValue(textureLibrary[textureName]);
            }
            else if(textureName!= ''){
                console.warn("Missing Texture:" + textureName)
            }
        }
    }

};
export {
    makeParameterTexturable,
    Material
};
// Material;