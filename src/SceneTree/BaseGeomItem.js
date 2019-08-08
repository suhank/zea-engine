
import {
  Signal
} from '../Utilities';
import {
  TreeItem
} from './TreeItem';

class BaseGeomItem extends TreeItem {
  constructor(name) {
    super(name);
    this.__cutAway = false;
    this.__cutAwayVector = false;
    this.__cutAwayDist = false;
    this.cutAwayChanged = new Signal();
  }


  //////////////////////////////////////////
  // Cutaways

  isCutawayEnabled() {
    return this.__cutAway;
  }

  setCutawayEnabled(state) {
    this.__cutAway = state;
    this.cutAwayChanged.emit();
  }

  getCutVector(cutAwayVector) {
    return this.__cutAwayVector;
  }

  setCutVector(cutAwayVector) {
    this.__cutAwayVector = cutAwayVector;
    this.cutAwayChanged.emit();
  }
  
  getCutDist(cutAwayDist) {
    return this.__cutAwayDist;
  }

  setCutDist(cutAwayDist) {
    this.__cutAwayDist = cutAwayDist;
    this.cutAwayChanged.emit();
  }


  /////////////////////////////
  // Persistence

  readBinary(reader, context) {
    super.readBinary(reader, context);

    if(context.version >= 4) {
      const materialName = reader.loadStr();
      // const materialName = 'Material' + this.__bodyDescId;

      const materialLibrary = context.assetItem.getMaterialLibrary();
      let material = materialLibrary.getMaterial(materialName, false);
      if (!material) {
        // console.warn("BaseGeomItem :'" + this.name + "' Material not found:" + materialName);
        // material = materialLibrary.getMaterial('DefaultMaterial');

        material = new Visualive.Material(materialName, 'SimpleSurfaceShader');
        material.getParameter('BaseColor').setValue(Visualive.Color.random(0.25), Visualive.ValueSetMode.DATA_LOAD);
        context.assetItem.getMaterialLibrary().addMaterial(material);
      }
      this.setMaterial(material, Visualive.ValueSetMode.DATA_LOAD);

      
      this.__layers = reader.loadStrArray();
      // console.log("Layers:", this.__layers)
      for(let layer of this.__layers)
        context.addGeomToLayer(this, layer);
    }
  }
};

export {
    BaseGeomItem
};