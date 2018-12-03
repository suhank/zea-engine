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

    init(gl, collector, passIndex) {
        if (passIndex == undefined)
            throw ("Missing constructor argument."); // Type checking. Seomthing that TypeScript will do for us.

        this.__gl = gl;
        this.__collector = collector;
        this.__passIndex = passIndex;
        this.__glshadermaterials = [];

        // if(this.filterRenderTree)
        //     this.__collector.renderTreeUpdated.connect(this.filterRenderTree.bind(this));
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
    // filterRenderTree() {
    //     // console.log(this.constructor.name+':filterRenderTree');
    // }

    getGeomItemAndDist() {}

    /////////////////////////////////////
    // Rendering

    // bindShader(renderstate, glshader){
    //     if(!glshader.bind(renderstate, this.constructor.name))
    //         return false;
    //     if(!this.__collector.bind(renderstate))
    //         return false;
    //     return true;
    // }

    // bindMaterial(renderstate, glmaterial){
    //     return glmaterial.bind(renderstate);
    // }

    draw(renderstate) {}

    drawSelectedGeoms(renderstate) {}

    drawGeomData(renderstate) {}

};

export {
    GLPass,
    PassType
};
// export default GLPass;