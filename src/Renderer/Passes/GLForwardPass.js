import {
    GLPass
} from '../GLPass.js';
import {
    GLShaderMaterials
} from '../GLCollector.js';

class GLForwardPass extends GLPass {
    constructor(gl, collector) {
        super(gl, collector);
    }

    // filter(drawItem) {
    //     if(!super.filter(drawItem))
    //         return false;
    //     let material = drawItem.geomItem.material;
    //     return (!('opacity' in material) || ( Number.isNumeric(material.opacity) && material.opacity >= 0.99));
    // }

    /////////////////////////////////////
    // Bind to Render Tree
    filterRenderTree() {
        let allglshaderMaterials = this.__collector.getGLShaderMaterials();
        this.__glshadermaterials = [];
        for (let glshaderkey in allglshaderMaterials) {
            let glshaderMaterials = null;
            let glmaterialDrawItemSets = allglshaderMaterials[glshaderkey].getMaterialDrawItemSets();
            for (let glmaterialDrawItemSet of glmaterialDrawItemSets) {
                if (glmaterialDrawItemSet.getGLMaterial().isTransparent())
                    continue;
                if(!glshaderMaterials){
                    glshaderMaterials = new GLShaderMaterials(allglshaderMaterials[glshaderkey].getGLShader());
                    this.__glshadermaterials.push(glshaderMaterials);
                }
                glshaderMaterials.addMaterialDrawItemSets(glmaterialDrawItemSet);
            }
        }
    }

    bindShader(renderstate, glshader){
        if(super.bindShader(renderstate, glshader)){
            let unifs = renderstate.unifs;
            if ('debugLightmapTexelSize' in unifs)
                this.__gl.uniform1f(unifs.debugLightmapTexelSize.location, renderstate.debugLightmaps);
            if ('planeX' in unifs)
                this.__gl.uniform1f(unifs.planeX.location, renderstate.planeX);
            return true;
        }
        return false;
    }

    draw(renderstate) {
        let gl = this.__gl;
        gl.disable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        gl.depthMask(true);

        super.draw(renderstate);
    }
};

export {
    GLForwardPass
};