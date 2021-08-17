import { Version } from './Version'
import { TreeItem } from './TreeItem'
import { SelectionSet } from './Groups/SelectionSet'
import { GeomLibrary } from './GeomLibrary'
import { MaterialLibrary } from './MaterialLibrary'
import { Registry } from '../Registry'
import { EventEmitter } from '../Utilities/EventEmitter'
import { GeomItem } from './GeomItem'
import { BinReader } from './BinReader'

/**
 * Provides a context for loading assets. This context can provide the units of the loading scene.
 * E.g. you can specify the scene units as 'millimeters' in the context object.
 * To load external references, you can also provide a dictionary that maps filenames to URLs that are used
 * to resolve the URL of an external reference that a given asset is expecting to find.
 */
class AssetLoadContext extends EventEmitter {
  units: string
  protected assets: Record<any, any>
  protected resources: Record<any, any>
  versions: Record<string, Version>
  url: string
  folder: string
  protected sdk: string
  assetItem: any
  numTreeItems: number
  numGeomItems: number
  protected postLoadCallbacks: any[]
  protected asyncCount: number

  addGeomToLayer: any

  /**
   * Create a AssetLoadContext
   * @param {AssetLoadContext} context The source context to base this context on.
   */
  constructor(context?: AssetLoadContext) {
    super()
    this.units = context ? context.units : 'meters'
    this.assets = context ? context.assets : {}
    this.resources = context ? context.resources : {}
    this.versions = {}
    this.url = ''
    this.folder = ''
    this.sdk = ''
    this.assetItem = null
    this.numTreeItems = 0
    this.numGeomItems = 0
    this.postLoadCallbacks = [] // Post load callbacks.
    this.asyncCount = 0
  }

  /**
   * During loading, asynchronous processes may be launched, and subsequently completed.
   * These method helps the Asset track how many asynchronous loading operations may be
   * occurring with the tree during load.
   * As each external reference starts to load, it increments this counter, letting the owning
   * Asset know to wait till the children are loaded before emitting its own 'loaded' event.
   */
  incrementAsync() {
    this.asyncCount++
  }

  /**
   * As each external reference completes loading, it decrements this counter allowing the owning
   * asset to know that the subtrees are loaded.
   */
  decrementAsync() {
    this.asyncCount--

    // Wait for all nested XRefs to load before considering this asset loaded.
    if (this.asyncCount == 0) {
      this.emit('done')
    }
  }
  /**
   * Resolves a path within the loading asset. This is used to connect
   * items within the tree to other items. e.g. a Group can find its members.
   * or an instance can find its source tree.
   * @param {array} path the path within the tree relative to the loading asset
   * @param {function} onSucceed called with the successful result of the path resolution.
   * @param {function} onFail called when the path resolution fails.
   */
  resolvePath(path: any, onSucceed: any, onFail: any) {
    if (!path) throw new Error('Path not specified')

    // Note: Why not return a Promise here?
    // Promise evaluation is always async, so
    // all promises will be resolved after the current call stack
    // has terminated. In our case, we want all paths
    // to be resolved before the end of the function, which
    // we can handle easily with callback functions.
    try {
      const item = this.assetItem.resolvePath(path)
      onSucceed(item)
    } catch (e) {
      // Some paths resolve to items generated during load,
      // so push a callback to re-try after the load is complete.
      this.postLoadCallbacks.push(() => {
        try {
          const param = this.assetItem.resolvePath(path)
          onSucceed(param)
        } catch (e) {
          if (onFail) {
            onFail()
          } else {
            throw new Error(e.message)
          }
        }
      })
    }
  }

  /**
   * Adds a function to be called back once the main load call stack exists.
   * This is used to connect parts of the tree together after loading.
   * e.g. an instance will
   * @param {function} postLoadCallback
   */
  addPLCB(postLoadCallback: any) {
    this.postLoadCallbacks.push(postLoadCallback)
  }
}

/**
 * Given a units string, load returns a factor relative to meters
 * e.g. for Millimeters, returns 0.001, for Meters, returns 1.0
 * Given 2 different units, the factors are combined together to calculate the conversion between the 2 units.
 * @param {string} units the name of the units value for the load context.
 * Supports: ['millimeters', 'centimeters', 'decimeters', 'meters', 'kilometers', 'inches', 'feet', 'miles']
 * @return {number} Returns the factor relative to meters.
 */
const getUnitsFactor = (units: string) => {
  switch (units.toLowerCase()) {
    case 'millimeters':
      return 0.001
    case 'centimeters':
      return 0.01
    case 'decimeters':
      return 0.1
    case 'meters':
      return 1.0
    case 'kilometers':
      return 1000.0
    case 'inches':
      return 0.0254
    case 'feet':
      return 0.3048
    case 'miles':
      return 1609.34
  }
  return 1.0
}

