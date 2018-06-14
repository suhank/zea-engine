import {
    Signal
} from '../../Utilities';
import {
    Parameter
} from './Parameter.js';


class ListParameter extends Parameter {
    constructor(name, dataType) {
        super(name, []);
        this.__dataType = dataType;
        this.elementAdded = new Signal();
        this.elementRemoved = new Signal();
    }

    addElement(elem) {
        if(!elem)
            elem = new this.__dataType()
        this.__value.push(elem)
        this.setValue(this.__value);
        this.elementAdded.emit(elem, this.__value.length-1);
        return elem;
    }

    removeElement(index) {
        const elem = this.__value[index];
        this.__value.splice(index, 1)
        this.setValue(this.__value)
        this.elementRemoved.emit(elem, index);
    }

    insertElement(index, elem) {
        this.__value.splice(index, 0, elem);
        this.setValue(this.__value)
        this.elementAdded.emit(elem, index);
    }

    clone() {
        let clonedValue = this.__value.slice(0);
        const clonedParam = new ListParameter(this.__name, clonedValue, this.__dataType);
        this.cloneMembers(clonedParam);
        return clonedParam;
    }
};


export {
    ListParameter
};