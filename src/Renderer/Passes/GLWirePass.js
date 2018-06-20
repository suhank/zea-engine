import { WireShader } from '../Shaders/WireShader.js';
import { GLPass } from '../GLPass.js';
import { GLShader } from '../GLShader.js';
import { Mesh } from '../../SceneTree/Geometry/Mesh';

class GLWirePass extends GLPass {
    constructor(gl) {
        super(gl);

        const glshader = new WireShader(gl);
        this.setExplicitShader(glshader);

        this.lineWidth = 1.0;
    };

    filter(drawItem) {
        if(!super.filter(drawItem))
            return false;
        const geom = drawItem.geomItem.getGeom();
        return (geom instanceof Mesh);
    };

    addDrawItem(drawItem) {
        super.addDrawItem(drawItem);

        drawItem.glGeom.generateWireframesVAO();
    };

    bind(renderstate) {
        const unifs = renderstate['unifs'];
        this.__gl.uniform4fv(unifs['wireColor']['location'], [0.1, 0.1, 0.1, 0.7]);

        this.__gl.lineWidth(this.lineWidth);
    };

    bindGeom(renderstate, glGeom) {
        return glGeom.bindWireframeVAO(renderstate);
    };

    drawGeom(glGeom) {
        return glGeom.drawWireframe();
    };

    draw(renderstate) {
        this.__gl.enable(this.__gl.CULL_FACE);
        this.__gl.enable(this.__gl.DEPTH_TEST);
        this.__gl.depthFunc(this.__gl.LEQUAL);
        this.__gl.depthMask(true);

        // Now draw all the geometries as normal....
        super.draw(renderstate);
    };
};


export {
    GLWirePass
};
// export default GLWirePass;