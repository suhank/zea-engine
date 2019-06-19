import { BaseGeom } from './BaseGeom.js';

class Points extends BaseGeom {
  constructor() {
    super();
  }

  loadBin(reader) {
    this.name = reader.loadStr();
    let numVerts = reader.loadUInt32();
    this.__boundingBox.set(reader.loadFloat32Vec3(), reader.loadFloat32Vec3());
    this.setNumVertices(numVerts);
    let vertices = this.vertices;

    if (numVerts < 256) {
      let bboxMat = this.__boundingBox.toMat4();
      let posAttr_8bit = reader.loadUInt8Array(numVerts*3);
      for (let i = 0; i<numVerts; i++) {
        let pos = new Vec3(
          posAttr_8bit[(i * 3) + 0] / 255.0, 
          posAttr_8bit[(i * 3) + 1] / 255.0, 
          posAttr_8bit[(i * 3) + 2] / 255.0
          );
        vertices.setValue(i, bboxMat.transformVec3(pos));
      }
    }
    else{
      let numClusters = reader.loadUInt32();
      let clusters = [];
      for (let i = 0; i < numClusters; i++) {
        let range = reader.loadUInt32Vec2();
        let p0 = reader.loadFloat32Vec3();
        let p1 = reader.loadFloat32Vec3();
        clusters.push({
          'range': range,
          'bbox': new Box3(p0, p1)
        });
      }
      let posAttr_8bit = reader.loadUInt8Array(numVerts*3);

      for (let i = 0; i < numClusters; i++) {
        let bboxMat = clusters[i]['bbox'].toMat4();
        for (let j = clusters[i]['range'].x; j < clusters[i]['range'].y; j++) {
          let pos = new Vec3(
            posAttr_8bit[(j * 3) + 0] / 255.0, 
            posAttr_8bit[(j * 3) + 1] / 255.0, 
            posAttr_8bit[(j * 3) + 2] / 255.0
            );
          vertices.setValue(j, bboxMat.transformVec3(pos));
        }
      }
    }
  }


  //////////////////////////////////////////
  // Persistence

  readBinary(reader, context) {
    super.loadBaseGeomBinary(reader);

    // this.computeVertexNormals();
    this.geomDataChanged.emit();
  }

};

export {
  Points
};
//export default Points;
