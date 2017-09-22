import {
    Vec2,
    Vec3,
    Color,
    Signal
} from '../Math';
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


let makeParameter = (paramName, defaultValue, texturable) => {
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    let param;
    if (isNumeric(defaultValue)) {
        param = new NumberParameter(paramName, defaultValue);
    } else if (defaultValue instanceof Vec2) {
        param = new Vec2Parameter(paramName, defaultValue);
    } else if (defaultValue instanceof Vec3) {
        param = new Vec3Parameter(paramName, defaultValue);
    } else if (defaultValue instanceof Color || defaultValue instanceof Image2D) {
        if (defaultValue instanceof Image2D)
            throw ("Please add basi param and thne set value to texture.")
        param = new ColorParameter(paramName, defaultValue);
    } else {
        param = new Parameter(paramName, defaultValue);
    }
    // if(texturable) {
    //     makeParameterTexturable(param);
    // }
    return param;
}


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

    parameter.setImage = (value) => {
        let imageUpdated = () => {
            parameter.valueChanged.emit(image);
        }
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
        parameter.setImage();
        if (value instanceof Image2D) {
            parameter.setImage(value);
        } else {
            if (image != undefined) {
                parameter.setImage(value);
            }
            basesetValue(value);
        }
    }

    // Invoke the setter so if the value is a texture, the parmater is updated.
    parameter.setValue(basegetValue());
};

// class MaterialParameter extends Parameter {
//     constructor(name, value) {
//         super(name, value)
//         this.name = name;
//         this.__texture = undefined;
//         this.textureConnected = new Signal();
//         this.textureDisconnected = new Signal();
//         this.valueChanged = new Signal();

//         // Invoke the setter so if the value is a texture, the parmater is updated.
//         this.setValue(value);
//     }

//     getValue() {
//         if (this.__texture != undefined)
//             return this.__texture;
//         else
//             return this.__value;
//     }

//     setValue(value) {
//         if (value instanceof Image2D) {
//             if (this.__texture != undefined && this.__texture !== value) {
//                 this.__texture.removeRef(this);
//                 this.textureDisconnected.emit(this);
//             }
//             this.__texture.addRef(this);
//             this.__texture.updated.connect(() => {
//                 this.valueChanged.emit(this.__texture);
//             });
//             this.textureConnected.emit(this);
//             this.__texture = value;
//         } else {
//             if (this.__texture != undefined) {
//                 this.__texture.removeRef(this);
//                 this.__texture = undefined;
//                 this.textureDisconnected.emit(this);
//             }
//             this.__value = value;
//         }
//         this.valueChanged.emit(value);
//     }
// };


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


    getParamTextures() {
        let textures = {};
        for (let paramName in this.__params) {
            if (this.__params[paramName].getImage())
                textures[paramName] = this.__params[paramName].getImage();
        }
        return textures;
    }

    addParameter(paramName, defaultValue, texturable = true) {
        let image;
        if (defaultValue instanceof Image2D) {
            image = defaultValue;
            defaultValue = new Color();
        }
        let param = makeParameter(paramName, defaultValue);
        this.addParameterInstance(param, true);
        if (image) {
            param.setImage(image)
        }
        return param;
    }

    addParameterInstance(param, texturable = true) {
        if (texturable) {
            makeParameterTexturable(param);
            param.textureConnected.connect(this.textureConnected.emit);
            param.textureDisconnected.connect(this.textureDisconnected.emit);
            param.valueChanged.connect(this.updated.emit);
        }
        this.__params[param.getName()] = param;
    }

    getParameters() {
        return this.__params;
    }

    getParameter(paramName) {
        return this.__params[paramName];
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
        let json = {
            "name": this.name

        };
        return json
    }

    fromJSON(json) {
        this.__name = json.name;
        let props = this.__params;
        for (let key in json) {
            let value;
            if (json[key] instanceof Object) {
                value = new Color();
                value.fromJSON(json[key]);
            } else {
                value = json[key];
            }
            this.addParameter(paramName, value);
        }
    }

    readBinary(reader, flags, textureLibrary) {
        // super.readBinary(reader, flags);
        let type = reader.loadStr();
        this.name = reader.loadStr();

        let numParams = reader.loadUInt32();
        for (let i = 0; i < numParams; i++) {
            let paramName = reader.loadStr();
            let paramType = reader.loadStr();
            let value;
            if (paramType == "MaterialColorParam") {
                value = reader.loadRGBAFloat32Color();
                // If the value is in linear space, then we should convert it to gamma space.
                // Note: !! this should always be done in preprocessing...
                value.applyGamma(2.2);
            } else {
                value = reader.loadFloat32();
            }
            let param = this.addParameter(paramName, value);
            let textureName = reader.loadStr();
            // console.log(paramName +":" + value);
            if (textureName != '') {
                // console.log(paramName +":" + textureName + ":" + textureLibrary[textureName].resourcePath);
                param.setValue(textureLibrary[textureName]);
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
    makeParameter,
    makeParameterTexturable,
    Material
};
// Material;