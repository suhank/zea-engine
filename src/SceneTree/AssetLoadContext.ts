import { EventEmitter } from '../Utilities/EventEmitter'
import { Version } from './Version'
import { BaseItem } from './BaseItem'
import { Parameter } from './Parameters/Parameter'

/**
 * Provides a context for loading assets. This context can provide the units of the loading scene.
 * E.g. you can specify the scene units as 'millimeters' in the context object.
 * To load external references, you can also provide a dictionary that maps filenames to URLs that are used
 * to resolve the URL of an external reference that a given asset is expecting to find.
 */
export class AssetLoadContext extends EventEmitter {
  units: string
  protected assets: Record<string, any>
  protected resources: Record<string, any>
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
   * @param context The source context to base this context on.
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
   * @param path the path within the tree relative to the loading asset
   * @param onSucceed called with the successful result of the path resolution.
   * @param onFail called when the path resolution fails.
   */
  resolvePath(path: Array<string>, onSucceed: (result: BaseItem | Parameter<any>) => void, onFail: () => void) {
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
        } catch (e: any) {
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
   * @param postLoadCallback
   */
  addPLCB(postLoadCallback: any) {
    this.postLoadCallbacks.push(postLoadCallback)
  }
}
