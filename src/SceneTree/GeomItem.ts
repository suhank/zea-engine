import { Xfo, Box3, Vec3, Mat4 } from '../Math/index'
import { XfoParameter, Mat4Parameter, Parameter } from './Parameters/index'
import { MaterialParameter } from './Parameters/MaterialParameter'
import { GeometryParameter } from './Parameters/GeometryParameter'
import { Registry } from '../Registry'
import { BaseGeomItem } from './BaseGeomItem'
import { Operator } from './Operators/Operator'
import { OperatorInput } from './Operators/OperatorInput'
import { OperatorOutput } from './Operators/OperatorOutput'
import { BaseProxy } from './Geometry/GeomProxies'
import { BaseGeom } from './Geometry'
import { Material } from './Material'
import { BinReader } from './BinReader'
import { BaseEvent } from '../Utilities/BaseEvent'

let calculatePreciseBoundingBoxes = false

/** The operator the calculates the global Xfo of a TreeItem based on its parents GlobalXfo and its own LocalXfo
 * @extends Operator
 * @private
 */
class CalcGeomMatOperator extends Operator {
  /**
   *Creates an instance of CalcGeomMatOperator.
   *
   * @param {*} globalXfoParam
   * @param {*} geomOffsetXfoParam
   * @param {*} geomMatParam
   * @memberof CalcGeomMatOperator
   */
  constructor(globalXfoParam: XfoParameter, geomOffsetXfoParam: XfoParameter, geomMatParam: any) {
    super('CalcGeomMatOperator')
    this.addInput(new OperatorInput('GlobalXfo')).setParam(globalXfoParam)
    this.addInput(new OperatorInput('GeomOffsetXfo')).setParam(geomOffsetXfoParam)
    this.addOutput(new OperatorOutput('GeomMat')).setParam(geomMatParam)
  }

  /**
   * The evaluate method.
   */
  evaluate() {
    const globalXfo = <Xfo>this.getInput('GlobalXfo').getValue()
    const geomOffsetXfo = <Xfo>this.getInput('GeomOffsetXfo').getValue()
    const geomMatOutput = this.getOutput('GeomMat')

    const globalMat4 = globalXfo.toMat4()
    const geomOffsetMat4 = geomOffsetXfo.toMat4()
    geomMatOutput.setClean(globalMat4.multiply(geomOffsetMat4))
  }
}

/**
 * Class representing a geometry item in a scene tree.
 *
 * **Parameters**
 * * **Geometry(`GeometryParameter`):** The geometry to be rendered for this GeomItem
 * * **Material(`MaterialParameter`):** The Material to use when rendering this GeomItem
 * * **GeomOffsetXfo(`XfoParameter`):** Provides an offset transformation that is applied only to the geometry and not inherited by child items.
 * * **GeomMat(`Mat4Parameter`):** Calculated from the GlobalXfo and the GeomOffsetXfo, this matrix is provided to the renderer for rendering.
 *
 * @extends BaseGeomItem
 */
class GeomItem extends BaseGeomItem {
  protected geomBBox: Box3
  protected __cleanGeomMat: number
  protected _setBoundingBoxDirty: any
  protected disableBoundingBox: boolean
  protected geomIndex: number
  protected assetItem: any
  protected calcGeomMatOperator: Operator
  cullable
  protected __geomOffsetXfoParam: XfoParameter
  protected __geomParam: Parameter<BaseGeom>
  protected __materialParam: Parameter<Material>
  protected __geomMatParam: Parameter<Mat4>

  /**
   * Creates a geometry item.
   * @param {string} name - The name of the geom item.
   * @param {BaseGeom} geometry - The geometry value.
   * @param {Material} material - The material value.
   * @param {Xfo} xfo - The initial Xfo of the new GeomItem.
   */
  constructor(name?: string, geometry?: BaseGeom, material?: Material, xfo?: Xfo) {
    super(name)
    this.cullable = true
    this.__geomParam = this.addParameter(new GeometryParameter('Geometry'))
    this._setBoundingBoxDirty = this._setBoundingBoxDirty.bind(this)
    this.__geomParam.on('valueChanged', this._setBoundingBoxDirty)
    this.__geomParam.on('boundingBoxChanged', this._setBoundingBoxDirty)
    this.__materialParam = this.addParameter(new MaterialParameter('Material'))
    this.addParameterDeprecationMapping('material', 'Material')

    this.__geomOffsetXfoParam = this.addParameter(new XfoParameter('GeomOffsetXfo'))
    this.__geomMatParam = this.addParameter(new Mat4Parameter('GeomMat'))

    this.geomIndex = -1
    this.assetItem = null

    this.calcGeomMatOperator = new CalcGeomMatOperator(
      this.__globalXfoParam,
      this.__geomOffsetXfoParam,
      this.__geomMatParam
    )

    if (geometry) this.getParameter('Geometry').loadValue(geometry)
    if (material) this.getParameter('Material').loadValue(material)
    if (xfo) this.getParameter('LocalXfo').setValue(xfo)
  }

