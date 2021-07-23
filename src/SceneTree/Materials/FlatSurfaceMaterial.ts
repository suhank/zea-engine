import { MaterialColorParam, MaterialFloatParam, NumberParameter } from '..'
import { Color } from '../../Math/Color'
import { Material } from '../Material'

class FlatSurfaceMaterial extends Material {
  constructor() {
    super('FlatSurfaceShader', 'FlatSurfaceShader') // TODO: check
    this.__shaderName = 'FlatSurfaceShader'
    this.addParameter(new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5)))
  }

  get BaseColor(): MaterialColorParam {
    return <MaterialColorParam>this.getParameter('BaseColor')
  }

  /**
   * Returns the parameters that this shader expects to be provided by the material.
   * Note: the Material method setShaderName will retrieve these parameter declarations
   * to initialize and configure the parameters for the Material instance.
   * @return {array} - an array of param declarations that the shader expects the material tp provide
   **/
  getParamDeclarations(): any[] {
    const paramDescs: any[] = []
    paramDescs.push({
      name: 'BaseColor',
      defaultValue: new Color(1.0, 1.0, 0.5),
    })
    return paramDescs
  }

  /**
   * The getPackedMaterialData method.
   * @return {any} - The return value.
   */
  getPackedMaterialData(): Float32Array {
    const matData = new Float32Array(4) // TODO: no extra space needed right?
    const baseColor = this.BaseColor.getValue()
    matData[0] = baseColor.r
    matData[1] = baseColor.g
    matData[2] = baseColor.b
    matData[3] = baseColor.a
    return matData
  }
}
