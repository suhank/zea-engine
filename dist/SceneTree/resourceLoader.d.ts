import { EventEmitter } from '../Utilities/index';
import { TreeItem } from './TreeItem';
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
declare class ResourceLoader extends EventEmitter {
    protected __totalWork: number;
    protected __doneWork: number;
    protected baseUrl: string;
    protected plugins: Record<string, any>;
    systemUrls: Record<string, string>;
    commonResources: Record<string, TreeItem>;
    /**
     * Create a resource loader.
     */
    constructor();
    registerPlugin(plugin: any): void;
    /**
     * Loads a  file, returning a promise that resolves to the JSON data value.
     * Note: using the resource loader to centralize data loading enables progress to be tracked and displayed
     * @param url - The url of the data to load.
     * @return - The promise value.
     */
    loadFile(type: string, url: string): Promise<any>;
    /**
     * Returns a previously stored common resource. Typically this would be a VR asset.
     *
     * @param resourceId - The resourceId value.
     * @return - The common resource if it exists
     */
    getCommonResource(resourceId: string): TreeItem | null;
    /**
     * Saves a common resource for reuse by other tools. Typically this would be a VR asset.
     *
     * @param resourceId - The resourceId value.
     * @param resource - The common resource to store
     */
    setCommonResource(resourceId: string, resource: TreeItem): void;
    /**
     * Increments the amount of work to be done causing a 'progressIncremented' event to be emitted
     * As the workload is incremented, the progress might retract as a lower proportion of the work
     * is then considered done. Only once this work is completed, and the 'incrementWorkDone', the
     * progress will increment.
     *
     * @param amount - The amount value.
     */
    incrementWorkload(amount?: number): void;
    /**
     * Increments the amount of work done causing a 'progressIncremented' event to be emitted.
     * If 5 items of work have been added using #incrementWorkload, and subsequently 3 items have
     * been completed and #incrementWorkDone called. The progress will be at 3/5, or 60%
     *
     * @param amount - The amount value.
     */
    incrementWorkDone(amount?: number): void;
}
declare const resourceLoader: ResourceLoader;
export { ResourceLoader, resourceLoader };
