import {
    GLPass,
    PassType
} from './GLPass.js';
import {
    GLRenderer
} from '../GLRenderer.js';
import {
    GizmoShader,
    GizmoDataShader
} from '../Shaders/GizmoShader.js';

class GLGizmoPass extends GLPass {
    constructor() {
        super();
    }

    init(gl, collector, passIndex) {
        super.init(gl, collector, passIndex);
        this.__gizmoshader = new GizmoShader(gl);
        this.__gizmoDataShader = new GizmoDataShader(gl);
    };

    /////////////////////////////////////
    // Bind to Render Tree
    filterRenderTree() {
        const allglshaderMaterials = this.__collector.getGLShaderMaterials();
        this.__glshadermaterials = [];
        for (let glshaderkey in allglshaderMaterials) {
            const glshaderMaterials = allglshaderMaterials[glshaderkey];
            if (!glshaderMaterials.getGLShader().isGizmo())
                continue;
            this.__glshadermaterials.push(glshaderMaterials);
        }
    }

    draw(renderstate) {
        // this.__gizmoshader.bind(renderstate);
        // const unifs = renderstate.unifs;
        // this.__gl.uniform1i(unifs.isOrthographic.location, renderstate.isOrthographic);
        // this.__gl.uniform1f(unifs.fovY.location, renderstate.fovY);
        // this.__gl.uniform2fv(unifs.viewportFrustumSize.location, renderstate.viewportFrustumSize.asArray());

        // // TODO: allow each gizmo to toggle this setting.
        // this.__gl.uniform1i(unifs.fixedScreenSpaceSize.location, false);

        // this.__gl.depthFunc(this.__gl.GREATER);

        // super.draw(renderstate, false);

        // this.__gl.depthFunc(this.__gl.LESS);

        // super.draw(renderstate);

        
        // Clear the depth buffer so gizmos are always drawn over the top.
        const gl = this.__gl;
        gl.clear(gl.DEPTH_BUFFER_BIT);
        super.draw(renderstate);
    }

    getGeomItemAndDist(geomData) {

        let itemId, dist;
        const gl = this.__gl;
        if (gl.floatGeomBuffer) {
            itemId = Math.round(geomData[1]);
            dist = geomData[3];
        } else {
            itemId = geomData[0] + (geomData[1] << 8);
            dist = Math.decode16BitFloatFrom2xUInt8([geomData[2], geomData[3]]);
        }

        const drawItem = this.__collector.getGeomItem(itemId);
        if (drawItem) {
            return { 
                geomItem: drawItem.getGeomItem(),
                dist
            } 
        }
    }

    drawGeomData(renderstate) {
        // Clear the depth buffer so gizmos are always drawn over the top.
        const gl = this.__gl;
        gl.clear(gl.DEPTH_BUFFER_BIT);

        // gl.disable(gl.BLEND);
        // gl.disable(gl.CULL_FACE);
        // gl.enable(gl.DEPTH_TEST);
        // gl.depthFunc(gl.LESS);
        // gl.depthMask(true);

        if (!this.__gizmoDataShader.bind(renderstate))
            return false;

        if (!this.__collector.bind(renderstate))
            return false;

        {
            let unif = renderstate.unifs.floatGeomBuffer;
            if (unif) {
                gl.uniform1i(unif.location, gl.floatGeomBuffer ? 1 : 0);
            }
        } {
            let unif = renderstate.unifs.passId;
            if (unif) {
                gl.uniform1i(unif.location, this.__passIndex);
            }
        }

        super.drawGeomData(renderstate);
    }
};

// GLRenderer.registerPass(GLGizmoPass, PassType.OVERLAY);

export {
    GLGizmoPass
};
// export default GLGizmoPass;