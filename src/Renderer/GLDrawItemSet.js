import '../SceneTree/GeomItem.js';

// This class abstracts the rendering of a collection of geometries to screen.
class GLDrawItemSet {
    constructor(gl, glgeom) {
        this.__gl = gl;
        this.__glgeom = glgeom;
        this.__drawItems = [];
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

    getGLDrawItemCount() {
        return this.__drawItems.length;
    }

    getGLDrawItem(index) {
        return this.__drawItems[index];
    }

    //  Note: used by patternade to iterate over times.
    getGLDrawItems(){
        return this.__drawItems;
    }

    // isInverted() {
    //     return this.__inverted;
    // }

    getLightmapName() {
        return this.__lightmapName;
    }

    addDrawItem(gldrawItem) {
        let index = this.__drawItems.length;
        this.__drawItems.push(gldrawItem);
        if(gldrawItem.visible)
            this.__drawCount++;

        if (this.__drawItems.length == 1) {
            // this.__inverted = gldrawItem.isInverted();
            this.__lightmapName = gldrawItem.getGeomItem().getLightmapName();
        }

        gldrawItem.visibilityChanged.connect((visible)=>{
            if(visible)
                this.__drawCount++;
            else
                this.__drawCount--;
            this.__instancedIdsBufferDirty = true;
        });

        gldrawItem.destructing.connect(() => {
            this.__drawItems.splice(index, 1);
            if(gldrawItem.visible)
                this.__drawCount--;
            if(this.__drawItems.length == 0){
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
        this.__instancedIdsArray = new Float32Array(this.__drawItems.length);
        this.__instancedIdsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.__instancedIdsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.__instancedIdsArray, gl.STATIC_DRAW);
        this.__instancedIdsBuffer.name = 'transformIds';
    }

    // The culling system will specify a subset of the total number of items for
    // drawing. 
    updateInstanceIDsBuffer() {
        let gl = this.__gl;
        if(!gl.floatTexturesSupported) {
            this.__visibleItems = [];
            for (let i = 0; i < this.__drawItems.length; i++) {
                if(this.__drawItems[i].visible){
                    this.__visibleItems.push(i);
                    this.__lastVisible = i;
                }
            }
            this.__instancedIdsBufferDirty = false;
            return;
        }
        if(this.__instancedIdsBuffer && this.__drawItems.length != this.__instancedIdsArray.length){
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
        for (let i = 0; i < this.__drawItems.length; i++) {
            if(this.__drawItems[i].visible){
                this.__instancedIdsArray[offset] = this.__drawItems[i].getId();
                offset++;
                this.__lastVisible = i;
            }
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this.__instancedIdsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.__instancedIdsArray, gl.STATIC_DRAW);

        this.__instancedIdsBufferDirty = false;
    }

    getDrawCount() {
        return this.__drawCount;
    }

    //////////////////////////////////////
    // Drawing

    drawSingle(renderstate, extrAttrBuffers, index = 0) {

        let gl = this.__gl;
        let unifs = renderstate.unifs;
        this.__glgeom.bind(renderstate, extrAttrBuffers);
        if (this.__drawItems[index].bind(renderstate)) {
            // Specify an non-instanced draw to the shader
            if(renderstate.unifs.instancedDraw) {
                gl.uniform1i(renderstate.unifs.instancedDraw.location, 0);
                gl.disableVertexAttribArray(renderstate.attrs.instancedIds.location);
            }
            this.__glgeom.draw();
        }
    }

    draw(renderstate, extrAttrBuffers) {
        if (this.__drawCount == 0) {
            return;
        }
        if (this.__instancedIdsBufferDirty) {
            this.updateInstanceIDsBuffer();
        }

        let gl = this.__gl;
        let unifs = renderstate.unifs;

        if (renderstate.lightmaps && unifs.lightmap) {
            if (renderstate.boundLightmap != this.__lightmapName) {
                let gllightmap = renderstate.lightmaps[this.__lightmapName];
                if (gllightmap && gllightmap.glimage.isLoaded()) {
                    gllightmap.glimage.bindToUniform(renderstate, unifs.lightmap);
                    gl.uniform2fv(unifs.lightmapSize.location, gllightmap.atlasSize.asArray());
                    if(unifs.lightmapConnected){
                        gl.uniform1i(unifs.lightmapConnected.location, true);
                    }
                    renderstate.boundLightmap = this.__lightmapName;
                } else {
                    // disable lightmaps. Revert to default lighting.
                    if(unifs.lightmapConnected){
                        gl.uniform1i(unifs.lightmapConnected.location, false);
                    }
                }
            }
        }

        // Lazy unbinding. We can have situations where we have many materials
        // all bound to the same geom. e.g. lots of billboards
        // We can avoid the expensive re-binding of geoms with a simple check. 
        if(renderstate.glgeom != this.__glgeom){
            this.__glgeom.bind(renderstate, extrAttrBuffers);
            renderstate.glgeom = this.__glgeom;
        }

        // renderstate.drawCalls++;
        // renderstate.drawCount+=this.__drawCount;
        // The set has a transform id stored in the texture.
        // Each set as at least one transform, but might have many...
        if (this.__drawCount == 1) {
            // return;
            if (this.__drawItems[this.__lastVisible].bind(renderstate)) {
                // console.log("draw:"+ this.__drawItems[this.__lastVisible].getId());
                // Specify an non-instanced draw to the shader
                if(renderstate.unifs.instancedDraw) {
                    gl.uniform1i(renderstate.unifs.instancedDraw.location, 0);
                    gl.disableVertexAttribArray(renderstate.attrs.instancedIds.location);
                }
                this.__glgeom.draw();
            }
            return;
        }
        // return;

        if(!gl.floatTexturesSupported || !gl.drawElementsInstanced) {
            this.__visibleItems.forEach((index)=>{
                this.__drawItems[index].bind(renderstate);
                this.__glgeom.draw();
            });
        }
        else
        {
            // console.log("draw:"+ this.__instancedIdsArray);

            // Specify an instanced draw to the shader so it knows how
            // to retrieve the modelmatrix.
            gl.uniform1i(renderstate.unifs.instancedDraw.location, 1);

            // The instanced transform ids are bound as an instanced attribute.
            let location = renderstate.attrs.instancedIds.location;
            gl.enableVertexAttribArray(location);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.__instancedIdsBuffer);
            gl.vertexAttribPointer(location, 1, gl.FLOAT, false, 1*4, 0);
            gl.vertexAttribDivisor(location, 1); // This makes it instanced


            this.__glgeom.drawInstanced(this.__drawCount);
        }


    }
};

export {
    GLDrawItemSet
};
