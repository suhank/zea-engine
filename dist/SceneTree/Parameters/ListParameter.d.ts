import { Parameter } from './Parameter';
/**
 * A Parameter for storing list(array) values.
 *
 * i.e.:
 * ```javascript
 * const listParam = new ListParameter('MyList', GearParameter)
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(listParam)
 * ```
 *
 * **Events**
 * * **valueChanged:** Triggered when setting a value changes in the array(insert, add, remove).
 * * **elementAdded:** Triggered when an element is added to the array(add, insert).
 * * **elementRemoved:** Triggered when an element is removed from the array
 *
 * @extends Parameter
 */
declare class ListParameter extends Parameter<any[]> {
    /**
     * Create a list parameter.
     * @param name - The name of the list parameter.
     * @param dataType - The dataType value.
     */
    constructor(name?: string, dataType?: string);
    /**
     * The filter method.
     * @param item - The item value.
     * @return - The return value.
     *
     * @private
     */
    protected filter(item: unknown): boolean;
    /**
     * Returns the count of items in the array.
     *
     * @return - The return value.
     */
    getCount(): number;
    /**
     * Returns value from the array in the specified index.
     *
     * @param index - The index value.
     * @return - The return value.
     */
    getElement(index: number): unknown;
    /**
     * Sets a value in the specified array's index.
     *
     * @param index - The index value.
     * @param value - The value value.
     */
    setElement(index: number, value: unknown): void;
    /**
     * Adds a new element at the end of the array pile.
     *
     * @param elem - The elem value.
     * @return - The return value.
     */
    addElement(elem: unknown): unknown;
    /**
     * Removes an array element from the specified index
     *
     * @param index - The index value.
     */
    removeElement(index: number): void;
    /**
     * Inserts a new element in the specified index.
     *
     * @param index - The index value.
     * @param elem - The elem value.
     */
    insertElement(index: number, elem: unknown): void;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context: Record<string, any>): Record<string, any>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j: Record<string, any>, context?: Record<string, any>): void;
    /**
     * The clone method constructs a new list parameter, copies its values
     * from this parameter and returns it.
     *
     * @return - Returns a new list parameter.
     */
    clone(): ListParameter;
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy(): void;
}
export { ListParameter };
