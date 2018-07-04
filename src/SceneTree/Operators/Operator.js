
import {
    Signal
} from '../../Utilities';
import {
    ValueGetMode,
    ValueSetMode
} from '../Parameters';

import {
    BaseItem
} from '../BaseItem.js';

class OperatorOutput {
    constructor(filterFn){
        this.__filterFn = filterFn;
        this._param = undefined;

        this.paramSet = new Signal();
    }

    getFilterFn(){
        return this.__filterFn;
    }

    isConnected() {
        return this._param != undefined;
    }

    setParam(param) {
        this._param = param;
        this._initialParamValue = param.getValue();
        if(this._initialParamValue.clone)
            this._initialParamValue = this._initialParamValue.clone();
        this.paramSet.emit();
    }

    getInitialValue(){
        return this._initialParamValue;
    }

    getValue(mode = ValueSetMode.OPERATOR_GETVALUE) {
        if(this._param)
            return this._param.getValue(mode);
    }

    // Note: sometimes outputs are used in places like statemachines, where we would want the change to cause an event.
    setValue(value, mode = ValueSetMode.OPERATOR_SETVALUE) {
        if(this._param)
            this._param.setValue(value, mode);
    }
 
    setDirty(fn){
        if(this._param)
            this._param.setDirty(fn);
    }

    removeCleanerFn(fn){
        if(this._param)
            this._param.removeCleanerFn(fn);
    }

    //////////////////////////////////////////
    // Persistence

    toJSON(context) {
        const makeRelative = (path) => {
            const assetPath = context.assetItem.getPath();
            return path.slice(assetPath.length);
        }
        return {
            paramPath: makeRelative(this._param.getPath())
        };
    }

    fromJSON(j, context) {
        const paramPath = j.paramPath;
        if(context.assetItem) {
            const onloaded = ()=>{
                this.setParam(context.assetItem.resolvePath(paramPath));
                context.assetItem.loaded.disconnect(onloaded)
            }
            context.assetItem.loaded.connect(onloaded);
        }
    }
}

class XfoOperatorOutput extends OperatorOutput {
    constructor(){
        super((p)=> p.getDataType() == 'Xfo' );
    }
}

class Operator extends BaseItem {
    constructor(name) {
        super(name);

        this.__outputs = [];
        this.__evalOutput = this.__evalOutput.bind(this);
        this.__opInputChanged = this.__opInputChanged.bind(this);
        this.parameterValueChanged.connect(this.__opInputChanged);
        
        this.postEval = new Signal();
    }

    addOutput(output) {
        this.__outputs.push(output);
        return output;
    }

    removeOutput(output) {
        this.__outputs.splice(this.__outputs.indexOf(output), 1);
    }

    __evalOutput (cleanedParam/*value, getter*/){
        for(let o of this.__outputs){
            o.removeCleanerFn(this.__evalOutput);
        }
        this.evaluate();

        // Why does the cleaner need to return a value?
        // Usually operators are connected to multiple outputs.
        // return getter(1);
    }

    __opInputChanged(){
        // For each output, install a function to evalate the operator
        // Note: when the operator evaluates, it will remove the cleaners
        // on all outputs. This means that after the first operator to 
        // cause an evaluation, all outputs are considered clean.
        for(let o of this.__outputs)
            o.setDirty(this.__evalOutput);
    }

    evaluate(){
        throw("Not yet implemented");
    }


    //////////////////////////////////////////
    // Persistence

    toJSON(context) {
        const j = super.toJSON(context);
        j.type = this.constructor.name;

        const oj = [];
        for(let o of this.__outputs){
            oj.push(o.toJSON(context));
        }

        j.outputs = oj;
        return j;
    }

    fromJSON(j, context) {
        super.fromJSON(j, context);

        if(j.outputs){
            for(let i=0; i<this.__outputs.length; i++){
                const output = this.__outputs[i];
                output.fromJSON(j.outputs[i], context);
            }

            // Force an evaluation of the operator as soon as 
            const onloaded = ()=>{
                this.__opInputChanged();
                context.assetItem.loaded.disconnect(onloaded)
            }
            context.assetItem.loaded.connect(onloaded);
        }
    }

    destroy(){
        super.destroy();
        this.__outputs = [];
    }

};

export {
    Operator,
    OperatorOutput,
    XfoOperatorOutput
};
//export default AssetItem;