import { GLPass } from '../GLPass.js';
import { GLShaderMaterials } from '../GLCollector.js';
import {
    GeomDataShader
} from '../Shaders/GeomDataShader.js';

class GLForwardPass extends GLPass {
    constructor(gl, collector) {
        super(gl, collector);


        this.__geomdatashader = new GeomDataShader(gl);
    }

    /////////////////////////////////////
    // Bind to Render Tree
    filterRenderTree() {
        const allglshaderMaterials = this.__collector.getGLShaderMaterials();
        this.__glshadermaterials = [];
        for (let glshaderkey in allglshaderMaterials) {
            const glshaderMaterials = allglshaderMaterials[glshaderkey];
            if (glshaderMaterials.getGLShader().isTransparent())
                continue;
            if (glshaderMaterials.getGLShader().getPassFilter) {
                const passFilter = glshaderMaterials.getGLShader().getPassFilter();
                if( passFilter.indexOf('GLForwardPass') == -1)
                    continue;
            }
            this.__glshadermaterials.push(glshaderMaterials);
        }
    }

    bindShader(renderstate, glshader){
        if(super.bindShader(renderstate, glshader)){
            // const unifs = renderstate.unifs;
            // if ('debugLightmapTexelSize' in unifs)
            //     this.__gl.uniform1f(unifs.debugLightmapTexelSize.location, renderstate.debugLightmaps);
            // if ('cutawayEnabled' in unifs){
            //     this.__gl.uniform1f(unifs.planeDist.location, renderstate.planeDist);
            //     this.__gl.uniform3fv(unifs.planeNormal.location, renderstate.planeNormal.asArray());
            // }
            return true;
        }
        return false;
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

        let unif = renderstate.unifs.floatGeomBuffer;
        if (unif){
            gl.uniform1i(unif.location, gl.floatTexturesSupported ? 1 : 0);
        }

        super.drawGeomData(renderstate);
    }
};

export {
    GLForwardPass
};
// export default GLForwardPass;