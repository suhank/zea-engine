import Signal from '../Math/Signal';
import Vec2 from '../Math/Vec2';
import Xfo from '../Math/Xfo';
import TreeItem from './TreeItem';
import sgFactory from './SGFactory.js';

import {
  LOADFLAGS_SKIP_MATERIALS,
  LOADFLAGS_SKIP_GEOMETRIES
} from './TreeItem.js';

class GeomItem extends TreeItem {
    constructor(name, geom = undefined, material = undefined) {
        super(name);

        this.geom = geom;
        this.material = material;
        this.__lightmap = "Default"; // the lightmap that the geom uses.
        this.__lightmapCoordsOffset = new Vec2();
        this.__geomOffsetXfo = new Xfo();
        this.__geomXfo = new Xfo();

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
        this.__geomXfo = this.__globalXfo.multiply(this.__geomOffsetXfo);
    }


    get material() {
        return this.__material;
    }

    set material(material) {
        this.__material = material;
    }

    updateBoundingBox() {
        this.__boundingBox.reset();
        if(this.geom){
            this.__boundingBox.addBox3(this.geom.boundingBox, this.getGeomXfo());
        }
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
        this.__geomXfo = this.__globalXfo.multiply(this.__geomOffsetXfo)
    }

    __updateGlobal() {
        super.__updateGlobal();
        this.__geomXfo = this.__globalXfo.multiply(this.__geomOffsetXfo)
    }

    getGeomXfo() {
        return this.__geomXfo;
    }

    /////////////////////////////
    // Lightmaps

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

    // The root asset item pushes its offset to the geom items in the
    // tree. This offsets the light cooords for each geom.
    applyAssetLightmapSettings(lightmapName, offset) {
        this.__lightmap = lightmapName;
        this.__lightmapCoordsOffset.addInPlace(offset);
    }

    /////////////////////////////
    // Debugging

    toJSON() {
        let json = super.toJSON();
        if (this.geom != undefined)
            json.geom = this.geom.toJSON();
        if (this.material != undefined)
            json.material = this.material.toJSON();
        return json
    }

    fromJSON(json, flags, materialLibrary, geomLibrary) {
        super.fromJSON(json, flags, materialLibrary, geomLibrary);

        if ((flags&LOADFLAGS_SKIP_GEOMETRIES) == 0 && 'geomIndex' in json){
            this.geom = geomLibrary.getGeom(json.geomIndex);
        }
        
        if ('geomOffsetXfo' in json){
            this.__geomOffsetXfo.fromJSON(json.geomOffsetXfo);
        }

        if ((flags&LOADFLAGS_SKIP_MATERIALS) == 0 && 'materialName' in json){
            this.material = materialLibrary.getMaterial(json.materialName);
            if(!this.material){
                console.warn("Geom :'" + this.name + "' Material not found:" + json.materialName);
                this.material = materialLibrary.getMaterial('DefaultMaterial');
            }
        }

        this.__lightmapCoordsOffset.fromJSON(json.lightmapCoordsOffset);
        this.__boundingBoxDirty = true;
        return json
    }
    
    readBinary(reader, flags, materialLibrary, geomLibrary){
        super.readBinary(reader, flags);

        let itemflags = reader.loadUInt8();
        this.geom = geomLibrary.getGeom(reader.loadUInt32());

        //this.setVisibility(j.visibility);
        // Note: to save space, some values are skipped if they are identity values 
        const geomOffsetXfoFlag = 1<<2;
        if (itemflags&geomOffsetXfoFlag){
            this.__geomOffsetXfo.tr = reader.loadFloat32Vec3();
            this.__geomOffsetXfo.ori = reader.loadFloat32Quat();
            this.__geomOffsetXfo.sc = reader.loadFloat32Vec3();
        }

        const materialFlag = 1<<3;
        if (itemflags&materialFlag){
            let materialName = reader.loadStr();
            this.material = materialLibrary.getMaterial(materialName);
            if(!this.material){
                console.warn("Geom :'" + this.name + "' Material not found:" + materialName);
                this.material = materialLibrary.getMaterial('DefaultMaterial');
            }
        }

        this.__lightmapCoordsOffset = reader.loadFloat32Vec2();
    }


    toString() {
        return JSON.stringify(this.toJSON(), null, 2)
    }
};

sgFactory.registerClass('GeomItem', GeomItem);

export default GeomItem;