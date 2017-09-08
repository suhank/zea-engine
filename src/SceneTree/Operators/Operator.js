
import {
    Operator
} from './Operator.js';
import {
    ParameterSet
} from '../Parameters/ParameterSet.js';

class Operator  {
    constructor(ownerItem) {
        this.__ownerItem = ownerItem;
        this.__paramSet = new ParameterSet('params');
        this.__paramSet.parameterValueChanged.connect(()=> this.evaluate());
    }
    
    getParameterByIndex(index) {
        return this.__paramSet.getParameterByIndex(index);
    }
    
    getParameter(name) {
        return this.__paramSet.getParameter(name);
    }


    evaluate(){
        throw("Not yet implemented");
    }

};

export {
    Operator
};
//export default AssetItem;