import { Vec3 } from '../../Math/Vec3';
import { GLPass } from '../GLPass.js';
import { GLShaderMaterials } from '../GLCollector.js';

class GLTransparencyPass extends GLPass {
    constructor(gl, collector) {
        super(gl, collector);

        this.__setDirty = false;
        this.__transparentItems = [];
        this.__prevSortCameraPos = new Vec3();
    }
/*
    filter(drawItem) {
        if(!super.filter(drawItem))
            return false;
        let material = drawItem.geomItem.material;
        return material.isTransparent();
    }

    addDrawItem(drawItem) {
        super.addDrawItem(drawItem);
        this.__setDirty = true;
    }

    collectItems() {
        this.__transparentItems = [];
        for (let key in this.__shaderMaterialMappings) {
            let shaderMaterialMapping = this.__shaderMaterialMappings[key];
            let glshader = shaderMaterialMapping['glshader'];
            for (let materialGeomMapping of shaderMaterialMapping['materialGeomMappings']) {
                let glmaterial = materialGeomMapping.glmaterial;
                for (let geomItemMapping of materialGeomMapping['geomItemMappings']) {
                    let glGeom = geomItemMapping['glGeom'];
                    for (let drawItem of geomItemMapping['items']) {
                        if (!drawItem.geomItem.getVisible())
                            continue;
                        this.__transparentItems.push({
                            'glshader': glshader,
                            'glmaterial': glmaterial,
                            'glGeom': glGeom,
                            'drawItem': drawItem
                        });
                    }
                }
            }
        }
        this.__setDirty = false;
    }

    sort(cameraPos) {
        for (let transparentItem of this.__transparentItems)
            transparentItem.dist = transparentItem.drawItem.geomItem.globalXfo.tr.distanceTo(cameraPos);
        this.__transparentItems.sort((a, b) => (a.dist > b.dist) ? -1 : ((a.dist < b.dist) ? 1 : 0));
    }

    draw(renderstate) {
        if (this.__setDirty)
            this.collectItems();
        if(this.__transparentItems.length == 0)
            return;

        let cameraPos = renderstate.cameraMatrix.translation;

        let dist = cameraPos.distanceTo(this.__prevSortCameraPos);
        // Avoid sorting if the camera did not move more than 3 meters.
        if(dist > 3.0){
            this.sort(cameraPos);
            this.__prevSortCameraPos = cameraPos.clone();
        }

        this.__gl.enable(this.__gl.BLEND);
        this.__gl.blendEquation(this.__gl.FUNC_ADD);
        this.__gl.blendFunc(this.__gl.SRC_ALPHA, this.__gl.ONE_MINUS_SRC_ALPHA);


        let currentglShader;
        let currentglMaterial;
        let currentglGeom;
        for (let transparentItem of this.__transparentItems) {
            if (currentglShader != transparentItem.glshader) {
                if (!transparentItem.glshader.bind(renderstate))
                    continue;
                currentglShader = transparentItem.glshader;
            }
            if (currentglMaterial != transparentItem.glmaterial) {
                if (!transparentItem.glmaterial.bind(renderstate))
                    continue;
                currentglMaterial = transparentItem.glmaterial;
            }

            if (currentglGeom != transparentItem.glGeom) {
                if (!transparentItem.glGeom.bind(renderstate))
                    continue;
                currentglGeom = transparentItem.glGeom;
            }

            // Bind item specific data, such as the global matrix
            if (transparentItem.drawItem.bind(renderstate)) {
                currentglGeom.draw();
            }
        }

        this.__gl.disable(this.__gl.BLEND);
    }
    */

    /////////////////////////////////////
    // Bind to Render Tree
    filterRenderTree() {
        let allglshaderMaterials = this.__collector.getGLShaderMaterials();
        this.__glshadermaterials = [];
        for (let glshaderkey in allglshaderMaterials) {
            let glshaderMaterials = null;
            let glmaterialDrawItemSets = allglshaderMaterials[glshaderkey].getMaterialDrawItemSets();
            for (let glmaterialDrawItemSet of glmaterialDrawItemSets) {
                if (!glmaterialDrawItemSet.getGLMaterial().isTransparent())
                    continue;
                if(!glshaderMaterials){
                    glshaderMaterials = new GLShaderMaterials(allglshaderMaterials[glshaderkey].getGLShader());
                    this.__glshadermaterials.push(glshaderMaterials);
                }
                glshaderMaterials.addMaterialDrawItemSets(glmaterialDrawItemSet);
            }
        }
    }

    draw(renderstate) {
        let gl = this.__gl;

        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        super.draw(renderstate);
    }
};


export {
    GLTransparencyPass
};
// export default GLTransparencyPass;