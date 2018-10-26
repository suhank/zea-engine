import {
    Vec4
} from '../Math';
import {
    Signal
} from '../Utilities';
import {
    GeomItem,
    Points,
    Lines,
    Mesh,
    MeshProxy,
    sgFactory
} from '../SceneTree';
import {
    GLPoints
} from './GLPoints.js';
import {
    GLLines
} from './GLLines.js';
import {
    GLMesh
} from './GLMesh.js';
import {
    GLShader
} from './GLShader.js';
import {
    GLMaterial
} from './GLMaterial.js';
import {
    GLDrawItem
} from './GLDrawItem.js';
import {
    GLDrawItemSet
} from './GLDrawItemSet.js';
import {
    GLTexture2D
} from './GLTexture2D.js';


class GLShaderMaterials {
    constructor(glshader = undefined) {
        this.glshader = glshader;
        this.glmaterialDrawItemSets = [];

    }

    getGLShader() {
        return this.glshader;
    }

    addMaterialDrawItemSets(glmaterialDrawItemSets) {
        if (this.glmaterialDrawItemSets.indexOf(glmaterialDrawItemSets) == -1)
            this.glmaterialDrawItemSets.push(glmaterialDrawItemSets);
    }

    removeMaterialDrawItemSets(glmaterialDrawItemSets) {
        let index = this.glmaterialDrawItemSets.indexOf(glmaterialDrawItemSets);
        this.glmaterialDrawItemSets.splice(index, 1);
    }

    getMaterialDrawItemSets() {
        return this.glmaterialDrawItemSets;
    }
}

class GLMaterialDrawItemSets {
    constructor(glmaterial = undefined) {
        this.glmaterial = glmaterial;
        this.drawItemSets = [];
        this.drawCount = 0;
        this.__drawCountChanged = this.__drawCountChanged.bind(this)
    }

    getGLMaterial() {
        return this.glmaterial;
    }

    __drawCountChanged(change) {
        this.drawCount += change;
    }

    addDrawItemSet(drawItemSet) {
        if (this.drawItemSets.indexOf(drawItemSet) == -1) {
            this.drawItemSets.push(drawItemSet);

            this.drawCount += drawItemSet.drawCount;
            drawItemSet.drawCountChanged.connect(this.__drawCountChanged);
        } else {
            console.warn("drawItemSet already added to GLMaterialDrawItemSets")
        }
    }

    removeDrawItemSet(drawItemSet) {
        let index = this.drawItemSets.indexOf(drawItemSet);
        this.drawItemSets.splice(index, 1);
        drawItemSet.drawCountChanged.disconnect(this.__drawCountChanged);
    }

    findDrawItemSet(glgeom) {
        for (let drawItemSet of this.drawItemSets) {
            if (drawItemSet.getGLGeom() == glgeom)
                return drawItemSet;
        }
        return null;
    }

    getDrawItemSets() {
        return this.drawItemSets;
    }
};

class GLCollector {
    constructor(renderer) {
        this.__renderer = renderer;
        this.__drawItems = [undefined];
        this.__drawItemsIndexFreeList = [];
        this.__geoms = [];

        this.__newItemsAdded = false;
        this.__dirtyItemIndices = [];

        this.__passCallbacks = [];
        this.registerPass(
            (treeItem) => {
                if (treeItem instanceof GeomItem) {
                    if (!treeItem.getMetadata('gldrawItem')) {
                        if (treeItem.getMaterial() == undefined) {
                            console.warn("Scene item :" + treeItem.getPath() + " has no material");
                            // TODO: listen for when the material is assigned.(like geoms below)
                        } else if (treeItem.getGeometry() == undefined) {
                            // we will add this geomitem once it recieves its geom.
                            treeItem.geomAssigned.connect(() => {
                                this.addGeomItem(treeItem);
                            })
                        } else {
                            this.addGeomItem(treeItem);
                        }
                    }
                    return true;
                }
                return false;
            },
            (treeItem) => {
                if (treeItem instanceof GeomItem && treeItem.getMetadata('gldrawItem')) {
                    this.removeGeomItem(treeItem);
                    return true;
                }
                return false;
            }
        );

        // Un-Optimized Render Tree
        // Structured like so for efficient render traversial.
        // {GLShaders}[GLMaterials][GLGeoms][GLDrawItems]
        this.__glshadermaterials = {};

        this.renderTreeUpdated = new Signal();
        this.billboardDiscovered = new Signal();

        this.addTreeItem = this.addTreeItem.bind(this)
        this.removeTreeItem = this.removeTreeItem.bind(this)

    }

