/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Registry } from '../../Registry';
import { Parameter } from './Parameter';
/** Class representing a geometry parameter.
 * @extends Parameter
 * @private
 */
class GeometryParameter extends Parameter {
    /**
     * Create a geometry parameter.
     * @param name - The name of the color parameter.
     * @param value - The value of the parameter.
     */
    constructor(name = '', value) {
        super(name, value, 'Geometry');
        this.listenerIDs = {};
        if (value)
            this.setValue(value);
    }
    emitBoundingBoxDirtied(event) {
        this.emit('boundingBoxChanged', event);
    }
    /**
     * The setValue method.
     * @param value - The geom value.
     */
    setValue(value) {
        // 0 == normal set. 1 = changed via cleaner fn, 2 = change by loading/cloning code.
        if (this.__value !== value) {
            if (this.__value) {
                this.__value.removeListenerById('boundingBoxChanged', this.listenerIDs['boundingBoxChanged']);
            }
            this.__value = value;
            if (this.__value) {
                this.listenerIDs['boundingBoxChanged'] = this.__value.on('boundingBoxChanged', (event) => {
                    this.emitBoundingBoxDirtied(event);
                });
            }
            this.emit('valueChanged');
        }
    }
    // ////////////////////////////////////////
    // Persistence
    /**
     * The loadValue is used to change the value of a parameter, without triggering a
     * valueChanges, or setting the USER_EDITED state.
     *
     * @param value - The context value.
     */
    loadValue(value) {
        if (this.__value) {
            this.__value.removeListenerById('boundingBoxChanged', this.listenerIDs['boundingBoxChanged']);
        }
        this.__value = value;
        if (this.__value) {
            this.listenerIDs['boundingBoxChanged'] = this.__value.on('boundingBoxChanged', (event) => {
                this.emitBoundingBoxDirtied(event);
            });
        }
    }
    /**
     * The toJSON method encodes this type as a json object for persistence.
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context) {
        var _a;
        return {
            name: this.name,
            value: (_a = this.__value) === null || _a === void 0 ? void 0 : _a.toJSON(context),
        };
    }
    /**
     * The fromJSON method decodes a json object for this type.
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j, context) {
        if (j.name)
            this.name = j.name;
        const geometry = Registry.constructClass(j.value.type);
        geometry.fromJSON(j.value, context);
        this.__value = geometry;
    }
    // ////////////////////////////////////////
    // Clone and Destroy
    /**
     * The clone method constructs a new geometry parameter, copies its values
     * from this parameter and returns it.
     * @return - Returns a new geometry parameter.
     */
    clone() {
        const clonedParam = new GeometryParameter(this.name, this.__value);
        return clonedParam;
    }
}
Registry.register('GeometryParameter', GeometryParameter);
export { GeometryParameter };
//# sourceMappingURL=GeometryParameter.js.map