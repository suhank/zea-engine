import {
    Signal
} from '../../Utilities';
import {
    sgFactory
} from '../SGFactory';

const ValueGetMode = {
    NORMAL: 0,
    OPERATOR_GETVALUE: 1
};

const ValueSetMode = {
    USER_SETVALUE: 0,
    OPERATOR_SETVALUE: 1,
    DATA_LOAD: 2,
    CUSTOM: 3,
};
const ParamFlags = {
    USER_EDITED: 1<<1
};

class BaseParameter {
    constructor(name) {
        this.__name = name;
        this.__cleanerFns = [];
        this.__flags = 0;

        this.valueChanged = new Signal();
        this.nameChanged = new Signal();

        this.getName = this.getName.bind(this);
        this.setName = this.setName.bind(this);
        this.getValue = this.getValue.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    getName() {
        return this.__name;
    }

    setName(name) {
        const prevName = this.__name;
        this.__name = name;
        this.nameChanged.emit(this.__name, prevName);
    }

    getValue() {
        // TODO
    }

    setValue(value) {
        // TODO
    }

    setDirty(cleanerFn) {
        // If already dirty, simply return.
        if (this.__cleanerFns.indexOf(cleanerFn) != -1) {
            return false;
        }
        this.__cleanerFns.push(cleanerFn);
        this.valueChanged.emit(1); // 1 = changed via cleaner fn
    }

    isDirty() {
        return this.__cleanerFns.length > 0;
    }
    removeCleanerFn(cleanerFn) {
        const index = this.__cleanerFns.indexOf(cleanerFn);
        this.__cleanerFns.splice(index, 1);
    }

    clone() {
        console.error("TOOD: implment me")
    }
    cloneMembers(clonedParam) {

    }


};



class Parameter extends BaseParameter {
    constructor(name, value, dataType) {
        super(name);
        this.__value = value;
        this.__dataType = dataType;
    }

    getValue(mode = ValueGetMode.NORMAL) {
        if (mode == ValueGetMode.NORMAL && this.__cleanerFns.length > 0) {
            // Clean the param before we start evaluating the connected op.
            // this is so that operators can read from the current value
            // to compute the next.
            let fns = this.__cleanerFns;
            this.__cleanerFns = [];
            for (let fn of fns) {
                this.__value = fn(this.__value, this.getValue);
                if (this.__value == undefined) {
                    throw ("Error. Cleander Fn did not return a valid value:" + fn.name);
                }
            }
        }
        return this.__value;
    }

    setValue(value, mode = ValueSetMode.USER_SETVALUE) { // 0 == normal set. 1 = changed via cleaner fn, 2=change by loading/cloning code.
        if (this.__cleanerFns.length > 0) {
            // Note: This message has not hilighted any real issues, and has become verbose.
            // Enable if suspicious of operators being trampled by setValues.
            // if(mode==0){
            //     let cleanerNames = [];
            //     for(let fn of this.__cleanerFns) {
            //         cleanerNames.push(fn.name);
            //     }
            //     console.warn("Error setting "+this.__name + " value when cleaner is assigned:"+ cleanerNames);
            // }
            this.__cleanerFns = [];
        }
        if (value == undefined) {
            throw ("Invalud valu for setvalue.");
        }

        // Note: equality tests on anything but simple values is not going to work. We can't easily optimise this function.
        // if(value == this.__value) {
        //     return;
        // }
        this.__value = value;
        if(mode == ValueSetMode.USER_SETVALUE)
            this.__flags |= ParamFlags.USER_EDITED;
        this.valueChanged.emit(mode);
    }

    clone() {
        const clonedValue = this.__value;
        if (clonedValue.clone)
            clonedValue = clonedValue.clone();
        const clonedParam = new Parameter(this.__name, clonedValue, this.__dataType);
        this.cloneMembers();
        return clonedParam;
    }


    //////////////////////////////////////////
    // Persistence

    toJSON(flags = 0) {
        if((this.__flags&ParamFlags.USER_EDITED) == 0)
            return;
        if(this.__dataType == 'Number' || this.__dataType == 'String' || !isNaN(this.__value) || this.__value instanceof String )
            return { value: this.__value };
        else {
            return { value: this.__value.toJSON(flags) };
        }
    }

    fromJSON(j) {
        if(j.value == undefined){
            console.warn("Invalid Parameter JSON");
            return;
        }
        // Note: JSON data is only used to store user edits, so 
        // parameters loaed from JSON are considered user edited.
        this.__flags |= ParamFlags.USER_EDITED;

        if(this.__dataType == 'Number' || this.__dataType == 'String' || !isNaN(this.__value) || this.__value instanceof String )
            this.setValue(j.value, ValueSetMode.DATA_LOAD);
        else {
            // const value = sgFactory.constructClass();
            this.__value.fromJSON(j.value);
            this.valueChanged.emit(ValueSetMode.DATA_LOAD);
        }
    }

};


class ListParameter extends Parameter {
    constructor(name, dataType) {
        super(name, []);
        this.__dataType = dataType;
    }

    addElement(elem) {
        if(!elem)
            elem = new this.__dataType()
        this.__value.push(elem)
        this.setValue(this.__value);
        return elem;
    }

    removeElement(index) {
        this.__value.splice(index, 1)
        this.setValue(this.__value)
    }

    insertElement(index, elem) {
        this.__value.splice(index, 0, elem);
        this.setValue(this.__value)
    }

    clone() {
        let clonedValue = this.__value.slice(0);
        let clonedParam = new ListParameter(this.__name, clonedValue, this.__dataType);
        this.cloneMembers();
        return clonedParam;
    }
};


export {
    ParamFlags,
    ValueGetMode,
    ValueSetMode,
    Parameter,
    ListParameter
};