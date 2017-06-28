import '../SceneTree/GeomItem.js';

// This class abstracts the rendering of a collection of geometries to screen.
class GLDrawItemSet {
    constructor(gl, glgeom) {
        this.__gl = gl;
        this.__glgeom = glgeom;
        this.__gldrawItems = [];
        this.__instancedIdsArray = null;
        this.__instancedIdsBuffer = null;
        this.__instancedIdsBufferDirty = true;
        this.__drawCount = 0;// The number of visible drawn geoms.
        // this.__inverted = false;
        this.__lightmapName = undefined;

        this.__shaderBindings = {};
    }

    getGLGeom() {
        return this.__glgeom;
    }

    getGLDrawItem(index) {
        return this.__gldrawItems[index];
    }

    // isInverted() {
    //     return this.__inverted;
    // }

    getLightmapName() {
        return this.__lightmapName;
    }

    addDrawItem(gldrawItem) {
        let index = this.__gldrawItems.length;
        this.__gldrawItems.push(gldrawItem);
        if(gldrawItem.visible)
            this.__drawCount++;

        if (this.__gldrawItems.length == 1) {
            // this.__inverted = gldrawItem.isInverted();
            this.__lightmapName = gldrawItem.getGeomItem().getLightmapName();
        }

        gldrawItem.visibilityChanged.connect((visible)=>{
            if(visible)
                this.__drawCount++;
            else
                this.__drawCount--;
            this.__instancedIdsBufferDirty = true;
        })
        gldrawItem.destructing.connect(() => {
            this.__gldrawItems.splice(index, 1);
            this.__drawCount--;
            if(this.__gldrawItems.length == 0){
                // Destroy??
            }
            this.__instancedIdsBufferDirty = true;
        });
        this.__instancedIdsBufferDirty = true;
    }


    //////////////////////////////////////
    // Instance Ids
    genBuffers() {
        let gl = this.__gl;
        this.__instancedIdsArray = new Float32Array(this.__gldrawItems.length);
        this.__instancedIdsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.__instancedIdsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.__instancedIdsArray, gl.STATIC_DRAW);
        this.__instancedIdsBuffer.name = 'transformIds';
    }

    // The culling system will specify a subset of the total number of items for
    // drawing. 
    updateInstanceIDsBuffer() {
        if(this.__instancedIdsBuffer && this.__gldrawItems.length != this.__instancedIdsArray.length){
            this.__gl.deleteBuffer(this.__instancedIdsBuffer);
            this.__instancedIdsBuffer = null;
        }
        if(!this.__instancedIdsBuffer){
            this.genBuffers();
        }

        // Collect all visible geom ids into the instanceIds array.
        // Note: the draw count can be less than the number of instances
        // we re-use the same buffer and simply invoke fewer draw calls.
        let offset = 0;
        for (let i = 0; i < this.__gldrawItems.length; i++) {
            if(this.__gldrawItems[i].visible){
                this.__instancedIdsArray[offset] = this.__gldrawItems[i].getId();
                offset++;
                this.__lastVisible = i;
            }
        }
        let gl = this.__gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.__instancedIdsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.__instancedIdsArray, gl.STATIC_DRAW);

        this.__instancedIdsBufferDirty = false;
    }

    getDrawCount() {
        return this.__drawCount;
    }

    //////////////////////////////////////
    // Drawing

    draw(renderstate) {
        if (this.__drawCount == 0) {
            return;
        }
        if (this.__instancedIdsBufferDirty) {
            this.updateInstanceIDsBuffer();
        }

        let gl = this.__gl;
        let unifs = renderstate.unifs;

        if ('lightmaps' in renderstate && 'lightmap' in unifs) {
            if (renderstate.boundLightmap != this.__lightmapName) {
                let gllightmap = renderstate.lightmaps[this.__lightmapName];
                if (gllightmap && gllightmap.glimage.isLoaded()) {
                    gllightmap.glimage.bind(renderstate, unifs.lightmap.location);
                    gl.uniform2fv(unifs.lightmapSize.location, gllightmap.atlasSize);
                    renderstate.boundLightmap = this.__lightmapName;
                } else {
                    // TODO: disable lightmaps here. (should never need to happen)
                }
            }
        }

        this.__glgeom.bind(renderstate);

        renderstate.drawCalls++;
        renderstate.drawCount+=this.__drawCount;
        // The set has a transform id stored in the texture.
        // Each set as at least one transform, but might have many...
        if (this.__drawCount == 1) {
            // return;
            if (this.__gldrawItems[this.__lastVisible].bind(renderstate)) {
                // Specify an non-instanced draw to the shader
                gl.uniform1i(renderstate.unifs.instancedDraw.location, 0);
                this.__glgeom.draw();
            }
            return;
        }
        // return;


        // Specify an instanced draw to the shader so it knows how
        // to retrieve the modelmatrix.
        gl.uniform1i(renderstate.unifs.instancedDraw.location, 1);

        {
            // The instanced transform ids are bound as an instanced attribute.
            let location = renderstate.attrs.instancedIds.location;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.__instancedIdsBuffer);
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(location, 1, gl.FLOAT, false, 1*4, 0);
            gl.__ext_Inst.vertexAttribDivisorANGLE(location, 1); // This makes it instanced
        }

        this.__glgeom.drawInstanced(this.__drawCount);

        this.__glgeom.unbind(renderstate);
    }
};

export {
    GLDrawItemSet
};
// export default GLDrawItemSet;