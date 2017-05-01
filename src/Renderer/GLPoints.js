import {
    GLGeom
} from './GLGeom.js';

import {
    generateShaderGeomBinding
} from './GeomShaderBinding.js'

class GLPoints extends GLGeom {
    constructor(gl, points) {

        super(gl, points);
 
        if (!gl.__quadVertexIdsBuffer) 
            gl.setupInstancedQuad();
        
        this.genBuffers();
    }

    genBuffers() {
        super.genBuffers();

        let gl = this.__gl;
        let geomBuffers = this.__geom.genBuffers();

        for (let attrName in geomBuffers.attrBuffers) {
            let attrData = geomBuffers.attrBuffers[attrName];

            let attrBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, attrBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, attr.values, gl.STATIC_DRAW);

            this.__glattrbuffers[attrName] = {
                buffer: attrBuffer,
                dimension: attrData.dimension,
                instanced: true
            };
        }
        this.__glattrbuffers.vertexIDs = gl.__quadattrbuffers.vertexIDs;

        this.unbind();
        this.__vboState = 2;

    }


    bind(renderstate, extrAttrBuffers, transformIds) {

        let gl = this.__gl;

        let shaderBinding = this.__shaderBindings[renderstate.shaderkey];
        if (!shaderBinding) {
            shaderBinding = generateShaderGeomBinding(gl, renderstate.attrs, this.__glattrbuffers, gl.__quadIndexBuffer, extrAttrBuffers, transformIds);
            this.__shaderBindings[renderstate.shaderkey] = shaderBinding;
        }
        shaderBinding.bind(renderstate);

        return true;
    }

    draw() {
        let gl = this.__gl;
        gl.__ext_Inst.drawElementsInstancedANGLE(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0, this.__geom.numVertices());
    }
};

export {
    GLPoints
};