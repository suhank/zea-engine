import { GLPass, PassType } from './GLPass.js';
import { GLOpaqueGeomsPass } from './GLOpaqueGeomsPass.js';
import { GLRenderer } from '../GLRenderer.js';

class GLOverlayPass extends GLOpaqueGeomsPass {
  constructor() {
    super();
  }

  init(renderer, passIndex) {
    super.init(renderer, passIndex);
  }

  /////////////////////////////////////
  // Bind to Render Tree
  filterGeomItem(geomItem) {
    const shaderClass = geomItem.getMaterial().getShaderClass();
    if (shaderClass) {
      if (shaderClass.isOverlay())
        return true;
    }
    return false;
  }

  draw(renderstate) {

    const gl = this.__gl;

    // Clear the depth buffer so handls are always drawn over the top.
    gl.clear(gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    // gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendEquation(gl.FUNC_ADD);

    renderstate.pass = 'ADD';
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); // For add

    // super.draw(renderstate);
    
    for (let shaderName in this.__glshadermaterials) {
      const glshaderMaterials = this.__glshadermaterials[shaderName];
      const glshader = glshaderMaterials.glshader;
      if (this.bindShader(renderstate, glshader)) {
        const glmaterialGeomItemSets = glshaderMaterials.getMaterialGeomItemSets();
        for (let glmaterialGeomItemSet of glmaterialGeomItemSets) {
          if (glmaterialGeomItemSet.drawCount == 0)
            continue;
          if (this.bindMaterial(renderstate, glmaterialGeomItemSet.getGLMaterial(), true)) {
            const gldrawitemsets = glmaterialGeomItemSet.getGeomItemSets();
            for (let gldrawitemset of gldrawitemsets) {
              gldrawitemset.draw(renderstate);
            }
          }
        }
      }
      glshader.unbind(renderstate);
    }

    if (renderstate.glgeom) {
      renderstate.glgeom.unbind(renderstate);
    }

    gl.disable(gl.BLEND);
    // gl.enable(gl.DEPTH_TEST);
  }
  

  drawGeomData(renderstate) {

    const gl = this.__gl;

    // Clear the depth buffer so handls are always drawn over the top.
    gl.clear(gl.DEPTH_BUFFER_BIT);

    // gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendEquation(gl.FUNC_ADD);

    renderstate.pass = 'ADD';
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); // For add

    super.drawGeomData(renderstate);

    gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
  }
};

GLRenderer.registerPass(GLOverlayPass, PassType.OVERLAY);

export {
  GLOverlayPass
};
