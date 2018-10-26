
import {
    Signal
} from '../Utilities';


const PassType = {
    OPAQUE: 0,
    TRANSPARENT: 1,
    OVERLAY: 2
};

// This class abstracts the rendering of a collection of geometries to screen.
class GLPass {
    constructor() {
        this.updated = new Signal();
        this.enabled = true;
        this.__passIndex = 0;
    }

    init(gl, collector, passIndex) {
        if(passIndex == undefined)
            throw("Missing constructor argument.");// Type checking. Seomthing that TypeScript will do for us.

        this.__gl = gl;
        this.__collector = collector;
        this.__passIndex = passIndex;
        this.__glshadermaterials = [];

        if(this.filterRenderTree)
            this.__collector.renderTreeUpdated.connect(this.filterRenderTree.bind(this));
    }

    setPassIndex(passIndex){
        this.__passIndex = passIndex;
    }

    toggleEnabled(){
        this.enabled = !this.enabled;
    }


    startPresenting() {

    }

    stopPresenting() {

    }

    /////////////////////////////////////
    // Bind to Render Tree
    // filterRenderTree() {
    //     // console.log(this.constructor.name+':filterRenderTree');
    // }

    getGeomItemAndDist() {
        // TODO:
    }


    /////////////////////////////////////
    // Rendering

    bindShader(renderstate, glshader){
        if(!glshader.bind(renderstate, this.constructor.name))
            return false;
        if(!this.__collector.bind(renderstate))
            return false;
        return true;
    }

    bindMaterial(renderstate, glmaterial){
        return glmaterial.bind(renderstate);
    }

    draw(renderstate) {
        const gl = this.__gl;

        for (let glshaderMaterials of this.__glshadermaterials) {
            const glshader = glshaderMaterials.getGLShader();
            if(this.bindShader(renderstate, glshader)){
                const glmaterialDrawItemSets = glshaderMaterials.getMaterialDrawItemSets();
                for (let glmaterialDrawItemSet of glmaterialDrawItemSets) {
                    if(glmaterialDrawItemSet.drawCount == 0)
                        continue;
                    if(this.bindMaterial(renderstate, glmaterialDrawItemSet.getGLMaterial())){
                        const gldrawitemsets = glmaterialDrawItemSet.getDrawItemSets();
                        for (let gldrawitemset of gldrawitemsets) {
                            gldrawitemset.draw(renderstate);  
                        }
                    }
                    renderstate.materialCount++;
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


        for (let glshaderMaterials of this.__glshadermaterials) {
            const glmaterialDrawItemSets = glshaderMaterials.getMaterialDrawItemSets();
            for (let glmaterialDrawItemSet of glmaterialDrawItemSets) {
                const gldrawitemsets = glmaterialDrawItemSet.getDrawItemSets();
                for (let gldrawitemset of gldrawitemsets) {
                    gldrawitemset.drawSelected(renderstate);  
                }
            }
        }


        if (renderstate.glgeom) {
            renderstate.glgeom.unbind(renderstate);
        }
    }

    drawGeomData(renderstate){

        const gl = this.__gl;

        for (let glshaderMaterials of this.__glshadermaterials) {
            if(glshaderMaterials.getGLShader().invisibleToGeomBuffer)
                continue;

            const glmaterialDrawItemSets = glshaderMaterials.getMaterialDrawItemSets();
            for (let glmaterialDrawItemSet of glmaterialDrawItemSets) {
                if(glmaterialDrawItemSet.drawCount == 0)
                    continue;
                const gldrawitemsets = glmaterialDrawItemSet.getDrawItemSets();
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

export {
    GLPass,
    PassType
};
// export default GLPass;

