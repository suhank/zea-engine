import { EventEmitter } from '../Utilities/EventEmitter';
/**
 * Provides a context for loading assets. This context can provide the units of the loading scene.
 * E.g. you can specify the scene units as 'millimeters' in the context object.
 * To load external references, you can also provide a dictionary that maps filenames to URLs that are used
 * to resolve the URL of an external reference that a given asset is expecting to find.
 */
export class CloneContext extends EventEmitter {
    /**
     * Create a AssetLoadContext
     * @param context The source context to base this context on.
     */
    constructor() {
        super();
        this.assetItem = null;
    }
}
//# sourceMappingURL=CloneContext.js.map