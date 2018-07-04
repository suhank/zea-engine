import {
    Mesh
} from '../SceneTree/SceneTree.js';
import {
    GeomDataShader
} from './Shaders/GeomDataShader.js';
import {
    GLPass
} from './GLPass.js';
import {
    GLShader
} from './GLShader.js';
import {
    GLTexture2D
} from './GLTexture2D.js';
import {
    GLFbo
} from './GLFbo.js';

class GLSelectedGeomsPass extends GLPass {
    constructor() {
        super();
    }

    init(gl, collector, passIndex) {

        super.init(gl, collector, passIndex);

        const gl = this.__gl;
        if (!glshader)
            glshader = new GLShader(gl, new GeomDataShader());
        this.setExplicitShader(glshader);

        this.__geomDataBuffer = new GLTexture2D(gl, {
            type: 'FLOAT',
            format: 'RGBA',
            filter: 'NEAREST',
            width: renderer.width,
            height: renderer.height,
        });
        this.__geomDataBufferFbo = new GLFbo(gl, this.__geomDataBuffer, true);
        this.__geomDataBufferFbo.setClearColor([0, 0, 0, 0]);

        this.__renderer = renderer;
        this.__renderer.resized.connect(this.__geomDataBuffer.resize);
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
                if( passFilter.indexOf('GLOpaqueGeomsPass') == -1)
                    continue;
            }
            this.__glshadermaterials.push(glshaderMaterials);
        }
    }

    drawItemSet(renderstate, drawItem) {

        // Skip selected geoms.
        if(renderstate.geomFilter == 'active'){
            if(drawItem.geomItem.selected || drawItem.geomItem.hilighted)
                return false;
        }
        // Now only render selected or hilighted geoms.
        else if(renderstate.geomFilter == 'selected_hilighted') {
            if(!drawItem.geomItem.selected && !drawItem.geomItem.hilighted) 
                return false;
        }

        gldrawitemset.draw(renderstate);  
        return true;
    }

    draw(renderstate) {
        this.__geomDataBufferFbo.bindAndClear();

        const gl = this.__gl;
        gl.disable(gl.BLEND);
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

        // renderstate.geomFilter = 'active';
        // super.draw(renderstate);

        // Clear the depth so subsequent draws are not occluded by whats beenn already draw.
        // this makes items draw over the top of existing geoms.
        this.__geomDataBufferFbo.clearDepth();

        renderstate.geomFilter = 'selected_hilighted';
        super.draw(renderstate);
    }


    /////////////////////////////////////////
    // destroy


    destroy() {
        super.destroy();
        this.__renderer.resized.disconnect(this.__geomDataBuffer.resize);
    }
};

export {
    GLSelectedGeomsPass
};