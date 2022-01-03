import { Registry } from '../../Registry';
import { ColorParameter } from './ColorParameter';
import { BaseImage } from '../BaseImage';
/**
 * Represents a specific type of parameter, that stores `Color` and `BaseImage` texture values.
 *
 * i.e.:
 * ```javascript
 * const image = new LDRImage();
 * image.load("https://storage.googleapis.com/zea-playground-assets/zea-engine/texture.png")
 *
 * const matColorParam = new MaterialColorParam('MyMaterialColor', new Color(0, 254, 2))
 * matColorParam.setImage(image)
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(matColorParam)
 * ```
 *
 * **Events**
 * * **valueChanged:** Triggered every time the Image value changes
 * * **textureDisconnected:** Triggered when Image value is cleaned/removed.
 * * **textureConnected:** Triggered when the Image value is set.
 *
 * @extends ColorParameter
 */
// TODO: should MaterialColorParam have these parameters below? I'm assuming no.
// class MaterialColorParam extends Parameter {
//   constructor() {
//     super()
//     this.__shaderName = 'StandardSurfaceShader'
//     this.addParameter('BaseColor', new MaterialColorParam(1.0, 1, 0.5))
//     this.addParameter('AmbientOcclusion', new MaterialFloatParam(1, [0, 1]))
//     this.addParameter('Metallic', new MaterialFloatParam(0.5, [0, 1]))
//     this.addParameter('Reflectance', new NumberParameter(0.5, [0, 1]))
//     this.addParameter('Normal', new MaterialColorParam(1.0, 1, 0.5))
//     this.addParameter('EmissiveStrength', new NumberParameter(0.5, [0, 1]))
//     this.addParameter('Opacity', new MaterialFloatParam(0.5, [0, 1]))
//   }
//   get value() : Color {
//     return this.__value
//   }
//   set value() : Color {
//     return this.__value
//   }
// }
class MaterialColorParam extends ColorParameter {
    /**
     * Create a material color parameter.
     * @param name - The name of the material color parameter.
     * @param value - The value of the parameter.
     */
    constructor(name, value) {
        super(name, value);
        this.listenerIDs = {};
    }
    /**
     * Returns `BaseImage` texture of the Material.
     *
     * @return - The return value.
     */
    getImage() {
        return this.image;
    }
    /**
     * The imageUpdated method.
     * @private
     */
    imageUpdated() {
        this.emit('valueChanged');
    }
    /**
     * Sets `BaseImage` texture value in parameter.
     *
     * @param value - The value param.
     */
    setImage(value) {
        const disconnectImage = () => {
            if (this.image) {
                this.image.removeListenerById('loaded', this.listenerIDs['loaded']);
                this.image.removeListenerById('updated', this.listenerIDs['updated']);
                this.image = undefined;
            }
            this.emit('textureDisconnected');
        };
        if (value) {
            if (this.image != undefined && this.image !== value) {
                disconnectImage();
            }
            this.image = value;
            this.listenerIDs['updated'] = this.image.on('updated', () => {
                this.imageUpdated();
            });
            this.emit('textureConnected');
            this.emit('valueChanged');
        }
        else {
            if (this.image != undefined) {
                disconnectImage();
                this.image = undefined;
                this.emit('textureDisconnected');
            }
        }
    }
    /**
     * Sets `Color` or the `BaseImage` texture value in parameter.
     *
     * @param value - The value param.
     */
    setValue(value) {
        // Note: instead of supporting images or colors, we should replace the ColorParameter with an ImageParameter when assigning textures
        // console.warn('@todo-review: Should we accept different type of values?')
        if (value instanceof BaseImage) {
            this.setImage(value);
        }
        else {
            super.setValue(value);
        }
    }
    /**
     * Extracts `Color` and `Image` values from a buffer, updating current parameter state.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader, context) {
        super.readBinary(reader, context);
        const textureName = reader.loadStr();
        if (textureName != '') {
            this.setImage(context.assetItem.materialLibrary.getImage(textureName));
        }
    }
    /**
     * The clone method constructs a new material color parameter,
     * copies its values from this parameter and returns it.
     *
     * @return - Returns a new cloned material color parameter.
     */
    clone() {
        var _a;
        const clonedParam = new MaterialColorParam(this.name, (_a = this.__value) === null || _a === void 0 ? void 0 : _a.clone());
        return clonedParam;
    }
}
Registry.register('MaterialColorParam', MaterialColorParam);
export { MaterialColorParam };
//# sourceMappingURL=MaterialColorParam.js.map