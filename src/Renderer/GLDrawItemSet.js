import {
    Color,
    Signal
} from '../Math';
import '../SceneTree/GeomItem.js';

import {
    GeomShaderBinding
} from './GeomShaderBinding.js';

// This class abstracts the rendering of a collection of geometries to screen.
class GLDrawItemSet {
    constructor(gl) {
        this.__gl = gl;
        this.__glgeoms = [];
        this.__gldrawItems = [];


        // this.__numAttrs = 0;
        // this.__numTris = 0;
        // this.__glattrbuffers = {
        //     'positions': {
        //         'dataType': 'Vec3',
        //         'elementType': 'Float32',
        //         'dimension': 3,
        //         'stride': 3 * 4
        //     },
        //     'normals': {
        //         'dataType': 'Vec3',
        //         'elementType': 'Float32',
        //         'dimension': 3,
        //         'stride': 2 * 4,
        //         'normalized': true
        //     },
        //     'uvs': {
        //         'dataType': 'Vec2',
        //         'elementType': 'Float32',
        //         'dimension': 2,
        //         'stride': 2 * 4
        //     }
        // }
        // this.__indexBuffer = undefined;
        // // The coalesced geom attribute buffers.
        // this.__coalescedGeomAttributes = {};
        // this.__coalescedIndices = 0;

        this.__transformIdsArray = null;
        this.__transformIdsBuffer = null;
        this.__drawCount = 0;
        this.__mirrored = false;
        this.__lightmapName = undefined;

        this.__shaderBindings = {};
    }

    addGLGeom(glgeom) {
        this.__glgeoms.push(glgeom);
    }

    getGLGeom(index = 0) {
        return this.__glgeoms[index];
    }

    getGLDrawItem(index) {
        return this.__gldrawItems[index];
    }

    isMirrored() {
        return this.__mirrored;
    }

    getLightmapName() {
        return this.__lightmapName;
    }

    // Multiple small geoms are being merged into a single draw item set. 
    // This is to speed up rendering by replacing multiple draw calls with
    // a single call.
    addDrawItem(gldrawItem) {
        // Generate a single large buffer for all the draw items.
        // Transform the vertices into global space. 
        // Assign offsets to each of the draw items in case they need
        // to be drawn individually,

        // this.__numTris += gldrawItem.getGLGeom().getNumTriangles();
        let index = this.__gldrawItems.length;
        this.__gldrawItems.push(gldrawItem);
        this.__drawCount++;

        if (this.__gldrawItems.length == 1) {
            this.__mirrored = gldrawItem.isMirrored();
            this.__lightmapName = gldrawItem.getGeomItem().getLightmap();
        }

        gldrawItem.destructing.connect(() => {
            this.__gldrawItems.splice(index, 1);
            this.__drawCount--;
            if(this.__gldrawItems.length == 0){

            }
        }, this);
    }


    genBuffers() {

        let gl = this.__gl;

        /*
        for (let attrName in this.__glattrbuffers) {
            let glattr = this.__glattrbuffers[attrName];
            let data = new Float32Array(this.__numAttrs * glattr.dimension);
            this.__glattrbuffers[attrName].data = data;
        }

        let triIndices = new Uint32Array(this.__numTris);
        this.__transformIds = {
            'data': new Uint32Array(this.__gldrawItems.size())
        };

        let attrsOffset = 0;
        let indicesOffset = 0;
        let index = 0;
        for (let glgeom of this.__glgeoms) {
            let glgeom = gldrawItem.getGLGeom();
            let geomItem = gldrawItem.getGeomItem();
            let mat4 = geomItem.getGeomXfo().toMat4();
            let splitData = glgeom.getSplitData();
            let vertexAttributes = glgeom.getGeom().getVertexAttributes();

            for (let attrName in vertexAttributes) {
                let attr = vertexAttributes[attrName];
                let data = this.__glattrbuffers[attrName].data;
                attr.populateBufferData(splitData, data, attrsOffset, mat4);
            }

            glgeom.getGeom().populateTriangulatedIndices(splitData, triIndices, indicesOffset, attrsOffset);
            glgeom.setIndicesOffset(indicesOffset);

            this.__transformIdsArray[index] = gldrawItem.getId();

            attrsOffset += glgeom.getAttrCount();
            indicesOffset += glgeom.getNumTriangles();
            index++;
        }

        for (let attrName in this.__glattrbuffers) {
            let glattr = this.__glattrbuffers[attrName];

            let glbuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, glbuffer);
            gl.bufferData(gl.ARRAY_BUFFER, glattr.data, gl.STATIC_DRAW);

            this.__glattrbuffers[attrName].glbuffer = glbuffer;
        }


        this.__indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triIndices, gl.STATIC_DRAW);
*/

        this.__transformIdsArray = new Float32Array(this.__gldrawItems.length);
        for (let i = 0; i < this.__gldrawItems.length; i++) {
            this.__transformIdsArray[i] = this.__gldrawItems[i].getId();
        }

        this.__transformIdsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.__transformIdsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.__transformIdsArray, gl.STATIC_DRAW);
        this.__drawCount = this.__transformIdsArray.length;

