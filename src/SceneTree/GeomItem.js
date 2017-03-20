import {
    Vec2,
    Color,
    Mat4,
    Xfo,
    Signal
} from '../Math';
import {
    TreeItem,
    LOADFLAGS_SKIP_MATERIALS,
    LOADFLAGS_SKIP_GEOMETRIES
} from './TreeItem.js';
import {
    Mesh
} from './Geometry/Mesh.js';
import {
    sgFactory
} from './SGFactory.js';

class GeomItem extends TreeItem {
    constructor(name, geom = undefined, material = undefined) {
        super(name);

        this.geom = geom;
        this.material = material;
        this.__lightmap = "Default"; // the lightmap that the geom uses.
        this.__lightmapCoordsOffset = new Vec2();
        this.__geomOffsetXfo = new Xfo();
        this.__geomMatrix = new Mat4();

        this.__selectable = true;
        this.__selected = false;
        this.selectionChanged = new Signal();
    }

    destroy() {
        super.destroy();
    }

    get geom() {
        return this.__geom;
    }

    set geom(geom) {
        this.__geom = geom;
        if (this.__geom) {
            this.__geom.boundingBoxChanged.connect(() => {
                this.__boundingBoxDirty = true;
                this.boundingBoxChanged.emit();
            }, this);
        }
    }

    get globalXfo() {
        return super.globalXfo;
    }

    set globalXfo(xfo) {
        super.globalXfo = xfo;
        this.__geomMatrix = this.__globalXfo.multiply(this.__geomOffsetXfo).toMat4();
    }


    get material() {
        return this.__material;
    }

    set material(material) {
        this.__material = material;
    }

    updateBoundingBox() {
        let geomBox = this.geom.boundingBox.clone();
        this.__boundingBox.reset();
        this.__boundingBox.addBox3(geomBox, this.getGeomMatrix());
        this.__boundingBoxDirty = false;
    }

    get selectable() {
        return this.__selectable;
    }

    set selectable(sel) {
        this.__selectable = sel;
    }

    get selected() {
        return this.__selected;
    }

    set selected(sel) {
        if (this.__selected != sel) {
            this.__selected = sel;
            this.selectionChanged.emit(this.__selected);
        }
    }

    getGeomOffsetXfo() {
        return this.__geomOffsetXfo;
    }

    setGeomOffsetXfo(xfo) {
        this.__geomOffsetXfo = xfo;
    }

    __updateGlobal() {
        super.__updateGlobal();
        this.__geomMatrix = this.__globalXfo.multiply(this.__geomOffsetXfo).toMat4();
    }

    getGeomMatrix() {
        return this.__geomMatrix;
    }

    /////////////////////////////
    // Irradiance Maps

    getLightmap() {
        return this.__lightmap;
    }

    setLightmap(lightmap) {
        this.__lightmap = lightmap;
    }

    getLightmapCoordsOffset() {
        return this.__lightmapCoordsOffset;
    }

    setLightmapCoordsOffset(offset) {
        this.__lightmapCoordsOffset = offset;
    }

    getlightmapCoords(texelSize, generateClusters) {
        if (this.__geom instanceof Mesh) {
            return this.__geom.getlightmapCoords(texelSize, generateClusters);
        } else {
            console.warn("Geom type not light-mappable:" + this.__geom.constructor.name);
        }
    }

    /////////////////////////////
    // Debugging

    toJSON() {
        let json = super.toJSON();
        if (this.geom != undefined)
            json['geom'] = this.geom.toJSON();
        if (this.material != undefined)
            json['material'] = this.material.toJSON();
        return json
    }

    fromJSON(json, flags, materialLibrary, geomLibrary) {
        super.fromJSON(json, flags, materialLibrary, geomLibrary);

        if ((flags&LOADFLAGS_SKIP_GEOMETRIES) == 0 && 'geomIndex' in json){
            this.geom = geomLibrary.getGeom(json.geomIndex);
        }
        
        if ('geomOffsetXfo' in json){
            this.__geomOffsetXfo.fromJSON(json['geomOffsetXfo']);
        }

        if ((flags&LOADFLAGS_SKIP_MATERIALS) == 0 && 'materialName' in json){
            this.material = materialLibrary.getMaterial(json['materialName']);
            if(!this.material){
                console.warn("Geom :'" + this.name + "' Material not found:" + json['materialName']);
                this.material = materialLibrary.getMaterial('DefaultMaterial');
            }
        }

        this.__lightmapCoordsOffset.fromJSON(json['lightmapCoordsOffset']);
        this.__boundingBoxDirty = true;
        return json
    }

    toString() {
        return JSON.stringify(this.toJSON(), null, 2)
    }
};

sgFactory.registerClass('GeomItem', GeomItem);

export {
    GeomItem
};