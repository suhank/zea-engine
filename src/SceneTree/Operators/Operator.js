import { Signal } from '../../Utilities';
import { ValueSetMode } from '../Parameters';
import { sgFactory } from '../SGFactory';
import { ItemFlags, BaseItem } from '../BaseItem.js';


/** Class representing an operator output. */
class OperatorOutput {
  /**
   * Create an operator output.
   * @param {any} name - The name value.
   * @param {any} filterFn - The filterFn value.
   */
  constructor(name, filterFn) {
    this.__name = name;
    this.__filterFn = filterFn;
    this._param = undefined;
    this.detached = false;

    this.paramSet = new Signal();
  }

  /**
   * The getName method.
   * @return {any} - The return value.
   */
  getName() {
    return this.__name;
  }

  /**
   * The getFilterFn method.
   * @return {any} - The return value.
   */
  getFilterFn() {
    return this.__filterFn;
  }

  /**
   * The isConnected method.
   * @return {any} - The return value.
   */
  isConnected() {
    return this._param != undefined;
  }

  /**
   * The getParam method.
   * @return {any} - The return value.
   */
  getParam() {
    return this._param;
  }

  /**
   * The setParam method.
   * @param {any} param - The param param.
   */
  setParam(param) {
    this._param = param;
    this.paramSet.emit();
  }

  /**
   * The getValue method.
   * @param {any} mode - The mode param.
   * @return {any} - The return value.
   */
  getValue(mode = ValueSetMode.OPERATOR_GETVALUE) {
    if (this._param) return this._param.getValue(mode);
  }

  /**
   * The setValue method.
   * Note: sometimes outputs are used in places like statemachines,
   * where we would want the change to cause an event.
   * @param {any} value - The value param.
   * @param {any} mode - The mode param.
   */
  setValue(value, mode = ValueSetMode.OPERATOR_SETVALUE) {
    if (this._param) {
      this._param.setValue(value, mode);
    }
  }

  /**
   * The setDirty method.
   * @param {any} fn - The fn param.
   */
  setDirty(fn) {
    if (this._param) {
      this._param.setDirty(fn);
    }
  }

  /**
   * The removeCleanerFn method.
   * @param {any} fn - The fn param.
   */
  removeCleanerFn(fn) {
    if (this._param) this._param.removeCleanerFn(fn);
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method.
   * @param {any} context - The context param.
   * @param {any} flags - The flags param.
   * @return {any} - The return value.
   */
  toJSON(context, flags) {
    const paramPath = this._param ? this._param.getPath() : '';
    return {
      type: this.constructor.name,
      paramPath: ((context && context.makeRelative) ? context.makeRelative(paramPath) : paramPath)
    };
  }

  /**
   * The fromJSON method.
   * @param {any} j - The j param.
   * @param {any} context - The context param.
   * @param {any} flags - The flags param.
   */
  fromJSON(j, context, flags) {
    if (j.paramPath) {
      // Note: the tree should have fully loaded by the time we are loading operators
      // even new items and groups should have been created. Operators and state machines
      // are loaded last.
      context.resolvePath(
        j.paramPath,
        param => {
          this.setParam(param);
        },
        reason => {
          console.warn(
            "Operator Output: '" +
              this.getName() +
              "'. Unable to load item:" +
              j.paramPath
          );
        }
      );
    }
  }
  
  detach(){
    // This function is called when we want to suspend an operator
    // from functioning because it is deleted and on the undo stack.
    // Once operators have persistent connections, 
    // we will simply uninstall the output from the parameter. 
    this.detached = true;
  }

  reattach(){
    this.detached = false;
  }

}
sgFactory.registerClass('OperatorOutput', OperatorOutput);

/** Class representing an XFO operator output.
 * @extends OperatorOutput
 */
class XfoOperatorOutput extends OperatorOutput {
  /**
   * Create an XFO operator output.
   * @param {any} name - The name value.
   */
  constructor(name) {
    super(name, p => p.getDataType() == 'Xfo');
  }

  /**
   * The getInitialValue method.
   * @return {any} - The return value.
   */
  getInitialValue() {
    return this._initialParamValue;
  }

