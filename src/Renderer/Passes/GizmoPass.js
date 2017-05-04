import GLPass from '../GLPass.js';
import GLShader from '../GLShader.js';
import GizmoShader, { GizmoDataShader } from '../Shaders/GizmoShader.js';
import GLGeomDataPass from './GLGeomDataPass.js';


class GLGizmoDataPass extends GLGeomDataPass {
    constructor(gl) {
        let glshader = new GLShader(gl, new GizmoDataShader());
        super(gl, glshader);

        this.setExplicitShader(glshader);
    };

    filter(drawItem) {
        if(!super.filter(drawItem))
            return false;
        return true;
    };

    draw(renderstate) {

        this.__explicitShader.bind(renderstate);
        let unifs = renderstate['unifs'];
        this.__gl.uniform1i(unifs['isOrthographic']['location'], renderstate['isOrthographic']);
        this.__gl.uniform1f(unifs['fovY']['location'], renderstate['fovY']);
        this.__gl.uniform2fv(unifs['viewportFrustumSize']['location'], renderstate['viewportFrustumSize'].asArray());

        this.__gl.depthFunc(this.__gl.GREATER);

        super.draw(renderstate);

        this.__gl.depthFunc(this.__gl.LESS);

        super.draw(renderstate);
    };
};

class GizmoPass extends GLPass {
    constructor(gl, collector) {
        super(gl, collector);

        this__glshader = new GLShader(gl, new GizmoShader());
        this.setExplicitShader(glshader);

        this.__gizmoDataPass = new GLGizmoDataPass(this.__gl);
        this.__gizmos = [];
        this.__gizmos.push(undefined); // Skip using the 0 slot as an id of 0 can be a problem. 
    };

    drawDataPass(renderstate) {
        this.__gizmoDataPass.draw(renderstate);
    };

    addGizmo(gizmo) {
        let flags = 2;
        let id = this.__gizmos.length;
        gizmo.setGeomID(flags, id);

        for (let drawItem of gizmo.getDrawItems())
            this.addDrawItem(drawItem);

        this.__gizmoDataPass.addDrawItem(gizmo.getProxyItem());

        this.__gizmos.push(gizmo);
    };

    getGizmo(id) {
        return this.__gizmos[id];
    };

    bindDrawItem(renderstate, drawItem) {
        if (!super.bindDrawItem(renderstate, drawItem))
            return false;

        let unifs = renderstate['unifs'];
        if ('color' in unifs) {
            this.__gl.uniform4fv(unifs['color']['location'], drawItem.color.asArray());
        }

        return true;
    };

    draw(renderstate) {
        this.__explicitShader.bind(renderstate);
        let unifs = renderstate['unifs'];
        this.__gl.uniform1i(unifs['isOrthographic']['location'], renderstate['isOrthographic']);
        this.__gl.uniform1f(unifs['fovY']['location'], renderstate['fovY']);
        this.__gl.uniform2fv(unifs['viewportFrustumSize']['location'], renderstate['viewportFrustumSize'].asArray());

        // TODO: allow each gizmo to toggle this setting.
        this.__gl.uniform1i(unifs['fixedScreenSpaceSize']['location'], false);

        this.__gl.depthFunc(this.__gl.GREATER);

        super.draw(renderstate, false);

        this.__gl.depthFunc(this.__gl.LESS);

        super.draw(renderstate);
    };
};

export default GizmoPass;