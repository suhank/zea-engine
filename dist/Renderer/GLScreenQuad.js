import { Vec2 } from '../Math/index';
import { ScreenQuadShader } from './Shaders/ScreenQuadShader';
import { generateShaderGeomBinding } from './Drawing/GeomShaderBinding';
/** Class representing a GL screen quad.
 * @private
 */
class GLScreenQuad {
    /**
     * Create a GL screen quad.
     * @param gl - The webgl rendering context.
     * @param shaderopts - shader options
     */
    constructor(gl, shaderopts) {
        this.__gl = gl;
        this.__pos = [0.0, 0.0];
        this.__size = [1.0, 1.0];
        this.flipY = true;
        this.__glshader = new ScreenQuadShader(gl);
        if (!gl.__quadVertexIdsBuffer)
            gl.setupInstancedQuad();
        const shaderComp = this.__glshader.compileForTarget('GLScreenQuad', shaderopts);
        this.__quadBinding = generateShaderGeomBinding(this.__gl, shaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer);
        this.ready = true;
    }
    /**
     * The bind method.
     * @param renderstate - The object tracking the current state of the renderer
     * @param texture - The texture param.
     * @param pos - The pos value.
     * @param size - The size value.
     */
    bind(renderstate, texture, pos, size) {
        const unifs = renderstate.unifs;
        if (texture) {
            texture.bindToUniform(renderstate, renderstate.unifs.image);
        }
        const gl = this.__gl;
        {
            const unif = unifs.pos;
            if (unif) {
                let list = pos ? (pos instanceof Vec2 ? pos.asArray() : pos) : this.__pos;
                gl.uniform2fv(unif.location, list);
            }
        }
        {
            const unif = unifs.size;
            if (unif) {
                let list = size ? (size instanceof Vec2 ? size.asArray() : size) : this.__size;
                gl.uniform2fv(unif.location, list);
            }
        }
        // if ('flipY' in unifs)
        //     gl.uniform1i(unifs.flipY.location, this.flipY ? 1 : 0);
        // if ('textureDim' in unifs)
        //     gl.uniform2fv(unifs.textureDim.location, [texture.width, texture.height]);
        this.__quadBinding.bind(renderstate);
    }
    /**
     * The bindShader method.
     * @param renderstate - The object tracking the current state of the renderer
     * @return - The return value.
     */
    bindShader(renderstate) {
        return this.__glshader.bind(renderstate, 'GLScreenQuad');
    }
    /**
     * The draw method.
     * @param renderstate - The object tracking the current state of the renderer
     * @param texture - The texture value.
     * @param pos - The pos value.
     * @param size - The size value.
     */
    draw(renderstate, texture, pos, size) {
        this.bind(renderstate, texture, pos, size);
        const gl = this.__gl;
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy() { }
}
export { GLScreenQuad };
//# sourceMappingURL=GLScreenQuad.js.map