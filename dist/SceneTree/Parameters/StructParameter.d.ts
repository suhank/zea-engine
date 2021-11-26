import { Parameter } from './Parameter';
/**
 * Represents a specific type of parameter, that stores multiple parameters in object format.
 *
 * i.e.:
 * ```javascript
 * const structParam = new StructParameter('MyStructParam')
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(structParam)
 * ```
 *
 * **Events**
 * * **valueChanged:** Triggered whenever parameter's value changes.
 *
 * @extends Parameter
 */
declare class StructParameter extends Parameter<Record<string, unknown>> {
    members: Parameter<unknown>[];
    /**
     * Create a struct parameter.
     * @param name - The name of the struct parameter.
     */
    constructor(name?: string);
    /**
     * The _addMember method.
     * @param parameter - The parameter value.
     * @return - The return value.
     * @private
     */
    protected addMember(parameter: Parameter<any>): Parameter<any>;
    /**
     * The getParameter method.
     *
     * @private
     * @param name - The parameter name.
     * @return - The return value.
     */
    getParameter(name: string): Parameter<unknown> | undefined;
    /**
     * Looks for a member parameter with the specified name and returns it.
     *
     * @param name - The parameter name.
     * @return - The return value.
     */
    getMember(name: string): Parameter<unknown>;
    /**
     * Returns the name of all parameters in StructParameter.
     *
     * @return - The return value.
     */
    getMemberNames(): Array<any>;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context?: Record<string, any>): Record<string, any>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j: Record<string, any>, context: Record<string, any>): void;
    clone(): StructParameter;
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy(): void;
}
export { StructParameter };
