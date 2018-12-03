import { PassType } from './GLPass.js';
import { GLStandardGeomsPass } from './GLStandardGeomsPass.js';
import { GLShaderMaterials } from '../GLCollector.js';
import { GLRenderer } from '../GLRenderer.js';

import {
    GeomDataShader
} from '../Shaders/GeomDataShader.js';

import {
    SelectedGeomsShader
} from '../Shaders/SelectedGeomsShader.js';


class GLShaderMaterials {
    constructor(glshader = undefined) {
        this.glshader = glshader;
        this.glmaterialGeomItemSets = [];
    }

    getGLShader() {
        return this.glshader;
    }

    addMaterialGeomItemSets(glmaterialGeomItemSets) {
        if (this.glmaterialGeomItemSets.indexOf(glmaterialGeomItemSets) == -1)
            this.glmaterialGeomItemSets.push(glmaterialGeomItemSets);
    }

    removeMaterialGeomItemSets(glmaterialGeomItemSets) {
        const index = this.glmaterialGeomItemSets.indexOf(glmaterialGeomItemSets);
        this.glmaterialGeomItemSets.splice(index, 1);
    }

    getMaterialGeomItemSets() {
        return this.glmaterialGeomItemSets;
    }
}

class GLMaterialGeomItemSets {
    constructor(glmaterial = undefined) {
        this.glmaterial = glmaterial;
        this.drawItemSets = [];
        this.drawCount = 0;
        this.visibleInGeomDataBuffer = glmaterial.getMaterial().visibleInGeomDataBuffer;
        this.__drawCountChanged = this.__drawCountChanged.bind(this)
    }

    getGLMaterial() {
        return this.glmaterial;
    }

    __drawCountChanged(change) {
        this.drawCount += change;
    }

    addGeomItemSet(drawItemSet) {
        if (this.drawItemSets.indexOf(drawItemSet) == -1) {
            this.drawItemSets.push(drawItemSet);

            this.drawCount += drawItemSet.drawCount;
            drawItemSet.drawCountChanged.connect(this.__drawCountChanged);
        } else {
            console.warn("drawItemSet already added to GLMaterialGeomItemSets")
        }
    }

    removeGeomItemSet(drawItemSet) {
        const index = this.drawItemSets.indexOf(drawItemSet);
        this.drawItemSets.splice(index, 1);
        drawItemSet.drawCountChanged.disconnect(this.__drawCountChanged);
    }

    findGeomItemSet(glgeom) {
        for (let drawItemSet of this.drawItemSets) {
            if (drawItemSet.getGLGeom() == glgeom)
                return drawItemSet;
        }
        return null;
    }

    getGeomItemSets() {
        return this.drawItemSets;
    }
};


class GLOpaqueGeomsPass extends GLStandardGeomsPass {
    constructor() {
        super();

        // Optimized Render Tree
        // Structured like so for efficient render traversial.
        // {GLShaders}[GLMaterials][GLGeoms][GLGeomItems]
        this.__glshadermaterials = {};
    }

    init(gl, collector, passIndex) {
        super.init(gl, collector, passIndex);
        this.__geomdatashader = new GeomDataShader(gl);
        this.__selectedGeomsShader = new SelectedGeomsShader(gl);
    }

    /////////////////////////////////////
    // Bind to Render Tree
    filterGeomItem(geomItem) {
        const shaderClass = geomItem.getMaterial().getShaderClass();
        if(shaderClass) {
            if (shaderClass.isTransparent())
                return false;
            if (shaderClass.isOverlay())
                return false;
        }
        return true;
    }

    addGeomItem(geomItem) {
        const material = geomItem.getMaterial();
        const geom = geomItem.getGeometry();

        const glmaterial = this.addMaterial(material)
        const glgeomItem = this.addGeomItem(geomItem);
        const glGeom = glgeomItem.glGeom;

        let glshaderMaterials = this.__glshadermaterials[material.getShaderName()];
        if(!glshaderMaterials) {
            glshaderMaterials = new GLShaderMaterials(glshader);
            this.__glshadermaterials[material.getShaderName()] = glshaderMaterials;
        }
        
        let glmaterialGeomItemSets = glshaderMaterials.findMaterialGeomItemSets(glmaterial);
        if(!glmaterialGeomItemSets) {
            glmaterialGeomItemSets = new GLMaterialGeomItemSets(glmaterial);
            glshaderMaterials.addMaterialGeomItemSets(glmaterialGeomItemSets);
        }

        let drawItemSet = glmaterialGeomItemSets.findGeomItemSet(glgeom);
        if(!drawItemSet) {
            drawItemSet = new GLGeomItemSet(gl, glgeom);
            glmaterialGeomItemSets.addDrawItemSet(drawItemSet);
        }

        drawItemSet.addGeomItem(glgeomItem);
    }