  // ////////////////////////////////////////
  // Geometry

  /**
   * Returns `Geometry` parameter value.
   *
   * @return {BaseGeom} - The return value.
   */
  getGeometry(): BaseGeom {
    console.warn(`deprecated. please use 'getParameter('Geometry').getValue`)
    return this.__geomParam.getValue()
  }

  /**
   * Sets geometry object to `Geometry` parameter.
   *
   * @param {BaseGeom} geom - The geom value.
   */
  setGeometry(geom: BaseGeom) {
    console.warn(`deprecated. please use 'getParameter('Geometry').setValue`)
    this.__geomParam.setValue(geom)
  }

  /**
   * Getter for geometry (getGeom is deprecated. Please use getGeometry).
   *
   * @deprecated
   * @return {BaseGeom} - The return value.
   */
  getGeom() {
    console.warn(`deprecated. please use 'getParameter('Geometry').getValue`)
    return this.__geomParam.getValue()
  }

  /**
   * Setter for geometry. (setGeom is deprecated. Please use setGeometry).
   *
   * @deprecated
   * @param {BaseGeom} geom - The geom value.
   * @return {number} - The return value.
   */
  setGeom(geom: BaseGeom) {
    console.warn("setGeom is deprecated. Please use 'getParameter('Geometry').setValue'")
    return this.__geomParam.setValue(geom)
  }

  /**
   * Returns the specified value of `Material`parameter.
   *
   * @return {Material} - The return value.
   */
  getMaterial(): Material {
    console.warn(`deprecated. please use 'getParameter('Material').getValue`)
    return this.__materialParam.getValue()
  }

  /**
   * Sets material object to `Material` parameter.
   *
   * @param {Material} material - The material value.
   */
  setMaterial(material: Material) {
    console.warn(`deprecated. please use 'getParameter('Material').setValue`)
    this.__materialParam.setValue(material)
  }

  /**
   * The _cleanBoundingBox method.
   * @param {Box3} bbox - The bounding box value.
   * @return {Box3} - The return value.
   * @private
   */
  _cleanBoundingBox(bbox: Box3) {
    if (this.disableBoundingBox) return bbox
    bbox = super._cleanBoundingBox(bbox)
    const geom = this.__geomParam.getValue()
    if (geom) {
      if (geom instanceof BaseProxy && calculatePreciseBoundingBoxes) {
        // Note: compting the precise bounding box is much slower and
        // can make loading big scenes take a bit longer.
        const positions = geom.__buffers.attrBuffers['positions'].values
        const getVertex = (index: number) => {
          const start = index * 3
          return new Vec3(positions.subarray(start, start + 3))
        }
        const mat4 = this.getGeomMat4()
        for (let i = 0; i < geom.getNumVertices(); i++) {
          bbox.addPoint(mat4.transformVec3(getVertex(i)))
        }
      } else {
        bbox.addBox3(geom.getBoundingBox(), this.getGeomXfo())
      }
    } else if (this.geomBBox) {
      // before the geometries are loaded, we can use the
      // loaded geomBBox that came in the scene tree.
      bbox.addBox3(this.geomBBox, this.getGeomXfo())
    }
    return bbox
  }

  // ////////////////////////////////////////
  // Xfos

  /**
   * Returns the offset `Xfo` object specified in `GeomOffsetXfo` parameter.
   *
   * @return {Xfo} - Returns the geom offset Xfo.
   */
  getGeomOffsetXfo() {
    return this.__geomOffsetXfoParam.getValue()
  }

  /**
   * Sets `Xfo` object to `GeomOffsetXfo` parameter.
   *
   * @param {Xfo} xfo - The Xfo value.
   */
  setGeomOffsetXfo(xfo: Xfo) {
    this.__geomOffsetXfoParam.setValue(xfo)
  }

  /**
   * Returns `Mat4` object value of `GeomMat` parameter.
   *
   * @return {Mat4} - Returns the geom Xfo.
   */
  getGeomMat4(): Mat4 {
    return this.__geomMatParam.getValue()
  }

