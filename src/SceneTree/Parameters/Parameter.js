import {
    Signal
} from '../../Math';

class BaseParameter {
    constructor(name, dataType) {
        this.__name = name;
        this.valueChanged = new Signal();
        this.nameChanged = new Signal();

        this.getName = this.getName.bind(this);
        this.setName = this.setName.bind(this);
        this.getValue = this.getValue.bind(this);
        this.setValue = this.setValue.bind(this);

        this.__cleanerFns = [];
    }

    getName() {
        return this.__name;
    }

    setName(name) {
        let prevName = this.__name;
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
        if(this.__cleanerFns.indexOf(cleanerFn) != -1){
            return false;
        }
        this.__cleanerFns.push(cleanerFn);
        this.valueChanged.emit(1); // 1 = changed via cleaner fn
    }

    isDirty() {
        return this.__cleanerFns.length > 0;
    }
    removeCleanerFn(cleanerFn) {
        let index = this.__cleanerFns.indexOf(cleanerFn);
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
        if(!dataType) {
            dataType = value.constructor.name;
        }
        super(name, dataType);
        this.__value = value;
    }

    getValue(mode=0) {
        if(mode==0 && this.__cleanerFns.length > 0) {
            // Clean the param before we start evaluating the connected op.
            // this is so that operators can read from the current value
            // to compute the next.
            let fns = this.__cleanerFns;
            this.__cleanerFns = [];
            for(let fn of fns) {
                this.__value = fn(this.__value);
                if(this.__value == undefined) {
                    throw("Error. Cleander Fn did not return a valid value:" + fn.name);
                }
            }
        }
        return this.__value;
    }

    setValue(value, mode=0) { // 0 == normal set. 1 = changed via cleaner fn, 2=change by loading/cloning code.
        if(this.__cleanerFns.length > 0) {
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
        if(value == undefined) {
            throw("Invalud valu for setvalue.");
        }

        // Note: equality tests on anything but simple values is not going to work. We can't easily optimise this function.
        // if(value == this.__value) {
        //     return;
        // }
        this.__value = value;
        this.valueChanged.emit(mode);
    }

    clone() {
        let clonedValue = this.__value;
        if(clonedValue.clone)
            clonedValue = clonedValue.clone();
        let clonedParam = new Parameter(this.__name, clonedValue, this.__dataType);
        this.cloneMembers();
        return clonedParam;
    }
};


export {
    Parameter
};