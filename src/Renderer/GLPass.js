import {
    Signal
} from '../Math';

// This class abstracts the rendering of a collection of geometries to screen.
class GLPass {
    constructor(gl, collector) {
        this.__gl = gl;
        this.__collector = collector;
        this.__glshadermaterials = [];;
        this.enabled = true;
        
        this.updated = new Signal();

        this.__collector.renderTreeUpdated.connect(this.filterRenderTree, this);
    }

    toggleEnabled(){
        this.enabled = !this.enabled;
    }

    filter(drawItem) {
        // Aonly allow a draw item to be assigned to a pass once...
        return (drawItem.__assignedPasses.indexOf(this) == -1);
    }

    /////////////////////////////////////
    // Bind to Render Tree
    filterRenderTree() {
        console.log(this.constructor.name+':filterRenderTree');
    }


    /////////////////////////////////////
    // Rendering

    bindShader(renderstate, glshader){
        let opts = this.__collector.getRenderer().getShaderPreprocessorDirectives();
        if(!glshader.bind(renderstate, this.constructor.name, opts))
            return false;
        if(!this.__collector.bind(renderstate))
            return false;
        return true;
    }

    draw(renderstate) {
        let gl = this.__gl;
        // let passProfile = [];
        // renderstate.profileJSON[this.constructor.name] = passProfile;

        for (let glshaderMaterials of this.__glshadermaterials) {
            if(this.bindShader(renderstate, glshaderMaterials.getGLShader())){
                let glmaterialDrawItemSets = glshaderMaterials.getMaterialDrawItemSets();
                for (let glmaterialDrawItemSet of glmaterialDrawItemSets) {
                    // let materialProfile = [];
                    if(glmaterialDrawItemSet.getGLMaterial().bind(renderstate)){
                        let gldrawitemsets = glmaterialDrawItemSet.getDrawItemSets();
                        for (let gldrawitemset of gldrawitemsets) {
                            // materialProfile.push( 'geom:' + String(gldrawitemset.getGLGeom().getGeom().numVertices()) +  ' count:' + gldrawitemset.getDrawCount() );
                            renderstate.drawCalls++;
                            gldrawitemset.draw(renderstate);
                        }
                    }
                    renderstate.materialCount++;
                    // passProfile.push(materialProfile);
                }
            }
        }
    }

};

export {
    GLPass
};

