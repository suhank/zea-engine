import { BaseGeom } from './BaseGeom'
import { Registry } from '../../Registry'
import { BinReader } from '../BinReader'
import { Vec3 } from '../../Math/Vec3'
import { Box3 } from '../../Math/Box3'
import { Vec3Attribute } from './Vec3Attribute'
import { AssetLoadContext } from '../AssetLoadContext'

/**
 * Class representing a point primitive drawing type, every vertex specified is a point.
 *
 * ```
 * const points = new Points()
 * ```
 *
 * * **Events**
 * * **boundingBoxChanged:** Triggered when the bounding box changes.
 *
 * @extends BaseGeom
 */
class Points extends BaseGeom {
  /**
   * Create points.
   */
  constructor() {
    super()
  }

  /**
   * The clear method.
   */
  clear() {
    this.setNumVertices(0)
    this.emit('geomDataTopologyChanged')
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * Sets state of current geometry(Including line segments) using a binary reader object.
   *
   * @param reader - The reader value.
   * @param context - The context value.
   */
  readBinary(reader: BinReader, context: AssetLoadContext) {
    super.loadBaseGeomBinary(reader)

    // this.computeVertexNormals();
    this.emit('geomDataChanged')
  }
}

Registry.register('Points', Points)

export { Points }
