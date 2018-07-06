
import {
    Signal
} from '../../Utilities';
import {
    ValueGetMode,
    ValueSetMode
} from '../Parameters';
import {
    sgFactory
} from '../SGFactory';


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

    getParam() {
        return this._param;
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
            const start = path.slice(0, assetPath.length);
            for(let i=0; i<start.length; i++) {
                if(start[i] != assetPath[i]) {
                    console.warn("Param Path is not relative to the asset. May not be able to be resolved at load time:" + path);
                    return path;
                }
            }
            return path.slice(assetPath.length);
        }
        return {
            type: this.constructor.name,
            paramPath: makeRelative(this._param.getPath())
        };
    }

    fromJSON(j, context) {
        if(j.paramPath) {
            const paramPath = j.paramPath;
            // Note: the tree should have fully loaded by the time we are loading operators
            // even new items and groups should have been created. Operators and state machines 
            // are loaded last.
            const param = context.assetItem.resolvePath(paramPath);
            if(!param) {
                // Note: We may have a case where a state machine wants to drive a parameter in an operator.
                // So there, wait till all loading is complete and then connect.
                const onloaded = ()=>{
                    const param = context.assetItem.resolvePath(paramPath);
                    if(param)
                        this.setParam(param);
                    else {
                        console.warn("Param Path unable to be resolved at load time:" + paramPath);
                    }
                    context.assetItem.loaded.disconnect(onloaded)
                }
                context.assetItem.loaded.connect(onloaded);
            }
            else {
                this.setParam(param);
            }
        }
    }
}
sgFactory.registerClass('OperatorOutput', OperatorOutput);


class XfoOperatorOutput extends OperatorOutput {
    constructor(){
        super((p)=> p.getDataType() == 'Xfo' );
    }
}
sgFactory.registerClass('XfoOperatorOutput', XfoOperatorOutput);


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