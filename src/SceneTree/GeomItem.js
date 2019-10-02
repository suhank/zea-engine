import { Vec2, Xfo } from '../Math';
import {
  ValueSetMode,
  Parameter,
  BooleanParameter,
  NumberParameter,
  ColorParameter,
  Vec2Parameter,
  XfoParameter,
} from './Parameters';

import { MaterialParameter } from './Parameters/MaterialParameter';
import { GeometryParameter } from './Parameters/GeometryParameter';
import { Signal } from '../Utilities';
import { sgFactory } from './SGFactory.js';

import {
  LOADFLAGS_SKIP_MATERIALS,
  LOADFLAGS_SKIP_GEOMETRIES,
} from './TreeItem.js';

import { BaseGeomItem } from './BaseGeomItem.js';

/** Class representing a geom item.
 * @extends BaseGeomItem
 */
class GeomItem extends BaseGeomItem {
  /**
   * Create a geom item.
   * @param {any} name - The name value.
   * @param {any} geom - The geom value.
   * @param {any} material - The material value.
   */
  constructor(name, geom = undefined, material = undefined) {
    super(name);

    this.__geomParam = this.insertParameter(
      new GeometryParameter('geometry'),
      0
    );
    this.__geomParam.valueChanged.connect(this._setBoundingBoxDirty.bind(this));
    this.__geomParam.boundingBoxDirtied.connect(
      this._setBoundingBoxDirty.bind(this)
    );
    this.__materialParam = this.insertParameter(
      new MaterialParameter('material'),
      1
    );

    this.__lightmapCoordOffset = new Vec2();
    this.__geomOffsetXfoParam = this.addParameter(
      new XfoParameter('geomOffsetXfo')
    );
    this.__geomXfoParam = this.addParameter(new XfoParameter('geomXfo'));

    this.__cleanGeomXfo = this.__cleanGeomXfo.bind(this);
    this.__globalXfoParam.valueChanged.connect(mode => {
      this.__geomXfoParam.setDirty(this.__cleanGeomXfo);
    });
    this.__geomOffsetXfoParam.valueChanged.connect(mode => {
      this.__geomXfoParam.setDirty(this.__cleanGeomXfo);
    });

    this.geomXfoChanged = this.__geomXfoParam.valueChanged;
    this.materialAssigned = this.__materialParam.valueChanged;
    this.geomAssigned = this.__geomParam.valueChanged;

    if (geom) this.setGeometry(geom, ValueSetMode.DATA_LOAD);
    if (material) this.setMaterial(material, ValueSetMode.DATA_LOAD);
  }

  /**
   * The __cleanGeomXfo method.
   * @return {any} - The return value.
   * @private
   */
  __cleanGeomXfo() {
    return this.__globalXfoParam
      .getValue()
      .multiply(this.__geomOffsetXfoParam.getValue());
  }

  /**
   * The destroy method.
   */
  destroy() {
    super.destroy();
  }

  /**
   * The clone method.
   * @param {any} flags - The flags param.
   * @return {any} - The return value.
   */
  clone(flags) {
    const cloned = new GeomItem();
    cloned.copyFrom(this, flags);
    return cloned;
  }

  /**
   * The copyFrom method.
   * @param {any} src - The src param.
   * @param {any} flags - The flags param.
   */
  copyFrom(src, flags) {
    super.copyFrom(src, flags);
    this.__lightmapCoordOffset = src.__lightmapCoordOffset;
    // Geom Xfo should be dirty after cloning.
    // Note: this might not be necessary. It should
    // always be dirty after cloning.
    this.__geomXfoParam.setDirty(this.__cleanGeomXfo);
  }

  // ////////////////////////////////////////
  // Geometry

  /**
   * The getGeometry method.
   * @return {any} - The return value.
   */
  getGeometry() {
    return this.__geomParam.getValue();
  }

  /**
   * The setGeometry method.
   * @param {any} geom - The geom param.
   * @param {any} mode - The mode param.
   */
  setGeometry(geom, mode) {
    this.__geomParam.setValue(geom, mode);
  }

  /**
   * The getGeom method.
   * @return {any} - The return value.
   */
  getGeom() {
    console.warn("getGeom is deprectated. Please use 'getGeometry'");
    return this.getGeometry();
  }

  /**
   * The setGeom method.
   * @param {any} geom - The geom param.
   * @return {any} - The return value.
   */
  setGeom(geom) {
    console.warn("setGeom is deprectated. Please use 'setGeometry'");
    return this.setGeometry(geom);
  }

  /**
   * The getMaterial method.
   * @return {any} - The return value.
   */
  getMaterial() {
    return this.__materialParam.getValue();
  }

  /**
   * The setMaterial method.
   * @param {any} material - The material param.
   * @param {any} mode - The mode param.
   */
  setMaterial(material, mode) {
    this.__materialParam.setValue(material, mode);
  }

