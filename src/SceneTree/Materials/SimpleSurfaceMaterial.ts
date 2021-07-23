import { MaterialColorParam, MaterialFloatParam, NumberParameter } from '..'
import { Color } from '../../Math/Color'
import { Material } from '../Material'

export class SimpleSurfaceMaterial extends Material {
  constructor() {
    super('SimpleSurfaceShader', 'SimpleSurfaceShader') // TODO: check
    this.__shaderName = 'SimpleSurfaceShader'
    this.addParameter(new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5)))
    this.addParameter(new MaterialFloatParam('Opacity', 0.5, [0, 1]))
    this.addParameter(new NumberParameter('EmissiveStrength', 0.5, [0, 1]))
  }

  get BaseColor(): MaterialColorParam {
    return <MaterialColorParam>this.getParameter('BaseColor')
  }

  get Opacity(): MaterialFloatParam {
    return <MaterialFloatParam>this.getParameter('Opacity')
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
    const paramDescs: any[] = [] //= super.getParamDeclarations()
    paramDescs.push({
      name: 'BaseColor',
      defaultValue: new Color(1.0, 1.0, 0.5),
    })
    paramDescs.push({ name: 'Opacity', defaultValue: 1.0, range: [0, 1] })
    paramDescs.push({
      name: 'EmissiveStrength',
      defaultValue: 0.0,
      range: [0, 1],
    })
    return paramDescs
  }

  /**
   * The getPackedMaterialData method.
   * @return {any} - The return value.
   */
  getPackedMaterialData() {
    const matData = new Float32Array(6) // TODO: no extra space needed right?
    const baseColor = this.BaseColor.getValue()
    matData[0] = baseColor.r
    matData[1] = baseColor.g
    matData[2] = baseColor.b
    matData[3] = baseColor.a
    matData[4] = this.getParameter('Opacity').getValue()
    matData[5] = this.getParameter('EmissiveStrength').getValue()
    return matData
  }
}


