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

    this.highlightedCount = 0; // The number of highlighted drawn geoms.
    this.highlightedIdsArray = null;
    this.highlightedIdsBuffer = null;
    this.highlightedIdsBufferDirty = true;

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

  addGeomItem(glgeomItem) {
    if (glgeomItem.visible) {
      this.drawCount++;
      this.drawCountChanged.emit(1);
      const highlighted = glgeomItem.getGeomItem().isHighlighted();
      if (highlighted) {
        this.highlightedCount++;
        this.highlightedIdsBufferDirty = true;
      }
    }
    // console.log("addGeomItem:", glgeomItem.getGeomItem().getPath(), glgeomItem.getGeomItem().isHighlighted())

    if (this.glgeomItems.length == 0) {
      // this.inverted = glgeomItem.isInverted();
      this.lightmapName = glgeomItem.getGeomItem().getLightmapName();
    }

    const signalIds = {}

    signalIds.sel = glgeomItem.highlightChanged.connect(() => {
      if (glgeomItem.visible) {
        const highlighted = glgeomItem.getGeomItem().isHighlighted();
        if (highlighted) {
          this.highlightedCount++;
        } else {
          this.highlightedCount--;
        }
        this.highlightedIdsBufferDirty = true;
      }
    });

    signalIds.vis = glgeomItem.visibilityChanged.connect((visible) => {
      const highlighted = glgeomItem.getGeomItem().isHighlighted()
      if (visible) {
        this.drawCount++;
        this.drawCountChanged.emit(1);
        if (highlighted) {
          this.highlightedCount++;
          this.highlightedIdsBufferDirty = true;
        }
      } else {
        this.drawCount--;
        this.drawCountChanged.emit(-1);
        if (highlighted) {
          this.highlightedCount--;
          this.highlightedIdsBufferDirty = true;
        }
      }
      this.drawIdsBufferDirty = true;
    });

    this.glgeomItems.push(glgeomItem);
    this.glgeomItemSignalIds.push(signalIds);

    this.drawIdsBufferDirty = true;
  }

  removeGeomItem(glgeomItem) {
    const index = this.glgeomItems.indexOf(glgeomItem);
    const signalIds = this.glgeomItemSignalIds[index];
    glgeomItem.highlightedChanged.disconnectId(signalIds.sel);
    glgeomItem.visibilityChanged.disconnectId(signalIds.vis);

    this.glgeomItems.splice(index, 1)
    this.glgeomItemSignalIds.splice(index, 1);

    if (glgeomItem.visible) {
      this.drawCount--;
      this.drawCountChanged.emit(-1);
    }
    this.drawIdsBufferDirty = true;
    // console.log("removeGeomItem:", glgeomItem.getGeomItem().getName(), this.glgeomItems.length)
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
    this.glgeomItems.forEach((geomItem, index)=>{
      if (geomItem.visible) {
        this.drawIdsArray[offset] = geomItem.getId();
        offset++;
        this.lastVisible = index;
      }
    });
    gl.bindBuffer(gl.ARRAY_BUFFER, this.drawIdsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.drawIdsArray, gl.STATIC_DRAW);

    this.drawIdsBufferDirty = false;
  }


  //////////////////////////////////////
  // Selected Items

  updateHighlightedIDsBuffer() {
    const gl = this.gl;
    if (!gl.floatTexturesSupported) {
      this.highlightedItems = [];
      for (let i = 0; i < this.glgeomItems.length; i++) {
        const highlighted = this.glgeomItems[i].getGeomItem().isHighlighted();
        if (highlighted) {
          this.highlightedItems.push(i);
          this.lastVisible = i;
        }
      }
      this.highlightedIdsBufferDirty = false;
      return;
    }
    if (this.highlightedIdsBuffer && this.glgeomItems.length != this.highlightedIdsArray.length) {
      this.gl.deleteBuffer(this.highlightedIdsBuffer);
      this.highlightedIdsBuffer = null;
    }

    // Collect all visible geom ids into the instanceIds array.
    // Note: the draw count can be less than the number of instances
    // we re-use the same buffer and simply invoke fewer draw calls.
    if (!this.highlightedIdsArray || this.highlightedCount > this.highlightedIdsArray.length) {
      this.highlightedIdsArray = new Float32Array(this.highlightedCount);
      if (this.highlightedIdsBuffer) {
        gl.deleteBuffer(this.highlightedIdsBuffer);
        this.highlightedIdsBuffer = null;
      }
    }

    let offset = 0;
    for (let i = 0; i < this.glgeomItems.length; i++) {
      const glgeomItem = this.glgeomItems[i];
      if (glgeomItem.visible && glgeomItem.getGeomItem().isHighlighted()) {
        this.highlightedIdsArray[offset] = glgeomItem.getId();
        offset++;
      }
    }

    if (!this.highlightedIdsBuffer) {
      this.highlightedIdsBuffer = gl.createBuffer();
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, this.highlightedIdsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.highlightedIdsArray, gl.STATIC_DRAW);

    this.highlightedIdsBufferDirty = false;
  }

  //////////////////////////////////////
  // Drawing

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

    this.__bindAndRender(renderstate, this.drawIdsBuffer, this.drawCount)
  }

  drawHighlighted(renderstate) {
    if (this.highlightedCount == 0) {
      return;
    }
    if (this.highlightedIdsBufferDirty) {
      this.updateHighlightedIDsBuffer();
    }

    this.__bindAndRender(renderstate, this.highlightedIdsBuffer, this.highlightedCount)

  }

  __bindAndRender(renderstate, drawIdsBuffer, drawCount) {

    const gl = this.gl;
    const unifs = renderstate.unifs;

    // Lazy unbinding. We can have situations where we have many materials
    // all bound to the same geom. e.g. lots of billboards
    // We can avoid the expensive re-binding of geoms with a simple check. 
    if (renderstate.glgeom != this.glgeom) {
      this.glgeom.bind(renderstate);
      renderstate.glgeom = this.glgeom;
    }

    if (!gl.floatTexturesSupported || !gl.drawElementsInstanced || !renderstate.supportsInstancing) {
      if (renderstate.unifs.instancedDraw) {
        gl.uniform1i(renderstate.unifs.instancedDraw.location, 0);
      }
      for (let i = 0; i < drawCount; i++) {
        this.glgeomItems[drawIdsBuffer[i]].bind(renderstate);

        renderstate.bindViewports(unifs, ()=>{
          this.glgeom.draw(renderstate);
        })
      }
    } else {
      // console.log("draw:"+ this.drawIdsArray);

      // Specify an instanced draw to the shader so it knows how
      // to retrieve the modelmatrix.
      gl.uniform1i(renderstate.unifs.instancedDraw.location, 1);

      // The instanced transform ids are bound as an instanced attribute.
      let location = renderstate.attrs.instancedIds.location;
      gl.enableVertexAttribArray(location);
      gl.bindBuffer(gl.ARRAY_BUFFER, drawIdsBuffer);
      gl.vertexAttribPointer(location, 1, gl.FLOAT, false, 1 * 4, 0);
      gl.vertexAttribDivisor(location, 1); // This makes it instanced

      renderstate.bindViewports(unifs, ()=>{
        this.glgeom.drawInstanced(drawCount);
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