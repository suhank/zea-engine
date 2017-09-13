import { GLPass } from '../GLPass.js';

class GL2DOverlayPass extends GLPass {
    constructor(gl, collector) {
        super(gl, collector);

    }

    /////////////////////////////////////
    // Bind to Render Tree
    filterRenderTree() {
        let allglshaderMaterials = this.__collector.getGLShaderMaterials();
        this.__glshadermaterials = [];
        for (let glshaderkey in allglshaderMaterials) {
            let glshaderMaterials = allglshaderMaterials[glshaderkey];
            if (!glshaderMaterials.getGLShader().isOverlay())
                continue;
            this.__glshadermaterials.push(glshaderMaterials);
        }
    }

    draw(renderstate) {
        this.__gl.disable(this.__gl.CULL_FACE);
        this.__gl.disable(this.__gl.DEPTH_TEST);

        // Now draw all the geometries as normal....
        super.draw(renderstate);

        this.__gl.enable(this.__gl.CULL_FACE);
        this.__gl.enable(this.__gl.DEPTH_TEST);
    }
};

export {
    GL2DOverlayPass
};
// export default GL2DOverlayPass;
