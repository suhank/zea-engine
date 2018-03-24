import {
    Vec3
} from '../Math/Vec3';
import {
    GLGeom
} from './GLGeom.js';
import {
    generateShaderGeomBinding
} from './GeomShaderBinding.js';
import {
    GLTexture2D
} from './GLTexture2D.js';

class GLLines extends GLGeom {
    constructor(gl, lines) {
        super(gl, lines);

        this.fatLines = lines.lineThickness > 0 || this.__geom.getVertexAttributes().lineThickness != undefined;
        this.genBuffers();
    }

    genBuffers() {
        super.genBuffers();


        let gl = this.__gl;
        let geomBuffers = this.__geom.genBuffers();
        let indices = geomBuffers.indices;

        if (this.fatLines) {

            if (!gl.__quadVertexIdsBuffer) {
                gl.setupInstancedQuad();
            }
            this.__glattrbuffers.vertexIDs = gl.__quadattrbuffers.vertexIDs;

            this.__drawCount = indices.length / 2;

            let vertexAttributes = this.__geom.getVertexAttributes();
            let positions = vertexAttributes.positions;
            let lineThicknessAttr = vertexAttributes.lineThickness;

            let stride = 4; // The number of floats per draw item.
            let dataArray = new Float32Array(positions.length * stride);
            for (let i = 0; i < positions.length; i++) {
                let pos = Vec3.createFromFloat32Buffer(dataArray.buffer, i * 4);
                pos.setFromOther(positions.getValueRef(i));

                // The thickness of the line.
                if (lineThicknessAttr)
                    dataArray[(i * 4) + 3] = lineThicknessAttr.getFloat32Value(i);
                else
                    dataArray[(i * 4) + 3] = this.__geom.lineThickness;
            }
            this.__positionsTexture = new GLTexture2D(gl, {
                channels: 'RGBA',
                format: 'FLOAT',
                width: positions.length,
                /*each pixel has 4 floats*/
                height: 1,
                filter: 'NEAREST',
                wrap: 'CLAMP_TO_EDGE',
                data: dataArray,
                mipMapped: false
            });

            let indexArray = new Float32Array(indices.length);
            for (let i = 0; i < indices.length; i++) {
                let seqentialIndex;
                if (i % 2 == 0)
                    seqentialIndex = (i > 0) && (indices[i] == indices[i - 1]);
                else
                    seqentialIndex = (i < indices.length - 1) && (indices[i] == indices[i + 1]);
                indexArray[i] = (seqentialIndex ? 1 : 0) + (indices[i] * 2);
            }
            let indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, indexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, indexArray, gl.STATIC_DRAW);

            this.__glattrbuffers.segmentIndices = {
                buffer: indexBuffer,
                instanced: true,
                dimension: 2
            }


        } else {

            this.__indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

            for (let attrName in geomBuffers.attrBuffers) {
                let attrData = geomBuffers.attrBuffers[attrName];

                let attrBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, attrBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, attrData.values, gl.STATIC_DRAW);

                this.__glattrbuffers[attrName] = {
                    buffer: attrBuffer,
                    dimension: attrData.dimension
                };
            }

