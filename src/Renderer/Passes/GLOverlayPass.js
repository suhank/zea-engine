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
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendEquation(gl.FUNC_ADD);

    renderstate.pass = 'ADD';
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); // For add

    super.draw(renderstate);

    gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
  }
  

  drawGeomData(renderstate) {

    const gl = this.__gl;
    gl.disable(gl.DEPTH_TEST);
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
