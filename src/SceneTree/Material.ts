/* eslint-disable require-jsdoc */
/* eslint-disable guard-for-in */
import { Vec2, Vec3, Color } from '../Math/index'
import { BaseItem } from './BaseItem'
import { Registry } from '../Registry'
import {
  Parameter,
  NumberParameter,
  Vec2Parameter,
  Vec3Parameter,
  ColorParameter,
  BooleanParameter,
  StringParameter,
} from './Parameters/index'
import { MathFunctions } from '../Utilities/MathFunctions'

// Explicit export of parameters that are not included in the
// module defined by the index file in the folder. (see Parameters/index.js)
// These parameters depend on classes that ar ParameterOwners.
// TODO: Move to this folder.
import { MaterialFloatParam } from './Parameters/MaterialFloatParam'
import { MaterialColorParam } from './Parameters/MaterialColorParam'
import { BinReader } from './BinReader'
import { GLShader } from '../Renderer/GLShader'

const generateParameterInstance = (paramName: string, defaultValue: any, range: any, texturable: any) => {
  if (typeof defaultValue == 'boolean' || defaultValue === false || defaultValue === true) {
    //return new Parameter(paramName, defaultValue, 'Boolean')
    return new BooleanParameter(paramName, defaultValue) // TODO: check if equivalent
  } else if (typeof defaultValue == 'string') {
    // return new Parameter(paramName, defaultValue, 'String')
    return new StringParameter(paramName, defaultValue) // TODO: check if equivalent
  } else if (MathFunctions.isNumeric(defaultValue)) {
    if (texturable) return new MaterialFloatParam(paramName, defaultValue, range)
    else return new NumberParameter(paramName, defaultValue, range)
  } else if (defaultValue instanceof Vec2) {
    return new Vec2Parameter(paramName, defaultValue)
  } else if (defaultValue instanceof Vec3) {
    return new Vec3Parameter(paramName, defaultValue)
  } else if (defaultValue instanceof Color) {
    if (texturable) return new MaterialColorParam(paramName, defaultValue)
    else return new ColorParameter(paramName, defaultValue)
  } else {
    // return new Parameter(paramName, defaultValue)
    throw Error('no parameter instance created')
  }
}

/**
 * Represents a type of `BaseItem` class that holds material configuration.
 * Use this to apply materials to your assets or item parts.
 *
 * **Events**
 * * **shaderNameChanged:** Triggered when the shader's name is set through `setShaderName` method.
 *
 * @extends BaseItem
 */
class Material extends BaseItem {
  protected __isTransparent: boolean
  protected __isTextured: boolean

  protected __shaderName: string
  protected __params: any[]
  /**
   * Create a material
   * @param {string} name - The name of the material.
   * @param {string} shaderName - Shader's class name.
   */
  constructor(name: string, shaderName: string) {
    super(name)
    this.__isTransparent = false
    this.__isTextured = false

    if (shaderName) this.setShaderName(shaderName)
  }

  /**
   * Getter for the shader name.
   * @return {string} - Returns the shader name.
   */
  getShaderName(): string {
    return this.__shaderName
  }

  /**
   * Sets shader by using the name of the class with the script.
   * It is important that the shader is registered in `Registry`, otherwise it will error.
   * See all classes that extend from `GLShader`.
   *
   * @param {string} shaderName - The shader name.
   */
  setShaderName(shaderName: string) {
    if (this.__shaderName == shaderName) return

    const shaderClass = Registry.getBlueprint(shaderName)
    if (!shaderClass) throw new Error('Error setting Shader. Shader not found:' + shaderName)

    const paramDescs = shaderClass.getParamDeclarations() // TODO
    const paramMap: Record<any, any> = {}
    for (const desc of paramDescs) {
      // Note: some shaders specify default images. Like the speckle texture
      // on the car paint shader.
      // let image;
      // let defaultValue = desc.defaultValue;
      // if (desc.defaultValue instanceof BaseImage) {
      //     image = desc.defaultValue;
      //     defaultValue = new Color();
      // }
      let param = this.getParameter(desc.name)
      // if(param && param.getType() != desc.defaultValue)
      // removeParameter
      if (!param)
        param = this.addParameter(
          generateParameterInstance(desc.name, desc.defaultValue, desc.range, desc.texturable != false)
        )
      // if(desc.texturable != false) {// By default, parameters are texturable. texturable must be set to false to disable texturing.
      //     if(!param.getImage)
      //         this.__makeParameterTexturable(param);
      //     // if(image)
      //     //     param.setImage(image)
      // }

      paramMap[desc.name] = true
    }

    // Remove redundant Params.
    for (const param of this.__params) {
      if (!paramMap[param.getName()]) {
        this.removeParameter(param.getName())
      }
    }

    this.__shaderName = shaderName
    this.__checkTransparency({})
    this.emit('shaderNameChanged', { shaderName })
  }

