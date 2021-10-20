/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vec2, Vec3, Box2, Box3, Color } from '../../Math/index'
import { ParameterOwner } from '../ParameterOwner'
import { Attribute } from './Attribute'
import { Vec3Attribute } from './Vec3Attribute'
import { Vec2Attribute } from './Vec2Attribute'
import { BinReader } from '../../SceneTree/BinReader'

/**
 * Represents a base class for 3D geometry items.
 *
 * **Events**
 * * **boundingBoxChanged:** Triggered when the bounding box changes.
 * * **geomDataChanged:** Emitted when the geometry attributes have changed. The topology did not change. The Renderer will upload the new attributes to the GPU.
 * * **geomDataTopologyChanged:** Emitted when the geometry attributes and topology have changed.  The Renderer will upload the new attributes and topology to the GPU.
 *
 * @extends ParameterOwner
 */
class BaseGeom extends ParameterOwner {
  protected __boundingBox: Box3 = new Box3()
  protected __boundingBoxDirty: boolean = true
  protected __metaData: Map<string, any> = new Map()
  protected __name: string = ''
  protected __numVertices: number = 0
  protected __vertexAttributes: Map<string, Attribute> = new Map()
  debugColor: Color = new Color(1, 0, 0, 1)
  name: string = ''

  /**
   * Create a base geom.
   */
  constructor() {
    super()
    this.addVertexAttribute('positions', new Vec3Attribute())
  }

  /**
   * The clear method.
   */
  clear() {
    this.setNumVertices(0)
  }

  /**
   * Establishes a name for the geometry.
   *
   * @param {string} name - The debug name value.
   */
  setDebugName(name: string): void {
    this.name = name
  }

  /**
   * Adds a new vertex attribute to the geometry.
   *
   * @param {string} name - The name of the vertex attribute.
   * @param {any} dataType - The dataType value. // TODO: is any ok vs. AttrValue | number. Unsure about how dataType is used
   * @return {Attribute} - Returns an attribute.
   */
  addVertexAttribute(name: string, attr: Attribute): void {
    attr.setCount(this.__numVertices)
    this.__vertexAttributes.set(name, attr)
  }

  /**
   * Checks if the the geometry has an attribute with the specified name.
   *
   * @param {string} name - The name of the vertex attribute.
   * @return {boolean} - The return value.
   */
  hasVertexAttribute(name: string): boolean {
    return this.__vertexAttributes.has(name)
  }

  /**
   * Returns vertex attribute with the specified name.
   *
   * @param {string} name - The name of the vertex attribute.
   * @return {Attribute} - The return value.
   */
  getVertexAttribute(name: string): Attribute | undefined {
    return this.__vertexAttributes.get(name)
  }

  /**
   * Returns all vertex attributes in an object with their names.
   *
   * @return {Record<string, Attribute>} - The return value.
   */
  getVertexAttributes(): Record<string, Attribute> {
    const vertexAttributes: Record<string, Attribute> = {}

    for (const [key, attr] of this.__vertexAttributes.entries()) vertexAttributes[key] = attr
    return vertexAttributes
  }

  /**
   * Returns 'positions' vertex attribute.
   */
  get positions(): Vec3Attribute {
    return this.__vertexAttributes.get('positions') as Vec3Attribute
  }

  /**
   * Returns the number of vertex attributes.
   *
   * @return {number} - The return value.
   */
  numVertices(): number {
    return this.__numVertices
  }

  /**
   * Returns the number of vertex attributes.
   *
   * @return {number} - The return value.
   */
  getNumVertices(): number {
    return this.__numVertices
  }

  /**
   * Sets the number of vertices the geometry has.
   *
   * @param {number} count - The count value.
   */
  setNumVertices(count: number): void {
    this.__numVertices = count
    // Resizes each of the vertex attributes to match the new count.
    this.__vertexAttributes.forEach((attr: Attribute) => attr.setCount(this.__numVertices))
  }

  // ////////////////////////////////////////
  // BoundingBox

  /**
   * Returns the bounding box for geometry.
   * @return {Box3} - The return value.
   */
  getBoundingBox(): Box3 {
    if (this.__boundingBoxDirty) this.updateBoundingBox()
    return this.__boundingBox
  }

  /**
   * The setBoundingBoxDirty method.
   */
  setBoundingBoxDirty(): void {
    this.__boundingBoxDirty = true
    this.emit('boundingBoxChanged')
  }

  /**
   * The updateBoundingBox method.
   */
  updateBoundingBox(): void {
    const positions = this.positions
    const bbox = new Box3()

    if (positions) {
      const numVerts = positions.getCount()
      for (let i = 0; i < numVerts; i++) bbox.addPoint(positions.getValueRef(i))
    }

    this.__boundingBox = bbox
    this.__boundingBoxDirty = false
  }

