import { Xfo, Box3, Vec3, Mat4 } from '../../Math/index'
import { XfoParameter, Mat4Parameter } from '../Parameters/index'
import { GeometryParameter } from '../Parameters/GeometryParameter'
import { Registry } from '../../Registry'
import { GeomItem } from '../GeomItem'
import { Operator } from '../Operators/Operator'
import { XfoOperatorInput } from '../Operators/OperatorInput'
import { Mat4OperatorOutput } from '../Operators/OperatorOutput'
import { BaseProxy } from '../Geometry/GeomProxies'
import { BaseGeom } from '../Geometry'
import { Material } from '../Material'
import { BinReader } from '../BinReader'
import { Vec3Attribute } from '../Geometry/Vec3Attribute'
import { AssetItem } from '..'
import { RangeLoadedEvent } from '../../Utilities/Events/RangeLoadedEvent'

let calculatePreciseBoundingBoxes = false

// /** The operator the calculates the global Xfo of a TreeItem based on its parents GlobalXfo and its own LocalXfo
//  * @extends Operator
//  * @private
//  */
// class CalcCADBodyGeomMatOperator extends Operator {
//   globalXfo: XfoOperatorInput = new XfoOperatorInput('GlobalXfo')
//   geomMat: Mat4OperatorOutput = new Mat4OperatorOutput('GeomMat')

//   /**
//    *Creates an instance of CalcGeomMatOperator.
//    *
//    * @param globalXfoParam
//    * @param geomOffsetXfoParam
//    * @param geomMatParam
//    * @memberof CalcGeomMatOperator
//    */
//   constructor(globalXfoParam: XfoParameter, geomMatParam: Mat4Parameter) {
//     super('CalcCADBodyGeomMatOperator')
//     this.globalXfo.setParam(globalXfoParam)
//     this.geomMat.setParam(geomMatParam)
//     this.addInput(this.globalXfo)
//     this.addOutput(this.geomMat)
//   }

//   /**
//    * The evaluate method.
//    */
//   evaluate() {
//     this.geomMat.setClean(this.globalXfo.getValue().toMat4())
//   }
// }

/**
 * Class representing a geometry item in a scene tree.
 *
 * **Parameters**
 * * **Geometry(`GeometryParameter`):** The geometry to be rendered for this GeomItem
 * * **Material(`MaterialParameter`):** The Material to use when rendering this GeomItem
 * * **GeomOffsetXfo(`XfoParameter`):** Provides an offset transformation that is applied only to the geometry and not inherited by child items.
 * * **GeomMat(`Mat4Parameter`):** Calculated from the GlobalXfo and the GeomOffsetXfo, this matrix is provided to the renderer for rendering.
 *
 * @extends GeomItem
 */
class CADBody extends GeomItem {
  /**
   * Creates a geometry item.
   * @param name - The name of the geom item.
   * @param geometry - The geometry value.
   * @param material - The material value.
   * @param xfo - The initial Xfo of the new GeomItem.
   */
  constructor(name?: string, geometry?: BaseGeom, material?: Material, xfo?: Xfo) {
    super(name, geometry, material, xfo)
    // this.addParameter(this.geomParam)
    // this.addParameter(this.materialParam)
    // this.addParameter(this.geomMatParam)

    // const geomChanged = () => {
    //   this.setBoundingBoxDirty()
    // }
    // this.geomParam.on('valueChanged', geomChanged)
    // this.geomParam.on('boundingBoxChanged', geomChanged)

    // this.calcGeomMatOperator = new CalcCADBodyGeomMatOperator(this.globalXfoParam, this.geomMatParam)

    // if (geometry) this.geomParam.loadValue(geometry)
    // if (material) this.materialParam.loadValue(material)
    // if (xfo) this.localXfoParam.value = xfo
  }