    getRenderer() {
        return this.__renderer;
    };

    registerSceneItemFilter(fn) {
        // insert at the beginning so it is called first.
        this.__passCallbacks.splice(0, 0, {
            itemAddedFn: fn
        });
    }

    registerPass(itemAddedFn, itemRemovedFn) {
        // insert at the beginning so it is called first.
        this.__passCallbacks.splice(0, 0, {
            itemAddedFn,
            itemRemovedFn
        });
    }

    getGLShaderMaterials() {
        return this.__glshadermaterials;
    };

    getShaderMaterials(material) {

        // let glshaderMaterials = material.getMetadata('glshaderMaterials');
        // if (glshaderMaterials) {
        //     return glshaderMaterials;
        // }

        let glshaderMaterials;
        if (material.getShaderName() in this.__glshadermaterials) {
            glshaderMaterials = this.__glshadermaterials[material.getShaderName()];
        } else {
            const shader = sgFactory.constructClass(material.getShaderName(), this.__renderer.gl);
            if (!shader)
                return;
            glshaderMaterials = new GLShaderMaterials(shader);
            this.__glshadermaterials[material.getShaderName()] = glshaderMaterials;
        }

        // material.setMetadata('glshaderMaterials', glshaderMaterials);

        return glshaderMaterials;
    };

    addMaterial(material) {
        let glmaterialDrawItemSets = material.getMetadata('glmaterialDrawItemSets');
        if (glmaterialDrawItemSets) {
            return glmaterialDrawItemSets;
        }

        const glshaderMaterials = this.getShaderMaterials(material);
        if (!glshaderMaterials)
            return;

        const glmaterial = new GLMaterial(this.__renderer.gl, material, glshaderMaterials.getGLShader());
        glmaterial.updated.connect(() => {
            this.__renderer.requestRedraw();
        });

        glmaterialDrawItemSets = new GLMaterialDrawItemSets(glmaterial);
        glshaderMaterials.addMaterialDrawItemSets(glmaterialDrawItemSets);

        material.setMetadata('glmaterialDrawItemSets', glmaterialDrawItemSets);

        material.shaderNameChanged.connect(() => {
            glshaderMaterials.removeMaterialDrawItemSets(glmaterialDrawItemSets);
            glshaderMaterials = this.getShaderMaterials(material);
        });

        material.destructing.connect(() => {
            glshaderMaterials.removeMaterialDrawItemSets(glmaterialDrawItemSets);
        });

        return glmaterialDrawItemSets;
    };


    addGeom(geom) {
        let glgeom = geom.getMetadata('glgeom');
        if (glgeom) {
            return glgeom;
        }
        if (geom instanceof Mesh || geom instanceof MeshProxy) {
            glgeom = new GLMesh(this.__renderer.gl, geom);
        } else if (geom instanceof Lines) {
            glgeom = new GLLines(this.__renderer.gl, geom);
        } else if (geom instanceof Points) {
            glgeom = new GLPoints(this.__renderer.gl, geom);
        } else {
            throw ("Unsupported geom type:" + geom.constructor.name);
        }
        geom.setMetadata('glgeom', glgeom);
        this.__geoms.push(glgeom);
        return glgeom;
    };

