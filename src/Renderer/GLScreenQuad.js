import AttrValue from '../Math/AttrValue';
import Signal from '../Math/Signal';
import GLShader from './GLShader.js';
import ScreenQuadShader from './Shaders/ScreenQuadShader.js';
import generateShaderGeomBinding from './GeomShaderBinding.js';

class GLScreenQuad {
    constructor(gl) {
        this.__gl = gl;

        this.__pos = [0.0, 0.0];
        this.__size = [1.0, 1.0];
        this.flipY = true;
        this.__glshader = new GLShader(gl, new ScreenQuadShader());

        if (!gl.__quadVertexIdsBuffer) 
            gl.setupInstancedQuad();

        let shaderComp = this.__glshader.compileForTarget('GLScreenQuad');
        this.__quadBinding = generateShaderGeomBinding(gl, shaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer);

        this.ready = true;
    }

    bind(renderstate, texture, pos = undefined, size = undefined) {
        let unifs = renderstate.unifs;
        texture.bind(renderstate, unifs.texture.location);

        let gl = this.__gl;
        if ('pos' in unifs)
            this.__gl.uniform2fv(unifs.pos.location, pos ? (pos instanceof AttrValue ? pos.asArray() : pos) : this.__pos);
        if ('size' in unifs)
            this.__gl.uniform2fv(unifs.size.location, size ? (size instanceof AttrValue ? size.asArray() : size) : this.__size);
        // if ('flipY' in unifs)
        //     this.__gl.uniform1i(unifs.flipY.location, this.flipY ? 1 : 0);

        // if ('textureDim' in unifs)
        //     this.__gl.uniform2fv(unifs.textureDim.location, [texture.width, texture.height]);

        this.__quadBinding.bind(renderstate);
    }

    bindShader(renderstate) {
        return this.__glshader.bind(renderstate, 'GLScreenQuad');
    }

    draw(renderstate, texture, pos = undefined, size = undefined) {

        this.bind(renderstate, texture, pos, size);
        
        this.__gl.drawQuad();
    }

    destroy() {

    }
};

export default GLScreenQuad;