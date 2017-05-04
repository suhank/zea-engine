import Mesh from '../../SceneTree/Geometry/Mesh';
import GLMesh from '../GLMesh.js';
import NormalsShader from '../Shaders/NormalsShader.js';
import GLPass from '../GLPass.js';
import {
    GLShaderMaterials,
    GLMaterialDrawItemSets
} from '../GLCollector.js';
import GLShader from '../GLShader.js';

class GLNormalsPass extends GLPass {
    constructor(gl, collector) {
        super(gl, collector);

        this.normalColor = [.2, 1, .4, 0.75];
        this.normalLength = 0.03;

        this.__glshader = new GLShader(gl, new NormalsShader());

        // let updateNormalsLength = (scene)=>{
        //     let sceneSize = this.__renderer.scene.boundingBox.size();
        //     this.normalLength = sceneSize.length() * 0.02;
        // }

        // this.__collector.getRenderer().sceneSet.connect((scene) => {
        //     updateNormalsLength.call(this, scene);
        //     scene.boundingBoxDirtied.connect(() => {
        //         updateNormalsLength.call(this, scene);
        //     }, this);
        // }, this);


        if (!gl.__linesegattrbuffers) {
            gl.setupLineSegAttrBuffers();
        }
    }

    /////////////////////////////////////
    // Bind to Render Tree
    filterRenderTree() {
        let allglshaderMaterials = this.__collector.getGLShaderMaterials();
        this.__glshadermaterials = [];
        for (let glshaderkey in allglshaderMaterials) {
            let glshaderMaterials = null;
            let glmaterialDrawItemSets = allglshaderMaterials[glshaderkey].getMaterialDrawItemSets();
            for (let glmaterialDrawItemSet of glmaterialDrawItemSets) {
                if(!glshaderMaterials){
                    glshaderMaterials = new GLShaderMaterials();
                    this.__glshadermaterials.push(glshaderMaterials);
                }
                let filteredglmaterialDrawItemSet = new GLMaterialDrawItemSets();
                for (let gldrawItemSet of glmaterialDrawItemSet.getDrawItemSets()) {
                    if(gldrawItemSet.getGLGeom() instanceof GLMesh)
                        filteredglmaterialDrawItemSet.addDrawItemSet(gldrawItemSet);
                }
                glshaderMaterials.addMaterialDrawItemSets(filteredglmaterialDrawItemSet);
            }
        }
    }

    draw(renderstate) {
        if(this.__count == 0){
            return;
        }

        let gl = this.__gl;

        gl.enable(gl.CULL_FACE);
        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        this.__glshader.bind(renderstate);
        let unifs = renderstate.unifs;
        let attrs = renderstate.attrs;
        gl.uniform1f(unifs.normalLength.location, this.normalLength);
        gl.uniform4fv(unifs.normalColor.location, this.normalColor);

        this.__collector.bind(renderstate);

        // Specify an non-instanced draw to the shader
        // gl.uniform1i(renderstate.unifs.instancedDraw.location, 0);

        for (let glshaderMaterials of this.__glshadermaterials) {
            let glmaterialDrawItemSets = glshaderMaterials.getMaterialDrawItemSets();
            for (let glmaterialDrawItemSet of glmaterialDrawItemSets) {
                let gldrawitemsets = glmaterialDrawItemSet.getDrawItemSets();
                for (let gldrawitemset of gldrawitemsets) {
                    // materialProfile.push( 'geom:' + String(gldrawitemset.getGLGeom().getGeom().numVertices()) +  ' count:' + gldrawitemset.getDrawCount() );
                    // renderstate.drawCalls++;
                    if(gldrawitemset.getDrawCount() > 0){
                        let glgeom = gldrawitemset.getGLGeom();
                        if(glgeom.bind(renderstate, gl.__linesegattrbuffers)){
                            for(let i=0; i<gldrawitemset.getDrawCount(); i++){
                                let gldrawitem = gldrawitemset.getGLDrawItem(i);
                                if (gldrawitem.bind(renderstate)) {
                                    gl.__ext_Inst.drawArraysInstancedANGLE(gl.LINES, 0, 2, glgeom.getNumSplitVerts());
                                }
                            }
                        }
                    }
                }
                // renderstate.materialCount++;
                // passProfile.push(materialProfile);
            }
        }

        this.__gl.disable(this.__gl.BLEND);
    }
};

export default GLNormalsPass;