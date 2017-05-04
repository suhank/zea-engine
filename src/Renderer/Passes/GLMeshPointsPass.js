import Mesh from '../../SceneTree/Geometry/Mesh';
import PointsShader from '../Shaders/PointsShader.js';
import GLPass from '../GLPass.js';
import GLShader from '../GLShader.js';

class GLMeshPointsPass extends GLPass {
    constructor(gl, collector) {
        super(gl, collector);

        let glshader = new GLShader(gl, new PointsShader());
        this.setExplicitShader(glshader);

        this.pointSize = 3.0;
        this.alphaBlend = 0.2;
        this.wireColor = [0.2, 0.8, 0.6, 1.0];
    }

    filter(drawItem) {
        if(!super.filter(drawItem))
            return false;
        let geom = drawItem.geomItem.geom;
        return (geom instanceof Mesh);
    }


    bind(renderstate) {
        let unifs = renderstate['unifs'];
        this.__gl.uniform4fv(unifs['pointColor']['location'], this.wireColor);
        this.__gl.uniform1f(unifs['pointSize']['location'], this.pointSize);
    }

    drawGeom(glGeom) {
        return glGeom.drawPoints();
    }

    draw(renderstate) {

        this.__gl.disable(this.__gl.DEPTH_TEST);

        this.__gl.enable(this.__gl.BLEND);
        this.__gl.blendEquation(this.__gl.FUNC_ADD);
        this.__gl.blendColor(this.alphaBlend, this.alphaBlend, this.alphaBlend, this.alphaBlend);
        this.__gl.blendFunc(this.__gl.CONSTANT_ALPHA, this.__gl.ONE_MINUS_CONSTANT_ALPHA);
        this.__gl.depthFunc(this.__gl.GREATER);

        super.draw(renderstate);

        this.__gl.enable(this.__gl.DEPTH_TEST);
        this.__gl.disable(this.__gl.BLEND);
        this.__gl.depthFunc(this.__gl.LEQUAL);

        super.draw(renderstate);

        this.__gl.depthFunc(this.__gl.LESS);
    }
};

export default GLMeshPointsPass;