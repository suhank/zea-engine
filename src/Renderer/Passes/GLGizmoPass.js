import {
    PassType
} from './GLPass.js';
import {
    GLOpaqueGeomsPass
} from './GLOpaqueGeomsPass.js';
import {
    GLRenderer
} from '../GLRenderer.js';
import {
    GizmoShader,
    GizmoDataShader
} from '../Shaders/GizmoShader.js';

class GLGizmoPass extends GLOpaqueGeomsPass {
    constructor() {
        super();
    }

    init(renderer, passIndex) {
        super.init(renderer, passIndex);
        this.__gizmoshader = new GizmoShader(gl);
        this.__gizmoDataShader = new GizmoDataShader(gl);
    };

    /////////////////////////////////////
    // Bind to Render Tree
    filterGeomItem(geomItem) {
        const shaderClass = geomItem.getMaterial().getShaderClass();
        if (shaderClass) {
            if (shaderClass.isGizmo())
                return true;
        }
        return false;
    }

    draw(renderstate) {
        
        // Clear the depth buffer so gizmos are always drawn over the top.
        const gl = this.__gl;
        gl.clear(gl.DEPTH_BUFFER_BIT);
        super.draw(renderstate);
    }

    drawGeomData(renderstate) {
        // Clear the depth buffer so gizmos are always drawn over the top.
        const gl = this.__gl;
        gl.clear(gl.DEPTH_BUFFER_BIT);

        super.drawGeomData(renderstate);
    }
};

// GLRenderer.registerPass(GLGizmoPass, PassType.OVERLAY);

export {
    GLGizmoPass
};
// export default GLGizmoPass;