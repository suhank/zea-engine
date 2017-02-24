import {
    GLPass
} from '../GLPass.js';
import {
    GLShader
} from '../GLShader.js';

import {
    GeomDataShader
} from '../Shaders/GeomDataShader.js';
import {
    Lines
} from '../../SceneTree/SceneTree.js';

class GLGeomDataPass extends GLPass {
    constructor(gl, glshader) {
        super(gl);

        if(!glshader)
            glshader = new GLShader(gl, new GeomDataShader());
        this.setExplicitShader(glshader);
    }

    filter(drawItem) {
        if(!super.filter(drawItem))
            return false;
        let geom = drawItem.geomItem.geom;
        if(geom instanceof Lines)
            return false;
        return (drawItem.geomItem.selectable);
    }

    bindDrawItem(renderstate, drawItem) {
        if (!super.bindDrawItem(renderstate, drawItem))
            return false;

        let unifs = renderstate['unifs'];
        if ('geomData' in unifs) {
            this.__gl.uniform4fv(unifs['geomData']['location'], drawItem.geomData);
        }

        return true;
    }

};

export {
    GLGeomDataPass
};