  /**
   * Returns `Xfo` object value of `GeomMat` parameter.
   *
   * @return {Xfo} - Returns the geom Xfo.
   */
  getGeomXfo(): Xfo {
    let temp: Xfo = new Xfo()
    temp.setFromMat4(this.__geomMatParam.getValue())
    return temp
  }
  // ///////////////////////////
  // Debugging

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param {object} context - The context value.
   * @return {object} - Returns the json object.
   */
  toJSON(context?: Record<any, any>) {
    const json = super.toJSON(context)
    return json
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {object} json - The json object this item must decode.
   * @param {object} context - The context value.
   */
  fromJSON(json: Record<any, any>, context: Record<any, any>) {
    super.fromJSON(json, context)
    context.numGeomItems++
  }

  /**
   * Loads state of the Item from a binary object.
   *
   * @param {BinReader} reader - The reader value.
   * @param {object} context - The context value.
   */
  readBinary(reader: BinReader, context: Record<any, any>) {
    super.readBinary(reader, context)

    context.numGeomItems++

    const itemFlags = reader.loadUInt8()
    const geomIndex = reader.loadUInt32()
    const geomLibrary = context.assetItem.getGeometryLibrary()

    this.geomIndex = geomIndex
    this.assetItem = context.assetItem

    const geom = geomLibrary.getGeom(geomIndex)
    if (geom) {
      this.getParameter('Geometry').loadValue(geom)
    } else {
      const onGeomLoaded = (event: Record<any, any>) => {
        const { range } = event
        if (geomIndex >= range[0] && geomIndex < range[1]) {
          const geom = geomLibrary.getGeom(geomIndex)
          if (geom) this.getParameter('Geometry').setValue(geom)
          else console.warn('Geom not loaded:', this.getName())
          geomLibrary.off('rangeLoaded', onGeomLoaded)
        }
      }
      geomLibrary.on('rangeLoaded', onGeomLoaded)
    }

    // this.setVisibility(j.visibility);
    // Note: to save space, some values are skipped if they are identity values
    const geomOffsetXfoFlag = 1 << 2
    if (itemFlags & geomOffsetXfoFlag) {
      this.__geomOffsetXfoParam.setValue(
        new Xfo(reader.loadFloat32Vec3(), reader.loadFloat32Quat(), reader.loadFloat32Vec3())
      )
    }

    // BaseGeomItem now handles loading materials.
    // if (context.version < 4) {
    if (context.versions['zea-engine'].compare([0, 0, 4]) < 0) {
      const materialFlag = 1 << 3
      if (itemFlags & materialFlag) {
        const materialLibrary = context.assetItem.getMaterialLibrary()
        const materialName = reader.loadStr()
        let material = materialLibrary.getMaterial(materialName)
        if (!material) {
          console.warn("Geom :'" + this.__name + "' Material not found:" + materialName)
          material = materialLibrary.getMaterial('Default')
        }
        this.getParameter('Material').loadValue(material)
      } else {
        // Force nodes to have a material so we can see them.
        this.getParameter('Material').loadValue(context.assetItem.getMaterialLibrary().getMaterial('Default'))
      }
    }

    // Note: deprecated value. Not sure if we need to load this here.
    // I think not, but need to test first.
    if (context.versions['zea-engine'].compare([3, 0, 0]) < 0) {
      const lightmapCoordOffset = reader.loadFloat32Vec2()
    } else {
      this.geomBBox = new Box3(reader.loadFloat32Vec3(), reader.loadFloat32Vec3())
    }
  }

  /**
   * Returns string representation of current object's state.
   * @param {Record<any, any>} context
   * @return {string} - The return value.
   */
  toString(context: Record<any, any>) {
    return JSON.stringify(this.toJSON(context), null, 2)
  }

  // ////////////////////////////////////////
  // Clone and Destroy

  /**
   * The clone method constructs a new geom item, copies its values
   * from this item and returns it.
   *
   * @param {number} context - The context value.
   * @return {GeomItem} - Returns a new cloned geom item.
   */
  clone(context?: Record<any, any>) {
    const cloned = new GeomItem()
    cloned.copyFrom(this, context)
    return cloned
  }

  /**
   * Copies current GeomItem with all its children.
   *
   * @param {GeomItem} src - The geom item to copy from.
   * @param {Record<any, any>} context - The context value.
   */
  copyFrom(src: GeomItem, context?: Record<any, any>) {
    super.copyFrom(src, context)

    if (!src.getParameter('Geometry').getValue() && src.geomIndex != -1) {
      const geomLibrary = src.assetItem.getGeometryLibrary()
      this.assetItem = src.assetItem
      this.geomIndex = src.geomIndex
      const onGeomLoaded = (event: Record<any, any>) => {
        const { range } = event
        if (this.geomIndex >= range[0] && this.geomIndex < range[1]) {
          const geom = geomLibrary.getGeom(this.geomIndex)
          // Note: we need the 'valueChanged' event to be received by the
          // renderer to then load the geometry into the GPU.
          if (geom) this.getParameter('Geometry').setValue(geom)
          else console.warn('Geom not loaded:', this.getName())
          geomLibrary.off('rangeLoaded', onGeomLoaded)
        }
      }
      geomLibrary.on('rangeLoaded', onGeomLoaded)
    }

    // Geom Xfo should be dirty after cloning.
    // Note: this might not be necessary. It should
    // always be dirty after cloning.
    this.__geomMatParam.setDirty(this.__cleanGeomMat)
  }

  /**
   * Sets the global boolean that controls if GeomItems calculate precise bounding boxes
   * or use the approximate bounding boxes that are much faster to generate.
   * Note: computing the precise bounding box is much slower and can make loading
   * big scenes take a bit longer. This setting is only relevant to geometries loaded
   * from zcad files.
   * @param {boolean} value - true for precise bounding boxes, else false for faster approximate bounding boxes.
   */
  static setCalculatePreciseBoundingBoxes(value: boolean) {
    calculatePreciseBoundingBoxes = value
  }
}

Registry.register('GeomItem', GeomItem)

export { GeomItem }
