import '../SceneTree/GeomItem.js';


import {
  Signal
} from '../Utilities';

// This class abstracts the rendering of a collection of geometries to screen.
class GLGeomItemSet {
  constructor(gl, glgeom) {
    this.gl = gl;
    this.glgeom = glgeom;
    this.glgeomItems = [];
    this.glgeomItemSignalIds = [];
    this.drawIdsArray = null;
    this.drawIdsBuffer = null;
    this.drawIdsBufferDirty = true;
    this.drawCount = 0; // The number of visible drawn geoms.

    this.selectedCount = 0; // The number of selected drawn geoms.
    this.selectedIdsArray = null;
    this.selectedIdsBuffer = null;
    this.selectedIdsBufferDirty = true;

    // this.inverted = false;
    this.lightmapName = undefined;

    this.drawCountChanged = new Signal();
    this.destructing = new Signal();
  }

  getGLGeom() {
    return this.glgeom;
  }

  // getGLGeomItemCount() {
  //     return this.glgeomItems.length;
  // }

  // getGLGeomItem(index) {
  //     return this.glgeomItems[index];
  // }

  // //  Note: used by patternade to iterate over items.
  // getGLGeomItems() {
  //     return this.glgeomItems;
  // }

  getLightmapName() {
    return this.lightmapName;
  }

  getDrawCount() {
    return this.drawCount;
  }

  addGeomItem(glglgeomItem) {
    if (glglgeomItem.visible) {
      this.drawCount++;
      this.drawCountChanged.emit(1);
    }

    if (this.glgeomItems.length == 0) {
      // this.inverted = glglgeomItem.isInverted();
      this.lightmapName = glglgeomItem.getGeomItem().getLightmapName();
    }

    const signalIds = {}

    signalIds.sel = glglgeomItem.selectedChanged.connect(() => {
      const selected = glglgeomItem.getGeomItem().getSelected();
      if (selected) {
        this.selectedCount++;
      } else {
        this.selectedCount--;
      }
      this.selectedIdsBufferDirty = true;
    });

    signalIds.vis = glglgeomItem.visibilityChanged.connect((visible) => {
      if (visible) {
        this.drawCount++;
        this.drawCountChanged.emit(1);
      } else {
        this.drawCount--;
        this.drawCountChanged.emit(-1);
      }
      this.drawIdsBufferDirty = true;
    });

    this.glgeomItems.push(glglgeomItem);
    this.glgeomItemSignalIds.push(signalIds);

    this.drawIdsBufferDirty = true;
  }

  removeGeomItem(glglgeomItem) {
    const index = this.glgeomItems.indexOf(glglgeomItem);
    const signalIds = this.glgeomItemSignalIds[index];
    glglgeomItem.selectedChanged.disconnectId(signalIds.sel);
    glglgeomItem.visibilityChanged.disconnectId(signalIds.vis);

    this.glgeomItems.splice(index, 1)
    this.glgeomItemSignalIds.splice(index, 1);

    if (glglgeomItem.visible) {
      this.drawCount--;
      this.drawCountChanged.emit(-1);
    }
    this.drawIdsBufferDirty = true;
    console.log("removeGeomItem:", glglgeomItem.getGeomItem().getName(), this.glgeomItems.length)
    if(this.glgeomItems.length == 0) {
      this.destroy();
    }
  }

  //////////////////////////////////////
  // Instance Ids

  // The culling system will specify a subset of the total number of items for
  // drawing. 
  updateDrawIDsBuffer() {
    const gl = this.gl;
    if (!gl.floatTexturesSupported) {
      this.visibleItems = [];
      for (let i = 0; i < this.glgeomItems.length; i++) {
        if (this.glgeomItems[i].visible) {
          this.visibleItems.push(i);
          this.lastVisible = i;
        }
      }
      this.drawIdsBufferDirty = false;
      return;
    }
    if (this.drawIdsBuffer && this.glgeomItems.length != this.drawIdsArray.length) {
      this.gl.deleteBuffer(this.drawIdsBuffer);
      this.drawIdsBuffer = null;
    }
    if (!this.drawIdsBuffer) {
      this.drawIdsArray = new Float32Array(this.glgeomItems.length);
      this.drawIdsBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.drawIdsBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, this.drawIdsArray, gl.STATIC_DRAW);
      this.drawIdsBuffer.name = 'transformIds';
    }

    // Collect all visible geom ids into the instanceIds array.
    // Note: the draw count can be less than the number of instances
    // we re-use the same buffer and simply invoke fewer draw calls.
    let offset = 0;
    for (let i = 0; i < this.glgeomItems.length; i++) {
      if (this.glgeomItems[i].visible) {
        this.drawIdsArray[offset] = this.glgeomItems[i].getId();
        offset++;
        this.lastVisible = i;
      }
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, this.drawIdsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.drawIdsArray, gl.STATIC_DRAW);