    addGeomItem(geomItem) {
        let glmaterialDrawItemSets = this.addMaterial(geomItem.getMaterial());
        if (!glmaterialDrawItemSets)
            return;
        const glgeom = this.addGeom(geomItem.getGeometry());


        const flags = 1;
        let index;
        // Use recycled indices if there are any available...
        if (this.__drawItemsIndexFreeList.length > 0) {
            index = this.__drawItemsIndexFreeList.pop();
        } else {
            index = this.__drawItems.length;
            this.__drawItems.push(null);
        }
        this.__dirtyItemIndices.push(index);

        const gldrawItem = new GLDrawItem(this.__renderer.gl, geomItem, glgeom, index, flags);
        geomItem.setMetadata('gldrawItem', gldrawItem);

        const updatedId = gldrawItem.updated.connect(() => {
            this.__renderer.requestRedraw();
        });

        this.__drawItems[index] = gldrawItem;

        // Null the entry in the array. 
        // Note: we never remove the item, because
        // the DrawItem stores its index in the array,
        // and so cannot be moved.
        const destructingId = gldrawItem.destructing.connect(() => {
            // Note: now items should be removed from the
            // tree before they destruct. 
            console.warn("gldrawItem.destructing");
            gldrawItem.updated.disconnectId(updatedId);
            gldrawItem.transformChanged.disconnectId(transformChangedId);
            gldrawItem.destructing.disconnectId(destructingId);
            // this.removeDrawItem(gldrawItem);
            // this.__renderer.requestRedraw();
        });

        const transformChangedId = gldrawItem.transformChanged.connect(() => {
            if(this.__dirtyItemIndices.indexOf(index) == -1)
                this.__dirtyItemIndices.push(index);
            // this.__updateItemInstanceData(index, gldrawItem);
            this.__renderer.requestRedraw();
        });

        const addDrawItemToGLMaterialDrawItemSet = () => {
            let drawItemSet = glmaterialDrawItemSets.findDrawItemSet(glgeom);
            if (!drawItemSet) {
                drawItemSet = new GLDrawItemSet(this.__renderer.gl, glgeom);
                glmaterialDrawItemSets.addDrawItemSet(drawItemSet);
            }
            drawItemSet.addDrawItem(gldrawItem);

            // Note: before the renderer is disabled, this is a  no-op.
            this.__renderer.requestRedraw();
        }
        addDrawItemToGLMaterialDrawItemSet();

        geomItem.materialAssigned.connect(() => {
            glmaterialDrawItemSets = this.addMaterial(geomItem.getMaterial());
            addDrawItemToGLMaterialDrawItemSet();
        })

        this.__newItemsAdded = true;
        return gldrawItem;
    };

    removeGeomItem(geomItem) {

        const gldrawItem = geomItem.getMetadata('gldrawItem');
        this.removeDrawItem(gldrawItem);


        const glgeom = geomItem.getGeometry().getMetadata('glgeom');
        const glmaterialDrawItemSets = geomItem.getMaterial().getMetadata('glmaterialDrawItemSets');

        const drawItemSet = glmaterialDrawItemSets.findDrawItemSet(glgeom);
        drawItemSet.removeDrawItem(gldrawItem);

        // Note: for now leave the material and geom in place. Multiple 
        // GeomItems can reference a given material/geom, so we simply wait
        // for them to be destroyed. 

        geomItem.deleteMetadata('gldrawItem')
        
        this.__newItemsAdded = true;
    }

    addTreeItem(treeItem) {

        for (let passCbs of this.__passCallbacks) {
            const rargs = {
                continueInSubTree: true
            };
            const handled = passCbs.itemAddedFn(treeItem, rargs);
            if (handled) {
                if (!rargs.continueInSubTree)
                    return;
                break;
            }
        }

        // Traverse the tree adding items till we hit the leaves(which are usually GeomItems.)
        for (let childItem of treeItem.getChildren()) {
            this.addTreeItem(childItem);
        }

        treeItem.childAdded.connect(this.addTreeItem);
        treeItem.childRemoved.connect(this.removeTreeItem);
        treeItem.destructing.connect(this.removeTreeItem);
    }