  /**
   * Remove all textures from Material's parameters.
   */
  removeAllTextures() {
    for (const param of this.__params) {
      if (param.getImage && param.getImage()) {
        // emit a notification so the GLMaterial knows to
        // Remove refs to GLTexture objects.
        param.setImage(undefined)
      }
    }
  }

  // /////////////////////////////
  // Parameters

  /**
   * Returns all texture parameters in current Material.
   *
   * @return {object} - The return value.
   */
  getParamTextures() {
    const textures: Record<any, any> = {}
    for (const param of this.__params) {
      if (param.getImage && param.getImage()) textures[param.getName()] = param.getImage()
    }
    return textures
  }

  /**
   * Checks if the material is transparent by checking the `Opacity` parameter.
   *
   * @return {boolean} - Returns true if the material is transparent.
   */
  isTransparent(): boolean {
    return this.__isTransparent
  }

  __checkTransparency(event?: Record<any, any>) {
    let isTransparent = false
    try {
      const shaderClass = Registry.getBlueprint(this.__shaderName)
      console.warn("Shaders are no longer registered, no transparency check possible")
      // if (shaderClass.isTransparent()) { // TODO: shaders are no longer registered
      //   isTransparent = true
      // }
    } catch (e) {}

    if (!isTransparent) {
      const opacity = <MaterialColorParam | MaterialFloatParam>this.getParameter('Opacity')
      if (opacity && (opacity.getValue() < 0.99 || (opacity.getImage && opacity.getImage()))) {
        isTransparent = true
      } else {
        const baseColor = <MaterialColorParam | MaterialFloatParam>this.getParameter('BaseColor')
        if (baseColor) {
          if (baseColor.getImage && baseColor.getImage() && baseColor.getImage().format == 'RGBA') {
            isTransparent = true
          } else if (baseColor.getValue()) {
            const color_val = <Color>baseColor.getValue()
            if (color_val.a < 1 && typeof baseColor.getValue() != 'number') isTransparent = true
          }
        }
      }
    }

    if (isTransparent != this.__isTransparent) {
      this.__isTransparent = isTransparent
      this.emit('transparencyChanged', { isTransparent })
    }
  }

  /**
   * Checks if the material has a texture applied. The renderer can use this to optimize rendering of non-textured objects
   *
   * @return {boolean} - Returns true if the material is textured.
   */
  isTextured() {
    return this.__isTextured
  }

  __checkTextures(event?: Record<any, any>) {
    // console.log('__checkTextures')
    const param = event ? event : {}

    let isTextured = false
    for (const param of this.__params) {
      if (param.getImage && param.getImage()) {
        isTextured = true
        break
      }
    }
    if (isTextured != this.__isTextured) {
      this.__isTextured = isTextured
      this.emit('texturedChanged', { isTextured, param })
    }
  }

  /**
   * This method can be overridden in derived classes
   * to perform general updates (see GLPass or BaseItem).
   * @param {Record<any, any>} event - The event object emitted by the parameter.
   * @private
   */
  __parameterValueChanged(event: Record<any, any>) {
    this.__checkTransparency(event)
    this.__checkTextures(event)
    super.parameterValueChanged(event)
  }

  /**
   * Returns shaders class of current material, if set. Otherwise it returns `undefined`
   *
   * @return {string|undefined} - The return value.
   */
  getShaderClass() {
    return Registry.getBlueprint(this.getShaderName())
  }

