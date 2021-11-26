import { EventEmitter } from '../../Utilities/EventEmitter';
/** Class representing an operator input.
 * @extends EventEmitter
 */
class OperatorInput extends EventEmitter {
    /**
     * Create an operator input.
     * @param name - The name value.
     */
    constructor(name) {
        super();
        this.detached = false;
        this.name = name;
    }
    /**
     * The getName method.
     * @return - The return value.
     */
    getName() {
        return this.name;
    }
    /**
     * Sets operator that owns this input. Called by the operator when adding inputs
     * @param op - The operator object.
     */
    setOperator(op) {
        this._op = op;
    }
    /**
     * Returns operator that owns this input.
     * @return - The operator object.
     */
    getOperator() {
        return this._op;
    }
    /**
     * Returns true if this input is connected to a parameter.
     * @return - The return value.
     */
    isConnected() {
        return this.param != null;
    }
    /**
     * The getParam method.
     * @return - The return value.
     */
    getParam() {
        return this.param;
    }
    /**
     * @private
     * The handler function for when the input paramter changes.
     * @param event - The event object.
     */
    paramValueChanged() {
        if (this._op)
            this._op.setDirty();
    }
    /**
     * Assigns the Paramter to be used to provide the input value.
     * @param param - The param value.
     */
    setParam(param) {
        if (this.param) {
            this.param.unbindOperatorInput(this);
        }
        this.param = param;
        if (this.param) {
            this.param.bindOperatorInput(this);
        }
        this.emit('paramSet', { param: this.param });
    }
    /**
     * The getValue method.
     * @return - The return value.
     */
    getValue() {
        if (this.param)
            return this.param.value;
        throw new Error('Unable to getValue');
    }
    /**
     * The setValue method.
     * @param value - The value param.
     */
    setValue(value) {
        if (this.param) {
            this.param.setValue(value);
        }
    }
    /**
     * Propagates from the upstream parameter to the connected operator.
     */
    setDirty() {
        if (this._op) {
            this._op.setDirty();
        }
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
        const absPath = this.param ? this.param.getPath() : [];
        const paramPath = (context && context.makeRelative ? context.makeRelative(absPath) : absPath);
        return {
            name: this.name,
            paramPath: paramPath,
        };
    }
    /**
     * The fromJSON method decodes a json object for this type.
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j, context) {
        if (j.paramPath) {
            // Note: the tree should have fully loaded by the time we are loading operators
            // even new items and groups should have been created. Operators and state machines
            // are loaded last.
            context === null || context === void 0 ? void 0 : context.resolvePath(j.paramPath, (param) => {
                this.setParam(param);
            }, () => {
                console.warn("OperatorInput: '" + this.getName() + "'. Unable to connect to:" + j.paramPath);
            });
        }
    }
    /**
     * The detach method is called when an operator is being removed from the scene tree.
     * It removes all connections to parameters in the scene.
     */
    detach() {
        // This function is called when we want to suspend an operator
        // from functioning because it is deleted and on the undo stack.
        // Once operators have persistent connections,
        // we will simply uninstall the output from the parameter.
        if (this.param) {
            this.param.unbindOperatorInput(this);
        }
    }
    /**
     * The reattach method can be called when re-instating an operator in the scene.
     */
    reattach() {
        this.detached = false;
        if (this.param) {
            this.param.bindOperatorInput(this);
        }
    }
}
class BooleanOperatorInput extends OperatorInput {
}
class NumberOperatorInput extends OperatorInput {
}
class Vec2OperatorInput extends OperatorInput {
}
class Vec3OperatorInput extends OperatorInput {
}
class Vec4OperatorInput extends OperatorInput {
}
class ColorOperatorInput extends OperatorInput {
}
class QuatOperatorInput extends OperatorInput {
}
class XfoOperatorInput extends OperatorInput {
}
class Mat3OperatorInput extends OperatorInput {
}
class Mat4OperatorInput extends OperatorInput {
}
export { OperatorInput, BooleanOperatorInput, NumberOperatorInput, Vec2OperatorInput, Vec3OperatorInput, Vec4OperatorInput, ColorOperatorInput, QuatOperatorInput, XfoOperatorInput, Mat3OperatorInput, Mat4OperatorInput, };
//# sourceMappingURL=OperatorInput.js.map