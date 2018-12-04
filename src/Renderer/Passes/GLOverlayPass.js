import { GLPass, PassType } from './GLPass.js';
import { GLOpaqueGeomsPass } from './GLOpaqueGeomsPass.js';
import { GLRenderer } from '../GLRenderer.js';

class GLOverlayPass extends GLOpaqueGeomsPass {
    constructor() {
        super();
    }

    init(gl, collector, passIndex) {
        super.init(gl, collector, passIndex);
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

    getGeomItemAndDist(geomData) {

        let itemId, dist;
        const gl = this.__gl;
        if (gl.floatGeomBuffer) {
            itemId = geomData[1];
            dist = geomData[3];
        } else {
            itemId = geomData[0] + (geomData[1] << 8);
            dist = Math.decode16BitFloatFrom2xUInt8([geomData[2], geomData[3]]);
        }

        const drawItem = this.__collector.getGeomItem(itemId);
        if (drawItem) {
            return { 
                geomItem: drawItem.getGeomItem(),
                dist
            } 
        }
    }

    drawGeomData(renderstate){

        const gl = this.__gl;
        gl.disable(gl.BLEND);
        gl.disable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        gl.depthMask(true);

        if(!this.__geomdatashader.bind(renderstate, this.constructor.name))
            return false;

        if(!this.__collector.bind(renderstate))
            return false;

        {
            let unif = renderstate.unifs.floatGeomBuffer;
            if (unif){
                gl.uniform1i(unif.location, gl.floatGeomBuffer ? 1 : 0);
            }
        }
        {
            let unif = renderstate.unifs.passId;
            if (unif){
                gl.uniform1i(unif.location, this.__passIndex);
            }
        }

        super.drawGeomData(renderstate);
    }
};

// GLRenderer.registerPass(GLOverlayPass, PassType.OVERLAY);

export {
    GLOverlayPass
};