  // ////////////////////////////////////////
  // Metadata

  /**
   * Returns metadata value of the specified name.
   *
   * @param {string} key - The key value.
   * @return {any} - The return value.
   */
  getMetadata(key: string): any {
    return this.__metaData.get(key)
  }

  /**
   * Verifies if geometry's metadata contains a value with the specified key.
   *
   * @param {string} key - The key value.
   * @return {boolean} - The return value.
   */
  hasMetadata(key: string): boolean {
    return this.__metaData.has(key)
  }

  /**
   * Sets metadata value to the geometry.
   *
   * @param {string} key - The key value.
   * @param {Record<string, any>} metaData - The metaData value.
   */
  setMetadata(key: string, metaData: Record<string, any>): void {
    this.__metaData.set(key, metaData)
  }

  /**
   * Removes metadata value from the geometry with the specified key.
   *
   * @param {string} key - The key value.
   */
  deleteMetadata(key: string): void {
    this.__metaData.delete(key)
  }

  // ////////////////////////////////////////
  // Memory

  /**
   * Returns vertex attributes buffers and its count.
   * @return {Record<string, any>} - The return value.
   */
  genBuffers(opts?: Record<string, any>): Record<string, any> {
    const attrBuffers: Record<string, any> = {}
    for (const [attrName, attr] of this.__vertexAttributes) {
      attrBuffers[attrName] = attr.genBuffer()
    }
    return {
      numVertices: this.numVertices(),
      attrBuffers,
    }
  }

