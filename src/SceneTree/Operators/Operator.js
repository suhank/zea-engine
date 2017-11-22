
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
        let evalOutput = (value, getter)=>{
            const eachOutput = (param)=> {
                param.removeCleanerFn(evalOutput);
            }
            this.__outputs.forEach(eachOutput);
            this.evaluate();
            return getter(1);
        };
        this.parameterValueChanged.connect(()=> {
            // For each output, install a function to evalate the operator
            // Note: when the operator evaluates, it will remove the cleaners
            // on all outputs. This means that after the first operator to 
            // cause an evaluation, all outputs are considered clean.
            const dirtyOutput = (param)=> {
                param.setDirty(evalOutput);
            }
            this.__outputs.forEach(dirtyOutput);
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