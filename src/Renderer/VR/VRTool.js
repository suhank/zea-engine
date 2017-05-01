import {
    Vec3,
    Color,
    Xfo,
    Signal
} from '../../Math';

class VRTool {
    constructor() {
        this.__active = false;
    }

    activateTool() {
        this.__active = true;
    }

    deactivateTool() {
        this.__active = false;
    }

    evalTool() {
    }
};

export {
    VRMarkerpenTool
};