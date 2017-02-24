import {
    Vec3
} from '../Math/Math.js';
import {
    GLGeom
} from './GLGeom.js';
import '../SceneTree/Geometry/Mesh.js';

class GLMesh extends GLGeom {
    constructor(gl, mesh) {
        super(gl, mesh);

        this.__numTriangles = this.__geom.computeNumTriangles();

        // this.__wireframesVao = undefined;
        // this.__hardEdgesVao = undefined;
        // this.__pointsVao = undefined;

        this.genBuffers();
    }

    getNumTriangles() {
        return this.__numTriangles;
    }

    ///////////////////////////////////////
    // Buffers

    genBuffers() {
        super.genBuffers();

        let vertexAttributes = this.__geom.getVertexAttributes();

        // Compute the normals on demand. 
        if (!('normals' in vertexAttributes)) {
            // vertexAttributes['normals'] = this.__geom.computeVertexNormals();
            vertexAttributes['normals'] = this.__geom.addVertexAttribute("normals", Vec3, 0.0);
        }

        let splitIndices = {};
        let splitCount = 0;
        for (let key in vertexAttributes) {
            let attr = vertexAttributes[key];

            let attrSplits = attr.getSplits();
            for (let polygon in attrSplits) {
                if (!(polygon in splitIndices))
                    splitIndices[polygon] = {};
                let vertices = attrSplits[polygon];
                for (let v in vertices) {
                    let vertex = parseInt(v);
                    if (!(vertex in splitIndices[polygon])) {
                        splitIndices[polygon][vertex] = splitCount;
                        splitCount++;
                    }
                }
            }
        }

        let numUnSplitVertices = this.__geom.vertices.length;
        this.__totalNumVertices = numUnSplitVertices + splitCount;
        // console.log("Splittiness:" + splitCount / numUnSplitVertices);
        // if (totalNumVertices > Math.pow(2, 16)) {
        //     console.warn("Unable to index vertices:" + (numUnSplitVertices + splitCount) + " on mesh:" + this.__geom.name);
        //     this.unbind();
        //     this.destroyVBO();
        //     return;
        // }
        let indices = this.__geom.generateTriangulatedIndices(numUnSplitVertices, splitIndices);

        this.__numTriIndices = indices.length;

        let gl = this.__gl;
        this.__indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
        this.__indexBuffer.name = 'indexBuffer';

        // Create some vertx attribute buffers

        let attribIndexOffset = 4;
        let debugAttrValues = false;
        let maxIndex;
        if (debugAttrValues)
            maxIndex = Math.max(...indices);
        for (let attrName in vertexAttributes) {
            let attr = vertexAttributes[attrName];
            let data;
            if (splitCount == 0)
                data = attr.data;
            else
                data = attr.generateSplitValues(splitIndices, splitCount);

            let dimension = attr.numFloat32Elements;
            let count = data.length / dimension;

            // if(attrName == "texCoords"){
            //     console.log(attrName + ":"  + data);
            //     let temp = attr.generateSplitValues(attr.getSplits(), attr.getSplitCount());
            //     for(let i=0;i<temp.length; i+=dimension){
            //         let val = attr.__dataType.createFromFloat32Buffer(temp.buffer, i);
            //         console.log(val.toString());
            //     //     if(i >= data.length / dimension){
            //     //         throw("Invalid indexing.Index out of range");
            //     //     }
            //     }
            // }

            if (debugAttrValues) {
                if (count <= maxIndex)
                    console.warn("Invalid indexing. Attr value is insufficient for indexing:" + attrName + ". Max Index:" + maxIndex + " Attr Size:" + count);
            }

            let attrBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, attrBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

            this.__glattrbuffers[attrName] = {
                buffer: attrBuffer,
                dimension: dimension,
                normalized: attrName == 'normals'
            };
        }
        // this.unbind();

    }

    destroyBuffers() {
        super.destroyBuffers();
        let gl = this.__gl;
        gl.deleteBuffer(this.__indexBuffer);
        this.__indexBuffer = undefined;
    }

    getNumUnSplitVerts(){
        return this.__geom.vertices.length;
    }

    getNumSplitVerts(){
        return this.__totalNumVertices;
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
        this.__gl.drawElements(this.__gl.TRIANGLES, this.__numTriIndices, this.__gl.UNSIGNED_INT, 0);
    }

    drawInstanced(count) {
        this.__gl.__ext_Inst.drawElementsInstancedANGLE(this.__gl.TRIANGLES, this.__numTriIndices, this.__gl.UNSIGNED_INT, 0, count);
    }


    destroy() {
        if (this.__wireframesVao)
            this.__ext.deleteVertexArrayOES(this.__wireframesVao);
        if (this.__hardEdgesVao)
            this.__ext.deleteVertexArrayOES(this.__hardEdgesVao);
        super.destroy();
    }
};

export {
    GLMesh
};