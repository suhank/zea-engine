import {
    Signal
} from '../Utilities';
import {
    generateShaderGeomBinding
} from './GeomShaderBinding.js';

class GLGeom {
    constructor(gl, geom) {
        this.__gl = gl;
        this.__geom = geom;
        this.__glattrs = {};

        this.__glattrbuffers = {};
        this.__shaderBindings = {};
        this.destructing = new Signal();
        this.updated = new Signal();

        let updateBuffers = (opts) => {
            this.updateBuffers(opts);
            this.updated.emit();
        }
        this.__geom.geomDataChanged.connect(updateBuffers);

        let regenBuffers = (opts) => {
            this.clearShaderBindings();
            this.updateBuffers(opts);
            this.updated.emit();
        }
        this.__geom.geomDataTopologyChanged.connect(regenBuffers);

        this.__geom.destructing.connect(() => {
            this.destroy();
        });
    }

    getGeom() {
        return this.__geom
    }

    renderableInstanced(){
        return true;
    }

    ///////////////////////////////////////
    // Buffers

    genBuffers() {}

    updateBuffers(opts) {

    }


    ///////////////////////////////////////
    // Binding

    bind(renderstate, extrAttrBuffers) {
        if (this.__destroyed)
            throw ("Error binding a destroyed geom");

        let shaderBinding = this.__shaderBindings[renderstate.shaderkey];
        if (!shaderBinding) {
            let gl = this.__gl;
            shaderBinding = generateShaderGeomBinding(gl, renderstate.attrs, this.__glattrbuffers, this.__indexBuffer, extrAttrBuffers);
            this.__shaderBindings[renderstate.shaderkey] = shaderBinding;
        }
        return shaderBinding.bind(renderstate);
    }

    unbind(renderstate) {
        // Unbinding a geom in't necessar(like unbinding a texture)
        // We simply bind the new geom.
    }

    ///////////////////////////////////////
    // Drawing
    // Draw an item to screen.
    draw() {
        throw ("Not implemented. Implement this method in a derived class.")
    }

    drawInstanced(count) {
        throw ("Not implemented. Implement this method in a derived class.")
    }

    clearShaderBindings() {

        for (let shaderkey in this.__shaderBindings) {
            let shaderBinding = this.__shaderBindings[shaderkey];
            shaderBinding.destroy();
        }
        this.__shaderBindings = {};
    }

    destroy() {
        this.clearShaderBindings();

        let gl = this.__gl;
        for (let attrName in this.__glattrbuffers) {
            gl.deleteBuffer(this.__glattrbuffers[attrName].buffer);
        }
        this.__glattrs = {};

        this.__shaderBindings = {};
        this.__destroyed = true;
        this.destructing.emit(this);
    }
};

export {
    GLGeom
};
// export default GLGeom;