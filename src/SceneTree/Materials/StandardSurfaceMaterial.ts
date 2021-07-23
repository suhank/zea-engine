import { MaterialColorParam, MaterialFloatParam, NumberParameter } from '..'
import { Color } from '../../Math/Color'
import { Material } from '../Material'

class StandardSurfaceMaterial extends Material {
  constructor() {
    super('StandardSurfaceShader', 'StandardSurfaceShader') // TODO: check corectness
    this.__shaderName = 'StandardSurfaceShader'
    this.addParameter(new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5)))
    this.addParameter(new MaterialColorParam('Normal', new Color(1.0, 1, 0.5)))

    this.addParameter(new MaterialFloatParam('Opacity', 0.5, [0, 1]))
    this.addParameter(new MaterialFloatParam('AmbientOcclusion', 1, [0, 1]))
    this.addParameter(new MaterialFloatParam('Metallic', 0.5, [0, 1]))

    this.addParameter(new NumberParameter('Roughness', 0.5, [0, 1])) // added
    this.addParameter(new NumberParameter('Reflectance', 0.5, [0, 1]))
    this.addParameter(new NumberParameter('EmissiveStrength', 0.5, [0, 1]))
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

  /**
   * Returns the parameters that this shader expects to be provided by the material.
   * Note: the Material method setShaderName will retrieve these parameter declarations
   * to initialize and configure the parameters for the Material instance.
   * @return {array} - an array of param declarations that the shader expects the material tp provide
   **/
  getParamDeclarations() {
    // const paramDescs = super.getParamDeclarations() returns nothing
    const paramDescs: any[] = []
    paramDescs.push({
      name: 'BaseColor',
      defaultValue: new Color(1.0, 1.0, 0.5),
    })
    paramDescs.push({ name: 'AmbientOcclusion', defaultValue: 1, range: [0, 1] })
    paramDescs.push({ name: 'Metallic', defaultValue: 0.05, range: [0, 1] })
    paramDescs.push({ name: 'Roughness', defaultValue: 0.5, range: [0, 1] })
    paramDescs.push({ name: 'Reflectance', defaultValue: 0.5, range: [0, 1] })
    paramDescs.push({ name: 'Normal', defaultValue: new Color(0.5, 0.5, 0.5) })
    paramDescs.push({
      name: 'EmissiveStrength',
      defaultValue: 0.0,
      range: [0, 1],
    })
    paramDescs.push({ name: 'Opacity', defaultValue: 1.0, range: [0, 1] })
    return paramDescs
  }

  /**
   * The getPackedMaterialData method. Returns all of the parameters related to the material.
   * @return {Float32Array} - The return value.
   */
  getPackedMaterialData() {
    const matData = new Float32Array(10) // TODO: no extra space needed right?

    const baseColor = this.BaseColor.getValue()
    matData[0] = baseColor.r
    matData[1] = baseColor.g
    matData[2] = baseColor.b
    matData[3] = baseColor.a

    matData[4] = this.AmbientOcclusion.getValue()
    matData[5] = this.Metallic.getValue()
    matData[6] = this.Roughness.getValue()
    matData[7] = this.Reflectance.getValue()
    matData[8] = this.EmissiveStrength.getValue()
    matData[9] = this.Opacity.getValue()

    // TODO: Should normals also be returned?
    // matData[10] = this.Normal.getValue()
    return matData
  }
}
