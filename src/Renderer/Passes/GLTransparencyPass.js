import { Vec3 } from '../../Math/Vec3';
import { GLPass } from '../GLPass.js';
import { GLShaderMaterials } from '../GLCollector.js';

class GLTransparencyPass extends GLPass {
    constructor(gl, collector) {
        super(gl, collector);

        this.transparentItems = [];
        this.visibleItems = [];
        this.prevSortCameraPos = new Vec3();
    }

    /////////////////////////////////////
    // Bind to Render Tree
    filterRenderTree() {
        let allglshaderMaterials = this.__collector.getGLShaderMaterials();
        const addDrawItem = (glshader, glmaterial, glGeom, drawItem)=>{
            const item = {
                glshader,
                glmaterial,
                glGeom,
                drawItem
            }
            if(drawItem.getVisible())
                this.transparentItems.push(item);
            drawItem.visibilityChanged.connect((visible)=>{
                if(visible) 
                    this.transparentItems.push(item);
                else {
                    const index = this.transparentItems.indexOf(item);
                    this.transparentItems.splice(index, 1);
                }
            });
        }

        this.transparentItems = [];
        for (let glshaderkey in allglshaderMaterials) {
            let glshaderMaterials = allglshaderMaterials[glshaderkey];
            if (!glshaderMaterials.glshader.isTransparent())
                continue;
            const glshader = glshaderMaterials.glshader;
            const glmaterialDrawItemSets = glshaderMaterials.glmaterialDrawItemSets;
            for (let glmaterialDrawItemSet of glmaterialDrawItemSets) {
                const glmaterial = glmaterialDrawItemSet.glmaterial;
                const gldrawitemsets = glmaterialDrawItemSet.getDrawItemSets();
                for (let gldrawitemset of gldrawitemsets) {
                    // Now we must unpack the drawItemSet into individual draw items.
                    const glGeom = gldrawitemset.glgeom;
                    for (let drawItem of gldrawitemset.drawItems) {
                        addDrawItem(glshader, glmaterial, glGeom, drawItem);
                    }
                }
            }
        }
    }

    sortItems(cameraPos) {
        for (let transparentItem of this.transparentItems)
            transparentItem.dist = transparentItem.drawItem.geomItem.getGlobalXfo().tr.distanceTo(cameraPos);
        this.transparentItems.sort((a, b) => (a.dist > b.dist) ? -1 : ((a.dist < b.dist) ? 1 : 0));
        this.prevSortCameraPos = cameraPos;
    }

    draw(renderstate) {
        const gl = this.__gl;

        const camera = renderstate.camera;
        const cameraPos = camera.getGlobalXfo().tr;
        // TODO: Avoid sorting if the camera did not movemore than 30cm
        if(cameraPos.distanceTo(this.prevSortCameraPos) > 0.3)
            this.sortItems(cameraPos);

        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        gl.depthMask(true);
        
        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        // Complex transparent surfaces require mutiple passes.
        // First the multiply pass tints the background color, simulating
        // light passing through the surface, and then the add layer
        // adds new color to the backbuffer to simulate light bouncing off
        // the surface.
        
        // renderstate.pass = 'MULTIPLY';
        // gl.blendFunc(gl.DST_COLOR, gl.ZERO);// For multiply, select this.
        // super.draw(renderstate);

        renderstate.pass = 'ADD';
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); // For add
        // super.draw(renderstate);

        let currentglShader;
        let currentglMaterial;
        let currentglGeom;
        for (let transparentItem of this.transparentItems) {
            const drawItem = transparentItem.drawItem;
            if (!drawItem.getVisible()){
            console.log("Inivisble:" + drawItem.geomItem.getName())
                continue;
            }

            if (currentglShader != transparentItem.glshader) {
                // Some passes, like the depth pass, bind custom uniforms.
                if (!this.bindShader(renderstate, transparentItem.glshader)){
                    continue;
                }
                currentglShader = transparentItem.glshader;
            }
            if (currentglMaterial != transparentItem.glmaterial) {
                if (!transparentItem.glmaterial.bind(renderstate)){
                    continue;
                }
                currentglMaterial = transparentItem.glmaterial;
            }

            if (currentglGeom != transparentItem.glGeom) {
                currentglGeom = transparentItem.glGeom;
                if (!currentglGeom.bind(renderstate)){
                    continue;
                }
            }

            if (drawItem.bind(renderstate)) {
                // Specify an non-instanced draw to the shader
                if (renderstate.unifs.instancedDraw) {
                    gl.uniform1i(renderstate.unifs.instancedDraw.location, 0);
                    gl.disableVertexAttribArray(renderstate.attrs.instancedIds.location);
                }
                currentglGeom.draw(renderstate);
            }
        }

        currentglGeom.unbind();

        gl.disable(gl.BLEND);
    }
};


export {
    GLTransparencyPass
};
// export default GLTransparencyPass;