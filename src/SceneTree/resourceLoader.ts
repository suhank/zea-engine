/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
import { EventEmitter } from '../Utilities/index'
import { TreeItem } from './TreeItem'

/**
 * Class for delegating resource loading, enabling an abstraction of a cloud file system to be implemented.
 *
 * The resource loader can be used to load data, where it provides central tracking of loading progress and functionality to load various file types, including compressed archives.
 * The plugins script must be loaded along with the engine
 *
 * ```html
 *  <script crossorigin src="libs/zea-engine/dist/plugins.umd.js"></script>
 * ```
 *
 * To load a 'text' file.
 * ```javascript
 *   resourceLoader.loadFile('text', url).then((txt) =>{
 *      console.log(txt)
 *   })
 * ```
 *
 * To load a 'JSON' file.
 * ```javascript
 *   resourceLoader.loadFile('json', url).then((txt) =>{
 *      console.log(json)
 *   })
 * ```
 *
 * To load a 'binary' file.
 * ```javascript
 *   resourceLoader.loadFile('binary', url).then((arrayBuffer) =>{
 *      console.log(arrayBuffer.length)
 *   })
 * ```
 *
 * To load an 'archive' file that is a compressed archive containing multiple sub-files.
 * ```javascript
 *   resourceLoader.loadFile('archive', url).then((entries) =>{
 *      console.log(entries)
 *   })
 * ```
 *
 * **Events**
 * * **loaded:** emitted when a file has finished loading
 * * **progressIncremented:** emitted when a loading of processing task has been incremented
 * * **allResourcesLoaded:** emitted when all outstanding resources are loaded. This event can be used to signal the completion of load.
 */
class ResourceLoader extends EventEmitter {
  protected __totalWork: number
  protected __doneWork: number
  protected baseUrl: string = ''
  protected plugins: Record<string, any>
  public systemUrls: Record<string, string>
  public commonResources: Record<string, TreeItem>
  /**
   * Create a resource loader.
   */
  constructor() {
    super()

    this.__totalWork = 0
    this.__doneWork = 0

    this.plugins = {}

    this.systemUrls = {}

    const baseUrl = 'https://storage.googleapis.com/visualive-tmp/zea-engine-resources'
    this.systemUrls['ZeaEngine/Vive.vla'] = baseUrl + '/Vive.vla'
    this.systemUrls['ZeaEngine/Oculus.vla'] = baseUrl + '/Oculus.vla'

    // Common resources are used by systems such at the renderer and VR controllers.
    // Any asset that will probably be used my multiple different independent objects
    // should be loaded here. (For now, it is being used to load VR Controller assets.)
    this.commonResources = {}
  }

  // /////////////////////////////////////////////////
  // Register plugins.
  registerPlugin(plugin: any): void {
    plugin.init(this)
    this.plugins[plugin.getType()] = plugin
  }

  /**
   * Loads a  file, returning a promise that resolves to the JSON data value.
   * Note: using the resource loader to centralize data loading enables progress to be tracked and displayed
   * @param url - The url of the data to load.
   * @return - The promise value.
   */
  loadFile(type: any, url: string): Promise<any> {
    const plugin = this.plugins[type]

    if (!plugin) {
      throw new Error(
        `There's no plugin registered for the type of file "${type}". Did you add the plugins script? See: https://docs.zea.live/zea-engine/#/adding-default-plugins`
      )
    }

    this.incrementWorkload()

    const promise = plugin.loadFile(url)

    promise.then(
      () => {
        this.incrementWorkDone()
        this.emit('loaded', { url })
      },
      () => {
        // Error
        this.incrementWorkDone()
      }
    )

    return promise
  }

  /**
   * Returns a previously stored common resource. Typically this would be a VR asset.
   *
   * @param resourceId - The resourceId value.
   * @return - The common resource if it exists
   */
  getCommonResource(resourceId: string): TreeItem | null {
    return this.commonResources[resourceId]
  }

  /**
   * Saves a common resource for reuse by other tools. Typically this would be a VR asset.
   *
   * @param resourceId - The resourceId value.
   * @param resource - The common resource to store
   */
  setCommonResource(resourceId: string, resource: TreeItem) {
    this.commonResources[resourceId] = resource
  }

  // /////////////////////////////////////////////////
  // Work

  /**
   * Increments the amount of work to be done causing a 'progressIncremented' event to be emitted
   * As the workload is incremented, the progress might retract as a lower proportion of the work
   * is then considered done. Only once this work is completed, and the 'incrementWorkDone', the
   * progress will increment.
   *
   * @param amount - The amount value.
   */
  incrementWorkload(amount = 1) {
    this.__totalWork += amount
    const percent = (this.__doneWork / this.__totalWork) * 100
    this.emit('progressIncremented', { percent })
  }

  /**
   * Increments the amount of work done causing a 'progressIncremented' event to be emitted.
   * If 5 items of work have been added using #incrementWorkload, and subsequently 3 items have
   * been completed and #incrementWorkDone called. The progress will be at 3/5, or 60%
   *
   * @param amount - The amount value.
   */
  incrementWorkDone(amount = 1) {
    this.__doneWork += amount

    const percent = (this.__doneWork / this.__totalWork) * 100
    this.emit('progressIncremented', { percent })
    if (this.__doneWork > this.__totalWork) {
      throw new Error('Mismatch between work loaded and work done.')
    }
  }
}

const resourceLoader = new ResourceLoader()

import { ArchiveUnpackerPlugin } from './ResourceLoader/ArchiveUnpackerPlugin'
import { JsonLoaderPlugin } from './ResourceLoader/JsonLoaderPlugin'
import { TextLoaderPlugin } from './ResourceLoader/TextLoaderPlugin'
import { BinaryLoaderPlugin } from './ResourceLoader/BinaryLoaderPlugin'

const archiveUnpackerPlugin = new ArchiveUnpackerPlugin()
resourceLoader.registerPlugin(archiveUnpackerPlugin)

const jsonLoaderPlugin = new JsonLoaderPlugin()
resourceLoader.registerPlugin(jsonLoaderPlugin)

const textLoaderPlugin = new TextLoaderPlugin()
resourceLoader.registerPlugin(textLoaderPlugin)

const binaryLoaderPlugin = new BinaryLoaderPlugin()
resourceLoader.registerPlugin(binaryLoaderPlugin)

export { ResourceLoader, resourceLoader }
