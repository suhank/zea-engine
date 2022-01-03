import { BaseProxy } from './Geometry/GeomProxies';
import { EventEmitter } from '../Utilities/index';
import { BaseGeom } from './Geometry/BaseGeom';
import { AssetLoadContext } from './AssetLoadContext';
interface StreamInfo {
    total: number;
    done: number;
}
/** Class representing a geometry library.
 */
declare class GeomLibrary extends EventEmitter {
    protected listenerIDs: Record<string, number>;
    protected __streamInfos: Record<string, StreamInfo>;
    protected __genBuffersOpts: Record<string, any>;
    protected loadCount: number;
    protected queue: any[];
    protected loadContext?: AssetLoadContext;
    protected __numGeoms: number;
    protected geoms: Array<BaseProxy | BaseGeom>;
    protected basePath: string;
    protected __loadedCount: number;
    /**
     * Create a geom library.
     */
    constructor();
    /**
     * The clear method.
     */
    clear(): void;
    /**
     * The returns true if all the geometries have been loaded and the loaded event has already been emitted.
     * @return - True if all geometries are already loaded, else false.
     */
    isLoaded(): boolean;
    /**
     * Loads a single geometry file for this GeomLibrary.
     *
     * @private
     *
     * @param geomFileID - The index of the file to load
     * @param incrementProgress - If true, the progress bar is incremented and decremented.
     * @return the promise resolves once the file is loaded, but not parsed.
     */
    loadGeomFile(geomFileID: number, incrementProgress?: boolean): Promise<void>;
    /**
     * Loads the geometry files for this GeomLibrary.
     * @param geomLibraryJSON - The json data describing the data needed to be loaded by the geom library
     * @param basePath - The base path of the file. (this is theURL of the zcad file without its extension.)
     * @param context - The value param.
     */
    loadGeomFilesStream(geomLibraryJSON: Record<string, any>, basePath: string, context: AssetLoadContext): void;
    /**
     * The setGenBufferOption method.
     * @param key - The key value.
     * @param value - The value param.
     */
    setGenBufferOption(key: string, value: any): void;
    /**
     * The setNumGeoms method.
     * @param expectedNumGeoms - The expectedNumGeoms value.
     */
    setNumGeoms(expectedNumGeoms: number): void;
    /**
     * Returns the number of geometries the GeomLibrary has, or will have at the end of loading.
     * @return - The number of geometries.
     */
    getNumGeoms(): number;
    /**
     * The getGeom method.
     * @param index - The index value.
     * @return - The stored geometry
     */
    getGeom(index: number): BaseGeom | BaseProxy;
    /**
     * The readBinaryBuffer method.
     * @param geomFileID - The key value.
     * @param buffer - The buffer value.
     * @param context - The context value.
     */
    readBinaryBuffer(geomFileID: string, buffer: ArrayBuffer, context: Record<string, any>): void;
    /**
     * The __receiveGeomDatas method.
     * @private
     * @param data - The data received back from the web worker
     * @return - returns true once all data for this geom library has been loaded.
     */
    __receiveGeomDatas(data: object): boolean;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     * @return - Returns the json object.
     */
    toJSON(): Record<string, any>;
    /**
     * The toString method.
     * @return - The return value.
     */
    toString(): string;
    static shutDownWorkers(): void;
}
export { GeomLibrary };
