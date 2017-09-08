import {
    Signal,
    Vec2,
    Xfo
} from '../Math';
import {
    TreeItem
} from './TreeItem';
import {
    sgFactory
} from './SGFactory.js';

import {
    LOADFLAGS_SKIP_MATERIALS,
    LOADFLAGS_SKIP_GEOMETRIES
} from './TreeItem.js';

class GeomSetItem extends TreeItem {
    constructor(name, geom = undefined, material = undefined) {
        super(name);

        this.__lightmapName = "Default"; // the lightmap that the geom uses.
        this.__lightmapCoordsOffset = new Vec2();

        this.__geoms = [];

        this.geomXfosChanged = new Signal();
        this.materialAssigned = new Signal();
        this.geomAssigned = new Signal();

        if (geom)
            this.setGeometry(geom);
        if (material)
            this.setMaterial(material);
    }

    destroy() {
        super.destroy();
    }

    clone() {
        let cloned = new GeomSetItem();
        this.copyTo(cloned);
        return cloned;
    }
    copyTo(cloned) {
        super.copyTo(cloned);
        cloned.setGeomOffsetXfo(this.__geomOffsetXfo);

        if (this.__geom) {
            cloned.setGeometry(this.__geom);
        } else {
            this.geomAssigned.connect(() => {
                cloned.setGeometry(this.__geom);
            });
        }

        cloned.setMaterial(this.__material);

        cloned.__lightmapName = this.__lightmapName;
        cloned.__lightmapCoordsOffset = this.__lightmapCoordsOffset;
    }

    //////////////////////////////////////////
    // Geometry

    getGeometry(index) {
        return this.__geoms[index];
    }

    addGeometry(geom, geomOffsetXfo) {
        let geomXfo = new Xfo();
        geom.addRef(this);
        geom.boundingBoxDirtied.connect(this.setBoundingBoxDirty.bind(this));
        this.__geoms.push({geom, geomOffsetXfo, geomXfo});
        this.geomAssigned.emit(geom);
    }

    getMaterial() {
        return this.__material;
    }

    setMaterial(material) {
        if(this.__material !== material){
            if(this.__material){
                this.__material.removeRef(this);
            }
            this.__material = material;
            if(this.__material){
                this.__material.addRef(this);
            }
            this.materialAssigned.emit(this.__material);
        }
    }

    updateBoundingBox() {
        this.__boundingBox.reset();
        this.__geoms.forEach((subgeom)=>{
            this.__boundingBox.addBox3(subgeom.geom.boundingBox, subgeom.geomXfo);
        });
        this.__boundingBoxDirty = false;
    }

    //////////////////////////////////////////
    // Xfos
    
    setGlobalXfo(xfo) {
        super.setGlobalXfo(xfo);
        this.__geoms.forEach((subgeom)=>{
            subgeom.geomXfo = this.__globalXfo.multiply(subgeom.geomOffsetXfo);
        });
        this.geomXfosChanged.emit(this.__geomXfo);
    }

    getGeomOffsetXfo(index) {
        return this.__geoms[index].geomOffsetXfo;
    }

    setGeomOffsetXfo(index, xfo) {
        this.__geoms[index].geomOffsetXfo = xfo;
        this.__geoms[index].geomXfo = this.__globalXfo.multiply(xfo);
        this.geomXfosChanged.emit(index);
    }

    updateGlobalXfo() {
        super.updateGlobalXfo();
        this.__geoms.forEach((subgeom)=>{
            subgeom.geomXfo = this.__globalXfo.multiply(subgeom.geomOffsetXfo);
        });
        this.geomXfosChanged.emit();
    }

    getGeomXfo(index) {
        return this.__geoms[index].geomXfo;
    }

    //////////////////////////////////////////
    // Selection

    // get selectable() {
    //     return this.__selectable;
    // }

    // set selectable(sel) {
    //     this.__selectable = sel;
    // }

    // get selected() {
    //     return this.__selected;
    // }

    // set selected(sel) {
    //     if (this.__selected != sel) {
    //         this.__selected = sel;
    //         this.selectionChanged.emit(this.__selected);
    //     }
    // }


    /////////////////////////////
    // Lightmaps

    getLightmapName() {
        return this.__lightmapName;
    }

    getLightmapCoordsOffset() {
        return this.__lightmapCoordsOffset;
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

    fromJSON(json, flags, asset) {
        super.fromJSON(json, flags, asset);

        if ((flags & LOADFLAGS_SKIP_GEOMETRIES) == 0 && 'geomIndex' in json) {
            let geomLibrary = asset.getGeometryLibrary();
            this.geom = geomLibrary.getGeom(json.geomIndex);
        }

        if ('geomOffsetXfo' in json) {
            this.__geomOffsetXfo.fromJSON(json.geomOffsetXfo);
        }


        if ((flags & LOADFLAGS_SKIP_MATERIALS) == 0 && 'materialName' in json) {
            let materialLibrary = asset.getMaterialLibrary();
            this.material = materialLibrary.getMaterial(json.materialName);
            if (!this.material) {
                console.warn("Geom :'" + this.name + "' Material not found:" + json.materialName);
                this.setMaterial(materialLibrary.getMaterial('DefaultMaterial'));
            }
        }

        this.__lightmapCoordsOffset.fromJSON(json.lightmapCoordsOffset);
        this.__boundingBoxDirty = true;
        return json
    }

    readBinary(reader, flags, asset) {
        super.readBinary(reader, flags, asset);

        this.__lightmapName = asset.getName();

        let itemflags = reader.loadUInt8();
        let geomIndex = reader.loadUInt32();
        let geomLibrary = asset.getGeometryLibrary();
        let geom = geomLibrary.getGeom(geomIndex);
        if (geom) {
            this.setGeometry(geom);
        } else {
            let onGeomLoaded = (range) => {
                if (geomIndex >= range[0] && geomIndex < range[1]) {
                    this.setGeometry(geomLibrary.getGeom(geomIndex));
                    geomLibrary.rangeLoaded.disconnectID(connid);
                }
            }
            let connid = geomLibrary.rangeLoaded.connect(onGeomLoaded);
        }

        //this.setVisibility(j.visibility);
        // Note: to save space, some values are skipped if they are identity values 
        const geomOffsetXfoFlag = 1 << 2;
        if (itemflags & geomOffsetXfoFlag) {
            this.__geomOffsetXfo.tr = reader.loadFloat32Vec3();
            this.__geomOffsetXfo.ori = reader.loadFloat32Quat();
            this.__geomOffsetXfo.sc = reader.loadFloat32Vec3();
        }

        const materialFlag = 1 << 3;
        if (itemflags & materialFlag) {
            let materialLibrary = asset.getMaterialLibrary();
            let materialName = reader.loadStr();
            let material = materialLibrary.getMaterial(materialName);
            if (!material) {
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

sgFactory.registerClass('GeomSetItem', GeomSetItem);

export {
    GeomSetItem
};