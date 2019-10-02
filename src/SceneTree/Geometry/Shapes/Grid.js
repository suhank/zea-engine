import { Vec2 } from '../../../Math/Vec2';
import { Vec3 } from '../../../Math/Vec3';
import { Lines } from '../Lines.js';

import { BooleanParameter, NumberParameter } from '../../Parameters';
import { sgFactory } from '../../SGFactory.js';

/** Class representing a grid.
 * @extends Lines
 */
class Grid extends Lines {
  /**
   * Create a grid.
   * @param {number} x - The x value.
   * @param {number} y - The y value.
   * @param {number} xDivisions - The xDivisions value.
   * @param {number} yDivisions - The yDivisions value.
   * @param {boolean} skipCenterLines - The skipCenterLines value.
   */
  constructor(
    x = 1.0,
    y = 1.0,
    xDivisions = 10,
    yDivisions = 10,
    skipCenterLines = false
  ) {
    super();

    if (isNaN(x) || isNaN(y) || isNaN(xDivisions) || isNaN(yDivisions))
      throw new Error('Invalid geom args');

    this.__xParam = this.addParameter(new NumberParameter('x', x));
    this.__yParam = this.addParameter(new NumberParameter('y', y));
    this.__xDivisionsParam = this.addParameter(
      new NumberParameter('xDivisions', xDivisions)
    );
    this.__yDivisionsParam = this.addParameter(
      new NumberParameter('yDivisions', yDivisions)
    );
    this.__skipCenterLinesParam = this.addParameter(
      new BooleanParameter('skipCenterLines', skipCenterLines)
    );

    this.__rebuild();
  }

  /**
   * Getter for sizeX.
   */
  get sizeX() {
    return this.__x;
  }

  /**
   * Setter for sizeX.
   * @param {number} val - The val param.
   */
  set sizeX(val) {
    this.__x = val;
    this.__resize();
  }

  /**
   * Getter for sizeY.
   */
  get sizeY() {
    return this.__y;
  }

  /**
   * Setter for sizeY.
   * @param {number} val - The val param.
   */
  set sizeY(val) {
    this.__y = val;
    this.__resize();
  }

  /**
   * Getter for divisionsX.
   */
  get divisionsX() {
    return this.__xDivisions;
  }

  /**
   * Setter for divisionsX.
   * @param {number} val - The val param.
   */
  set divisionsX(val) {
    this.__xDivisions = val;
    this.__rebuild();
  }

  /**
   * Getter for divisionsY.
   */
  get divisionsY() {
    return this.__yDivisions;
  }

  /**
   * Setter for divisionsY.
   * @param {number} val - The val param.
   */
  set divisionsY(val) {
    this.__yDivisions = val;
    this.__rebuild();
  }

  /**
   * The setSize method.
   * @param {number} x - The x param.
   * @param {number} z - The z param.
   */
  setSize(x, z) {
    this.__x = x;
    this.__y = z;
    this.__resize();
  }

  /**
   * The __rebuild method.
   * @private
   */
  __rebuild() {
    const xDivisions = this.__xDivisionsParam.getValue();
    const yDivisions = this.__yDivisionsParam.getValue();

    const skipCenterLines =
      this.__skipCenterLinesParam.getValue() &&
      xDivisions % 2 == 0 &&
      yDivisions % 2 == 0;
    this.setNumVertices(
      (xDivisions + yDivisions + 2 - (skipCenterLines ? 1 : 0)) * 2
    );
    this.setNumSegments(
      xDivisions + yDivisions + 2 - (skipCenterLines ? 1 : 0)
    );
    let idx = 0;
    for (let i = 0; i <= xDivisions; i++) {
      if (skipCenterLines && i == xDivisions / 2) continue;
      const v0 = idx * 2;
      const v1 = idx * 2 + 1;
      this.setSegment(idx, v0, v1);
      idx++;
    }
    for (let i = 0; i <= yDivisions; i++) {
      if (skipCenterLines && i == xDivisions / 2) continue;
      const v0 = idx * 2;
      const v1 = idx * 2 + 1;
      this.setSegment(idx, v0, v1);
      idx++;
    }
    this.__resize();
  }

  /**
   * The __resize method.
   * @private
   */
  __resize() {
    const xDivisions = this.__xDivisionsParam.getValue();
    const yDivisions = this.__yDivisionsParam.getValue();
    const xSize = this.__xParam.getValue();
    const ySize = this.__yParam.getValue();

    const skipCenterLines =
      this.__skipCenterLinesParam.getValue() &&
      xDivisions % 2 == 0 &&
      yDivisions % 2 == 0;
    let idx = 0;
    for (let i = 0; i <= xDivisions; i++) {
      if (skipCenterLines && i == xDivisions / 2) continue;
      const v0 = idx * 2;
      const v1 = idx * 2 + 1;
      const x = (i / xDivisions - 0.5) * xSize;
      this.getVertex(v0).set(x, -0.5 * ySize, 0.0);
      this.getVertex(v1).set(x, 0.5 * ySize, 0.0);
      idx++;
    }
    for (let i = 0; i <= yDivisions; i++) {
      if (skipCenterLines && i == xDivisions / 2) continue;
      const v0 = idx * 2;
      const v1 = idx * 2 + 1;
      const y = (i / yDivisions - 0.5) * ySize;
      this.getVertex(v0).set(-0.5 * xSize, y, 0.0);
      this.getVertex(v1).set(0.5 * xSize, y, 0.0);
      idx++;
    }

    this.setBoundingBoxDirty();
  }

  /**
   * The toJSON method.
   * @return {any} - The return value.
   */
  toJSON() {
    const json = super.toJSON();
    json['x'] = this.__x;
    json['z'] = this.__y;
    json['xDivisions'] = this.__xDivisions;
    json['yDivisions'] = this.__yDivisions;
    return json;
  }
}

sgFactory.registerClass('Grid', Grid);

export { Grid };
