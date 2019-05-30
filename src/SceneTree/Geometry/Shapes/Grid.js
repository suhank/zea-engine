import { Vec2 } from '../../../Math/Vec2';
import { Vec3 } from '../../../Math/Vec3';
import { Lines } from '../Lines.js';

class Grid extends Lines {
  constructor(x = 1.0, y = 1.0, xDivisions = 10, yDivisions = 10, skipCenterLines=false) {
    super();

    if(isNaN(x) || isNaN(y) || isNaN(xDivisions) || isNaN(yDivisions))
      throw("Invalid geom args");
    
    this.__x = x;
    this.__y = y;
    this.__xDivisions = xDivisions;
    this.__yDivisions = yDivisions;
    this.__skipCenterLines = skipCenterLines;
    this.__rebuild();
  }

  get sizeX() {
    return this.__x;
  }

  set sizeX(val) {
    this.__x = val;
    this.__resize();
  }

  get sizeY() {
    return this.__y;
  }

  set sizeY(val) {
    this.__y = val;
    this.__resize();
  }

  get divisionsX() {
    return this.__xDivisions;
  }

  set divisionsX(val) {
    this.__xDivisions = val;
    this.__rebuild();
  }

  get divisionsY() {
    return this.__yDivisions;
  }

  set divisionsY(val) {
    this.__yDivisions = val;
    this.__rebuild();
  }

  setSize(x, z) {
    this.__x = x;
    this.__y = z;
    this.__resize();
  }

  __rebuild() {
    const skipCenterLines = this.__skipCenterLines && (this.__xDivisions % 2) == 0 && (this.__yDivisions % 2) == 0;
    this.setNumVertices((this.__xDivisions + this.__yDivisions + 2 - (skipCenterLines ? 1 : 0)) * 2);
    this.setNumSegments(this.__xDivisions + this.__yDivisions + 2 - (skipCenterLines ? 1 : 0));
    let idx = 0;
    for (let i = 0; i <= this.__xDivisions; i++) {
      if(skipCenterLines && i == this.__xDivisions/2)
        continue;
      let v0 = (idx*2);
      let v1 = ((idx*2) + 1);
      this.setSegment(idx, v0, v1);
      idx++;
    }
    for (let i=0; i <= this.__yDivisions; i++) {
      if(skipCenterLines && i == this.__xDivisions/2)
        continue;
      let v0 = (idx*2);
      let v1 = ((idx*2) + 1);
      this.setSegment(idx, v0, v1);
      idx++;
    }
    this.__resize();
  }

  __resize() {
    const skipCenterLines = this.__skipCenterLines && (this.__xDivisions % 2) == 0 && (this.__yDivisions % 2) == 0;
    let idx = 0;
    for (let i = 0; i <= this.__xDivisions; i++) {
      if(skipCenterLines && i == this.__xDivisions/2)
        continue;
      let v0 = (idx*2);
      let v1 = ((idx*2) + 1);
      let x = ((i / (this.__xDivisions) - 0.5)) * this.__x;
      this.getVertex(v0).set(x, -0.5 * this.__y, 0.0);
      this.getVertex(v1).set(x,  0.5 * this.__y, 0.0);
      idx++;
    }
    for (let i = 0; i <= this.__yDivisions; i++) {
      if(skipCenterLines && i == this.__xDivisions/2)
        continue;
      let v0 = (idx*2);
      let v1 = ((idx*2) + 1);
      let y = ((i / (this.__yDivisions) - 0.5)) * this.__y;
      this.getVertex(v0).set(-0.5 * this.__x, y, 0.0);
      this.getVertex(v1).set( 0.5 * this.__x, y, 0.0);
      idx++;
    }

    this.setBoundingBoxDirty();
  }

  toJSON() {
    let json = super.toJSON();
    json['x'] = this.__x;
    json['z'] = this.__y;
    json['xDivisions'] = this.__xDivisions;
    json['yDivisions'] = this.__yDivisions;
    return json
  }
};

export {
  Grid
};
//export default Grid;