    this.drawIdsBufferDirty = false;
  }


  //////////////////////////////////////
  // Selected Items

  updateSelectedIDsBuffer() {
    const gl = this.gl;
    if (!gl.floatTexturesSupported) {
      this.selectedItems = [];
      for (let i = 0; i < this.glgeomItems.length; i++) {
        const selected = this.glgeomItems[i].getGeomItem().getSelected();
        if (selected) {
          this.selectedItems.push(i);
          this.lastVisible = i;
        }
      }
      this.selectedIdsBufferDirty = false;
      return;
    }
    if (this.selectedIdsBuffer && this.glgeomItems.length != this.selectedIdsArray.length) {
      this.gl.deleteBuffer(this.selectedIdsBuffer);
      this.selectedIdsBuffer = null;
    }
    if (!this.selectedIdsBuffer) {
      const gl = this.gl;
      this.selectedIdsArray = new Float32Array(this.glgeomItems.length);
      this.selectedIdsBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.selectedIdsBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, this.selectedIdsArray, gl.STATIC_DRAW);
    }

    // Collect all visible geom ids into the instanceIds array.
    // Note: the draw count can be less than the number of instances
    // we re-use the same buffer and simply invoke fewer draw calls.
    let offset = 0;
    for (let i = 0; i < this.glgeomItems.length; i++) {
      if (this.glgeomItems[i].visible) {
        this.selectedIdsArray[offset] = this.glgeomItems[i].getId();
        offset++;
        this.lastVisible = i;
      }
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, this.selectedIdsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.selectedIdsArray, gl.STATIC_DRAW);

    this.selectedIdsBufferDirty = false;
  }

  //////////////////////////////////////
  // Drawing

  drawSingle(renderstate, index = 0) {

    const gl = this.gl;
    const unifs = renderstate.unifs;
    this.glgeom.bind(renderstate);
    if (this.glgeomItems[index].bind(renderstate)) {
      // Specify an non-instanced draw to the shader
      if (renderstate.unifs.instancedDraw) {
        gl.uniform1i(renderstate.unifs.instancedDraw.location, 0);
        gl.disableVertexAttribArray(renderstate.attrs.drawIds.location);
      }
      this.glgeom.draw(renderstate);
    }
  }

  draw(renderstate) {
    if (this.drawCount == 0) {
      return;
    }
    if (this.drawIdsBufferDirty) {
      this.updateDrawIDsBuffer();
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

    this.__bindAndRender(renderstate, this.drawIdsBuffer)
  }


  drawSelected(renderstate) {
    if (this.selectedCount == 0) {
      return;
    }
    if (this.selectedIdsBufferDirty) {
      this.updateSelectedIDsBuffer();
    }

    this.__bindAndRender(renderstate, this.selectedIdsBuffer)

  }

  __bindAndRender(renderstate, drawIdsBuffer) {

    const gl = this.gl;
    const unifs = renderstate.unifs;

    // Lazy unbinding. We can have situations where we have many materials
    // all bound to the same geom. e.g. lots of billboards
    // We can avoid the expensive re-binding of geoms with a simple check. 
    if (renderstate.glgeom != this.glgeom) {
      this.glgeom.bind(renderstate);
      renderstate.glgeom = this.glgeom;
    }

    // renderstate.drawCalls++;
    // renderstate.drawCount+=this.drawCount;
    // The set has a transform id stored in the texture.
    // Each set as at least one transform, but might have many...
    if (!renderstate.supportsInstancing) {
      // return;
      if (this.glgeomItems[this.lastVisible].bind(renderstate)) {
        // console.log("draw:"+ this.glgeomItems[this.lastVisible].getId());
        // Specify an non-instanced draw to the shader
        if (renderstate.unifs.instancedDraw) {
          gl.uniform1i(renderstate.unifs.instancedDraw.location, 0);

          // Somoe shaders don't have this uniform. (FatLinesShader).
          // do we need to disable it?
          // gl.disableVertexAttribArray(renderstate.attrs.drawIds.location);
        }

        renderstate.bindViewports(unifs, ()=>{
          this.glgeom.draw(renderstate);
        })
      }
      return;
    }
    // return;

    if (!gl.floatTexturesSupported || !gl.drawElementsInstanced) {
      const len = this.visibleItems.length;
      for (let i = 0; i < len; i++) {
        this.glgeomItems[i].bind(renderstate);

        renderstate.bindViewports(unifs, ()=>{
          this.glgeom.draw(renderstate);
        })
      }
    } else {
      // console.log("draw:"+ this.drawIdsArray);

      if (renderstate.attrs.instancedIds) {

        // Specify an instanced draw to the shader so it knows how
        // to retrieve the modelmatrix.
        gl.uniform1i(renderstate.unifs.instancedDraw.location, 1);

        // The instanced transform ids are bound as an instanced attribute.
        let location = renderstate.attrs.instancedIds.location;
        gl.enableVertexAttribArray(location);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.drawIdsBuffer);
        gl.vertexAttribPointer(location, 1, gl.FLOAT, false, 1 * 4, 0);
        gl.vertexAttribDivisor(location, 1); // This makes it instanced
      }

      renderstate.bindViewports(unifs, ()=>{
        this.glgeom.drawInstanced(this.drawCount);
      })
    }
  }

  destroy() {
    this.destructing.emit();
  }
};

export {
  GLGeomItemSet
};