  /**
   * The setParam method.
   * @param {any} param - The param param.
   */
  setParam(param) {
    // Note: sometimes the param value is changed after binding.
    // e.g. The group Xfo is updated after the operator
    // that binds to it is loaded. It could also change if a user
    // Is adding items to the group using the UI. Therefore, the
    // initial Xfo needs to be updated.
    const init = () => {
      this._initialParamValue = param.getValue();
      if (this._initialParamValue.clone)
        this._initialParamValue = this._initialParamValue.clone();

      if (this._initialParamValue == undefined) throw new Error('WTF?');
    };
    init();
    param.valueChanged.connect(mode => {
      if (mode == ValueSetMode.USER_SETVALUE || mode == ValueSetMode.DATA_LOAD)
        init();
    });

    this._param = param;
    this.paramSet.emit();
  }
}
sgFactory.registerClass('XfoOperatorOutput', XfoOperatorOutput);

/** Class representing an operator.
 * @extends BaseItem
 */
class Operator extends BaseItem {
  /**
   * Create an operator.
   * @param {any} name - The name value.
   */
  constructor(name) {
    super(name);

    // Items which can be constructed by a user(not loaded in binary data.)
    // Should always have this flag set. 
    this.setFlag(ItemFlags.USER_EDITED);

    this.__outputs = [];
    this.__evalOutput = this.__evalOutput.bind(this);
    this.__opInputChanged = this.__opInputChanged.bind(this);
    this.parameterValueChanged.connect(this.__opInputChanged);

    this.postEval = new Signal();
  }

  /**
   * The addOutput method.
   * @param {any} output - The output param.
   * @return {any} - The return value.
   */
  addOutput(output) {
    this.__outputs.push(output);
    output.paramSet.connect(() => {
      output.setDirty(this.__evalOutput);
    });
    return output;
  }

  /**
   * The removeOutput method.
   * @param {any} output - The output param.
   */
  removeOutput(output) {
    this.__outputs.splice(this.__outputs.indexOf(output), 1);
  }

  /**
   * The getNumOutputs method.
   * @return {number} - The number of outputs on thie operator.
   */
  getNumOutputs() {
    return this.__outputs.length
  }

  /**
   * The getOutput method.
   * @param {number} index - The index param.
   * @return {object} - The return value.
   */
  getOutput(index) {
    return this.__outputs[index];
  }

  /**
   * The getOutputByName method.
   * @param {any} name - The name param.
   * @return {any} - The return value.
   */
  getOutputByName(name) {
    for (const o of this.__outputs) {
      if (o.getName() == name) return o;
    }
  }

  /**
   * The __evalOutput method.
   * @param {any} cleanedParam - The cleanedParam param.
   * @private
   */
  __evalOutput(cleanedParam /* value, getter */) {
    for (const o of this.__outputs) {
      o.removeCleanerFn(this.__evalOutput);
    }
    this.evaluate();

    // Why does the cleaner need to return a value?
    // Usually operators are connected to multiple outputs.
    // return getter(1);
  }

  /**
   * The __opInputChanged method.
   * @private
   */
  __opInputChanged() {
    // For each output, install a function to evalate the operator
    // Note: when the operator evaluates, it will remove the cleaners
    // on all outputs. This means that after the first operator to
    // cause an evaluation, all outputs are considered clean.
    for (const o of this.__outputs) o.setDirty(this.__evalOutput);
  }

  /**
   * The evaluate method.
   */
  evaluate() {
    throw new Error('Not yet implemented');
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method.
   * @param {any} context - The context param.
   * @param {any} flags - The flags param.
   * @return {any} - The return value.
   */
  toJSON(context, flags) {
    const j = super.toJSON(context, flags);
    j.type = sgFactory.getClassName(this);

    const oj = [];
    for (const o of this.__outputs) {
      oj.push(o.toJSON(context, flags));
    }

    j.outputs = oj;
    return j;
  }

  /**
   * The fromJSON method.
   * @param {any} j - The j param.
   * @param {any} context - The context param.
   * @param {any} flags - The flags param.
   */
  fromJSON(j, context, flags) {
    super.fromJSON(j, context, flags);

    if (j.outputs) {
      for (let i = 0; i < this.__outputs.length; i++) {
        const output = this.__outputs[i];
        output.fromJSON(j.outputs[i], context);
      }

      // Force an evaluation of the operator as soon as loading is done.
      context.addPLCB(() => {
        this.__opInputChanged();
      });
    }
  }

  /**
   * The detach method.
   */
  detach(){
    this.__outputs.forEach(output => output.detach());
  }

  /**
   * The reattach method.
   */
  reattach(){
    this.__outputs.forEach(output => output.reattach());
  }

  /**
   * The destroy method.
   */
  destroy() {
    super.destroy();
    this.__outputs = [];
  }
}

export { Operator, OperatorOutput, XfoOperatorOutput };
// export default AssetItem;
