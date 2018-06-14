import {
    Signal
} from '../../Utilities';
import {
    ParamFlags,
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



    //////////////////////////////////////////
    // Persistence

    toJSON(flags = 0) {
        if((this.__flags&ParamFlags.USER_EDITED) == 0)
            return;
        const params = [];
        for(let p of this.__value) 
            params.push(p.toJSON(flags));
        return {
            params
        };
    }

    fromJSON(j) {
        if(j.value == undefined){
            console.warn("Invalid Parameter JSON");
            return;
        }
        // Note: JSON data is only used to store user edits, so 
        // parameters loaed from JSON are considered user edited.
        this.__flags |= ParamFlags.USER_EDITED;

        for(let i=0; i<j.params.length; i++) {
            this.__value[i].fromJSON(j.params[i]);
        }
    }
};


export {
    ListParameter
};