  /**
   * Let you modify or set the shader and all the parameters of current material.
   *
   * @param {Record<any, any>} paramValues - The paramValues.
   * @param {string} shaderName - The shader name.
   */
  modifyParams(paramValues: Record<any, any>, shaderName: string) {
    if (shaderName) this.setShaderName(shaderName)
    for (const paramName in paramValues) {
      const param = this.getParameter(paramName)
      if (param) {
        if (paramValues[paramName] instanceof Parameter) {
          this.replaceParameter(paramValues[paramName])
        } else {
          param.setValue(paramValues[paramName])
        }
      } else {
        // Material Param not found....
        // this.addParameter(paramName, paramValues[paramName]);
      }
    }
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes the current object as a json object.
   *
   * @param {Record<any, any>} context - The context value.
   * @return {any} - Returns the json object.
   */
  toJSON(context: Record<any, any>) {
    const j = super.toJSON(context)
    j.shader = this.__shaderName

    return j
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {Record<any, any>} j - The json object this item must decode.
   * @param {Record<any, any>} context - The context value.
   */
  fromJSON(j: Record<any, any>, context: Record<any, any> = {}) {
    if (!j.shader) {
      console.warn('Invalid Material JSON')
      return
    }
    this.setShaderName(j.shader)
    super.fromJSON(j, context)
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

  /**
   * Sets state of current Item(Including Shaders and Materials) using a binary reader object.
   *
   * @param {BinReader} reader - The reader value.
   * @param {Record<any, any>} context - The context value.
   */
  readBinary(reader: BinReader, context: Record<any, any>) {
    let shaderName = reader.loadStr()

    if (shaderName == 'StandardMaterial') {
      shaderName = 'StandardSurfaceShader'
    }
    if (shaderName == 'TransparentMaterial') {
      shaderName = 'TransparentSurfaceShader'
    }
    this.setShaderName(shaderName)

    // if (context.version < 3) {
    if (context.versions['zea-engine'].compare([0, 0, 3]) < 0) {
      this.setName(reader.loadStr())

      const capitalizeFirstLetter = function (string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      }

      const numParams = reader.loadUInt32()
      for (let i = 0; i < numParams; i++) {
        const paramName = capitalizeFirstLetter(reader.loadStr())
        const paramType = reader.loadStr()
        let value
        if (paramType == 'MaterialColorParam') {
          value = reader.loadRGBAFloat32Color()
          // If the value is in linear space, then we should convert it to gamma space.
          // Note: !! this should always be done in preprocessing...
          value.applyGamma(2.2)
        } else {
          value = reader.loadFloat32()
        }
        const textureName = reader.loadStr()

        // console.log(paramName +":" + value);
        let param = <Parameter<any>>this.getParameter(paramName)
        if (param) param.setValue(value)
        else param = this.addParameter(generateParameterInstance(paramName, value))
        if (textureName != '' && param.setImage) {
          if (context.materialLibrary.hasImage(textureName)) {
            // console.log(paramName +":" + textureName + ":" + context.materialLibrary[textureName].resourcePath);
            param.setImage(context.materialLibrary.getImage(textureName))
          } else {
            console.warn('Missing Texture:' + textureName)
          }
        }
      }
    } else {
      super.readBinary(reader, context)
    }
    this.__checkTransparency()
    this.__checkTextures()
  }

  // ////////////////////////////////////////
  // Clone and Destroy

  /**
   * The clone method constructs a new material, copies its values
   * from this material and returns it.
   *
   * @param {Record<any, any>} context - The context value.
   * @return {Material} - Returns a new cloned material.
   */
  clone(context: Record<any, any>) {
    const cloned = new Material('clone', '') // TODO: what should the arguemnts be here?
    cloned.copyFrom(this, context)
    return cloned
  }

  /**
   * When a Material is copied, first runs `BaseItem` copyFrom method, then sets shader.
   *
   * @param {Material} src - The material to copy from.
   * @param {object} context - The context value.
   */
  copyFrom(src: Material, context: Record<any, any>) {
    this.setShaderName(src.getShaderName())
    super.copyFrom(src, context)
  }
}
// Registry.register('Material', Material)

export { Material }