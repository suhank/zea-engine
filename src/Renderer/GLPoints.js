import {
    GLGeom
} from './GLGeom.js';
import {
    generateShaderGeomBinding
} from './GeomShaderBinding.js'

class GLPoints extends GLGeom {
    constructor(gl, points) {
        super(gl, points);


        this.fatPoints = false;

        this.genBuffers();
    }

    renderableInstanced() {
        // the points are aready rendered as instanced quads
        return false;
    }

    genBuffers() {
        super.genBuffers();

        if (this.fatPoints && !gl.__quadVertexIdsBuffer)
            gl.setupInstancedQuad();

        const gl = this.__gl;
        let geomBuffers = this.__geom.genBuffers();

        for (let attrName in geomBuffers.attrBuffers) {
            let attrData = geomBuffers.attrBuffers[attrName];

            let attrBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, attrBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, attrData.values, gl.STATIC_DRAW);

            this.__glattrbuffers[attrName] = {
                buffer: attrBuffer,
                dimension: attrData.dimension,
                instanced: true
            };
        }
        this.__glattrbuffers.vertexIDs = gl.__quadattrbuffers.vertexIDs;

        this.__numVerts = this.__geom.getNumVertices();
        this.__vboState = 2;

    }


    bind(renderstate, extrAttrBuffers, transformIds) {

        if (this.fatPoints) {
            const gl = this.__gl;
            let shaderBinding = this.__shaderBindings[renderstate.shaderkey];
            if (!shaderBinding) {
                shaderBinding = generateShaderGeomBinding(gl, renderstate.attrs, this.__glattrbuffers, gl.__quadIndexBuffer, extrAttrBuffers, transformIds);
                this.__shaderBindings[renderstate.shaderkey] = shaderBinding;
            }
            shaderBinding.bind(renderstate);
        } else {
            return super.bind(renderstate, extrAttrBuffers, transformIds);
        }

        return true;
    }

    draw() {
        const gl = this.__gl;
        if (this.fatPoints) {
            if ('PointSize' in renderstate.unifs)
                gl.drawElementsInstanced(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0, this.__numVerts);

            // Note: We don't have a solution for drawing fat lines to the geom data buffer.
        } else {
            gl.drawArrays(gl.POINTS, 0, this.__numVerts);
        }
    }

    drawInstanced(instanceCount) {
        if (this.fatPoints) {
            console.warn("Unable to draw fat points instanced");
            return;
        }
        this.__gl.drawArraysInstanced(this.__gl.POINTS, 0, this.__numVerts, instanceCount);
    }
};
export {
    GLPoints
};
// GLPoints;