    removeTreeItem(treeItem) {

        treeItem.childAdded.disconnect(this.addTreeItem);
        treeItem.childRemoved.disconnect(this.removeTreeItem);
        treeItem.destructing.disconnect(this.removeTreeItem);

        for (let passCbs of this.__passCallbacks) {
            if (!passCbs.itemRemovedFn)
                continue;
            const rargs = {
                continueInSubTree: true
            };
            const handled = passCbs.itemRemovedFn(treeItem, rargs);
            if (handled) {
                if (!rargs.continueInSubTree)
                    return;
                break;
            }
        }

        // Traverse the tree adding items till we hit the leaves(which are usually GeomItems.)
        for (let childItem of treeItem.getChildren()) {
            this.removeTreeItem(childItem);
        }
    }

    removeDrawItem(gldrawItem) {
        let index = gldrawItem.getId();
        this.__drawItems[index] = null;
        this.__drawItemsIndexFreeList.push(index);

        // TODO: review signal disconnections
        // gldrawItem.destructing.disconnectScope(this);
        // gldrawItem.transformChanged.disconnectScope(this);

        this.renderTreeUpdated.emit();
        this.__renderer.requestRedraw();
    };

    removeMaterial(material) {
        let glshaderMaterials = this.__glshadermaterials[material.hash];
        if (!glshaderMaterials || glshaderMaterials != material.getMetadata('glshaderMaterials')) {
            console.warn("Material not found in GLCollector");
            return;
        }

        let glmaterialDrawItemSets = material.getMetadata('glmaterialDrawItemSets');
        glshaderMaterials.removeMaterialDrawItemSets(glmaterialDrawItemSets);
    };

    removeGLGeom(geomItemMapping, materialGeomMapping) {
        let index = materialGeomMapping.geomItemMappings.indexOf(geomItemMapping);
        materialGeomMapping.geomItemMappings.splice(index, 1);

        // Note: the GLMAterial cleans up iself now...
        // if(materialGeomMapping.geomItemMappings.length == 0 && !this.__explicitShader){
        //     this.removeMaterialGeomMapping(materialGeomMapping.glmaterial);
        // }
    };


    //////////////////////////////////////////////////////////
    /// DrawItem IDs

    getDrawItem(id) {
        if (id >= this.__drawItems.length) {
            console.warn("Invalid Draw Item id:" + id + " NumItems:" + (this.__drawItems.length - 1));
            return undefined;
        }
        return this.__drawItems[id];
    };

