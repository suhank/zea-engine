import { Color } from '../../Math/Color';
import { Mesh } from '../../SceneTree/Geometry/Mesh';
import { WireShader } from '../Shaders/WireShader.js';
import { GLPass } from '../GLPass.js';
import { GLShader } from '../GLShader.js';

class GLHardEdgesPass extends GLPass {
    constructor(gl) {
        super(gl);

        let glshader = new GLShader(gl, new WireShader());
        this.setExplicitShader(glshader);

        this.__lineWidth = 2.0;
        this.__alphaBlend = 0.2;
        // this.__wireColor = new Color(0.2, 0.2, 0.2, 0.1);
        this.__wireColor = [0.2, 0.2, 0.2, 0.7];
        this.__renderHiddenLines = false;
    }

    filter(drawItem) {
        if(!super.filter(drawItem))
            return false;
        let geom = drawItem.geomItem.geom;
        return (geom instanceof Mesh);
    }

    addDrawItem(drawItem) {
        super.addDrawItem(drawItem);

        drawItem.glGeom.generateHardEdgesVAO();
    }

    bind(renderstate) {
        let unifs = renderstate.unifs;
        // this.__gl.uniform4f(renderstate.unifs.wireColor.location, this.__wireColor.asArray());
        this.__gl.uniform4fv(renderstate.unifs.wireColor.location, this.__wireColor);
        this.__gl.lineWidth(this.__lineWidth);
    }

    bindGeom(renderstate, glGeom) {
        return glGeom.bindHardEdgesVAO(renderstate);
    }

    drawGeom(glGeom) {
        return glGeom.drawHardEdges();
    }

    draw(renderstate) {
        let gl = this.__gl;
        gl.enable(gl.BLEND);
        if (this.__renderHiddenLines) {
            gl.disable(gl.DEPTH_TEST);

            gl.blendEquation(gl.FUNC_ADD);
            gl.blendColor(this.__alphaBlend, this.__alphaBlend, this.__alphaBlend, this.__alphaBlend);
            gl.blendFunc(gl.CONSTANT_ALPHA, gl.ONE_MINUS_CONSTANT_ALPHA);
            gl.depthFunc(gl.GREATER);

            super.draw(renderstate);

            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);
        }

        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        super.draw(renderstate);

        gl.disable(gl.BLEND);
        gl.depthFunc(gl.LESS);
    }
};

export {
    GLHardEdgesPass
};
// export default GLHardEdgesPass;