  // ////////////////////////////////////////
  // Persistence
  /**
   * Sets state of current Geometry(Including Vertices and Bounding Box) using a binary reader object.
   *
   * @param {BinReader} reader - The reader value.
   */
  loadBaseGeomBinary(reader: BinReader): void {
    this.name = reader.loadStr()
    const flags = reader.loadUInt8()
    this.debugColor = reader.loadRGBFloat32Color()
    const numVerts = reader.loadUInt32()
    this.__boundingBox.set(reader.loadFloat32Vec3(), reader.loadFloat32Vec3())

    this.setNumVertices(numVerts)
    const positionsAttr = this.positions
    let normalsAttr: any
    let texCoordsAttr: any
    if (flags & (1 << 1)) {
      normalsAttr = this.getVertexAttribute('normals')
      if (!normalsAttr) {
        normalsAttr = new Vec3Attribute()
        this.addVertexAttribute('normals', normalsAttr)
      }
    }
    if (flags & (1 << 2)) {
      texCoordsAttr = this.getVertexAttribute('texCoords')
      if (!texCoordsAttr) {
        texCoordsAttr = new Vec2Attribute()
        this.addVertexAttribute('texCoords', texCoordsAttr)
      }
    }
    const parse8BitPositionsArray = (range: Array<number>, offset: Vec3, sclVec: Vec3, positions_8bit: Uint8Array) => {
      for (let i = range[0]; i < range[1]; i++) {
        const pos = new Vec3(
          positions_8bit[i * 3 + 0] / 255.0,
          positions_8bit[i * 3 + 1] / 255.0,
          positions_8bit[i * 3 + 2] / 255.0
        )
        pos.multiplyInPlace(sclVec)
        pos.addInPlace(offset)
        if (positionsAttr) positionsAttr.setValue(i, pos)
      }
    }
    const parse8BitNormalsArray = (range: Array<number>, offset: Vec3, sclVec: Vec3, normals_8bit: Uint8Array) => {
      if (sclVec.isNull()) sclVec.set(1, 1, 1)
      for (let i = range[0]; i < range[1]; i++) {
        const normal = new Vec3(
          normals_8bit[i * 3 + 0] / 255.0,
          normals_8bit[i * 3 + 1] / 255.0,
          normals_8bit[i * 3 + 2] / 255.0
        )
        normal.multiplyInPlace(sclVec)
        normal.addInPlace(offset)
        normal.normalizeInPlace()
        normalsAttr.setValue(i, normal)
      }
    }
    const parse8BitTextureCoordsArray = (
      range: Array<number>,
      offset: Vec2,
      sclVec: Vec2,
      texCoords_8bit: Uint8Array
    ) => {
      // if (sclVec.isNull())
      //     sclVec.set(1, 1, 1);
      for (let i = range[0]; i < range[1]; i++) {
        const textureCoord = new Vec2(texCoords_8bit[i * 2 + 0] / 255.0, texCoords_8bit[i * 2 + 1] / 255.0)
        textureCoord.multiplyInPlace(sclVec)
        textureCoord.addInPlace(offset)
        texCoordsAttr.setValue(i, textureCoord)
      }
    }

    const numClusters = reader.loadUInt32()
    if (numClusters == 1) {
      {
        const box3 = this.__boundingBox
        const positions_8bit = reader.loadUInt8Array(numVerts * 3)
        parse8BitPositionsArray([0, numVerts], box3.p0, box3.diagonal(), positions_8bit)
      }

      if (normalsAttr) {
        const box3 = new Box3(reader.loadFloat32Vec3(), reader.loadFloat32Vec3())
        const normals_8bit = reader.loadUInt8Array(numVerts * 3)
        parse8BitNormalsArray([0, numVerts], box3.p0, box3.diagonal(), normals_8bit)
        normalsAttr.loadSplitValues(reader)
      }
      if (texCoordsAttr) {
        const box2 = new Box2(reader.loadFloat32Vec2(), reader.loadFloat32Vec2())
        const texCoords_8bit = reader.loadUInt8Array(numVerts * 2)
        parse8BitTextureCoordsArray([0, numVerts], box2.p0, box2.diagonal(), texCoords_8bit)
        texCoordsAttr.loadSplitValues(reader)
      }
    } else {
      const clusters = []
      let offset = 0
      for (let i = 0; i < numClusters; i++) {
        const count = reader.loadUInt32()
        const clusterData = {
          range: [offset, offset + count],
          bbox: new Box3(reader.loadFloat32Vec3(), reader.loadFloat32Vec3()),
          normalsRange: new Box3(),
          texCoordsRange: new Box2(),
        }
        if (normalsAttr) {
          clusterData.normalsRange.set(reader.loadFloat32Vec3(), reader.loadFloat32Vec3())
        }
        if (texCoordsAttr) {
          clusterData.texCoordsRange.set(reader.loadFloat32Vec2(), reader.loadFloat32Vec2())
        }

        clusters.push(clusterData)
        offset += count
      }
      const positions_8bit = reader.loadUInt8Array(numVerts * 3)
      let normals_8bit: Uint8Array | null = null
      let texCoords_8bit: Uint8Array | null = null
      if (normalsAttr) {
        normals_8bit = reader.loadUInt8Array(numVerts * 3)
      }
      if (texCoordsAttr) {
        texCoords_8bit = reader.loadUInt8Array(numVerts * 2)
      }

      for (let i = 0; i < numClusters; i++) {
        {
          const box3 = clusters[i].bbox
          parse8BitPositionsArray(clusters[i].range, box3.p0, box3.diagonal(), positions_8bit)
        }

        if (normalsAttr) {
          const box3 = clusters[i].normalsRange
          parse8BitNormalsArray(clusters[i].range, box3.p0, box3.diagonal(), normals_8bit!)
        }
        if (texCoordsAttr) {
          const box2 = clusters[i].texCoordsRange
          parse8BitTextureCoordsArray(clusters[i].range, box2.p0, box2.diagonal(), texCoords_8bit!)
        }
      }
      if (normalsAttr) {
        normalsAttr.loadSplitValues(reader)
      }
      if (texCoordsAttr) {
        texCoordsAttr.loadSplitValues(reader)
      }
    }
  }

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param {Record<string, any>} context - The context value.
   * @return {Record<string, any>} - Returns the json object.
   */
  toJSON(context?: Record<string, any>): Record<string, unknown> {
    const json = super.toJSON(context)

    if (!context || !context.skipTopology) {
      json.numVertices = this.__numVertices || 0
    }
    const vertexAttributes: Record<string, any> = {}
    for (const [key, attr] of this.__vertexAttributes.entries()) {
      if (!context || !('skipAttributes' in context) || !context.skipAttributes.includes(key))
        vertexAttributes[key] = attr.toJSON(context)
    }
    json.vertexAttributes = vertexAttributes
    return json
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {Record<string, any>} json - The json object this item must decode.
   * @param {Record<string, any>} context - The context value.
   */
  fromJSON(json: Record<string, any>, context?: Record<string, any>): void {
    super.fromJSON(json, context)
    this.setNumVertices(json.numVertices)
    for (const name in json.vertexAttributes) {
      let attr = this.__vertexAttributes.get(name)
      const attrJSON = json.vertexAttributes[name]
      if (!attr) {
        // switch(attrJSON.dataType) {
        //   case 'Vec3' attr = new Vec3Attribute( attrJSON.defaultScalarValue)
        // }
        // const dataType = Registry.getClassDefinition(attrJSON.dataType)
        // attr = new VertexAttribute(this, dataType, 0, attrJSON.defaultScalarValue)
        // if (attr) this.__vertexAttributes.set(name, attr)
      }
      if (attr) {
        attr.fromJSON(attrJSON)
      } else {
        console.warn('attr undefined, cannot execute fromJSON()')
      }
    }
    this.emit('geomDataTopologyChanged')
  }

  /**
   * Returns geometry data value in json format.
   *
   * @return {string} - The return value.
   */
  toString(): string {
    return JSON.stringify(this.toJSON(), null, 2)
  }
}
export { BaseGeom }
