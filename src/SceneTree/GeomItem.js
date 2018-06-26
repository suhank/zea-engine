import {
    Vec2,
    Xfo
} from '../Math';
import {
    MaterialParameter
} from './Parameters/MaterialParameter';
import {
    GeometryParameter
} from './Parameters/GeometryParameter';
import {
    Signal
} from '../Utilities';
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

class GeomItem extends TreeItem {
    constructor(name, geom = undefined, material = undefined) {
        super(name);

        this.__materialParam = this.addParameter('material', new MaterialParameter());
        this.__geomParam = this.addParameter('geometry', new GeometryParameter());
        this.__geomParam.valueChanged.connect(this._setBoundingBoxDirty.bind(this));
        this.__geomParam.boundingBoxDirtied.connect(this._setBoundingBoxDirty.bind(this));

        this.__cutawayParam = this.addParameter('CutawayEnabled', false);
        this.__lightmapCoordsParam = this.addParameter('lightmapCoords', new Vec2());
        this.__geomOffsetXfoParam = this.addParameter('geomOffsetXfo', new Xfo());
        this.__geomXfoParam = this.addParameter('geomXfo', new Xfo());

        let _cleanGeomXfo = (xfo)=>{
            return this.getGlobalXfo().multiply(this.__geomOffsetXfoParam.getValue());
        }
        this.__globalXfoParam.valueChanged.connect((changeType)=>{
            this.__geomXfoParam.setDirty(_cleanGeomXfo);
        });
        this.__geomOffsetXfoParam.valueChanged.connect((changeType)=>{
            this.__geomXfoParam.setDirty(_cleanGeomXfo);
        });

        this.geomXfoChanged = this.__geomXfoParam.valueChanged;
        // this.materialAssigned = new Signal();
        // this.geomAssigned = new Signal();
        this.materialAssigned = this.__materialParam.valueChanged;
        this.geomAssigned = this.__geomParam.valueChanged;



        if (geom)
            this.setGeometry(geom);
        if (material)
            this.setMaterial(material);
    }

    destroy() {
        super.destroy();
    }

    clone() {
        let cloned = new GeomItem();
        this.copyTo(cloned);
        return cloned;
    }

    copyTo(cloned) {
        super.copyTo(cloned);

        // if (this.__geom) {
        //     cloned.setGeometry(this.__geom);
        // } else {
        //     this.geomAssigned.connect(() => {
        //         cloned.setGeometry(this.__geom);
        //     });
        // }

        // cloned.setMaterial(this.__material);// clone?

        cloned.__lightmapName = this.__lightmapName;
    }

    //////////////////////////////////////////
    // Geometry

    getGeometry() {
        return this.__geomParam.getValue();
    }

    setGeometry(geom, mode) {
        this.__geomParam.setValue(geom, mode);
        // this.geomAssigned.emit(this.__value);
    }

    getGeom() {
        console.warn(("getGeom is deprectated. Please use 'getGeometry'"));
        return this.getGeometry();
    }

    setGeom(geom) {
        console.warn(("setGeom is deprectated. Please use 'setGeometry'"));
        return this.setGeometry(geom);
    }


    getMaterial() {
        return this.__materialParam.getValue();;
    }

    setMaterial(material, mode) {
        this.__materialParam.setValue(material, mode);
    }

    _cleanBoundingBox(bbox) {
        bbox = super._cleanBoundingBox(bbox);
        if (this.__geom) {
            bbox.addBox3(this.__geom.boundingBox, this.getGeomXfo());
        }
        return bbox;
    }

    //////////////////////////////////////////
    // Xfos
    
    getGeomOffsetXfo() {
        return this.__geomOffsetXfoParam.getValue();
    }

    setGeomOffsetXfo(xfo) {
        this.__geomOffsetXfoParam.setValue(xfo);
    }

    getGeomXfo() {
        return this.__geomXfoParam.getValue();
    }


    /////////////////////////////
    // Lightmaps

    getLightmapName() {
        return this.__lightmapName;
    }

    getLightmapCoordsOffset() {
        return this.__lightmapCoordsParam.getValue();
    }

    // The root asset item pushes its offset to the geom items in the
    // tree. This offsets the light cooords for each geom.
    applyAssetLightmapSettings(lightmapName, offset) {
        this.__lightmap = lightmapName;
        let coords = this.__lightmapCoordsParam.getValue();
        coords.addInPlace(offset);
        this.__lightmapCoordsParam.setValue(coords);
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

    fromJSON(json, context) {
        super.fromJSON(json, context);

        if ((flags & LOADFLAGS_SKIP_GEOMETRIES) == 0 && 'geomIndex' in json) {
            let geomLibrary = context.assetItem.getGeometryLibrary();
            this.geom = geomLibrary.getGeom(json.geomIndex);
        }

        if ('geomOffsetXfo' in json) {
            let xfo = new Xfo();
            xfo.fromJSON(json.geomOffsetXfo);
            this.__geomOffsetXfoParam.setValue(xfo);
        }


        if ((flags & LOADFLAGS_SKIP_MATERIALS) == 0 && 'materialName' in json) {
            let materialLibrary = context.assetItem.getMaterialLibrary();
            this.material = materialLibrary.getMaterial(json.materialName);
            if (!this.material) {
                console.warn("Geom :'" + this.name + "' Material not found:" + json.materialName);
                this.setMaterial(materialLibrary.getMaterial('DefaultMaterial'));
            }
        }

        const coords = new Vec2();
        coords.fromJSON(json.lightmapCoordsOffset);
        this.__lightmapCoordsParam.setValue(coords);
        this._setBoundingBoxDirty();
        return json
    }

    readBinary(reader, context) {
        super.readBinary(reader, context);

        this.__lightmapName = context.assetItem.getName();

        const itemflags = reader.loadUInt8();
        const geomIndex = reader.loadUInt32();
        const geomLibrary = context.assetItem.getGeometryLibrary();
        const geom = geomLibrary.getGeom(geomIndex);
        if (geom) {
            this.setGeometry(geom);
        } else {
            const onGeomLoaded = (range) => {
                if (geomIndex >= range[0] && geomIndex < range[1]) {
                    this.setGeometry(geomLibrary.getGeom(geomIndex));
                    geomLibrary.rangeLoaded.disconnectID(connid);
                }
            }
            const connid = geomLibrary.rangeLoaded.connect(onGeomLoaded);
        }

        //this.setVisibility(j.visibility);
        // Note: to save space, some values are skipped if they are identity values 
        const geomOffsetXfoFlag = 1 << 2;
        if (itemflags & geomOffsetXfoFlag) {
            this.__geomOffsetXfoParam.setValue(new Xfo( reader.loadFloat32Vec3(),
                                                        reader.loadFloat32Quat(),
                                                        reader.loadFloat32Vec3()))
        }

        const materialFlag = 1 << 3;
        if (itemflags & materialFlag) {
            const materialLibrary = context.assetItem.getMaterialLibrary();
            const materialName = reader.loadStr();
            let material = materialLibrary.getMaterial(materialName);
            if (!material) {
                console.warn("Geom :'" + this.name + "' Material not found:" + materialName);
                material = materialLibrary.getMaterial('Default');
            }
            this.setMaterial(material);
        }
        else {
            // Force nodes to have a material so we can see them.
            this.setMaterial(context.assetItem.getMaterialLibrary().getMaterial('Default'));
        }

        this.__lightmapCoordsParam.setValue(reader.loadFloat32Vec2());
    }


    toString() {
        return JSON.stringify(this.toJSON(), null, 2)
    }


};

sgFactory.registerClass('GeomItem', GeomItem);

export {
    GeomItem
};