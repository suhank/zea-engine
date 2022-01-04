import { Version } from './Version'
import { TreeItem } from './TreeItem'
import { SelectionSet } from './Groups/SelectionSet'
import { GeomLibrary } from './GeomLibrary'
import { MaterialLibrary } from './MaterialLibrary'
import { Registry } from '../Registry'
import { GeomItem } from './GeomItem'
import { BinReader } from './BinReader'
import { AssetLoadContext } from './AssetLoadContext'
import { CloneContext } from './CloneContext'
import { BaseGeomItem, BaseItem, Parameter } from '.'

/**
 * Given a units string, load returns a factor relative to meters
 * e.g. for Millimeters, returns 0.001, for Meters, returns 1.0
 * Given 2 different units, the factors are combined together to calculate the conversion between the 2 units.
 * @param units the name of the units value for the load context.
 * Supports: ['millimeters', 'centimeters', 'decimeters', 'meters', 'kilometers', 'inches', 'feet', 'miles']
 * @return Returns the factor relative to meters.
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
  geomLibrary: GeomLibrary = new GeomLibrary()
  materialLibrary: MaterialLibrary = new MaterialLibrary()
  loaded: boolean = false

  protected engineDataVersion?: Version
  protected unitsScale: number = 1.0
  protected units: string = 'meters'

  /**
   * Create an asset item.
   * @param name - The name of the asset item.
   */
  constructor(name: string = '') {
    super(name)
  }

  /**
   * Loads all the geometries and metadata from the asset file.
   * @param url - The URL of the asset to load
   * @return - Returns a promise that resolves once the initial load is complete
   */
  load(url: string): Promise<void> {
    return Promise.reject(`This method is not implemented for this Asset Item: ${url}`)
  }

  /**
   * Returns the loaded status of current item.
   *
   * @return - Returns true if the asset has already loaded its data.
   */
  isLoaded(): boolean {
    return this.loaded
  }

  /**
   * Returns the zea engine version as an array with major, minor, patch order.
   *
   * @return - The return value.
   */
  getEngineDataVersion(): Version | undefined {
    return this.engineDataVersion
  }

  /**
   * Returns asset `GeomLibrary` that is in charge of rendering geometry data using workers.
   *
   * @return - The return value.
   */
  getGeometryLibrary(): GeomLibrary {
    return this.geomLibrary
  }

  /**
   * Returns `MaterialLibrary` that is in charge of storing all materials of current Item.
   *
   * @return - The return value.
   */
  getMaterialLibrary(): MaterialLibrary {
    return this.materialLibrary
  }

  /**
   * Returns the scale factor of current item.
   * @return - The return value.
   */
  getUnitsConversion(): number {
    return this.unitsScale
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The readBinary method.
   * @param reader - The reader value.
   * @param context - The context value.
   */
  readBinary(reader: BinReader, context: AssetLoadContext): void {
    context.assetItem = this
    context.numTreeItems = 0

    if (!context.units) context.units = 'meters'
    context.numGeomItems = 0

    if (!context.versions['zea-engine']) {
      context.versions['zea-engine'] = new Version(reader.loadStr())
    }
    this.engineDataVersion = context.versions['zea-engine']

    const loadUnits = () => {
      this.units = reader.loadStr()
      // Calculate a scale factor to convert
      // the asset units to meters(the scene units)
      const unitsFactor = getUnitsFactor(this.units)
      const contextUnitsFactor = getUnitsFactor(context.units)
      this.unitsScale = unitsFactor / contextUnitsFactor

      // The context propagates the new units to children assets.
      // This means that a child asset applies a unitsScale relative to this asset.
      context.units = this.units

      // Apply units change to existing Xfo (avoid changing tr).
      const localXfoParam = this.localXfoParam
      const xfo = localXfoParam.value
      xfo.sc.scaleInPlace(this.unitsScale)
      localXfoParam.value = xfo
    }

    if (context.versions['zea-engine'].compare([0, 0, 6]) > 0) {
      // Loading units modifies our Xfo, which then propagates up
      // the tree forcing a re-computation. Better just do it at
      // the start.
      loadUnits()
    }

    let layerRoot: TreeItem
    const layers: Record<string, any> = {}
    context.addGeomToLayer = (geomItem: BaseGeomItem, layer: string) => {
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

    const postLoadCallbacks: Array<() => void> = [] // Post load callbacks.
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
            const item = this.resolvePath(path)
            onSucceed(item)
          } catch (e: any) {
            if (onFail) {
              onFail(e)
            } else {
              throw e
            }
          }
        })
      }
    }
    context.addPLCB = (postLoadCallback) => postLoadCallbacks.push(postLoadCallback)

    this.materialLibrary.readBinary(reader, context)

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
   * @param context - The context value.
   * @return - Returns the json object.
   */
  toJSON(context: Record<string, any> = {}): Record<string, any> {
    context.makeRelative = (path: string[]) => {
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
   * @param j - The json object this item must decode.
   * @param context - The context value.
   */
  fromJSON(j: Record<string, any>, context: Record<string, any> = {}): any {
    if (!context) context = {}

    context.assetItem = this
    context.numTreeItems = 0
    context.numGeomItems = 0
    if (context.version == undefined) context.version = 0

    context.assetItem = this

    const postLoadCallbacks: Array<() => void> = [] // Post load callbacks.
    context.resolvePath = (path: string[], cb: (value: BaseItem | Parameter<any>) => void) => {
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
    context.addPLCB = (postLoadCallback: () => void) => postLoadCallbacks.push(postLoadCallback)

    // Avoid loading the FilePath as we are already loading json data.
    // if (j.params && j.params.FilePath) {
    //   delete j.params.FilePath
    // }

    super.fromJSON(j, context)

    // Invoke all the post-load callbacks to resolve any
    // remaining references.
    for (const cb of postLoadCallbacks) cb()
  }

  // ////////////////////////////////////////
  // Clone and Destroy

  /**
   * The clone method constructs a new tree item, copies its values
   * from this item and returns it.
   *
   * @param context - The context value.
   * @return - Returns a new cloned tree item.
   */
  clone(context?: CloneContext): TreeItem {
    const cloned = new AssetItem()
    cloned.copyFrom(this, context)
    return cloned
  }

  /**
   * Copies current TreeItem with all its children.
   *
   * @param src - The tree item to copy from.
   * @param context - The context value.
   */
  copyFrom(src: AssetItem, context?: CloneContext): void {
    this.geomLibrary = src.geomLibrary
    this.materialLibrary = src.materialLibrary
    this.loaded = src.loaded

    if (!src.loaded) {
      src.once('loaded', (event) => {
        const srcLocalXfo = src.localXfoParam.value
        const localXfo = this.localXfoParam.value
        localXfo.sc = srcLocalXfo.sc.clone()
        this.localXfoParam.value = localXfo

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

export { AssetItem }