  /**
   * The _cleanBoundingBox method.
   * @param {any} bbox - The bbox param.
   * @return {any} - The return value.
   * @private
   */
  _cleanBoundingBox(bbox) {
    bbox = super._cleanBoundingBox(bbox);
    const geom = this.getGeometry();
    if (geom) {
      bbox.addBox3(geom.boundingBox, this.getGeomXfo());
    }
    return bbox;
  }

  // ////////////////////////////////////////
  // Xfos

  /**
   * The getGeomOffsetXfo method.
   * @return {any} - The return value.
   */
  getGeomOffsetXfo() {
    return this.__geomOffsetXfoParam.getValue();
  }

  /**
   * The setGeomOffsetXfo method.
   * @param {any} xfo - The xfo param.
   */
  setGeomOffsetXfo(xfo) {
    this.__geomOffsetXfoParam.setValue(xfo);
  }

  /**
   * The getGeomXfo method.
   * @return {any} - The return value.
   */
  getGeomXfo() {
    return this.__geomXfoParam.getValue();
  }

  // ///////////////////////////
  // Lightmaps

  /**
   * The getLightmapName method.
   * @return {any} - The return value.
   */
  getLightmapName() {
    return this.__lightmapName;
  }

  /**
   * The getLightmapCoordsOffset method.
   * @return {any} - The return value.
   */
  getLightmapCoordsOffset() {
    return this.__lightmapCoordOffset;
  }

  /**
   * The root asset item pushes its offset to the geom items in the
   * tree. This offsets the light cooords for each geom.
   * @param {any} lightmapName - The lightmapName param.
   * @param {any} offset - The offset param.
   */
  applyAssetLightmapSettings(lightmapName, offset) {
    this.__lightmap = lightmapName;
    this.__lightmapCoordOffset.addInPlace(offset);
  }

  // ///////////////////////////
  // Debugging

  /**
   * The toJSON method.
   * @param {any} context - The context param.
   * @param {any} flags - The flags param.
   * @return {any} - The return value.
   */
  toJSON(context, flags) {
    const json = super.toJSON(context, flags);
    return json;
  }

  /**
   * The fromJSON method.
   * @param {any} json - The json param.
   * @param {any} context - The context param.
   */
  fromJSON(json, context) {
    super.fromJSON(json, context);
    context.numGeomItems++;
  }

  /**
   * The readBinary method.
   * @param {any} reader - The reader param.
   * @param {any} context - The context param.
   */
  readBinary(reader, context) {
    super.readBinary(reader, context);

    context.numGeomItems++;

    this.__lightmapName = context.assetItem.getName();

    const itemflags = reader.loadUInt8();
    const geomIndex = reader.loadUInt32();
    const geomLibrary = context.assetItem.getGeometryLibrary();
    const geom = geomLibrary.getGeom(geomIndex);
    if (geom) {
      this.setGeometry(geom, ValueSetMode.DATA_LOAD);
    } else {
      const onGeomLoaded = range => {
        if (geomIndex >= range[0] && geomIndex < range[1]) {
          const geom = geomLibrary.getGeom(geomIndex);
          if (geom) this.setGeometry(geom, ValueSetMode.DATA_LOAD);
          else console.warn('Geom not loaded:', this.getName());
          geomLibrary.rangeLoaded.disconnectId(connid);
        }
      };
      const connid = geomLibrary.rangeLoaded.connect(onGeomLoaded);
    }

    // this.setVisibility(j.visibility);
    // Note: to save space, some values are skipped if they are identity values
    const geomOffsetXfoFlag = 1 << 2;
    if (itemflags & geomOffsetXfoFlag) {
      this.__geomOffsetXfoParam.setValue(
        new Xfo(
          reader.loadFloat32Vec3(),
          reader.loadFloat32Quat(),
          reader.loadFloat32Vec3()
        )
      );
    }

    // BaseGeomItem now handles loading materials.
    if (context.version < 4) {
      const materialFlag = 1 << 3;
      if (itemflags & materialFlag) {
        const materialLibrary = context.assetItem.getMaterialLibrary();
        const materialName = reader.loadStr();
        let material = materialLibrary.getMaterial(materialName);
        if (!material) {
          console.warn(
            "Geom :'" + this.name + "' Material not found:" + materialName
          );
          material = materialLibrary.getMaterial('Default');
        }
        this.setMaterial(material, ValueSetMode.DATA_LOAD);
      } else {
        // Force nodes to have a material so we can see them.
        this.setMaterial(
          context.assetItem.getMaterialLibrary().getMaterial('Default'),
          ValueSetMode.DATA_LOAD
        );
      }
    }

    this.__lightmapCoordOffset = reader.loadFloat32Vec2();
  }

  /**
   * The toString method.
   * @return {any} - The return value.
   */
  toString() {
    return JSON.stringify(this.toJSON(), null, 2);
  }
}

sgFactory.registerClass('GeomItem', GeomItem);

export { GeomItem };
