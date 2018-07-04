
import {
    Signal
} from '../Utilities';

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
        this.__selectedGeomsShadermaterials = [];
        

        if(this.filterRenderTree)
            this.__collector.renderTreeUpdated.connect(this.filterRenderTree.bind(this));
    }

    setPassIndex(passIndex){
        this.__passIndex = passIndex;
    }

    toggleEnabled(){
        this.enabled = !this.enabled;
    }

    /////////////////////////////////////
    // Bind to Render Tree
    // filterRenderTree() {
    //     // console.log(this.constructor.name+':filterRenderTree');
    // }

    getGeomItem() {
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

    drawItemSet(renderstate, gldrawitemset) {
        gldrawitemset.draw(renderstate);  
    }

    draw(renderstate) {
        const gl = this.__gl;


        // let passProfile = [];
        // renderstate.profileJSON[this.constructor.name] = passProfile;

        for (let glshaderMaterials of this.__glshadermaterials) {
            let glshader = glshaderMaterials.getGLShader();
            if(this.bindShader(renderstate, glshader)){
                let glmaterialDrawItemSets = glshaderMaterials.getMaterialDrawItemSets();
                for (let glmaterialDrawItemSet of glmaterialDrawItemSets) {
                    // let materialProfile = [];
                    if(this.bindMaterial(renderstate, glmaterialDrawItemSet.getGLMaterial())){
                        let gldrawitemsets = glmaterialDrawItemSet.getDrawItemSets();
                        for (let gldrawitemset of gldrawitemsets) {
                            // materialProfile.push( 'geom:' + String(gldrawitemset.getGLGeom().getGeom().numVertices()) +  ' count:' + gldrawitemset.getDrawCount() );
                            this.drawItemSet(renderstate, gldrawitemset);
                        }
                    }
                    renderstate.materialCount++;
                    // passProfile.push(materialProfile);
                }
            }
            glshader.unbind(renderstate);
        }
    }

    drawSelectedGeoms(renderstate){
        const gl = this.__gl;

        for (let glshaderMaterials of this.__selectedGeomsShadermaterials) {
            const glmaterialDrawItemSets = glshaderMaterials.getMaterialDrawItemSets();
            for (let glmaterialDrawItemSet of glmaterialDrawItemSets) {
                const gldrawitemsets = glmaterialDrawItemSet.getDrawItemSets();
                for (let gldrawitemset of gldrawitemsets) {
                    // materialProfile.push( 'geom:' + String(gldrawitemset.getGLGeom().getGeom().numVertices()) +  ' count:' + gldrawitemset.getDrawCount() );
                    this.drawItemSet(renderstate, gldrawitemset);
                }
            }
        }
    }

    drawGeomData(renderstate){

        const gl = this.__gl;

        for (let glshaderMaterials of this.__glshadermaterials) {
            const glmaterialDrawItemSets = glshaderMaterials.getMaterialDrawItemSets();
            for (let glmaterialDrawItemSet of glmaterialDrawItemSets) {
                const gldrawitemsets = glmaterialDrawItemSet.getDrawItemSets();
                for (let gldrawitemset of gldrawitemsets) {
                    // materialProfile.push( 'geom:' + String(gldrawitemset.getGLGeom().getGeom().numVertices()) +  ' count:' + gldrawitemset.getDrawCount() );
                    this.drawItemSet(renderstate, gldrawitemset);
                }
            }
        }
    }

};

export {
    GLPass
};
// export default GLPass;

