import {
    Color,
    Mat4,
} from '../Math';
import { GLRenderer } from './GLRenderer.js';
import { GLWirePass } from './Passes/GLWirePass.js';
import { GLHardEdgesPass } from './Passes/GLHardEdgesPass.js';
import { GLGeomDataPass } from './Passes/GLGeomDataPass.js';
import { GLMeshPointsPass } from './Passes/GLMeshPointsPass.js';
import { GLNormalsPass } from './Passes/GLNormalsPass.js';

class GLSimpleRenderer extends GLRenderer {
    constructor(canvasDiv, options={}) {
        super(canvasDiv, options, {
            alpha: false,
            depth: true,
            antialias: true,
            preserveDrawingBuffer: true
        });

        // this.addPass(new GLNormalsPass(this.__gl, this.__collector));
        this.__debugLightmaps = false;

        this.addShaderPreprocessorDirective('ENABLE_INLINE_GAMMACORRECTION');
        if (!options.disableTextures)
            this.addShaderPreprocessorDirective('ENABLE_TEXTURES');
    }

    
    ///////////////////////////////////
    // Events

    onKeyPressed(key, event) {
        switch (key) {
            case 'f':
                let selection = scene.getSelectionManager().selection;
                if (selection.size == 0)
                    this.__viewport.getCamera().frameView([scene.getRoot()]);
                else
                    this.__viewport.getCamera().frameView(selection);
                break;
            case 'k':
                this.__debugLightmaps = !this.__debugLightmaps;
                break;
            case ' ':
                if(this.__vrViewport)
                    this.__vrViewport.togglePresenting();
                else
                    this.toggleContinuousDrawing();
                break;
            case 'v':
                this.mirrorVRisplayToViewport = !this.mirrorVRisplayToViewport;
            default:
                super.onKeyPressed(key);

        }
    }




    /////////////////////////
    // Rendering

    drawVP(viewport, vrView = false) {
        viewport.draw(this.__renderstate);
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
        if(this.__stats)
            this.__stats.begin();

        if (this.__vrViewport) {
            if (this.__vrViewport.isPresenting()){
                this.__vrViewport.draw(this.__renderstate);
                if(this.mirrorVRisplayToViewport){
                    this.__gl.viewport(0, 0, this.getWidth(), this.getHeight());
                    this.__gl.disable(this.__gl.SCISSOR_TEST);
                    if(this.__stats)
                        this.__stats.end();
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
            this.drawVP(vp);

        if(this.__stats)
            this.__stats.end();
        
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