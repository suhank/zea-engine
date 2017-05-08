import { GLGeom } from './GLGeom.js';
import { generateShaderGeomBinding } from './GeomShaderBinding.js'

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

        let vertexAttributes = this.__geom.getVertexAttributes();
        // let attribIndices = {
        //     "positions": 0
        // };
        let attribIndexOffset = 1;
        for (let attrName in vertexAttributes) {
            let attr = vertexAttributes[attrName];
            let data = attr.data;

            let dimension = attr.numFloat32Elements;
            let count = data.length / dimension;
            let normalized = attrName == 'normals';

            let attrBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, attrBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
            // let attribIndex = (attrName in attribIndices) ? attribIndices[attrName] : (attribIndexOffset++);
            // gl.enableVertexAttribArray(attribIndex);
            // gl.vertexAttribPointer(attribIndex, dimension, gl.FLOAT, normalized, dimension * 4, 0);
            // gl.__ext_Inst.vertexAttribDivisorANGLE(attribIndex, 1); // This makes it instanced!

            this.__glattrbuffers[attrName] = {
                buffer: attrBuffer,
                count: count,
                dimension: dimension,
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

export default GLPoints;