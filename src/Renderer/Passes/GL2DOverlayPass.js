import { GLPass } from '../GLPass.js';
import { GLShader } from '../GLShader.js';
import { ScreenSpaceOverlayShader } from '../Shaders/ScreenSpaceOverlayShader.js';

class GL2DOverlayPass extends GLPass {
    constructor(gl) {
        super(gl);

        let glshader = new GLShader(gl, new ScreenSpaceOverlayShader());
        this.setExplicitShader(glshader);
    }

    draw(renderstate) {
        this.__gl.disable(this.__gl.CULL_FACE);
        this.__gl.disable(this.__gl.DEPTH_TEST);

        // Now draw all the geometries as normal....
        super.draw(renderstate);
    }
};

export {
    GL2DOverlayPass
};
// export default GL2DOverlayPass;
