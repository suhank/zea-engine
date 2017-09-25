
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

        this.__evalRequested = true;
        this.parameterValueChanged.connect(()=> {
            window.requestAnimationFrame(() => {
                this.__evalRequested = false;
                this.evaluate();
            });
            this.__evalRequested = true;
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