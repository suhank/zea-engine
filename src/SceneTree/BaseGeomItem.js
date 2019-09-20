import { Color } from '../Math/Color.js';
import { Signal } from '../Utilities';
import { TreeItem } from './TreeItem';
import { Material } from './Material';
import { ValueSetMode } from './Parameters';

/** Class representing a base geom item.
 * @extends TreeItem
 */
class BaseGeomItem extends TreeItem {
  /**
   * Create a base geom item.
   * @param {any} name - The name value.
   */
  constructor(name) {
    super(name);
    this.__cutAway = false;
    this.__cutAwayVector = false;
    this.__cutAwayDist = false;
    this.cutAwayChanged = new Signal();

    this.__layers = [];
  }

  /**
   * The addLayer method.
   * @param {any} name - The name param.
   */
  addLayer(name) {
    // TODO: need to find the layer and add this item to it.
    this.__layers.push(name);
  }

  /**
   * The getLayers method.
   * @return {any} - The return value.
   */
  getLayers() {
    return this.__layers;
  }

  // ////////////////////////////////////////
  // Cutaways

  /**
   * The isCutawayEnabled method.
   * @return {any} - The return value.
   */
  isCutawayEnabled() {
    return this.__cutAway;
  }

  /**
   * The setCutawayEnabled method.
   * @param {any} state - The state param.
   */
  setCutawayEnabled(state) {
    this.__cutAway = state;
    this.cutAwayChanged.emit();
  }

  /**
   * The getCutVector method.
   * @param {any} cutAwayVector - The cutAwayVector param.
   * @return {any} - The return value.
   */
  getCutVector(cutAwayVector) {
    return this.__cutAwayVector;
  }

  /**
   * The setCutVector method.
   * @param {*} cutAwayVector - The cutAwayVector param.
   */
  setCutVector(cutAwayVector) {
    this.__cutAwayVector = cutAwayVector;
    this.cutAwayChanged.emit();
  }

  /**
   * The getCutDist method.
   * @param {any} cutAwayDist - The cutAwayDist param.
   * @return {any} - The return value.
   */
  getCutDist(cutAwayDist) {
    return this.__cutAwayDist;
  }

  /**
   * The setCutDist method.
   * @param {any} cutAwayDist - The cutAwayDist param.
   */
  setCutDist(cutAwayDist) {
    this.__cutAwayDist = cutAwayDist;
    this.cutAwayChanged.emit();
  }

  // ///////////////////////////
  // Persistence

  /**
   * The readBinary method.
   * @param {any} reader - The reader param.
   * @param {any} context - The context param.
   */
  readBinary(reader, context) {
    super.readBinary(reader, context);

    if (context.version >= 4) {
      const materialName = reader.loadStr();
      // const materialName = 'Material' + this.__bodyDescId;

      const materialLibrary = context.assetItem.getMaterialLibrary();
      let material = materialLibrary.getMaterial(materialName, false);
      if (!material) {
        // console.warn("BaseGeomItem :'" + this.name + "' Material not found:" + materialName);
        // material = materialLibrary.getMaterial('DefaultMaterial');

        material = new Material(materialName, 'SimpleSurfaceShader');
        material
          .getParameter('BaseColor')
          .setValue(Color.random(0.25), ValueSetMode.DATA_LOAD);
        context.assetItem.getMaterialLibrary().addMaterial(material);
      }
      this.setMaterial(material, ValueSetMode.DATA_LOAD);

      this.__layers = reader.loadStrArray();
      if (this.__layers.length > 0) {
        // console.log("Layers:", this.__layers)
        for (const layer of this.__layers) context.addGeomToLayer(this, layer);
      }
    }
  }
}

export { BaseGeomItem };
