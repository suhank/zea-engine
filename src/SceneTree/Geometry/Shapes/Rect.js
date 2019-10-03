import { Lines } from '../Lines.js';
import { NumberParameter } from '../../Parameters/NumberParameter.js';
import { sgFactory } from '../../SGFactory.js';

/** Class representing a rect.
 * @extends Lines
 */
class Rect extends Lines {
  /**
   * Create a circle.
   * @param {number} x - The x value.
   * @param {number} y - The y value.
   */
  constructor(x = 1.0, y = 1.0) {
    super();

    if (isNaN(x) || isNaN(y)) throw new Error('Invalid geom args');

    this.__x = this.addParameter(new NumberParameter('x', x));
    this.__x.valueChanged.connect(this.__resize.bind(this));
    this.__y = this.addParameter(new NumberParameter('y', y));
    this.__y.valueChanged.connect(this.__resize.bind(this));
    this.__rebuild();
  }

  /**
   * Getter for x.
   */
  get x() {
    return this.__x.getValue();
  }

  /**
   * Setter for x.
   * @param {number} val - The val param.
   */
  set x(val) {
    this.__x.setValue(val);
  }

  /**
   * Getter for y.
   */
  get y() {
    return this.__y.getValue();
  }

  /**
   * Setter for y.
   * @param {number} val - The val param.
   */
  set y(val) {
    this.__y.setValue(val);
  }

  /**
   * The setSize method.
   * @param {number} x - The x param.
   * @param {number} y - The y param.
   */
  setSize(x, y) {
    this.__x.setValue(x, -1);
    this.__y.setValue(y, -1);
    this.__resize();
  }

  /**
   * The __rebuild method.
   * @private
   */
  __rebuild() {
    this.setNumVertices(4);
    this.setNumSegments(4);
    this.setSegment(0, 0, 1);
    this.setSegment(1, 1, 2);
    this.setSegment(2, 2, 3);
    this.setSegment(3, 3, 0);
    this.__resize(-1);
    this.geomDataTopologyChanged.emit();
  }

  /**
   * The __resize method.
   * @param {any} mode - The mode param.
   * @private
   */
  __resize(mode) {
    const x = this.__x.getValue();
    const y = this.__y.getValue();

    this.getVertex(0).set(-0.5 * x, -0.5 * y, 0.0);
    this.getVertex(1).set(0.5 * x, -0.5 * y, 0.0);
    this.getVertex(2).set(0.5 * x, 0.5 * y, 0.0);
    this.getVertex(3).set(-0.5 * x, 0.5 * y, 0.0);
    this.setBoundingBoxDirty();
    if (mode != -1) this.geomDataChanged.emit();
  }

  /**
   * The toJSON method.
   * @return {any} - The return value.
   */
  toJSON() {
    const json = super.toJSON();
    json['x'] = this.__x;
    json['y'] = this.__y;
    return json;
  }
}
sgFactory.registerClass('Rect', Rect);

export { Rect };
// export default Rect;
