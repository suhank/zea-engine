
import {
    Operator
} from './Operator.js';
import {
    BaseItem
} from '../BaseItem.js';

class Operator extends BaseItem {
    constructor(name) {
        super(name);

        this.__outputs = [];
        let evalOutput = (cleanedParam/*value, getter*/)=>{
            for(let o of this.__outputs){
                o.removeCleanerFn(evalOutput);
            }
            this.evaluate();

            // Why does the cleaner need to return a value?
            // Usually operators are connected to multiple outputs.
            // return getter(1);
        };
        this.parameterValueChanged.connect(()=> {
            // For each output, install a function to evalate the operator
            // Note: when the operator evaluates, it will remove the cleaners
            // on all outputs. This means that after the first operator to 
            // cause an evaluation, all outputs are considered clean.
            for(let o of this.__outputs)
                o.setDirty(evalOutput);
        });
    }

    evaluate(){
        throw("Not yet implemented");
    }


    //////////////////////////////////////////
    // Persistence

    toJSON(flags = 0) {
        return super.toJSON(flags);
    }

    fromJSON(j, flags) {
        return super.fromJSON(j, flags);
    }

};

export {
    Operator
};
//export default AssetItem;