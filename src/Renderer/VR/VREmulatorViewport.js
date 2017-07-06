import {
    isMobileDevice
} from '../../BrowserDetection.js';
import {
    Vec2,
    Vec3,
    Quat,
    Mat4,
    Xfo,
    Color,
    Ray,
    Signal
} from '../../Math';
import {
    TreeItem
} from '../../SceneTree';
import {
    BaseViewport
} from '../BaseViewport.js';
import {
    GLFbo
} from '../GLFbo.js';
import {
    GLTexture2D
} from '../GLTexture2D.js';
import {
    VRHead
} from './VRHead.js'
import {
    VRController
} from './VRController.js'
import {
    VRToolMoveStage
} from './Tools/VRToolMoveStage.js'
import {
    VRToolHoldObjects
} from './Tools/VRToolHoldObjects.js'
import {
    VRMarkerpenTool
} from './Tools/VRMarkerpenTool.js'
import {
    VRFlyTool
} from './Tools/VRFlyTool.js'

class VREmulatorViewport extends GLViewport {
    constructor(renderer) {
        super(renderer);


        this.__eyeSeparation = 0.12;//meters.
    }


    ////////////////////////////
    // Controllers

    draw(renderstate) {

        renderstate['viewport'] = this;

        let width = this.__width
        let height = this.__hmdCanvasSize[1];
        let gl = this.__renderer.gl;

        gl.viewport(0, 0, this.__width * 0.5, this.__height);
        this.__leftViewMatrix.setDataArray(this.__frameData.leftViewMatrix);
        this.__leftViewMatrix.multiplyInPlace(this.__stageMatrix);
        renderstate['viewMatrix'] = this.__leftViewMatrix;
        renderstate['projectionMatrix'] = this.__leftProjectionMatrix;

        if(this.__backgroundTexture && this.__backgroundTexture.isLoaded()) {
            this.drawBackground(renderstate);
        }

        this.__renderer.drawScene(renderstate);

        gl.viewport(width * 0.5, 0, this.__width * 0.5, this.__height);
        this.__rightViewMatrix.setDataArray(this.__frameData.rightViewMatrix);
        this.__rightViewMatrix.multiplyInPlace(this.__stageMatrix);
        renderstate['viewMatrix'] = this.__rightViewMatrix;
        renderstate['projectionMatrix'] = this.__rightProjectionMatrix;

        if(this.__backgroundTexture && this.__backgroundTexture.isLoaded()) {
            this.drawBackground(renderstate);
        }

        this.__renderer.drawScene(renderstate);

        this.__vrDisplay.submitFrame();
        this.__frameRequested = false;
    }

    drawOverlays(renderstate) {
        // No overlays in VR 
        //(overlays will be 3d scene grometries at an appropriate dist to the head... maybe.)
        // Instead we will use the controllers and attach widgets there.
    }
};

export {
    VRViewport
};
//export default VRViewport;