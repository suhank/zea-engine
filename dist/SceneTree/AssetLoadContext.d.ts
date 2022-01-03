import { EventEmitter } from '../Utilities/EventEmitter';
import { Version } from './Version';
import { BaseItem } from './BaseItem';
import { Parameter } from './Parameters/Parameter';
import { AssetItem } from './AssetItem';
import { BaseGeomItem } from './BaseGeomItem';
/**
 * Provides a context for loading assets. This context can provide the units of the loading scene.
 * E.g. you can specify the scene units as 'millimeters' in the context object.
 * To load external references, you can also provide a dictionary that maps filenames to URLs that are used
 * to resolve the URL of an external reference that a given asset is expecting to find.
 */
export declare class AssetLoadContext extends EventEmitter {
    units: string;
    protected assets: Record<string, any>;
    protected resources: Record<string, any>;
    versions: Record<string, Version>;
    url: string;
    folder: string;
    protected sdk: string;
    assetItem: AssetItem;
    numTreeItems: number;
    numGeomItems: number;
    protected postLoadCallbacks: Array<() => void>;
    protected asyncCount: number;
    addGeomToLayer: (geomItem: BaseGeomItem, layer: string) => void;
    /**
     * Create a AssetLoadContext
     * @param context The source context to base this context on.
     */
    constructor(context?: AssetLoadContext);
    /**
     * During loading, asynchronous processes may be launched, and subsequently completed.
     * These method helps the Asset track how many asynchronous loading operations may be
     * occurring with the tree during load.
     * As each external reference starts to load, it increments this counter, letting the owning
     * Asset know to wait till the children are loaded before emitting its own 'loaded' event.
     */
    incrementAsync(): void;
    /**
     * As each external reference completes loading, it decrements this counter allowing the owning
     * asset to know that the subtrees are loaded.
     */
    decrementAsync(): void;
    /**
     * Resolves a path within the loading asset. This is used to connect
     * items within the tree to other items. e.g. a Group can find its members.
     * or an instance can find its source tree.
     * @param path the path within the tree relative to the loading asset
     * @param onSucceed called with the successful result of the path resolution.
     * @param onFail called when the path resolution fails.
     */
    resolvePath(path: Array<string>, onSucceed: (result: BaseItem | Parameter<any>) => void, onFail: (e: Error) => void): void;
    /**
     * Adds a function to be called back once the main load call stack exists.
     * This is used to connect parts of the tree together after loading.
     * e.g. an instance will
     * @param postLoadCallback
     */
    addPLCB(postLoadCallback: () => void): void;
}
