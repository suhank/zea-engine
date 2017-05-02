import {
    Vec3,
    Mat4
} from '../../Math';
import {
    GLPass
} from '../GLPass.js';
import {
    GLShaderMaterials
} from '../GLCollector.js';
import {
    Image2D
} from '../../SceneTree/Image2D.js';

class GLTransparencyPass extends GLPass {
    constructor(gl, collector) {
        super(gl, collector);

        this.__setDirty = false;
        this.__transparentItems = [];
        this.__prevSortCameraPos = new Vec3();
    }

    /////////////////////////////////////
    // Bind to Render Tree
    filterRenderTree() {
        let allglshaderMaterials = this.__collector.getGLShaderMaterials();
        this.__glshadermaterials = [];
        for (let glshaderkey in allglshaderMaterials) {
            let glshaderMaterials = null;
            let glmaterialDrawItemSets = allglshaderMaterials[glshaderkey].getMaterialDrawItemSets();
            for (let glmaterialDrawItemSet of glmaterialDrawItemSets) {
                if (!glmaterialDrawItemSet.getGLMaterial().isTransparent())
                    continue;
                if(!glshaderMaterials){
                    glshaderMaterials = new GLShaderMaterials(allglshaderMaterials[glshaderkey].getGLShader());
                    this.__glshadermaterials.push(glshaderMaterials);
                }
                glshaderMaterials.addMaterialDrawItemSets(glmaterialDrawItemSet);
            }
        }
    }

    draw(renderstate) {
        let gl = this.__gl;

        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        super.draw(renderstate);
    }
};

export {
    GLTransparencyPass
};