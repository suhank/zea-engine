import { Parameter } from './Parameter';
/**
 * Represents a specific type of parameter, that only stores file data values.
 *
 * **Events**
 * * **valueChanged:** Triggered when setting file's URL.
 * * **fileUpdated:** Triggered when parameter's value is updated.
 *
 * @extends Parameter
 */
declare class FilePathParameter extends Parameter<string> {
    /**
     * Create a file path parameter.
     *
     * @param name - The name of the file path parameter.
     * @param exts - The exts value.
     */
    constructor(name?: string);
    /**
     * Returns parameter's file name
     *
     * @return - The return value.
     */
    getFilename(): string;
    /**
     * Returns parameter's file extension
     *
     * @return - The return value.
     */
    getExt(): string | undefined;
    /**
     * Returns parameter's file name without extension
     *
     * @return - The return value.
     */
    getStem(): string | null;
    /**
     * Sets file parameter value
     *
     * @param value - The value param.
     */
    setValue(value: string): void;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context?: Record<string, any>): Record<string, unknown>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j: Record<string, unknown>, context?: Record<string, any>): void;
    /**
     * The clone method constructs a new file path parameter,
     * copies its values from this parameter and returns it.
     *
     * @return - Returns a new cloned file path parameter.
     */
    clone(): FilePathParameter;
}
export { FilePathParameter };
