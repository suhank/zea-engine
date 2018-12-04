import {
    Signal
} from '../../Utilities';


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

    init(renderer, passIndex) {
        if (passIndex == undefined)
            throw ("Missing constructor argument."); // Type checking. Seomthing that TypeScript will do for us.

        this.__gl = renderer.gl;
        this.__renderer = renderer;
        this.__passIndex = passIndex;
    }

    setPassIndex(passIndex) {
        this.__passIndex = passIndex;
    }

    toggleEnabled() {
        this.enabled = !this.enabled;
    }

    startPresenting() {}

    stopPresenting() {}

    /////////////////////////////////////
    // Bind to Render Tree
    getGeomItemAndDist() {}

    /////////////////////////////////////
    // Rendering


    draw(renderstate) {}

    drawSelectedGeoms(renderstate) {}

    drawGeomData(renderstate) {}

};

export {
    GLPass,
    PassType
};
// export default GLPass;