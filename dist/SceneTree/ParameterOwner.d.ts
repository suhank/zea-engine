import { EventEmitter } from '../Utilities/EventEmitter';
import { BinReader } from './BinReader';
import { Parameter } from './Parameters/Parameter';
/**
 * Class that allows other classes to be parameterized by `Parameter` type of objects.
 * Not only hosting parameters, but their events.
 *
 * @extends {EventEmitter}
 */
declare class ParameterOwner extends EventEmitter {
    protected paramEventListenerIDs: Record<string, number>;
    protected paramMapping: Record<string, number>;
    params: Parameter<any>[];
    deprecatedParamMapping: Record<string, any>;
    /**
     * Creates an instance of ParameterOwner by initializing parameter hosting mappings and events.
     *
     * Every Object has a unique identifier which is based on a counter that is incremented.
     */
    constructor();
    /**
     * Returns the number of parameters current object has.
     *
     * @return - Amount of parameters in current object.
     */
    getNumParameters(): number;
    /**
     * Returns all the parameters of the object.
     *
     * @return - Parameter List
     */
    getParameters(): Parameter<any>[];
    /**
     * Returns the index of a parameter in parameter list.
     *
     * @param paramName - Name of the parameter.
     * @return - Position in the array
     */
    getParameterIndex(paramName: string): number;
    /**
     * Returns `Parameter` object in a given index
     *
     * @param index - Position of the parameter in the array
     * @return - Parameter object value
     */
    getParameterByIndex(index: number): Parameter<any>;
    /**
     * Validates if the specified parameter exists in the object.
     *
     * @param paramName - The parameter name.
     * @return - The return value.
     */
    hasParameter(paramName: string): boolean;
    /**
     * Add a mapping from one name to a new parameter.
     * This is used to handle migrating parameters to new names.
     *
     * @param key - The parameter name.
     * @param paramName - The parameter name.
     * @return - The return value.
     */
    addParameterDeprecationMapping(key: string, paramName: string): void;
    /**
     * Returns `Parameter` object using the given name
     *
     * @param paramName - The parameter name.
     * @return - Parameter object value
     */
    getParameter(paramName: string): Parameter<any> | null;
    /**
     * This method can be overridden in derived classes
     * to perform general updates (see GLPass or BaseItem).
     * @param event - The event object emitted by the parameter.
     * @private
     */
    protected parameterValueChanged(event: Record<string, unknown>): void;
    /**
     * Adds `Parameter` object to the owner's parameter list.
     *
     * @emits `parameterAdded` with the name of the param.
     * @param param - The parameter to add.
     * @return - With `owner` and `valueChanged` event set.
     */
    addParameter(param: Parameter<any>): Parameter<any>;
    /**
     * Adds `Parameter` object to the owner's parameter list using the index.
     * It replaces the event in the specified index.
     *
     *
     * @emits `parameterAdded` with the name of the param.
     * @param param - The parameter to insert.
     * @param index - The index value.
     * @return - With `owner` and `valueChanged` event set.
     */
    insertParameter(param: Parameter<any>, index: number): Parameter<any>;
    /**
     * Removes `Parameter` from owner, by using parameter's name.
     * @emits `parameterRemoved` with the name of the param.
     * @param name - The parameter name.
     */
    removeParameter(name: string): void;
    /**
     * Replaces old `Parameter` by passing a new one with the same name.
     *
     * @param param - The parameter to replace.
     * @return - `Parameter` with `valueChanged` event set.
     */
    replaceParameter(param: Parameter<any>): Parameter<any>;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context?: Record<string, unknown>): Record<string, unknown>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param json - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(json: Record<string, any>, context?: Record<string, any>): void;
    /**
     * Uses passed in BinReader object(containing an Int32 array with all the parameters) to reconstruct all parameters state.
     *
     * In each iteration of the array, propType and propName are extracted and
     * used to build the right `Parameter` class. Then all of them are added to the object.
     *
     * @emits `parameterAdded` with the name of the param.
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader: BinReader, context: Record<string, any>): void;
    /**
     * Converts object's JSON value and converts it to a string.
     * @param context
     * @return - String of object's parameter list state.
     */
    toString(context: Record<string, any>): string;
    /**
     * Copies Parameters from another `ParameterOwner` to current object.
     *
     * @param src - The ParameterOwner copy from.
     * @param context - The context value
     */
    copyFrom(src: ParameterOwner, context?: Record<string, any>): void;
}
export { ParameterOwner };