/**
 * Represents a TreeItem with rendering and material capabilities.
 *
 * @extends TreeItem
 */
class AssetItem extends TreeItem {
  __geomLibrary: GeomLibrary
  __materials: MaterialLibrary
  loaded: boolean

  protected __engineDataVersion: any
  protected __unitsScale: any

  protected __units: string
  /**
   * Create an asset item.
   * @param {string} name - The name of the asset item.
   */
  constructor(name: string = '') {
    super(name)

    this.__geomLibrary = new GeomLibrary()
    this.__materials = new MaterialLibrary()
    this.loaded = false
  }

  /**
   * Loads all the geometries and metadata from the asset file.
   * @param {string} url - The URL of the asset to load
   * @return {Promise} - Returns a promise that resolves once the initial load is complete
   */
  load(url: string): Promise<void> {
    return Promise.reject(`This method is not implemented for this Asset Item: ${url}`)
  }

  /**
   * Returns the loaded status of current item.
   *
   * @return {boolean} - Returns true if the asset has already loaded its data.
   */
  isLoaded() {
    return this.loaded
  }

  /**
   * Returns the zea engine version as an array with major, minor, patch order.
   *
   * @return {array} - The return value.
   */
  getEngineDataVersion() {
    return this.__engineDataVersion
  }

  /**
   * Returns asset `GeomLibrary` that is in charge of rendering geometry data using workers.
   *
   * @return {GeomLibrary} - The return value.
   */
  getGeometryLibrary() {
    return this.__geomLibrary
  }

  /**
   * Returns `MaterialLibrary` that is in charge of storing all materials of current Item.
   *
   * @return {MaterialLibrary} - The return value.
   */
  getMaterialLibrary() {
    return this.__materials
  }

