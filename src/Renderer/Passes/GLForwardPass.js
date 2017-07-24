import { GLPass } from '../GLPass.js';
import { GLShaderMaterials } from '../GLCollector.js';

class GLForwardPass extends GLPass {
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
            if (glshaderMaterials.getGLShader().isTransparent())
                continue;
            if (glshaderMaterials.getGLShader().getPassFilter) {
                let passFilter = glshaderMaterials.getGLShader().getPassFilter();
                if( passFilter.indexOf('GLForwardPass') == -1)
                    continue;
            }
            this.__glshadermaterials.push(glshaderMaterials);
        }
    }

    bindShader(renderstate, glshader){
        if(super.bindShader(renderstate, glshader)){
            let unifs = renderstate.unifs;
            if ('debugLightmapTexelSize' in unifs)
                this.__gl.uniform1f(unifs.debugLightmapTexelSize.location, renderstate.debugLightmaps);
            if ('planeDist' in unifs){
                this.__gl.uniform1f(unifs.planeDist.location, renderstate.planeDist);
                this.__gl.uniform1f(unifs.planeAngle.location, renderstate.planeAngle);
            }
            return true;
        }
        return false;
    }

    draw(renderstate) {
        let gl = this.__gl;
        // TODO: disable cull face when rendering cross sections.
        // gl.enable(gl.CULL_FACE);
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
// export default GLForwardPass;