/* eslint-disable guard-for-in */
import { EventEmitter } from '../../Utilities/index'

/** Class representing GL shader materials.
 * @private
 */
class GLShaderGeomSets extends EventEmitter {
  /**
   * Create a GL shader material.
   * @param {any} glShader - The glShader value.
   * @param {any} glgeomdatashader - The glgeomdatashader value.
   * @param {any} glselectedshader - The glselectedshader value.
   */
  constructor(shaders) {
    super()
    this.glShader = shaders.glShader
    this.glgeomdatashader = shaders.glgeomdatashader
    this.glselectedshader = shaders.glselectedshader
    this.glGeomSetGeomItemSets = {}
    // this.glMaterialLibrary = new GLMaterialLibrary()
  }

  /**
   * Given a BaseGeom, constructs the GLGeom that manages the state of the geometry in the GPU.
   * @param {BaseGeom} geom - The geom value.
   * @return {GLGeom} - The return value.
   */
  constructGLGeomSet(geom) {
    let glGeomSet = geom.getMetadata('glGeomSet')
    if (glGeomSet) {
      glGeomSet.addRef(this)
      return glGeomSet
    }

    const gl = this.__gl
    if (geom instanceof Mesh || geom instanceof MeshProxy) {
      glGeomSet = new GLMeshSet(gl)
    } else if (geom instanceof Lines || geom instanceof LinesProxy) {
      glGeomSet = new GLLinesSet(gl)
    } else if (geom instanceof Points || geom instanceof PointsProxy) {
      glGeomSet = new GLPointsSet(gl)
    } else {
      throw new Error('Unsupported geom type:' + geom.constructor.name)
    }

    geom.setMetadata('glGeomSet', glGeomSet)
    glGeomSet.on('updated', () => {
      this.__renderer.requestRedraw()
    })
    glGeomSet.addRef(this)
    return glGeomSet
  }

  /**
   * The addGLGeomItem method.
   * @param {GLGeomItem} glGeomItem - The glGeomItem value.
   */
  addGLGeomItem(glGeomItem) {
    const geom = glGeomItem.geomItem.getParameter('Geometry').getValue()
    const glGeomSet = this.constructGLGeom(geom)

    glGeomSet.addGLGeomItem(glGeomItem)

    // const materialParam = geomItem.getParameter('Material')
    // const material = materialParam.getValue()

    // new GLGeomSetGeomItemSets(glGeomSet)
    // glMaterialGeomItemSets.addGLGeomItem(glGeomItem, glGeom)
  }

  // /**
  //  * The addGLGeomSetGeomItemSets method.
  //  * @param {any} glGeomSetGeomItemSets - The glGeomSetGeomItemSets value.
  //  */
  // addGLGeomSetGeomItemSets(glGeomSetGeomItemSets) {
  //   this.glGeomSetGeomItemSets[glGeomSetGeomItemSets.elementType] = glGeomSetGeomItemSets
  //   glGeomSetGeomItemSets.on('destructing', () => {
  //     const index = this.glGeomSetGeomItemSets.indexOf(glGeomSetGeomItemSets)
  //     this.glGeomSetGeomItemSets.splice(index, 1)
  //     if (this.glGeomSetGeomItemSets.length == 0) {
  //       // TODO: clean up the shader... maybe.
  //       this.emit('destructing')
  //     }
  //   })
  // }

  // /**
  //  * The removeGLGeomSetGeomItemSets method.
  //  * @param {GLGLGeomSetGeomItemSets} glGeomSetGeomItemSets - The glGeomSetGeomItemSets value.
  //  */
  // removeGLGeomSetGeomItemSets(glGeomSetGeomItemSets) {
  //   delete this.glGeomSetGeomItemSets[glGeomSetGeomItemSets.elementType]
  // }

  /**
   * Draws all elements, binding the shader and continuing into the GLGLGeomSetGeomItemSets
   * @param {object} renderstate - The render state for the current draw traversal
   */
  bindDrawItemsTexture(renderstate) {
    const gl = renderstate.gl
    const unifs = renderstate.unifs
    const drawItemsTexture = renderstate.drawItemsTexture
    if (drawItemsTexture && unifs.instancesTexture) {
      drawItemsTexture.bindToUniform(renderstate, unifs.instancesTexture)
      gl.uniform1i(unifs.instancesTextureSize.location, drawItemsTexture.width)
    }
  }

  /**
   * Draws all elements, binding the shader and continuing into the GLGLGeomSetGeomItemSets
   * @param {object} renderstate - The render state for the current draw traversal
   */
  draw(renderstate) {
    const glShader = this.glShader
    if (!this.glShader.bind(renderstate)) return
    this.bindDrawItemsTexture(renderstate)

    for (const elementType in this.glGeomSetGeomItemSets) {
      this.glGeomSetGeomItemSets[elementType].draw(renderstate)
    }
    glShader.unbind(renderstate)
  }

  /**
   * The drawHighlightedGeoms method.
   * @param {any} renderstate - The renderstate value.
   */
  drawHighlightedGeoms(renderstate) {
    if (!this.glselectedshader || !this.glselectedshader.bind(renderstate)) return
    this.bindDrawItemsTexture(renderstate)

    for (const elementType in this.glGeomSetGeomItemSets) {
      this.glGeomSetGeomItemSets[elementType].drawHighlighted(renderstate)
    }
  }

  /**
   * The drawGeomData method.
   * @param {any} renderstate - The renderstate value.
   */
  drawGeomData(renderstate) {
    if (!this.glgeomdatashader || !this.glgeomdatashader.bind(renderstate)) return
    this.bindDrawItemsTexture(renderstate)

    {
      const unif = renderstate.unifs.floatGeomBuffer
      if (unif) {
        gl.uniform1i(unif.location, gl.floatGeomBuffer ? 1 : 0)
      }
    }
    {
      const unif = renderstate.unifs.passId
      if (unif) {
        gl.uniform1i(unif.location, this.__passIndex)
      }
    }

    for (const elementType in this.glGeomSetGeomItemSets) {
      this.glGeomSetGeomItemSets[elementType].drawGeomData(renderstate)
    }
  }
}

export { GLShaderGeomSets }
