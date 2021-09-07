import { SystemDesc } from '../SystemDesc'
import { FilePathParameter } from './Parameters/FilePathParameter'
import { AssetItem, AssetLoadContext } from './AssetItem'
import { BinReader } from './BinReader'
import { resourceLoader } from './resourceLoader'
import { Registry } from '../Registry'
import { Version } from './Version'

/**
 * Class designed to load and handle `.vla` files.
 *
 * **Parameters**
 * * **DataFilePath(`FilePathParameter`):** Used to specify the path to the file.
 *
 * **Events**
 * * **loaded:** Triggered once the tree is loaded. Note: the tree bounding box is valid once the tree is loaded.
 * * **geomsLoaded:** Triggered once all geometries are loaded.
 *
 * @extends AssetItem
 */
class VLAAsset extends AssetItem {
  protected __fileParam: FilePathParameter
  protected __datafileLoaded: any
  /**
   * Create a VLA asset.
   * @param {string} name - The name value.
   */
  constructor(name?: string) {
    super(name)

    // A signal that is emitted once all the geometries are loaded.
    // Often the state machine will activate the
    // first state when this signal emits.
    this.__geomLibrary.on('loaded', () => {
      this.emit('geomsLoaded')
    })

    this.__fileParam = <FilePathParameter>this.addParameter(new FilePathParameter('FilePath'))

    this.addParameterDeprecationMapping('DataFilePath', 'FilePath') // Note: migrating from 'DataFilePath' to 'FilePath'

    this.__fileParam.on('valueChanged', () => {
      const url = this.__fileParam.getUrl()
      this.load(url)
    })
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * Sets state of current asset using a binary reader object.
   *
   * @param {BinReader} reader - The reader value.
   * @param {AssetLoadContext } context - The context value.
   * @return {number} - The return value.
   */
  readBinary(reader: BinReader, context: AssetLoadContext) {
    if (context.versions['zea-engine']) {
      // Necessary for the smart lok
    } else {
      // Now we split the mesh out from the engine version.
      context.versions['zea-mesh'] = new Version(reader.loadStr())
    }
    // console.log('Loading Mesh File version:', context.versions['zea-mesh'])

    const numGeomsFiles = reader.loadUInt32()

    super.readBinary(reader, context)

    if (context.versions['zea-engine'].compare([2, 1, 0]) < 0) {
      // Some data is no longer being read at the end of the buffer
      // so we skip to the end here.
      // The data was the atlas size of the lightmap that we no longer support.
      reader.loadFloat32Vec2()
    }
    this.__geomLibrary.setNumGeoms(reader.loadUInt32())

    return numGeomsFiles
  }

  /**
   * Loads all the geometries and metadata from the asset file.
   * @param {string} url - The URL of the asset to load
   * @param {AssetLoadContext} context - The load context object that provides additional data such as the units of the scene we are loading into.
   * @return {Promise} - Returns a promise that resolves once the initial load is complete
   */
  load(url: string, context: AssetLoadContext = new AssetLoadContext()): Promise<void> {
    return new Promise((resolve, reject) => {
      const folder = url.lastIndexOf('/') > -1 ? url.substring(0, url.lastIndexOf('/')) + '/' : ''
      const filename = url.lastIndexOf('/') > -1 ? url.substring(url.lastIndexOf('/') + 1) : ''
      const stem = filename.substring(0, filename.lastIndexOf('.'))
      let numGeomsFiles = 0

      context.assetItem = this
      context.url = url
      context.folder = folder

      // preload in case we don't have embedded geoms.
      // completed by geomLibrary.on('loaded' ..
      resourceLoader.incrementWorkload(1)
      // To ensure that the resource loader knows when
      // parsing is done, we listen to the GeomLibrary streamFileLoaded
      // signal. This is fired once the entire stream is parsed.
      this.__geomLibrary.on('loaded', () => {
        // A chunk of geoms are now parsed, so update the resource loader.
        resourceLoader.incrementWorkDone(1)
      })

      resourceLoader.loadFile('archive', url).then(
        (entries: any) => {
          // Load the tree file. This file contains
          // the scene tree of the asset, and also
          // tells us how many geom files will need to be loaded.

          let treeReader
          if (entries.tree2) {
            treeReader = new BinReader(entries.tree2.buffer, 0, SystemDesc.isMobileDevice)
          } else {
            const entry = entries.tree ? entries.tree : entries[Object.keys(entries)[0]]
            treeReader = new BinReader(entry.buffer, 0, SystemDesc.isMobileDevice)
            context.versions['zea-engine'] = new Version()
          }

          numGeomsFiles = this.readBinary(treeReader, context)

          this.loaded = true
          this.emit('loaded')

          if (numGeomsFiles == 0 && entries.geoms) {
            this.__geomLibrary.readBinaryBuffer(filename, entries.geoms.buffer, context)
          } else {
            const basePath = folder + stem
            const geomLibraryJSON = {
              numGeomsPerFile: numGeomsFiles,
              numGeoms: this.__geomLibrary.getNumGeoms() // Note: was set during readBinary.Why do we need to provide this again?
            }
            this.__geomLibrary.loadGeomFilesStream(geomLibraryJSON, basePath, context)
          }
          resolve()
        },
        (error: any) => {
          this.emit('error', error)
          reject(error)
        }
      )
    })
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {Record<any,any>} j - The json object this item must decode.
   * @param {AssetLoadContext} context - The load context object that provides additional data such as the units of the scene we are loading into.
   * @param {function} onDone - The onDone value.
   */
  fromJSON(j: Record<string, any>, context?: Record<string, any>, onDone?: any) {
    if (!context) context = {}
    context.assetItem = this

    const loadAssetJSON = () => {
      super.fromJSON(j, context, onDone)
      if (onDone) onDone()
    }

    if (j.params && j.params.DataFilePath) {
      // Save the callback function for later.
      this.__datafileLoaded = loadAssetJSON
      const filePathJSON = j.params.DataFilePath
      delete j.params.DataFilePath
      this.__fileParam.fromJSON(filePathJSON, context)
    } else {
      loadAssetJSON()
    }
  }
}

Registry.register('VLAAsset', VLAAsset)

export { VLAAsset }
