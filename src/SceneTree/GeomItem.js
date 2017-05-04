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

        this.__lightmap = "Default"; // the lightmap that the geom uses.
        this.__lightmapCoordsOffset = new Vec2();
        this.__geomOffsetXfo = new Xfo();
        this.__geomXfo = new Xfo();

        this.__selectable = true;
        this.__selected = false;
        this.geomAssigned = new Signal();
        this.selectionChanged = new Signal();

        if(geom)
            this.setGeom(geom);
        if(material)
            this.setMaterial(material);
    }

    destroy() {
        super.destroy();
    }

    clone(){
        let cloned = new GeomItem();
        this.copyTo(cloned);
        return cloned;
    }
    copyTo(cloned){
        super.copyTo(cloned);
        cloned.setGeomOffsetXfo(this.__geomOffsetXfo);

        if (this.__geom) {
            cloned.setGeom(this.__geom);
        }
        else{
            this.geomAssigned.connect(()=>{
                cloned.setGeom(this.__geom);
            });
        }

        cloned.setMaterial(this.__material);

        cloned.__lightmap = this.__lightmap;
        cloned.__lightmapCoordsOffset = this.__lightmapCoordsOffset;
        cloned.__selectable = this.__selectable;
    }

    //////////////////////////////////////////
    // Geom

    getGeom() {
        return this.__geom;
    }

    setGeom(geom) {
        this.__geom = geom;
        if (this.__geom) {
            this.__geom.boundingBoxChanged.connect(() => {
                this.__boundingBoxDirty = true;
                this.boundingBoxChanged.emit();
            }, this);
            this.geomAssigned.emit();
        }
    }

    get globalXfo() {
        return super.globalXfo;
    }

    set globalXfo(xfo) {
        super.globalXfo = xfo;
        this.__geomXfo = this.__globalXfo.multiply(this.__geomOffsetXfo);
    }


    getMaterial() {
        return this.__material;
    }

    setMaterial(material) {
        this.__material = material;
    }

    updateBoundingBox() {
        this.__boundingBox.reset();
        if(this.__geom){
            this.__boundingBox.addBox3(this.__geom.boundingBox, this.getGeomXfo());
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
        if (this.__geom != undefined)
            json.geom = this.__geom.toJSON();
        if (this.material != undefined)
            json.material = this.material.toJSON();
        return json
    }

    fromJSON(json, flags, materialLibrary, geomLibrary) {
        super.fromJSON(json, flags, materialLibrary, geomLibrary);

        if ((flags&LOADFLAGS_SKIP_GEOMETRIES) == 0 && 'geomIndex' in json){
            this.setGeom(geomLibrary.getGeom(json.geomIndex));
        }
        
        if ('geomOffsetXfo' in json){
            this.__geomOffsetXfo.fromJSON(json.geomOffsetXfo);
        }

        if ((flags&LOADFLAGS_SKIP_MATERIALS) == 0 && 'materialName' in json){
            this.setMaterial(materialLibrary.getMaterial(json.materialName));
            if(!this.material){
                console.warn("Geom :'" + this.name + "' Material not found:" + json.materialName);
                this.setMaterial(materialLibrary.getMaterial('DefaultMaterial'));
            }
        }

        this.__lightmapCoordsOffset.fromJSON(json.lightmapCoordsOffset);
        this.__boundingBoxDirty = true;
        return json
    }
    
    readBinary(reader, flags, materialLibrary, geomLibrary){
        super.readBinary(reader, flags);

        let itemflags = reader.loadUInt8();
        let geomIndex = reader.loadUInt32();
        let geom = geomLibrary.getGeom(geomIndex);
        if(geom){
            this.setGeom(geom);
        }
        else{
            let onGeomLoaded = (range)=>{
                if(geomIndex >= range[0] && geomIndex < range[1]){
                    this.setGeom(geomLibrary.getGeom(geomIndex));
                    geomLibrary.loaded.disconnect(onGeomLoaded, this);
                }
            }
            geomLibrary.loaded.connect(onGeomLoaded, this);
        }

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
            let material = materialLibrary.getMaterial(materialName);
            if(!material){
                console.warn("Geom :'" + this.name + "' Material not found:" + materialName);
                material = materialLibrary.getMaterial('DefaultMaterial');
            }
            this.setMaterial(material);
        }

        this.__lightmapCoordsOffset = reader.loadFloat32Vec2();
    }


    toString() {
        return JSON.stringify(this.toJSON(), null, 2)
    }
};

sgFactory.registerClass('GeomItem', GeomItem);

export {
    GeomItem
};