import { Vec3 } from '../../Math/Vec3';
import { PassType } from './GLPass';
import { Points, Lines, PointsProxy, LinesProxy } from '../../SceneTree/index';
import { GLStandardGeomsPass } from './GLStandardGeomsPass';
import { GLRenderer } from '../GLRenderer';
import { GLShaderGeomSets } from '../Drawing/GLShaderGeomSets';
/** Class representing a GL transparent geoms pass.
 * @extends GLStandardGeomsPass
 * @private
 */
class GLTransparentGeomsPass extends GLStandardGeomsPass {
    /**
     * Create GL transparent geoms pass.
     */
    constructor() {
        super();
        this.listenerIDs = {};
        this.itemCount = 0;
        this.__glShaderGeomSets = {}; // GLShaderGeomSets
        this.transparentItems = [];
        this.transparentItemIndices = {};
        this.freeList = [];
        this.visibleItems = [];
        this.prevSortCameraPos = new Vec3();
        this.sortCameraMovementDistance = 0; // meters
        this.reSort = false;
    }
    /**
     * The init method.
     * @param renderer - The renderer value.
     * @param passIndex - The index of the pass in the GLBAseRenderer
     */
    init(renderer, passIndex) {
        super.init(renderer, passIndex);
        this.itemCount = 0;
        this.__glShaderGeomSets = {};
        this.transparentItems = [];
        this.transparentItemIndices = {};
        this.freeList = [];
        this.visibleItems = [];
        this.prevSortCameraPos = new Vec3(999, 999, 999);
        this.sortCameraMovementDistance = 0.25; // meters
        this.reSort = false;
    }
    /**
     * Returns the pass type. OPAQUE passes are always rendered first, followed by TRANSPARENT passes, and finally OVERLAY.
     * @return - The pass type value.
     */
    getPassType() {
        return PassType.TRANSPARENT;
    }
    /**
     * The init method.
     * @param geomItem - The geomItem value.
     * @return - The return value.
     */
    filterGeomItem(geomItem) {
        const geom = geomItem.geomParam.value;
        if (geom instanceof Lines || geom instanceof Points || geom instanceof PointsProxy || geom instanceof LinesProxy)
            return false;
        const material = geomItem.materialParam.value;
        return material.isTransparent();
    }
    /**
     * When an item visibility changes, we trigger this method, as new items become visible
     */
    resortNeeded() {
        this.reSort = true;
    }
    /**
     * The addGeomItem method.
     * @param geomItem - The geomItem value.
     */
    addGeomItem(geomItem) {
        this.itemCount++;
        const listenerIDs = {};
        this.listenerIDs[geomItem.getId()] = listenerIDs;
        const materialParam = geomItem.materialParam;
        const material = materialParam.value;
        const shaderName = material.getShaderName();
        const shaders = this.constructShaders(shaderName);
        if (!material.isTextured()) {
            if (material.getShaderClass().supportsInstancing()) {
                let glShaderGeomSets = this.__glShaderGeomSets[shaderName];
                if (!glShaderGeomSets) {
                    glShaderGeomSets = new GLShaderGeomSets(this, this.__gl, shaders);
                    glShaderGeomSets.on('updated', () => {
                        this.renderer.requestRedraw();
                    });
                    this.__glShaderGeomSets[shaderName] = glShaderGeomSets;
                }
                const glGeomItem = this.renderer.glGeomItemLibrary.getGLGeomItem(geomItem);
                glShaderGeomSets.addGLGeomItem(glGeomItem);
                listenerIDs['glGeomItem.visibilityChanged'] = glGeomItem.on('visibilityChanged', () => {
                    this.resortNeeded();
                });
                this.emit('updated');
                glGeomItem.GLShaderGeomSets = glShaderGeomSets;
                // force a reSort.
                this.reSort = true;
                return;
            }
        }
        const glGeom = this.renderer.glGeomLibrary.constructGLGeom(geomItem.geomParam.value);
        // const glGeomItem = this.constructGLGeomItem(geomItem)
        const glGeomItem = this.renderer.glGeomItemLibrary.getGLGeomItem(geomItem);
        if (!glGeomItem)
            throw new Error('glGeomItem not found for geomItem:' + geomItem.getName());
        // @todo - make sure we remove materials and GeomItems from the base pass.
        // This code will leak memory for these classes as we are not cleaning them up.
        const glMaterial = this.renderer.glMaterialLibrary.getGLMaterial(material);
        // ////////////////////////////////////
        // Tracking Material Transparency changes...
        // In the case that a geometry material changes, we may need to
        // select a different pass. e.g. if the new material is not transparent
        // then the object moves to the OpaqueGeomsPass
        const materialChanged = () => {
            material.removeListenerById('valueChanged', listenerIDs['material.valueChanged']);
            material.removeListenerById('transparencyChanged', listenerIDs['material.transparencyChanged']);
            materialParam.removeListenerById('valueChanged', listenerIDs['materialParam.valueChanged']);
            this.removeGeomItem(geomItem);
            this.renderer.assignTreeItemToGLPass(geomItem);
        };
        listenerIDs['material.valueChanged'] = material.on('valueChanged', materialChanged);
        listenerIDs['material.transparencyChanged'] = material.on('transparencyChanged', materialChanged);
        listenerIDs['materialParam.valueChanged'] = materialParam.on('valueChanged', materialChanged);
        // ////////////////////////////////////
        // Tracking visibility changes.
        const visibilityChanged = (event) => {
            if (event.visible) {
                this.visibleItems.push(item);
            }
            else {
                const index = this.visibleItems.indexOf(item);
                this.visibleItems.splice(index, 1);
            }
            this.reSort = true;
        };
        listenerIDs['glGeomItem.visibilityChanged'] = glGeomItem.on('visibilityChanged', visibilityChanged);
        // ////////////////////////////////////
        // Tracking GeomMat changes.
        listenerIDs['GeomMat.valueChanged'] = geomItem.geomMatParam.on('valueChanged', () => {
            this.reSort = true;
        });
        const item = {
            geomItem,
            shaders,
            glGeom,
            glMaterial,
            glGeomItem,
            material,
        };
        let itemindex;
        if (this.freeList.length > 0)
            itemindex = this.freeList.pop();
        else
            itemindex = this.transparentItems.length;
        this.transparentItems[itemindex] = item;
        this.transparentItemIndices[geomItem.getId()] = itemindex;
        if (geomItem.isVisible()) {
            this.visibleItems.push(item);
        }
        // force a reSort.
        this.reSort = true;
    }
    /**
     * The removeGeomItem method.
     * @param geomItem - The geomItem value.
     */
    // TODO: needs to return boolean
    removeGeomItem(geomItem) {
        this.itemCount--;
        const glGeomItem = this.renderer.glGeomItemLibrary.getGLGeomItem(geomItem);
        if (!glGeomItem)
            throw new Error('glGeomItem not found for geomItem:' + geomItem.getName());
        const listenerIDs = this.listenerIDs[geomItem.getId()];
        delete this.listenerIDs[geomItem.getId()];
        const materialParam = geomItem.getParameter('Material');
        const material = materialParam.value;
        glGeomItem.removeListenerById('visibilityChanged', listenerIDs['glGeomItem.visibilityChanged']);
        if (glGeomItem.GLShaderGeomSets) {
            const glShaderGeomSets = glGeomItem.GLShaderGeomSets;
            glShaderGeomSets.removeGLGeomItem(glGeomItem);
            glGeomItem.GLShaderGeomSets = null;
            return true; // TODO: is returning true here correct?
        }
        {
            const itemindex = this.transparentItemIndices[geomItem.getId()];
            const item = this.transparentItems[itemindex];
            delete this.transparentItemIndices[geomItem.getId()];
            material.removeListenerById('valueChanged', listenerIDs['material.valueChanged']);
            material.removeListenerById('transparencyChanged', listenerIDs['material.transparencyChanged']);
            materialParam.removeListenerById('valueChanged', listenerIDs['materialParam.valueChanged']);
            geomItem.getParameter('GeomMat').removeListenerById('valueChanged', listenerIDs['GeomMat.valueChanged']);
            this.transparentItems[itemindex] = null;
            this.freeList.push(itemindex);
            const visibleindex = this.visibleItems.indexOf(item);
            if (visibleindex != -1)
                this.visibleItems.splice(visibleindex, 1);
        }
        this.emit('updated');
        return true;
    }
    /**
     * Sorts the drawn items in order furthest to nearest when rendering transparent objects.
     * @param viewPos - The position of the camera that we are sorting relative to.
     */
    sortItems(viewPos) {
        // eslint-disable-next-line guard-for-in
        for (const shaderName in this.__glShaderGeomSets) {
            this.__glShaderGeomSets[shaderName].sortItems(viewPos);
        }
        for (const transparentItem of this.visibleItems) {
            const mat4 = transparentItem.glGeomItem.geomItem.geomMatParam.value;
            transparentItem.dist = mat4.translation.distanceTo(viewPos);
        }
        this.visibleItems.sort((a, b) => (a.dist > b.dist ? -1 : a.dist < b.dist ? 1 : 0));
        this.reSort = false;
    }
    /**
     * Draw n individual item, binding the shader and material if necessary.
     * @param renderstate - current renderstad
     * @param transparentItem - current item to render
     * @param cache - cache tracking which material/shader is currently bound.
     */
    _drawItem(renderstate, transparentItem, cache) {
        if (cache.currentGLMaterial != transparentItem.glMaterial) {
            cache.currentGLMaterial = transparentItem.glMaterial;
            if (!cache.currentGLMaterial.bind(renderstate)) {
                return;
            }
        }
        if (cache.currentGLGeom != transparentItem.glGeom) {
            cache.currentGLGeom = transparentItem.glGeom;
            if (!cache.currentGLGeom.bind(renderstate)) {
                return;
            }
        }
        const glGeomItem = transparentItem.glGeomItem;
        if (glGeomItem.bind(renderstate)) {
            renderstate.bindViewports(renderstate.unifs, () => {
                cache.currentGLGeom.draw(renderstate);
            });
        }
    }
    /**
     * The _drawItems method.
     * @param renderstate - The object tracking the current state of the renderer
     * @private
     */
    _drawItems(renderstate) {
        // Note: sorting here will not sort geometries of different types.
        // this is a flawed solution that only sorts geomemtries of the same
        // time and same shader against each other. Given that this is the data 99% o
        // of the time, this is an acceptable tradeoff
        // eslint-disable-next-line guard-for-in
        for (const shaderName in this.__glShaderGeomSets) {
            this.__glShaderGeomSets[shaderName].draw(renderstate);
        }
        const cache = {
            currentglShader: null,
            currentGLMaterial: null,
            currentGLGeom: null,
        };
        for (const transparentItem of this.visibleItems) {
            const glShader = transparentItem.shaders.glShader;
            if (cache.currentglShader != glShader) {
                // Some passes, like the depth pass, bind custom uniforms.
                // Note: No 'unbind' here before binding the next shader.
                // That is to support a simple hack. LinesShader enables blend
                // each time it is bound, and then disables on unbind.
                if (!glShader.bind(renderstate, 'color')) {
                    continue;
                }
                // Specify an non-instanced draw to the shader
                const gl = this.__gl;
                const unifs = renderstate.unifs;
                if (unifs.instancedDraw) {
                    gl.uniform1i(unifs.instancedDraw.location, 0);
                }
                // Note: this disables the attribute location, which must be enabled again for
                // the next geom, which might use a different attribute location.
                // e.g.
                // one shader might specify attributes ['positions', 'instancedIds]
                // another  might specify attributes ['positions', 'texCoords' 'instancedIds]
                // In this case, we should re-enabled location 2 and then disable 3.
                // if (renderstate.attrs.instancedIds && renderstate.attrs.instancedIds.location != -1) {
                //   gl.disableVertexAttribArray(renderstate.attrs.instancedIds.location)
                // }
                this.renderer.glGeomItemLibrary.bind(renderstate);
                cache.currentglShader = glShader;
            }
            this._drawItem(renderstate, transparentItem, cache);
        }
        // if (cache.currentGLGeom) cache.currentGLGeom.unbind(renderstate)
    }
    /**
     * The draw method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    draw(renderstate) {
        if (this.itemCount == 0)
            return;
        const gl = this.__gl;
        const viewPos = renderstate.viewXfo.tr;
        // Avoid sorting if the camera did not move more than the specified tolerance.
        if (this.reSort || viewPos.distanceTo(this.prevSortCameraPos) > this.sortCameraMovementDistance) {
            this.sortItems(viewPos);
            this.prevSortCameraPos = viewPos;
            if (renderstate.vrviewport) {
                // Adapt the sort tolerance to the focal distance.
                // In a tiny scene, we want to sort more frequently.
                this.sortCameraMovementDistance = renderstate.viewScale * 0.2;
            }
            else if (renderstate.viewport) {
                // Adapt the sort tolerance to the focal distance.
                // In a tiny scene, we want to sort more frequently.
                const camera = renderstate.viewport.getCamera();
                this.sortCameraMovementDistance = camera.getFocalDistance() * 0.3;
            }
        }
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        // Complex transparent surfaces require multiple passes.
        // First the multiply pass tints the background color, simulating
        // light passing through the surface, and then the add layer
        // adds new color to the backbuffer to simulate light bouncing off
        // the surface.
        // TODO: Optimise this system.
        // After depth sorting, we should split the items into 2 groups.
        // Multiply items, and Add  items. (Many items will be in both)
        // Then we can simply check if we have any multiply items here
        // before rendering all items.
        // for Multiply pass, we can use front and back surfaces to calculate depth and how much
        // of the background layer to let through.
        // gl.disable(gl.CULL_FACE)
        // gl.blendFunc(gl.DST_COLOR, gl.ZERO) // For multiply, select this.
        // this._drawItems(renderstate)
        // for the Add
        renderstate.pass = 'ADD';
        // https://google.github.io/filament/Filament.html#lighting/transparencyandtranslucencylighting/transparency
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        // Only draw font faces. BEcause all faces are drawn, it can make a mess to see the back faces through the front faces.
        // e.g. we might see the triangles on the other side of a sphere rendered over the top of triangles on the near side.
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        this._drawItems(renderstate);
        gl.disable(gl.BLEND);
        gl.depthMask(true);
    }
    /**
     * The drawHighlightedGeoms method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    drawHighlightedGeoms(renderstate) {
        const gl = this.__gl;
        gl.disable(gl.CULL_FACE); // 2-sided rendering.
        // eslint-disable-next-line guard-for-in
        for (const shaderName in this.__glShaderGeomSets) {
            this.__glShaderGeomSets[shaderName].drawHighlightedGeoms(renderstate);
        }
        const cache = {
            currentglShader: null,
            currentGLMaterial: null,
            currentGLGeom: null,
        };
        for (const transparentItem of this.visibleItems) {
            if (!transparentItem.geomItem.isHighlighted())
                continue;
            if (!transparentItem.shaders.glselectedshader)
                continue;
            const shaders = transparentItem.shaders;
            if (cache.currentglShader != shaders.glselectedshader) {
                // Some passes, like the depth pass, bind custom uniforms.
                if (!shaders.glselectedshader.bind(renderstate, 'highlight')) {
                    continue;
                }
                cache.currentglShader = shaders.glselectedshader;
            }
            const { floatGeomBuffer, passId, instancedDraw } = renderstate.unifs;
            if (floatGeomBuffer) {
                gl.uniform1i(floatGeomBuffer.location, gl.floatGeomBuffer ? 1 : 0);
            }
            if (passId) {
                gl.uniform1i(passId.location, this.passIndex);
            }
            if (instancedDraw) {
                gl.uniform1i(instancedDraw.location, 0);
            }
            this.renderer.glGeomItemLibrary.bind(renderstate);
            this._drawItem(renderstate, transparentItem, cache);
        }
        if (cache.currentGLGeom)
            cache.currentGLGeom.unbind(renderstate);
    }
    /**
     * The drawGeomData method.
     * @param renderstate - The object tracking the current state of the renderer
     */
    drawGeomData(renderstate) {
        const gl = this.__gl;
        gl.disable(gl.BLEND);
        gl.disable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        gl.depthMask(true);
        // eslint-disable-next-line guard-for-in
        for (const shaderName in this.__glShaderGeomSets) {
            this.__glShaderGeomSets[shaderName].drawGeomData(renderstate);
        }
        const cache = {
            currentglShader: null,
            currentGLMaterial: null,
            currentGLGeom: null,
        };
        for (const transparentItem of this.visibleItems) {
            if (!transparentItem.glGeomItem.geomItem.isSelectable())
                continue;
            const shaders = transparentItem.shaders;
            if (!shaders.glgeomdatashader) {
                continue;
            }
            if (cache.currentglShader != shaders.glgeomdatashader) {
                // Some passes, like the depth pass, bind custom uniforms.
                if (!shaders.glgeomdatashader.bind(renderstate, 'geomdata')) {
                    continue;
                }
                cache.currentglShader = shaders.glgeomdatashader;
            }
            const { floatGeomBuffer, passId, instancedDraw } = renderstate.unifs;
            if (floatGeomBuffer) {
                gl.uniform1i(floatGeomBuffer.location, gl.floatGeomBuffer ? 1 : 0);
            }
            if (passId) {
                gl.uniform1i(passId.location, this.passIndex);
            }
            if (instancedDraw) {
                gl.uniform1i(instancedDraw.location, 0);
            }
            this.renderer.glGeomItemLibrary.bind(renderstate);
            this._drawItem(renderstate, transparentItem, cache);
        }
        if (cache.currentGLGeom)
            cache.currentGLGeom.unbind(renderstate);
    }
}
GLRenderer.registerPass(GLTransparentGeomsPass, PassType.TRANSPARENT);
export { GLTransparentGeomsPass };
//# sourceMappingURL=GLTransparentGeomsPass.js.map