    //////////////////////////////////////////////////
    // Data Uploading
    __populateTransformDataArray(gldrawItem, index, dataArray) {

        const mat4 = gldrawItem.getGeomItem().getGeomXfo().toMat4();
        const lightmapCoordsOffset = gldrawItem.getGeomItem().getLightmapCoordsOffset();

        const stride = 16; // The number of floats per draw item.
        const offset = index * stride;
        const col0 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset);
        const col1 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 4);
        const col2 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 8);
        const col3 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 12);
        col0.set(mat4.xAxis.x, mat4.yAxis.x, mat4.zAxis.x, mat4.translation.x);
        col1.set(mat4.xAxis.y, mat4.yAxis.y, mat4.zAxis.y, mat4.translation.y);
        col2.set(mat4.xAxis.z, mat4.yAxis.z, mat4.zAxis.z, mat4.translation.z);

        const materialId = 0;
        const geomId = 0;
        col3.set(lightmapCoordsOffset.x, lightmapCoordsOffset.y, materialId, geomId);
    };

    newItemsReadyForLoading() {
        return this.__dirtyItemIndices.length > 0;
    };

    uploadDrawItems() {

        const gl = this.__renderer.gl;
        if (!gl.floatTexturesSupported) {
            // Pull on the GeomXfo params. This will trigger the lazy evaluation of the operators in the scene.
            const len = this.__dirtyItemIndices.length;
            for (let i = 0; i < len; i++) {
                const drawItem = this.__drawItems[this.__dirtyItemIndices[i]];
                if (drawItem) {
                    drawItem.updateGeomMatrix();
                }
            }
            this.__dirtyItemIndices = [];
            this.renderTreeUpdated.emit();
            return;
        }

        const pixelsPerItem = 4; // The number of RGBA pixels per draw item.
        let size = Math.round(Math.sqrt(this.__drawItems.length * pixelsPerItem) + 0.5);
        // Only support power 2 textures. Else we get strange corruption on some GPUs
        // in some scenes.
        size = Math.nextPow2(size);
        // Size should be a multiple of pixelsPerItem, so each geom item is always contiguous
        // in memory. (makes updating a lot easier. See __updateItemInstanceData below)
        if ((size % pixelsPerItem) != 0)
            size += pixelsPerItem - (size % pixelsPerItem);

        if (!this.__drawItemsTexture) {
            this.__drawItemsTexture = new GLTexture2D(gl, {
                format: 'RGBA',
                type: 'FLOAT',
                width: size,
                height: size,
                filter: 'NEAREST',
                wrap: 'CLAMP_TO_EDGE',
                mipMapped: false
            });
        } else if (this.__drawItemsTexture.width != size) {
            this.__drawItemsTexture.resize(size, size);
            this.__dirtyItemIndices = Array((size * size) / pixelsPerItem).fill().map((v, i) => i);
        }

        gl.bindTexture(gl.TEXTURE_2D, this.__drawItemsTexture.glTex);
        const typeId = this.__drawItemsTexture.getTypeID();
        const formatId = this.__drawItemsTexture.getFormatID();

        for (let i = 0; i < this.__dirtyItemIndices.length; i++) {
            const indexStart = this.__dirtyItemIndices[i];
            const yoffset = Math.floor((indexStart * pixelsPerItem) / size);
            let indexEnd = indexStart + 1;
            for (let j = i + 1; j < this.__dirtyItemIndices.length; j++) {
                const index = this.__dirtyItemIndices[j];
                if (Math.floor((index * pixelsPerItem) / size) != yoffset) {
                    break;
                }
                if (index != indexEnd) {
                    break;
                }
                indexEnd++;
            }

            // TODO: for contiguous blcoks, we create larger arrays and populate
            // and upload them in one step.
            const uploadCount = indexEnd - indexStart;
            const xoffset = (indexStart * pixelsPerItem) % size;
            const width = pixelsPerItem * uploadCount;
            const height = 1;
            const dataArray = new Float32Array(pixelsPerItem * 4 * uploadCount); // 4==RGBA pixels.

            for (let j = indexStart; j < indexEnd; j++) {
                const gldrawItem = this.__drawItems[j];
                // When an item is deleted, we allocate its index to the free list
                // and null this item in the array. skip over null items.
                if (!gldrawItem)
                    continue;
                this.__populateTransformDataArray(gldrawItem, j - indexStart, dataArray);
            }

            if (typeId == gl.FLOAT) {
                gl.texSubImage2D(gl.TEXTURE_2D, 0, xoffset, yoffset, width, height, formatId, typeId, dataArray);
            } else {
                const unit16s = Math.convertFloat32ArrayToUInt16Array(dataArray);
                gl.texSubImage2D(gl.TEXTURE_2D, 0, xoffset, yoffset, width, height, formatId, typeId, unit16s);
            }

            i += uploadCount - 1;
        }


        this.__dirtyItemIndices = [];
    };


    finalize() {
        if (this.__dirtyItemIndices.length == 0)
            return;
        this.uploadDrawItems();

        if (this.__newItemsAdded) {
            this.renderTreeUpdated.emit();
            this.__newItemsAdded = false;
        }
    }


    bind(renderstate) {
        let gl = this.__renderer.gl;
        const unifs = renderstate.unifs;
        if (this.__drawItemsTexture && unifs.instancesTexture) {
            this.__drawItemsTexture.bindToUniform(renderstate, unifs.instancesTexture);
            gl.uniform1i(unifs.instancesTextureSize.location, this.__drawItemsTexture.width);
        }
        return true;
    };

};

export {
    GLShaderMaterials,
    GLMaterialDrawItemSets,
    GLCollector
};