  /**
   * The _cleanBoundingBox method.
   * @param bbox - The bounding box value.
   * @return - The return value.
   * @private
   */
  _cleanBoundingBox(bbox: Box3) {
    if (this.disableBoundingBox) return bbox
    bbox = super._cleanBoundingBox(bbox)
    if (this.geomBBox) {
      // Note: this bbox is the global bounding box of the geomItem
      // transformed into the space of the geometry. We reapply
      // the geom matrix to get back the points in global space.
      const mat4 = this.geomMatParam.value
      bbox.addPoint(mat4.transformVec3(this.geomBBox.p0))
      bbox.addPoint(mat4.transformVec3(this.geomBBox.p1))
    } else {
      const geom = this.geomParam.value
      if (geom) {
        if (calculatePreciseBoundingBoxes) {
          // Note: compting the precise bounding box is much slower and
          // can make loading big scenes take a bit longer.
          const mat4 = this.geomMatParam.value
          if (geom instanceof BaseProxy) {
            const positions = geom.__buffers.attrBuffers['positions'].values
            const getVertex = (index: number) => {
              const start = index * 3
              return new Vec3(positions.subarray(start, start + 3))
            }
            for (let i = 0; i < geom.getNumVertices(); i++) {
              bbox.addPoint(mat4.transformVec3(getVertex(i)))
            }
          } else {
            const positions = <Vec3Attribute>geom.getVertexAttribute('positions')
            for (let i = 0; i < geom.getNumVertices(); i++) {
              bbox.addPoint(mat4.transformVec3(positions.getValueRef(i)))
            }
          }
        } else {
          bbox.addBox3(geom.getBoundingBox(), this.geomMatParam.value)
        }
      }
    }
    return bbox
  }

  // ///////////////////////////
  // Debugging

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param context - The context value.
   * @return - Returns the json object.
   */
  toJSON(context?: Record<string, any>): Record<string, any> {
    const json = super.toJSON(context)
    return json
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param json - The json object this item must decode.
   * @param context - The context value.
   */
  fromJSON(json: Record<string, any>, context: Record<string, any>): void {
    super.fromJSON(json, context)
    context.numGeomItems++
  }

  /**
   * Loads state of the Item from a binary object.
   *
   * @param reader - The reader value.
   * @param context - The context value.
   */
  readBinary(reader: BinReader, context: Record<string, any>) {
    super.readBinary(reader, context)
    /*
    context.numGeomItems++

    const geomIndex = reader.loadUInt32()
    const geomLibrary = context.assetItem.getGeometryLibrary()

    this.geomIndex = geomIndex
    this.assetItem = context.assetItem

    const geom = geomLibrary.getGeom(geomIndex)
    if (geom) {
      this.geomParam.loadValue(geom)
    } else {
      const onGeomLoaded = (event: Record<string, any>) => {
        const { range } = event
        if (geomIndex >= range[0] && geomIndex < range[1]) {
          const geom = geomLibrary.getGeom(geomIndex)
          if (geom) this.geomParam.value = geom
          else console.warn('Geom not loaded:', this.getName())
          geomLibrary.removeListenerById('rangeLoaded', onGeomLoadedListenerID)
        }
      }
      const onGeomLoadedListenerID = geomLibrary.on('rangeLoaded', onGeomLoaded)
    }

    // Note: deprecated value. Not sure if we need to load this here.
    // I think not, but need to test first.
    if (context.versions['zea-engine'].compare([3, 0, 0]) < 0) {
      // Load the 'lightmapCoordOffset' value which we no longer use.
      // Note: we need to load it to increment the file pointer.
      reader.loadFloat32Vec2()
    } else {
      this.geomBBox = new Box3(reader.loadFloat32Vec3(), reader.loadFloat32Vec3())
    }
    */
  }

  // ////////////////////////////////////////
  // Clone and Destroy

  /**
   * The clone method constructs a new geom item, copies its values
   * from this item and returns it.
   *
   * @param context - The context value.
   * @return - Returns a new cloned geom item.
   */
  clone(context?: Record<string, any>) {
    const cloned = new CADBody()
    cloned.copyFrom(this, context)
    return cloned
  }
}

Registry.register('CADBody', CADBody)

export { CADBody }
