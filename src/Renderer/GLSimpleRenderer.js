import {
    Color,
    Mat4,
} from '../Math';
import { GLRenderer } from './GLRenderer.js';

class GLSimpleRenderer extends GLRenderer {
    constructor(canvasDiv, options={}) {
        super(canvasDiv, options, {
            alpha: false,
            depth: true,
            antialias: true,
            preserveDrawingBuffer: true
        });

        // this.addPass(new GLNormalsPass());
        this.__debugLightmaps = false;

        this.addShaderPreprocessorDirective('ENABLE_INLINE_GAMMACORRECTION');
        if (!options.disableTextures)
            this.addShaderPreprocessorDirective('ENABLE_TEXTURES');
    }

    
    ///////////////////////////////////
    // Events

    onKeyPressed(key, event) {
        switch (key) {
            default:
                super.onKeyPressed(key, event);
        }
    }


    /////////////////////////
    // Rendering

    drawVP(viewport, renderstate) {
        viewport.draw(renderstate);
    }

    drawScene(renderstate, vrView = false) {

        renderstate.debugLightmaps = this.__debugLightmaps;
        renderstate.shaderopts = this.__preproc;

        super.drawScene(renderstate);

        // if (!vrView) {
        //     this.__gizmoPass.draw(renderstate);
        // }
    }


    draw() {
        if (this.__drawSuspensionLevel > 0)
            return;

        const renderstate = {};
        if (this.__vrViewport) {
            if (this.__vrViewport.isPresenting()){
                this.__vrViewport.draw(renderstate);
                if(this.mirrorVRisplayToViewport){
                    this.__gl.viewport(0, 0, this.__glcanvas.width, this.__glcanvas.height);
                    this.__gl.disable(this.__gl.SCISSOR_TEST);
                    this.redrawOccured.emit();
                    return;
                }
            }
            // Cannot upate the view, else it sends signals which
            // end up propagating through the websocket. 
            // TODO: Make the head invisible till active
            else
                this.__vrViewport.updateHeadAndControllers();
        }

        for (let vp of this.__viewports)
            this.drawVP(vp, renderstate);

        this.redrawOccured.emit();
        
        // New Items may have been added during the pause.
        if(this.__redrawGeomDataFbos)
            this.renderGeomDataFbos();
    }
};

export {
    GLSimpleRenderer
};
// export default GLSimpleRenderer;