            // Cache the size so we know later if it changed (see below)
            this.__numSegIndices = indices.length;
            this.__numVertices = geomBuffers.numVertices;
        }

        if(indices instanceof Uint8Array)
            this.__indexDataType = this.__gl.UNSIGNED_BYTE;
        if(indices instanceof Uint16Array)
            this.__indexDataType = this.__gl.UNSIGNED_SHORT;
        if(indices instanceof Uint32Array)
            this.__indexDataType = this.__gl.UNSIGNED_INT;
    }

    updateBuffers(opts) {
        let gl = this.__gl;
        let geomBuffers = this.__geom.genBuffers();
        let indices = geomBuffers.indices;

        if (this.fatLines) {

            this.__drawCount = indices.length / 2; // every pair of verts draws a quad.

            let vertexAttributes = this.__geom.getVertexAttributes();

            let positions = vertexAttributes.positions;
            let lineThicknessAttr = vertexAttributes.lineThickness;

            let stride = 4; // The number of floats per draw item.
            let dataArray = new Float32Array(positions.length * stride);
            for (let i = 0; i < positions.length; i++) {
                let pos = Vec3.createFromFloat32Buffer(dataArray.buffer, i * 4);
                pos.setFromOther(positions.getValueRef(i));

                // The thickness of the line.
                if (lineThicknessAttr)
                    dataArray[(i * 4) + 3] = lineThicknessAttr.getFloat32Value(i);
                else
                    dataArray[(i * 4) + 3] = this.__geom.lineThickness;
            }

            this.__positionsTexture.bufferData(dataArray, positions.length, 1);

            let indexArray = new Float32Array(indices.length);
            for (let i = 0; i < indices.length; i++) {
                let seqentialIndex;
                if (i % 2 == 0)
                    seqentialIndex = (i > 0) && (indices[i] == indices[i - 1]);
                else
                    seqentialIndex = (i < indices.length - 1) && (indices[i] == indices[i + 1]);
                indexArray[i] = (seqentialIndex ? 1 : 0) + (indices[i] * 2);
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, this.__glattrbuffers.segmentIndices.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, indexArray, gl.STATIC_DRAW);

        } else {

            let vertexAttributes = this.__geom.getVertexAttributes();

            if (opts.indicesChanged) {
                let indices = this.__geom.getIndices();
                if (this.__numSegIndices != indices.length) {
                    gl.deleteBuffer(this.__indexBuffer);
                    this.__indexBuffer = gl.createBuffer();
                }
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
                this.__numSegIndices = indices.length;
            }

            // Update the vertex attribute buffers
            let numVertsChanged = geomBuffers.numVertices != this.__numVertices;
            for (let attrName in geomBuffers.attrBuffers) {
                let attrData = geomBuffers.attrBuffers[attrName];
                let glattr = this.__glattrbuffers[attrName];
                if (numVertsChanged) {
                    gl.deleteBuffer(glattr.buffer);
                    glattr.buffer = gl.createBuffer();
                }

                gl.bindBuffer(gl.ARRAY_BUFFER, glattr.buffer);
                gl.bufferData(gl.ARRAY_BUFFER, attr.data, gl.STATIC_DRAW);
            }

            // Cache the size so we know later if it changed (see below)
            this.__numVertices = geomBuffers.numVertices;
            this.__numSegIndices = indices.length;
        }

        if(indices instanceof Uint8Array)
            this.__indexDataType = this.__gl.UNSIGNED_BYTE;
        if(indices instanceof Uint16Array)
            this.__indexDataType = this.__gl.UNSIGNED_SHORT;
        if(indices instanceof Uint32Array)
            this.__indexDataType = this.__gl.UNSIGNED_INT;
    }

    bind(renderstate, extrAttrBuffers, transformIds) {

        if (this.fatLines && '_lineThickness' in renderstate.unifs) { // TODO: Provide a geomdata shader for thick lines.

            let gl = this.__gl;

            let shaderBinding = this.__shaderBindings[renderstate.shaderkey];
            if (!shaderBinding) {
                shaderBinding = generateShaderGeomBinding(gl, renderstate.attrs, this.__glattrbuffers, gl.__quadIndexBuffer, extrAttrBuffers, transformIds);
                this.__shaderBindings[renderstate.shaderkey] = shaderBinding;
            }
            shaderBinding.bind(renderstate);

            let usePositionsTexture = true;
            if (usePositionsTexture) {
                let unifs = renderstate.unifs;
                if (unifs.positionsTexture) {
                    this.__positionsTexture.bindToUniform(renderstate, unifs.positionsTexture);
                    gl.uniform1i(unifs.positionsTextureSize.location, this.__positionsTexture.width);
                }
            }

            let unifs = renderstate.unifs;
            gl.uniform1f(unifs._lineThickness.location, (this.__geom.lineThickness ? this.__geom.lineThickness : 1.0)  * renderstate.viewScale);
            return true;
        } else {
            return super.bind(renderstate, transformIds);
        }
    }


    //////////////////////////////////
    // Drawing Lines Points.

    drawPoints() {
        this.__gl.drawArrays(this.__gl.POINTS, 0, this.__geom.numVertices());
    }

    //////////////////////////////////
    // Regular Drawing.

    draw() {
        let gl = this.__gl;
        if (this.fatLines) {
            gl.drawElementsInstanced(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0, this.__drawCount);
        } else {
            gl.drawElements(this.__gl.LINES, this.__numSegIndices, this.__indexDataType, 0);
        }
    }

    drawInstanced(count) {
        this.__gl.drawElementsInstanced(this.__gl.LINES, this.__numSegIndices, this.__indexDataType, 0, count);
    }


};

export {
    GLLines
};
// export default GLLines;