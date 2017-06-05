import { Vec3 } from '../Math/Vec3';
import { GLGeom } from './GLGeom.js';
import '../SceneTree/Geometry/Mesh.js';

class GLMesh extends GLGeom {
    constructor(gl, mesh) {
        super(gl, mesh);
        this.genBuffers();
    }

    getNumTriangles() {
        return this.__numTriangles;
    }

    ///////////////////////////////////////
    // Buffers

    genBuffers() {
        super.genBuffers();

        let geomBuffers = this.__geom.genBuffers();
        let indices = geomBuffers.indices;
        this.__numTriIndices = geomBuffers.indices.length;
        if(indices instanceof Uint8Array)
            this.__indexDataType = this.__gl.UNSIGNED_BYTE ;
        if(indices instanceof Uint16Array)
            this.__indexDataType = this.__gl.UNSIGNED_SHORT;
        if(indices instanceof Uint32Array)
            this.__indexDataType = this.__gl.UNSIGNED_INT;

        this.__numTriangles = indices.length / 3;
        this.__numRenderVerts = geomBuffers.numRenderVerts;

        let gl = this.__gl;
        this.__indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geomBuffers.indices, gl.STATIC_DRAW);

        // Create some vertex attribute buffers
        let debugAttrValues = false;
        let maxIndex;
        if (debugAttrValues)
            maxIndex = Math.max(...indices);
        for (let attrName in geomBuffers.attrBuffers) {
            let attrData = geomBuffers.attrBuffers[attrName];

            let attrBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, attrBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, attrData.values, gl.STATIC_DRAW);

            this.__glattrbuffers[attrName] = {
                buffer: attrBuffer,
                dimension: attrData.dimension,
                normalized: attrData.normalized
            };
        }
        
        this.__geom.freeData();

    }


    getNumUnSplitVerts(){
        return this.__geom.vertices.length;
    }

    getNumSplitVerts(){
        return this.__numRenderVerts;
    }

    //////////////////////////////////
    // Wireframes

    generateWireframesVAO() {

        if (!this.__vao)
            return false;

        if (!this.__geom.edgeVerts)
            this.__geom.genTopologyInfo();

        // generate the wireframes VAO. 
        // It can share buffers with the regular VAO, but provide a different index buffer.
        if (this.__wireframesVao)
            this.__ext.deleteVertexArrayOES(this.__wireframesVao);
        this.__wireframesVao = this.__ext.createVertexArrayOES();
        this.__ext.bindVertexArrayOES(this.__wireframesVao);

        let gl = this.__gl;
        let wireframeIndexBuffer = gl.createBuffer();
        let wireframeIndices = Uint32Array.from(this.__geom.edgeVerts);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, wireframeIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, wireframeIndices, gl.STATIC_DRAW);

        let positionsBuffer = this.__glattrbuffers['positions'].buffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, positionsBuffer);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 3 * 4, 0);

        this.__numWireIndices = wireframeIndices.length;
        this.__ext.bindVertexArrayOES(null); // Note: is this necessary?
    }

    bindWireframeVAO(renderstate) {
        if (this.__wireframesVao == undefined)
            return false;
        this.__ext.bindVertexArrayOES(this.__wireframesVao);
        return true;
    }

    unbindWireframeVAO() {
        this.__ext.bindVertexArrayOES(null); // Note: is this necessary?
    }

    // Draw an item to screen.
    drawWireframe() {
        if (this.__wireframesVao)
            this.__gl.drawElements(this.__gl.LINES, this.__numWireIndices, this.__gl.UNSIGNED_INT, 0);
    }

    //////////////////////////////////
    // Hard Edges


    generateHardEdgesVAO() {

        if (!this.__vao)
            return false;

        if (!this.__geom.edgeVerts)
            this.__geom.generateHardEdgesFlags();

        // generate the wireframes VAO. 
        // It can share buffers with the regular VAO, but provide a different index buffer.
        if (this.__hardEdgesVao)
            this.__ext.deleteVertexArrayOES(this.__hardEdgesVao);
        this.__hardEdgesVao = this.__ext.createVertexArrayOES();
        this.__ext.bindVertexArrayOES(this.__hardEdgesVao);

        let gl = this.__gl;
        let hardEdgeIndexBuffer = gl.createBuffer();
        let hardEdgeIndices = Uint32Array.from(this.__geom.computeHardEdgesIndices());
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, hardEdgeIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, hardEdgeIndices, gl.STATIC_DRAW);

        let positionsBuffer = this.__glattrbuffers['positions'].buffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, positionsBuffer);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 3 * 4, 0);

        this.__numEdgeIndices = hardEdgeIndices.length;
        this.__ext.bindVertexArrayOES(null); // Note: is this necessary?
    }


    bindHardEdgesVAO(renderstate) {
        if (this.__hardEdgesVao == undefined)
            return false;
        this.__ext.bindVertexArrayOES(this.__hardEdgesVao);
        return true;
    }

    unbindHardEdgesVAO() {
        this.__ext.bindVertexArrayOES(null); // Note: is this necessary?
    }

    // Draw an item to screen.
    drawHardEdges() {
        if (this.__hardEdgesVao)
            this.__gl.drawElements(this.__gl.LINES, this.__numEdgeIndices, this.__gl.UNSIGNED_INT, 0);
    }


    //////////////////////////////////
    // Drawing Mesh Points.

    drawPoints() {
        this.__gl.drawArrays(this.__gl.POINTS, 0, this.__geom.numVertices());
    }

    //////////////////////////////////
    // Regular Drawing.

    // Draw an item to screen.
    draw() {
        this.__gl.drawElements(this.__gl.TRIANGLES, this.__numTriIndices, this.__indexDataType, 0);
    }

    drawInstanced(count) {
        this.__gl.__ext_Inst.drawElementsInstancedANGLE(this.__gl.TRIANGLES, this.__numTriIndices, this.__indexDataType, 0, count);
    }


    destroy() {
        super.destroy();
        let gl = this.__gl;
        gl.deleteBuffer(this.__indexBuffer);
        this.__indexBuffer = undefined;
        // if (this.__wireframesVao)
        //     this.__ext.deleteVertexArrayOES(this.__wireframesVao);
        // if (this.__hardEdgesVao)
        //     this.__ext.deleteVertexArrayOES(this.__hardEdgesVao);
    }
};

export {
    GLMesh
};
// export default GLMesh;