import { Registry } from '../Registry.js'
import { GLTexture2D } from './GLTexture2D.js'
import { EventEmitter, GrowingPacker } from '../Utilities/index.js'

/** Class representing a GL CAD material library.
 * @ignore
 */
class GLMaterialLibrary extends EventEmitter {
  /**
   * Create a GL CAD material library.
   * @param {WebGLRenderingContext | WebGL2RenderingContext} gl - The Canvas 3D Context.
   */
  constructor(gl) {
    super()
    this.gl = gl
    this.materialDatas = []
    this.dirtyIndices = []
    this.numItems = 0
    this.materialPacker = new GrowingPacker(256, 256)
  }

  /**
   * The addMaterial method.
   * @param {any} material - The material param.
   * @return {any} - The return value.
   */
  addMaterial(material) {
    if (material.getMetadata('glmaterialcoords')) {
      return
    }

    this.numItems++

    const coords = this.materialPacker.addBlock({ w: 3, h: 1 })
    const materialId = this.materialDatas.length
    this.materialDatas.push({
      material,
      coords,
    })

    material.on('parameterValueChanged', () => {
      this.dirtyIndices.push(materialId)
      this.emit('updated')
    })

    material.setMetadata('glmaterialcoords', coords)

    this.dirtyIndices.push(materialId)

    return coords
  }

  /**
   * The uploadMaterials method.
   */
  uploadMaterials() {
    const gl = this.gl
    const width = this.materialPacker.root.w
    const height = this.materialPacker.root.h
    // console.log('Num Used Materials:' + this.numItems, width, height)
    if (!this.materialsTexture) {
      this.materialsTexture = new GLTexture2D(gl, {
        format: 'RGBA',
        type: 'FLOAT',
        width,
        height,
        filter: 'NEAREST',
        wrap: 'CLAMP_TO_EDGE',
        mipMapped: false,
      })
      this.materialsTexture.clear()
    } else if (this.materialsTexture.width != width || this.materialsTexture.height != height) {
      throw new Error('Cannot resize here. Need a resize the preserves the data.')
      this.materialsTexture.resize(width, height)
      this.dirtyIndices = Array(this.bodyDrawItems.length)
        .fill()
        .map((v, i) => i)
    }

    gl.bindTexture(gl.TEXTURE_2D, this.materialsTexture.glTex)
    const typeId = this.materialsTexture.getTypeID()
    const formatId = this.materialsTexture.getFormatID()

    const eachMaterial = (value) => {
      const materialData = this.materialDatas[value]
      const material = materialData.material

      let shaderClass = Registry.getBlueprint(material.getShaderName())
      if (!shaderClass || !shaderClass.getPackedMaterialData) {
        shaderClass = Registry.getBlueprint('GLDrawCADSurfaceShader')
      }

      const matData = shaderClass.getPackedMaterialData(material)

      const width = matData.length / 4 // 4==RGBA pixels.
      const height = 1

      const coords = materialData.coords
      if (typeId == gl.FLOAT) {
        gl.texSubImage2D(gl.TEXTURE_2D, 0, coords.x, coords.y, width, height, formatId, typeId, matData)
      } else {
        const unit16s = Math.convertFloat32ArrayToUInt16Array(matData)
        gl.texSubImage2D(gl.TEXTURE_2D, 0, coords.x, coords.y, width, height, formatId, typeId, unit16s)
      }
    }
    this.dirtyIndices.forEach(eachMaterial)
    this.dirtyIndices = []
    gl.bindTexture(gl.TEXTURE_2D, null)
  }

  /**
   * The bind method.
   * @param {any} renderstate - The renderstate param.
   * @return {any} - The return value.
   */
  bind(renderstate) {
    if (this.dirtyIndices.length > 0) this.uploadMaterials()

    if (!this.materialsTexture) return

    const gl = this.gl
    const unifs = renderstate.unifs
    if (unifs.materialsTexture) {
      this.materialsTexture.bindToUniform(renderstate, unifs.materialsTexture)
      gl.uniform2i(unifs.materialsTextureSize.location, this.materialsTexture.width, this.materialsTexture.height)
    }
    return true
  }
}
export { GLMaterialLibrary }