    draw(renderstate) {

        const gl = this.__gl;
        // TODO: disable cull face when rendering cross sections.
        // gl.enable(gl.CULL_FACE);
        gl.disable(gl.CULL_FACE);
        
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        gl.depthMask(true);

        for (let glshaderMaterials of this.__glshadermaterials) {
            const glshader = glshaderMaterials.getGLShader();
            if(this.bindShader(renderstate, glshader)){
                const glmaterialGeomItemSets = glshaderMaterials.getMaterialGeomItemSets();
                for (let glmaterialGeomItemSet of glmaterialGeomItemSets) {
                    if(glmaterialGeomItemSet.drawCount == 0)
                        continue;
                    if(this.bindMaterial(renderstate, glmaterialGeomItemSet.getGLMaterial())){
                        const gldrawitemsets = glmaterialGeomItemSet.getGeomItemSets();
                        for (let gldrawitemset of gldrawitemsets) {
                            gldrawitemset.draw(renderstate);  
                        }
                    }
                }
            }
            glshader.unbind(renderstate);
        }

        if (renderstate.glgeom) {
            renderstate.glgeom.unbind(renderstate);
        }
    }

    drawSelectedGeoms(renderstate){

        const gl = this.__gl;
        gl.disable(gl.BLEND);
        gl.disable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        gl.depthMask(true);

        if(!this.bindShader(renderstate, this.__selectedGeomsShader))
            return false;

        for (let glshaderMaterials of this.__glshadermaterials) {
            const glmaterialGeomItemSets = glshaderMaterials.getMaterialGeomItemSets();
            for (let glmaterialGeomItemSet of glmaterialGeomItemSets) {
                const gldrawitemsets = glmaterialGeomItemSet.getGeomItemSets();
                for (let gldrawitemset of gldrawitemsets) {
                    gldrawitemset.drawSelected(renderstate);  
                }
            }
        }


        if (renderstate.glgeom) {
            renderstate.glgeom.unbind(renderstate);
        }
    }

    getGeomItemAndDist(geomData) {

        let itemId, dist;
        const gl = this.__gl;
        if (gl.floatGeomBuffer) {
            itemId = Math.round(geomData[1]);
            dist = geomData[3];
        } else {
            itemId = geomData[0] + (geomData[1] << 8);
            dist = Math.decode16BitFloatFrom2xUInt8([geomData[2], geomData[3]]);
        }

        const drawItem = this.__collector.getGeomItem(itemId);
        if (drawItem) {
            return { 
                geomItem: drawItem.getGeomItem(),
                dist
            } 
        }
    }

    drawGeomData(renderstate){

        const gl = this.__gl;
        gl.disable(gl.BLEND);
        gl.disable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        gl.depthMask(true);

        if(!this.bindShader(renderstate, this.__geomdatashader))
            return false;

        {
            let unif = renderstate.unifs.floatGeomBuffer;
            if (unif){
                gl.uniform1i(unif.location, gl.floatGeomBuffer ? 1 : 0);
            }
        }
        {
            let unif = renderstate.unifs.passId;
            if (unif){
                gl.uniform1i(unif.location, this.__passIndex);
            }
        }


        for (let glshaderMaterials of this.__glshadermaterials) {
            if(glshaderMaterials.getGLShader().invisibleToGeomBuffer)
                continue;

            const glmaterialGeomItemSets = glshaderMaterials.getMaterialGeomItemSets();
            for (let glmaterialGeomItemSet of glmaterialGeomItemSets) {
                if(glmaterialGeomItemSet.drawCount == 0 || !glmaterialGeomItemSet.visibleInGeomDataBuffer)
                    continue;
                const gldrawitemsets = glmaterialGeomItemSet.getGeomItemSets();
                for (let gldrawitemset of gldrawitemsets) {
                    // materialProfile.push( 'geom:' + String(gldrawitemset.getGLGeom().getGeom().numVertices()) +  ' count:' + gldrawitemset.getDrawCount() );
                    gldrawitemset.draw(renderstate);
                }
            }
        }

        if (renderstate.glgeom) {
            renderstate.glgeom.unbind(renderstate);
        }
    }
};

GLRenderer.registerPass(GLOpaqueGeomsPass, PassType.OPAQUE);

export {
    GLOpaqueGeomsPass
};