  /**
   * Returns the scale factor of current item.
   * @return {number} - The return value.
   */
  getUnitsConversion(): number{
    return this.__unitsScale
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The readBinary method.
   * @param {Record<any,any>} reader - The reader value.
   * @param {AssetLoadContext} context - The context value.
   */
  readBinary(reader: BinReader, context: AssetLoadContext): void {
    context.assetItem = this
    context.numTreeItems = 0

    if (!context.units) context.units = 'meters'
    context.numGeomItems = 0

    if (!context.versions['zea-engine']) {
      context.versions['zea-engine'] = new Version(reader.loadStr())
    }
    this.__engineDataVersion = context.versions['zea-engine']

    const loadUnits = () => {
      this.__units = reader.loadStr()
      // Calculate a scale factor to convert
      // the asset units to meters(the scene units)
      const unitsFactor = getUnitsFactor(this.__units)
      const contextUnitsFactor = getUnitsFactor(context.units)
      this.__unitsScale = unitsFactor / contextUnitsFactor

      // The context propagates the new units to children assets.
      // This means that a child asset applies a unitsScale relative to this asset.
      context.units = this.__units

      // Apply units change to existing Xfo (avoid changing tr).
      const localXfoParam = this.getParameter('LocalXfo')
      const xfo = localXfoParam.getValue()
      xfo.sc.scaleInPlace(this.__unitsScale)
      localXfoParam.setValue(xfo)
    }

    if (context.versions['zea-engine'].compare([0, 0, 6]) > 0) {
      // Loading units modifies our Xfo, which then propagates up
      // the tree forcing a re-computation. Better just do it at
      // the start.
      loadUnits()
    }

    let layerRoot: any
    const layers: Record<any, any> = {}
    context.addGeomToLayer = (geomItem: GeomItem, layer: any) => {
      if (!layers[layer]) {
        if (!layerRoot) {
          layerRoot = new TreeItem('Layers')
          this.addChild(layerRoot, false)
        }
        const group = new SelectionSet(layer)
        layerRoot.addChild(group, false)
        layers[layer] = group
      }
      layers[layer].addItem(geomItem)
    }

    const postLoadCallbacks: any[] = [] // Post load callbacks.
    context.resolvePath = (path, onSucceed, onFail) => {
      if (!path) throw new Error('Path not specified')

      // Note: Why not return a Promise here?
      // Promise evaluation is always async, so
      // all promises will be resolved after the current call stack
      // has terminated. In our case, we want all paths
      // to be resolved before the end of the function, which
      // we can handle easily with callback functions.
      try {
        const item = this.resolvePath(path)
        onSucceed(item)
      } catch (e) {
        // Some paths resolve to items generated during load,
        // so push a callback to re-try after the load is complete.
        postLoadCallbacks.push(() => {
          try {
            const param = this.resolvePath(path)
            onSucceed(param)
          } catch (e) {
            if (onFail) {
              onFail()
            } else {
              throw new Error(e.message)
            }
          }
        })
      }
    }
    context.addPLCB = (postLoadCallback) => postLoadCallbacks.push(postLoadCallback)

    this.__materials.readBinary(reader, context)

    super.readBinary(reader, context)

    if (
      context.versions['zea-engine'].compare([0, 0, 5]) >= 0 &&
      context.versions['zea-engine'].compare([0, 0, 7]) < 0
    ) {
      loadUnits()
    }

    // Invoke all the post-load callbacks to resolve any
    // remaining references.
    for (const cb of postLoadCallbacks) cb()

    this.loaded = true
    // console.log("numTreeItems:", context.numTreeItems, " numGeomItems:", context.numGeomItems)
  }

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param {Record<any,any>} context - The context value.
   * @return {object} - Returns the json object.
   */
  toJSON(context: Record<any, any> = {}) {
    context.makeRelative = (path: any) => {
      const assetPath = this.getPath()
      const start = path.slice(0, assetPath.length)
      for (let i = 0; i < start.length - 1; i++) {
        if (start[i] != assetPath[i]) {
          console.warn('Param Path is not relative to the asset. May not be able to be resolved at load time:' + path)
          return path
        }
      }
      // Relative paths start with a symbol for the root element.
      const relativePath = path.slice(assetPath.length - 1)
      relativePath[0] = '.'
      return relativePath
    }
    context.assetItem = this
    const j = super.toJSON(context)
    return j
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {object} j - The json object this item must decode.
   * @param {object} context - The context value.
   * @param {function} onDone - Callback function executed when everything is done.
   */
  fromJSON(j: Record<any, any>, context: Record<any, any> = {}, onDone?: any) {
    if (!context) context = {}

    context.assetItem = this
    context.numTreeItems = 0
    context.numGeomItems = 0
    if (context.version == undefined) context.version = 0

    context.assetItem = this

    const postLoadCallbacks: any[] = [] // Post load callbacks.
    context.resolvePath = (path: any, cb: any) => {
      // Note: Why not return a Promise here?
      // Promise evaluation is always async, so
      // all promises will be resolved after the current call stack
      // has terminated. In our case, we want all paths
      // to be resolved before the end of the function, which
      // we can handle easily with callback functions.
      if (!path) throw new Error('Path not specified')
      const item = this.resolvePath(path)
      if (item) {
        cb(item)
      } else {
        // Some paths resolve to items generated during load,
        // so push a callback to re-try after the load is complete.
        postLoadCallbacks.push(() => {
          const param = this.resolvePath(path)
          if (param) cb(param)
          else {
            console.warn('Path unable to be resolved:' + path)
          }
        })
      }
    }
    context.addPLCB = (postLoadCallback: any) => postLoadCallbacks.push(postLoadCallback)

    // Avoid loading the FilePath as we are already loading json data.
    // if (j.params && j.params.FilePath) {
    //   delete j.params.FilePath
    // }

    super.fromJSON(j, context)

    // Invoke all the post-load callbacks to resolve any
    // remaining references.
    for (const cb of postLoadCallbacks) cb()

    if (onDone) onDone()
  }

  // ////////////////////////////////////////
  // Clone and Destroy

  /**
   * The clone method constructs a new tree item, copies its values
   * from this item and returns it.
   *
   * @param {Record<any,any>} context - The context value.
   * @return {TreeItem} - Returns a new cloned tree item.
   */
  clone(context?: Record<string, unknown>): TreeItem {
    const cloned = new AssetItem()
    cloned.copyFrom(this, context)
    return cloned
  }

  /**
   * Copies current TreeItem with all its children.
   *
   * @param {TreeItem} src - The tree item to copy from.
   * @param {Record<any,any>} context - The context value.
   */
  copyFrom(src: AssetItem, context?: Record<any, any>): void {
    this.__geomLibrary = src.__geomLibrary
    this.__materials = src.__materials
    this.loaded = src.loaded

    if (!src.loaded) {
      src.once('loaded', (event) => {
        const srcLocalXfo = src.getParameter('LocalXfo').getValue()
        const localXfo = this.getParameter('LocalXfo').getValue()
        localXfo.sc = srcLocalXfo.sc.clone()
        this.getParameter('LocalXfo').setValue(localXfo)

        src.getChildren().forEach((srcChildItem: any) => {
          if (srcChildItem && srcChildItem != AssetItem) {
            this.addChild(srcChildItem.clone(context), false, false)
          }
        })
        this.loaded = true
        this.emit('loaded', event)
      })
    }

    super.copyFrom(src, context)
  }
}

Registry.register('AssetItem', AssetItem)

export { AssetItem, AssetLoadContext }
