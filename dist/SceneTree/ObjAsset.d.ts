import { AssetItem } from './AssetItem';
import { BooleanParameter, NumberParameter, StringParameter } from './Parameters/index';
/**
 * Class designed to load and handle `.obj` files.
 * Which define the geometry and other properties for objects.
 *
 * **Parameters**
 * * **splitObjects(`BooleanParameter`):** _todo_
 * * **splitGroupsIntoObjects(`BooleanParameter`):** _todo_
 * * **loadMtlFile(`BooleanParameter`):** _todo_
 * * **unitsConversion(`NumberParameter`):** _todo_
 * * **defaultShader(`StringParameter`):** _todo_
 *
 * **Events**
 * * **loaded:** Triggered once everything is loaded.
 * * **geomsLoaded:** Triggered once all geometries are loaded.
 *
 * @extends AssetItem
 */
declare class ObjAsset extends AssetItem {
    splitObjects: BooleanParameter;
    splitGroupsIntoObjects: BooleanParameter;
    loadMtlFile: BooleanParameter;
    unitsConversion: NumberParameter;
    defaultShader: StringParameter;
    /**
     * Create an obj asset.
     * @param name - The name of the object asset.
     */
    /**
     * @member splitObjectsParam - TODO
     */
    splitObjectsParam: BooleanParameter;
    /**
     * @member splitGroupsIntoObjectsParam - TODO
     */
    splitGroupsIntoObjectsParam: BooleanParameter;
    /**
     * @member loadMtlFileParam - TODO
     */
    loadMtlFileParam: BooleanParameter;
    /**
     * @member unitsConversionParam - TODO
     */
    unitsConversionParam: NumberParameter;
    /**
     * @member defaultShaderParam - The default shader to use.
     */
    defaultShaderParam: StringParameter;
    constructor(name: string);
    /**
     * Loads all the geometries and metadata from the Obj file.
     * @param url - The URL of the asset to load
     * @return - Returns a promise that resolves once the initial load is complete
     */
    load(url: string): Promise<void>;
}
export { ObjAsset };
