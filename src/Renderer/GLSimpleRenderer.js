import {
    Color,
    Mat4
} from '../Math/Math.js';
import {
    GLRenderer
} from './GLRenderer.js';
import {
    GLForwardPass
} from './Passes/GLForwardPass.js';
import {
    GLTransparencyPass
} from './Passes/GLTransparencyPass.js';
import {
    GLWirePass
} from './Passes/GLWirePass.js';
import {
    GLHardEdgesPass
} from './Passes/GLHardEdgesPass.js';
import {
    GLGeomDataPass
} from './Passes/GLGeomDataPass.js';
import {
    GLMeshPointsPass
} from './Passes/GLMeshPointsPass.js';
import {
    GLNormalsPass
} from './Passes/GLNormalsPass.js';

class GLSimpleRenderer extends GLRenderer {
    constructor(canvasDiv) {
        super(canvasDiv, {
            alpha: false,
            depth: true,
            antialias: true,
            preserveDrawingBuffer: true
        });

        this.addPass(new GLForwardPass(this.__gl, this.__collector));
        this.addPass(new GLTransparencyPass(this.__gl, this.__collector));
        this.addPass(new GLNormalsPass(this.__gl, this.__collector));
    }

    getShaderPreprocessorDirectives() {
        // return '#define ENABLE_LIGHTMAPS\n\n';
        return {
            defines:'#define ENABLE_INLINE_GAMMACORRECTION\n'
        };
    }
    
    ///////////////////////////////////
    // Events

    onKeyPressed(key) {
        switch (key) {
            case 'f':
                let selection = scene.getSelectionManager().selection;
                if (selection.size == 0)
                    this.__viewport.getCamera().frameView([scene.getRoot()]);
                else
                    this.__viewport.getCamera().frameView(selection);
                break;
            case ' ':
                if(this.__vrViewport)
                    this.__vrViewport.togglePresenting();
                else
                    this.toggleContinuousDrawing();
                break;
            case 'v':
                this.mirrorVRisplayToViewport = !this.mirrorVRisplayToViewport;

        }
    }




    /////////////////////////
    // Rendering

    drawVP(viewport, vrView = false) {
        viewport.draw(this.__renderstate);
    }

    drawScene(renderstate, vrView = false) {
        super.drawScene(renderstate);

        // if (!vrView) {
        //     this.__gizmoPass.draw(renderstate);
        // }
    }


    draw() {
        if (this.__drawSuspensionLevel > 0)
            return;
        this.__stats.begin();

        if (this.__vrViewport) {
            if (this.__vrViewport.isPresenting()){
                this.__vrViewport.draw(this.__renderstate);
                if(this.mirrorVRisplayToViewport){
                    this.__gl.viewport(0, 0, this.getWidth(), this.getHeight());
                    this.__gl.disable(this.__gl.SCISSOR_TEST);
                    this.__stats.end();
                    return;
                }
            }
            else
                this.__vrViewport.updateHeadAndControllers();
        }

        for (let vp of this.__viewports)
            this.drawVP(vp);

        this.__stats.end();
        // console.log("Draw Calls:" + this.__renderstate['drawCalls']);
    }
};

export {
    GLSimpleRenderer
};