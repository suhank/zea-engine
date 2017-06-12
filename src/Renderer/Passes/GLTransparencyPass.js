import { Vec3 } from '../../Math/Vec3';
import { GLPass } from '../GLPass.js';
import { GLShaderMaterials } from '../GLCollector.js';

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
            let glshaderMaterials = allglshaderMaterials[glshaderkey];
            if (!glshaderMaterials.getGLShader().isTransparent())
                continue;
            this.__glshadermaterials.push(glshaderMaterials);
        }
    }

    draw(renderstate) {
        let gl = this.__gl;

        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        // let defines = renderstate.defines;

        renderstate.pass ='MULTIPLY';
        gl.blendFunc(gl.DST_COLOR, gl.ZERO);// For multiply, select this.
        super.draw(renderstate);

        renderstate.pass ='ADD';
        // renderstate.defines = defines + '\n#define TRANSP_ADD';
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); // For add
        super.draw(renderstate);

        gl.disable(gl.BLEND);
    }
};


export {
    GLTransparencyPass
};
// export default GLTransparencyPass;