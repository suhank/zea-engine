import { GLPass } from '../GLPass.js';
import { GLShader } from '../GLShader.js';
import { GeomDataShader } from '../Shaders/GeomDataShader.js';

class GLGeomDataPass extends GLPass {
    constructor(gl, collector) {
        super(gl, collector);

        this.__glshader = new GLShader(gl, new GeomDataShader());
    }

    /////////////////////////////////////
    // Bind to Render Tree
    filterRenderTree() {
        let allglshaderMaterials = this.__collector.getGLShaderMaterials();
        this.__glshadermaterials = [];
        for (let glshaderkey in allglshaderMaterials) {
            this.__glshadermaterials.push(allglshaderMaterials[glshaderkey]);
        }
    }

    bindShader(renderstate, glshader){
        return true;
    }
    bindMaterial(renderstate, glshader){
        return true;
    }
    draw(renderstate) {
        let gl = this.__gl;
        // TODO: we need to provide a tool to quickly flip faces
        // and save out a new JSON file. Then we can render only one side
        //gl.enable(gl.CULL_FACE);
        gl.disable(gl.CULL_FACE);
        gl.disable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        gl.depthMask(true);

        this.__glshader.bind(renderstate);
        this.__collector.bind(renderstate);

        super.draw(renderstate);
    }

};

export {
    GLGeomDataPass
};
// export default GLGeomDataPass;