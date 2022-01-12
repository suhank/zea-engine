/* eslint-disable no-unused-vars */
import { Registry } from "../../Registry"
import { SystemDesc } from "../../SystemDesc"
import { AssetItem } from "../AssetItem"
import { AssetLoadContext } from "../AssetLoadContext"
import { BinReader } from "../BinReader"
import { CloneContext } from "../CloneContext"
import { resourceLoader } from "../resourceLoader"
import { Version } from "../Version"

/**
 * Class representing a CAD asset.
 *
 * **Events**
 * * **loaded:** Triggered when the  asset is loaded
 * @extends AssetItem
 */
class CADAsset extends AssetItem {
  cadfileVersion: Version
  numCADBodyItems: number
  __loadPromise: any
  url: string
  __datafileLoaded: () => void
  __datafileParam: any
  /**
   * Create a CAD asset.
   * @param {string} name - The name value.
   */
  constructor(name?: string) {
    super(name)
    this.cadfileVersion = new Version('0,0,0')
  }

  /**
   * The clone method constructs a new XRef, copies its values
   * from this item and returns it.
   *
   * @param {number} flags - The flags param.
   * @return {XRef} - The return value.
   */
  clone(context?: CloneContext): CADAsset {
    const cloned = new CADAsset()
    cloned.copyFrom(this, context)
    return cloned
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * Returns the versioon of the data loaded by thie CADAsset.
   *
   * @return {string} - The return value.
   */
  getVersion(): Version{
    return this.cadfileVersion
  }

  /**
   * Initializes CADAsset's asset, material, version and layers; adding current `CADAsset` Geometry Item toall the layers in reader
   *
   * @param {BinReader} reader - The reader param.
   * @param {AssetLoadContext} context - The load context object that provides additional data such as the units of the scene we are loading into.
   */
  readRootLevelBinary(reader: BinReader, context: AssetLoadContext): void {
    this.numCADBodyItems = 0

    context.versions['zea-cad'] = new Version(reader.loadStr())
    // @ts-ignore
    context.sdk = reader.loadStr()
    this.cadfileVersion = context.versions['zea-cad']
    // console.log('Loading CAD File version:', this.cadfileVersion, ' exported using SDK:', context.cadSDK)

    super.readBinary(reader, context)
  }

  /**
   * Loads all the geometries and metadata from the asset file.
   * @param {string} url - The URL of the asset to load
   * @param {AssetLoadContext} context - The load context object that provides additional data such as paths to external references.
   * @return {Promise} - Returns a promise that resolves once the load of the tree is complete. Geometries, textures and other resources might still be loading.
   */
  load(url: string, context = new AssetLoadContext()): any{
    if (this.__loadPromise) return this.__loadPromise
    this.__loadPromise = new Promise((resolve, reject) => {
      const folder = url.lastIndexOf('/') > -1 ? url.substring(0, url.lastIndexOf('/')) + '/' : ''
      const filename = url.lastIndexOf('/') > -1 ? url.substring(url.lastIndexOf('/') + 1) : ''
      const stem = filename.substring(0, filename.lastIndexOf('.'))

      this.url = url

      // These values are used by XRef to generate URLS.
      context.assetItem = <AssetItem>this
      context.url = url
      context.folder = folder
      // TODO: resources not accessible
      // @ts-ignore
      if (!context.resources) context.resources = {}
      // TODO: xrefs doesn't exist on context
      // @ts-ignore
      context.xrefs = {}

      context.on('done', () => {
        this.loaded = true
        // @ts-ignore
        resolve()
        this.emit('loaded')
      })

      context.incrementAsync()

      // Increment the resource loader counter to provided an update to the progress bar.
      // preload in case we don't have embedded geoms.
      // completed by geomLibrary.on('loaded' ..
      resourceLoader.incrementWorkload(1)
      this.geomLibrary.once('loaded', () => {
        // A chunk of geoms are now parsed, so update the resource loader.
        resourceLoader.incrementWorkDone(1)
      })

      resourceLoader.loadFile('archive', url).then(
        (entries) => {
          // const desc = entries['desc.json']
          //   ? JSON.parse(new TextDecoder('utf-8').decode(entries['desc.json']))
          //   : { numGeomFiles: 0 }

          const treeReader = new BinReader((entries.tree2 || entries.tree).buffer, 0, SystemDesc.isMobileDevice)

          const name = this.getName()
          this.readRootLevelBinary(treeReader, context)

          // Maintain the name provided by the user before loading.
          if (name != '') this.setName(name)

          context.versions['zea-cad'] = this.getVersion()
          context.versions['zea-engine'] = this.getEngineDataVersion()

          if (entries.geoms) {
            this.geomLibrary.readBinaryBuffer(filename, entries.geoms.buffer, context)
          } else if (entries['geomLibrary.json']) {
            entries['desc.json']
            const geomLibraryJSON = JSON.parse(new TextDecoder('utf-8').decode(entries['geomLibrary.json']))
            const basePath = folder + stem
            this.geomLibrary.loadGeomFilesStream(geomLibraryJSON, basePath, context)
          } else {
            // No geoms in this file, so we won't wait for the 'done' event in the GeomLibrary.
            resourceLoader.incrementWorkDone(1)
          }

          // console.log(this.__name, " NumBaseItems:", this.getNumBaseItems(), " NumCADBodyItems:", this.numCADBodyItems)
          context.decrementAsync()
        },
        (error) => {
          resourceLoader.incrementWorkDone(1)
          this.emit('error', error)
          reject(error)
        }
      )
    })

    return this.__loadPromise
  }

  // ////////////////////////////////////////
  // Persistence
  
  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {object} j - The json object this item must decode.
   * @param {object} context - The context param.
   * @param {callback} onDone - The onDone param.
   */
  // TODO: can't pass in onDone
  fromJSON(j: Record<string, any>, context: Record<string, any>): void { //, onDone
    const loadAssetJSON = () => {
      //const flags = TreeItem.LoadFlags.LOAD_FLAG_LOADING_BIN_TREE_VALUES
      super.fromJSON(j, context) //, flags, onDone
      context.decAsyncCount()

      // If the asset is nested within a bigger asset, then
      // this subtree can noow be flagged as loded(and added to the renderer);
      if (!this.loaded) {
        this.emit('loaded')
        this.loaded = true
      }
    }

    if (j.params && j.params.DataFilePath) {
      this.__datafileLoaded = loadAssetJSON
      context.incAsyncCount()
      const filePathJSON = j.params.DataFilePath
      delete j.params.DataFilePath
      this.__datafileParam.fromJSON(filePathJSON, context)
    } else {
      loadAssetJSON()
    }
  }
}

Registry.register('CADAsset', CADAsset)

export { CADAsset }
