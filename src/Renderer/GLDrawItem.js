import {
    Color,
    Signal
} from '../Math';
import '../SceneTree/GeomItem.js';

// This class abstracts the rendering of a collection of geometries to screen.
class GLDrawItem {
    constructor(gl, geomItem, glGeom, id, flags=null) {
        this.__gl = gl;
        this.__geomItem = geomItem;
        this.__glGeom = glGeom;
        this.__id = id;
        this.__flags = flags;

        this.__color = geomItem.color ? geomItem.color : new Color(1,0,0,1);
        this.__wireColor = [0.2, 0.2, 0.2, 1.0];
        this.__lightmapName = geomItem.getLightmap();

        let geomXfo = this.__geomItem.getGeomXfo();
        this.__mirrored = (geomXfo.sc.x < 0.0 || geomXfo.sc.y < 0.0 || geomXfo.sc.z < 0.0);
        this.__assignedPasses = [];

        this.transformChanged = new Signal();
        this.updated = new Signal();
        this.destructing = new Signal();

        this.__geomItem.globalXfoChanged.connect(() => {
            let geomXfo = this.__geomItem.getGeomXfo();
            this.__mirrored = (geomXfo.sc.x < 0.0 || geomXfo.sc.y < 0.0 || geomXfo.sc.z < 0.0);
            this.transformChanged.emit();
        }, this);
        this.__geomItem.visibilityChanged.connect(this.updated.emit, this.updated);

        this.__geomItem.selectionChanged.connect((val) => {
            if(val)
                this.highlight();
            else
                this.unhighlight();
        }, this);

        this.__glGeom.updated.connect(() => {
            this.updated.emit();
        }, this);

        this.__geomItem.destructing.connect(() => {
            // Note: it is possible for several draw items to reference the same
            // GLGeom, so we should be maintaining a ref count, and only destroying 
            // when the last ref is removed.
            this.destroy();
        }, this);
    }

    getGeomItem() {
        return this.__geomItem;
    }

    getGLGeom() {
        return this.__glGeom;
    }

    getVisible() {
        return this.__geomItem.getVisible();
    }

    isMirrored(){
        return this.__mirrored;
    }

    // TODO: this system isn't super nice.
    // Maybe all GeomItems should be assigned a color. (Currently only GizmoITem has a color)
    getColor() {
        return this.__color;
    }

    setColor(val) {
        this.__color = val;
    }

    getId(){
        return  this.__id;
    }

    getFlags(){
        return  this.__flags;
    }

    highlight() {
        this.__wireColor = [1.0, 1.0, 1.0, 1.0];
        // Note: not connnected
        //this.updated.emit();
    }

    unhighlight() {
        this.__wireColor = [0.2, 0.2, 0.2, 1.0];
        // Note: not connnected
        //this.updated.emit();
    }

    bind(renderstate) {
        if (!this.__geomItem.getVisible())
            return false;

        let gl = this.__gl;
        let unifs = renderstate.unifs;
        
        if ('transformIndex' in unifs) {
            gl.uniform1i(unifs.transformIndex.location, this.__id);
        }

        // We need to support multiple lightmaps, and so we need to switch lightmaps between objects. 
        if ('lightmaps' in renderstate && 'lightmap' in unifs) {
            if (renderstate.boundLightmap != this.__lightmapName) {
                let gllightmap = renderstate.lightmaps[this.__lightmapName];
                if (gllightmap && gllightmap.isLoaded()) {
                    gllightmap.bind(renderstate, unifs.lightmap.location);
                    gl.uniform2fv(unifs.lightmapSize.location, gllightmap.getSize());
                    renderstate.boundLightmap = this.__lightmapName;
                } else {
                    // TODO: disable lightmaps here. (should never need to happen)
                }
            }
        }

        return true;
    }


    destroy() {
        this.__geomItem.visibilityChanged.disconnectScope(this);
        this.__geomItem.globalXfoChanged.disconnectScope(this);
        this.__geomItem.selectionChanged.disconnectScope(this);
        this.__geomItem.destructing.disconnectScope(this);
        this.destructing.emit(this);
    }
};

export {
    GLDrawItem
};