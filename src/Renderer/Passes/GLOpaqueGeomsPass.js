import { PassType } from './GLPass.js';
import { GLStandardGeomsPass } from './GLStandardGeomsPass.js';
import { GLShaderMaterials } from '../GLCollector.js';
import { GLRenderer } from '../GLRenderer.js';

import {
    GeomDataShader
} from '../Shaders/GeomDataShader.js';

import {
    SelectedGeomsShader
} from '../Shaders/SelectedGeomsShader.js';


class GLOpaqueGeomsPass extends GLStandardGeomsPass {
    constructor() {
        super();
    }

    init(gl, collector, passIndex) {
        super.init(gl, collector, passIndex);
        this.__geomdatashader = new GeomDataShader(gl);
        this.__selectedGeomsShader = new SelectedGeomsShader(gl);
    }

    /////////////////////////////////////
    // Bind to Render Tree
    filterGeomItem(geomItem) {
        const shaderClass = geomItem.getMaterial().getShaderClass();
        if(shaderClass) {
            if (shaderClass.isTransparent())
                return false;
            if (shaderClass.isOverlay())
                return false;
        }
        return true;
    }


    draw(renderstate) {

        const gl = this.__gl;
        // TODO: disable cull face when rendering cross sections.
        // gl.enable(gl.CULL_FACE);
        gl.disable(gl.CULL_FACE);
        
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        gl.depthMask(true);

        super.draw(renderstate);
    }

    drawSelectedGeoms(renderstate){

        const gl = this.__gl;
        gl.disable(gl.BLEND);
        gl.disable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        gl.depthMask(true);

        if(!this.bindShader(renderstate, this.__selectedGeomsShader))
            return false;

        super.drawSelectedGeoms(renderstate);
    }

    getGeomItemAndDist(geomData) {

        let itemId, dist;
        const gl = this.__gl;
        if (gl.floatGeomBuffer) {
            itemId = Math.round(geomData[1]);
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

        if(!this.bindShader(renderstate, this.__geomdatashader))
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

GLRenderer.registerPass(GLOpaqueGeomsPass, PassType.OPAQUE);

export {
    GLOpaqueGeomsPass
};