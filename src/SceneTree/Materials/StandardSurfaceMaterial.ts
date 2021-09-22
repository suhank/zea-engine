import { MaterialColorParam, MaterialFloatParam, NumberParameter } from '..'
import { Color } from '../../Math/Color'
import { Material } from '../Material'

export class StandardSurfaceMaterial extends Material {
  constructor() {
    super('StandardSurfaceMaterial')
    this.__shaderName = 'StandardSurfaceShader'
    this.addParameter(new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5)))
    this.addParameter(new MaterialColorParam('Normal', new Color(1.0, 1, 0.5)))

    this.addParameter(new MaterialFloatParam('Opacity', 0.5, [0, 1]))
    this.addParameter(new MaterialFloatParam('AmbientOcclusion', 1, [0, 1]))
    this.addParameter(new MaterialFloatParam('Metallic', 0.5, [0, 1]))

    this.addParameter(new NumberParameter('Roughness', 0.5, [0, 1])) // added
    this.addParameter(new NumberParameter('Reflectance', 0.5, [0, 1]))
    this.addParameter(new NumberParameter('EmissiveStrength', 0.5, [0, 1]))

    this.__checkTransparency({})
  }

  // NOTE: check if an object has a particular getter: Object.getPrototypeOf(classInstance).hasOwnProperty('BaseColor');

  get BaseColor(): MaterialColorParam {
    return <MaterialColorParam>this.getParameter('BaseColor')
  }
  get Normal(): MaterialColorParam {
    return <MaterialColorParam>this.getParameter('Normal')
  }

  get Opacity(): MaterialFloatParam {
    return <MaterialFloatParam>this.getParameter('Opacity')
  }
  get AmbientOcclusion(): MaterialFloatParam {
    return <MaterialFloatParam>this.getParameter('AmbientOcclusion')
  }
  get Metallic(): MaterialFloatParam {
    return <MaterialFloatParam>this.getParameter('Metallic')
  }

  get Roughness(): NumberParameter {
    return <NumberParameter>this.getParameter('Roughness')
  }
  get Reflectance(): NumberParameter {
    return <NumberParameter>this.getParameter('Reflectance')
  }
  get EmissiveStrength(): NumberParameter {
    return <NumberParameter>this.getParameter('EmissiveStrength')
  }

  setShaderName(shaderName: string) {
    throw ' Cannot change shader name'
  }
}
