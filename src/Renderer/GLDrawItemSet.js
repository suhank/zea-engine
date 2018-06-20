import '../SceneTree/GeomItem.js';

// This class abstracts the rendering of a collection of geometries to screen.
class GLDrawItemSet {
    constructor(gl, glgeom) {
        this.gl = gl;
        this.glgeom = glgeom;
        this.drawItems = [];
        this.instancedIdsArray = null;
        this.instancedIdsBuffer = null;
        this.instancedIdsBufferDirty = true;
        this.drawCount = 0; // The number of visible drawn geoms.
        // this.inverted = false;
        this.lightmapName = undefined;
    }

    getGLGeom() {
        return this.glgeom;
    }

    getGLDrawItemCount() {
        return this.drawItems.length;
    }

    getGLDrawItem(index) {
        return this.drawItems[index];
    }

    //  Note: used by patternade to iterate over times.
    getGLDrawItems() {
        return this.drawItems;
    }

    // isInverted() {
    //     return this.inverted;
    // }

    getLightmapName() {
        return this.lightmapName;
    }

    addDrawItem(gldrawItem) {
        let index = this.drawItems.length;
        this.drawItems.push(gldrawItem);
        if (gldrawItem.visible)
            this.drawCount++;

        if (this.drawItems.length == 1) {
            // this.inverted = gldrawItem.isInverted();
            this.lightmapName = gldrawItem.getGeomItem().getLightmapName();
        }

        gldrawItem.visibilityChanged.connect((visible) => {
            if (visible)
                this.drawCount++;
            else
                this.drawCount--;
            this.instancedIdsBufferDirty = true;
        });

        gldrawItem.destructing.connect(() => {
            this.drawItems.splice(index, 1);
            if (gldrawItem.visible)
                this.drawCount--;
            if (this.drawItems.length == 0) {
                // Destroy??
            }
            this.instancedIdsBufferDirty = true;
        });

        this.instancedIdsBufferDirty = true;
    }


    //////////////////////////////////////
    // Instance Ids
    genBuffers() {
        const gl = this.gl;
        this.instancedIdsArray = new Float32Array(this.drawItems.length);
        this.instancedIdsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.instancedIdsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.instancedIdsArray, gl.STATIC_DRAW);
        this.instancedIdsBuffer.name = 'transformIds';
    }

    // The culling system will specify a subset of the total number of items for
    // drawing. 
    updateInstanceIDsBuffer() {
        const gl = this.gl;
        if (!gl.floatTexturesSupported) {
            this.visibleItems = [];
            for (let i = 0; i < this.drawItems.length; i++) {
                if (this.drawItems[i].visible) {
                    this.visibleItems.push(i);
                    this.lastVisible = i;
                }
            }
            this.instancedIdsBufferDirty = false;
            return;
        }
        if (this.instancedIdsBuffer && this.drawItems.length != this.instancedIdsArray.length) {
            this.gl.deleteBuffer(this.instancedIdsBuffer);
            this.instancedIdsBuffer = null;
        }
        if (!this.instancedIdsBuffer) {
            this.genBuffers();
        }

        // Collect all visible geom ids into the instanceIds array.
        // Note: the draw count can be less than the number of instances
        // we re-use the same buffer and simply invoke fewer draw calls.
        let offset = 0;
        for (let i = 0; i < this.drawItems.length; i++) {
            if (this.drawItems[i].visible) {
                this.instancedIdsArray[offset] = this.drawItems[i].getId();
                offset++;
                this.lastVisible = i;
            }
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this.instancedIdsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.instancedIdsArray, gl.STATIC_DRAW);

        this.instancedIdsBufferDirty = false;
    }

    getDrawCount() {
        return this.drawCount;
    }

    //////////////////////////////////////
    // Drawing

    drawSingle(renderstate, extrAttrBuffers, index = 0) {

        const gl = this.gl;
        const unifs = renderstate.unifs;
        this.glgeom.bind(renderstate, extrAttrBuffers);
        if (this.drawItems[index].bind(renderstate)) {
            // Specify an non-instanced draw to the shader
            if (renderstate.unifs.instancedDraw) {
                gl.uniform1i(renderstate.unifs.instancedDraw.location, 0);
                gl.disableVertexAttribArray(renderstate.attrs.instancedIds.location);
            }
            this.glgeom.draw(renderstate);
        }
    }

    draw(renderstate, extrAttrBuffers) {
        if (this.drawCount == 0) {
            return;
        }
        if (this.instancedIdsBufferDirty) {
            this.updateInstanceIDsBuffer();
        }

        const gl = this.gl;
        const unifs = renderstate.unifs;

        if (renderstate.lightmaps && unifs.lightmap) {
            if (renderstate.boundLightmap != this.lightmapName) {
                let gllightmap = renderstate.lightmaps[this.lightmapName];
                if (gllightmap && gllightmap.glimage.isLoaded()) {
                    gllightmap.glimage.bindToUniform(renderstate, unifs.lightmap);
                    gl.uniform2fv(unifs.lightmapSize.location, gllightmap.atlasSize.asArray());
                    if (unifs.lightmapConnected) {
                        gl.uniform1i(unifs.lightmapConnected.location, true);
                    }
                    renderstate.boundLightmap = this.lightmapName;
                } else {
                    // disable lightmaps. Revert to default lighting.
                    if (unifs.lightmapConnected) {
                        gl.uniform1i(unifs.lightmapConnected.location, false);
                    }
                }
            }
        }

        // Lazy unbinding. We can have situations where we have many materials
        // all bound to the same geom. e.g. lots of billboards
        // We can avoid the expensive re-binding of geoms with a simple check. 
        if (renderstate.glgeom != this.glgeom) {
            this.glgeom.bind(renderstate, extrAttrBuffers);
            renderstate.glgeom = this.glgeom;
        }

        // renderstate.drawCalls++;
        // renderstate.drawCount+=this.drawCount;
        // The set has a transform id stored in the texture.
        // Each set as at least one transform, but might have many...
        if (!renderstate.glgeom.renderableInstanced()) {
            // return;
            if (this.drawItems[this.lastVisible].bind(renderstate)) {
                // console.log("draw:"+ this.drawItems[this.lastVisible].getId());
                // Specify an non-instanced draw to the shader
                if (renderstate.unifs.instancedDraw) {
                    gl.uniform1i(renderstate.unifs.instancedDraw.location, 0);
                    gl.disableVertexAttribArray(renderstate.attrs.instancedIds.location);
                }
                this.glgeom.draw(renderstate);
            }
            return;
        }
        // return;

        if (!gl.floatTexturesSupported || !gl.drawElementsInstanced) {
            const len = this.visibleItems.length;
            for (let i = 0; i < len; i++) {
                this.drawItems[i].bind(renderstate);
                this.glgeom.draw(renderstate);
            }
        } else {
            // console.log("draw:"+ this.instancedIdsArray);

            if(renderstate.attrs.instancedIds) {

                // Specify an instanced draw to the shader so it knows how
                // to retrieve the modelmatrix.
                gl.uniform1i(renderstate.unifs.instancedDraw.location, 1);

                // The instanced transform ids are bound as an instanced attribute.
                let location = renderstate.attrs.instancedIds.location;
                gl.enableVertexAttribArray(location);
                gl.bindBuffer(gl.ARRAY_BUFFER, this.instancedIdsBuffer);
                gl.vertexAttribPointer(location, 1, gl.FLOAT, false, 1 * 4, 0);
                gl.vertexAttribDivisor(location, 1); // This makes it instanced
            }


            this.glgeom.drawInstanced(this.drawCount);
        }


    }
};

export {
    GLDrawItemSet
};