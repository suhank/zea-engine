
import {
    Operator
} from './Operator.js';
import {
    BaseItem
} from '../BaseItem.js';

class Operator extends BaseItem {
    constructor(ownerItem) {
        super();
        this.__ownerItem = ownerItem;

        this.__outputs = [];
        this.parameterValueChanged.connect(()=> {
            // For each output, install a function to evalate the operator
            // Note: when the operator evaluates, it will remove the cleaners
            // on all outputs. This means that after the first operator to 
            // cause an evaluation, all outputs are considered clean.
            this.__outputs.forEach((param)=> {
                let evalOutput = (value)=>{
                    this.evaluate();
                    return param.getValue();
                };
                param.setDirty(evalOutput) 
            })
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