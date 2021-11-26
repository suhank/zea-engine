import { EventEmitter } from '../Utilities/index';
import { Material } from './Material';
import { BaseItem } from './BaseItem';
import { BinReader } from '..';
import { BaseImage } from './BaseImage';
import { Parameter } from './Parameters/Parameter';
import { Owner } from './Owner';
/** Class representing a material library in a scene tree.
 * @private
 */
declare class MaterialLibrary extends EventEmitter implements Owner {
    protected lod: number;
    protected __name: string;
    protected __images: Record<string, BaseImage>;
    protected __materials: Record<string, Material>;
    protected name: string;
    /**
     * Create a material library.
     * @param name - The name of the material library.
     */
    constructor(name?: string);
    /**
     * The clear method.
     */
    clear(): void;
    /**
     * The getPath method.
     * @return - The return value.
     */
    getPath(): string[];
    /**
     * The resolvePath method traverses the subtree from this item down
     * matching each name in the path with a child until it reaches the
     * end of the path.
     *
     * @param path - The path value.
     * @param index - The index value.
     * @return - The return value.
     */
    resolvePath(path: string | string[], index?: number): BaseItem | Parameter<any> | null;
    /**
     * The getNumMaterials method.
     * @return - The return value.
     */
    getNumMaterials(): number;
    /**
     * The getMaterials method.
     * @return - The return value.
     */
    getMaterials(): Material[];
    /**
     * The getMaterialNames method.
     * @return - The return value.
     */
    getMaterialNames(): any[];
    /**
     * The hasMaterial method.
     * @param name - The name value.
     * @return - The return value.
     */
    hasMaterial(name: string): boolean;
    /**
     * Add a material.
     * @param material - The material value.
     */
    addMaterial(material: Material): void;
    /**
     * The getMaterial method.
     * @param name - The material name.
     * @param assert - The assert value.
     * @return - The return value.
     */
    getMaterial(name: string, assert?: boolean): Material;
    /**
     * The hasImage method.
     * @param name - The material name.
     * @return - The return value.
     */
    hasImage(name: string): boolean;
    /**
     * The addImage method.
     * @param image - The image value.
     */
    addImage(image: BaseImage): void;
    /**
     * The getImage method.
     * @param name - The material name.
     * @param assert - The assert value.
     * @return - The return value.
     */
    getImage(name: string, assert?: boolean): BaseImage;
    /**
     * The getImageNames method.
     * @return - The return value.
     */
    getImageNames(): any[];
    /**
     * The load method.
     * @param filePath - The file path.
     */
    load(filePath: string): void;
    /**
     * The toJSON method encodes the current object as a json object.
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context?: Record<string, any>): {
        numMaterials: number;
    };
    /**
     * The fromJSON method decodes a json object for this type.
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j: Record<string, any>, context?: Record<string, any>): void;
    /**
     * The readBinary method.
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader: BinReader, context?: Record<string, any>): void;
    /**
     * The toString method.
     * @return - The return value.
     */
    toString(): string;
}
export { MaterialLibrary };