        this.__transformIdsBuffer.name = 'transformIds';
    }

    //////////////////////////////////////
    // Culling
    // The culling system will specify a subset of the total number of items for
    // drawing. 
    setDrawList(transformIds) {
        this.__drawCount = transformIds.length;
        if (this.__drawCount == 0) {
            return;
        }
        // Note: the size of the transformIds can fluctuate
        // due to culling. We can maintain a high-water mark
        // buffer, and then only render the first N items. 
        for (let i = 0; i < transformIds.length; i++) {
            this.__transformIdsArray[i] = transformIds[i];
        }
        // Note: the draw cound can be less than the number of instances
        // we re-use the same buffer and simply invoke fewer draw calls.
        gl.bindBuffer(gl.ARRAY_BUFFER, this.__transformIdsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.__transformIdsArray, gl.STATIC_DRAW);
    }

    getDrawCount() {
        return this.__drawCount;
    }

    //////////////////////////////////////
    // Drawing
    // bindGeomData(renderstate) {
    //     let shaderBinding = this.__shaderBindings[renderstate.shaderkey];
    //     if (!shaderBinding) {
    //         shaderBinding = new GeomShaderBinding(this.__gl, renderstate.attrs, this.__glattrbuffers, this.__indexBuffer, this.__transformIds);
    //         this.__shaderBindings[renderstate.shaderkey] = shaderBinding;
    //     }
    //     shaderBinding.bind(renderstate);
    // }

    drawSingleItem(renderstate, index) {

        let drawItem = this.__gldrawItems[index];
        let glgeom = drawItem.getGLGeom();

        if (glgeom.bind(renderstate, {})) {

            if (drawItem.bind(renderstate)) {

                let gl = this.__gl;

                // Specify an non-instanced draw to the shader
                gl.uniform1i(renderstate.unifs.instancedDraw.location, 0);

                glgeom.draw();

            }
        }
    }

    draw(renderstate) {
        if (this.__drawCount == 0) {
            return;
        }

        if (!this.__transformIdsBuffer) {
            this.genBuffers();
        }

        let gl = this.__gl;
        let unifs = renderstate.unifs;

        if (this.__mirrored && renderstate.mirrored != true) {
            gl.cullFace(gl.FRONT);
            renderstate.mirrored = true;
        } else if (!this.__mirrored && renderstate.mirrored == true) {
            gl.cullFace(gl.BACK);
            renderstate.mirrored = false;
        }

        renderstate.drawCount+=this.__drawCount;

        // The set has a transform id stored in the texture.
        // Each set as at least one transform, but might have many...
        if (this.__drawCount == 1) {
            return this.drawSingleItem(renderstate, 0);
        }

        // If not already bound...
        let glgeom = this.__glgeoms[0];
        glgeom.bind(renderstate, {}, this.__transformIdsBuffer);

        // Specify an instanced draw to the shader
        gl.uniform1i(renderstate.unifs.instancedDraw.location, 1);

        if ('lightmaps' in renderstate && 'lightmap' in unifs) {
            if (renderstate.boundLightmap != this.__lightmapName) {
                let gllightmap = renderstate.lightmaps[this.__lightmapName];
                if (gllightmap && gllightmap.isLoaded()) {
                    gllightmap.bind(renderstate, unifs.lightmap.location);
                    gl.uniform2fv(unifs.lightmapSize.location, gllightmap.getSize());
                    renderstate.boundLightmap = this.__lightmapName;
                } else {
                    // TODO: disable lightmaps here. (should never need to happen)
                }
            }
        }

        glgeom.drawInstanced(this.__drawCount);

        glgeom.unbind(renderstate);
    }
};

export {
    GLDrawItemSet
};