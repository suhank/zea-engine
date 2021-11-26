/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Registry } from '../../Registry';
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
class StructParameter extends Parameter {
    /**
     * Create a struct parameter.
     * @param name - The name of the struct parameter.
     */
    constructor(name) {
        super(name, {}, 'Struct');
        this.members = [];
    }
    /**
     * The _addMember method.
     * @param parameter - The parameter value.
     * @return - The return value.
     * @private
     */
    addMember(parameter) {
        if (this.__value)
            this.__value[parameter.getName()] = parameter.value;
        parameter.on('valueChanged', () => {
            if (this.__value)
                this.__value[parameter.getName()] = parameter.value;
        });
        this.members.push(parameter);
        this.emit('valueChanged');
        return parameter;
    }
    /**
     * The getParameter method.
     *
     * @private
     * @param name - The parameter name.
     * @return - The return value.
     */
    getParameter(name) {
        for (const p of this.members) {
            if (p.getName() == name)
                return p;
        }
        return undefined;
    }
    /**
     * Looks for a member parameter with the specified name and returns it.
     *
     * @param name - The parameter name.
     * @return - The return value.
     */
    getMember(name) {
        return this.getParameter(name);
    }
    /**
     * Returns the name of all parameters in StructParameter.
     *
     * @return - The return value.
     */
    getMemberNames() {
        const names = [];
        for (let i = 0; i < this.members.length; i++) {
            const member = this.members[i];
            if (member != null)
                names[i] = member.getName();
        }
        return names;
    }
    // ////////////////////////////////////////
    // Persistence
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context) {
        const j = {};
        const members = [];
        for (const p of this.members)
            members.push(p.toJSON(context));
        j.members = members;
        j.name = this.name;
        return j;
    }
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j, context) {
        if (j.members == undefined) {
            console.warn('Invalid Parameter JSON');
            return;
        }
        for (let i = 0; i < j.members.length; i++) {
            if (j.members[i]) {
                this.members[i].fromJSON(j.members[i], context);
            }
        }
        this.name = j.name;
    }
    clone() {
        const clonedParam = new StructParameter(this.name);
        return clonedParam;
    }
    // ////////////////////////////////////////
    // Destroy
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy() {
        for (const p of this.members) {
            // TODO: not sure about this. I added a do-nothing destroy method in Parameter<T> to be overwritten
            // since only some subclasses use destroy.
            p.destroy();
        }
    }
}
Registry.register('StructParameter', StructParameter);
export { StructParameter };
//# sourceMappingURL=StructParameter.js.map