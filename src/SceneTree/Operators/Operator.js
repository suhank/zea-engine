
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
        let evalOutput = (value, getter)=>{
            const len=this.__outputs.length;
            for(let i=0; i< len; i++)
                this.__outputs[i].removeCleanerFn(evalOutput);
            this.evaluate();
            return getter(1);
        };
        this.parameterValueChanged.connect(()=> {
            // For each output, install a function to evalate the operator
            // Note: when the operator evaluates, it will remove the cleaners
            // on all outputs. This means that after the first operator to 
            // cause an evaluation, all outputs are considered clean.
            const len=this.__outputs.length;
            for(let i=0; i< len; i++)
                this.__outputs[i].setDirty(evalOutput);
        });
    }

    evaluate(){
        throw("Not yet implemented");
    }

};

export {
    Operator
};
//export default AssetItem;