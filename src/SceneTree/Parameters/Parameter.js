import {
    Signal
} from '../../Math';

class BaseParameter {
    constructor(name, dataType) {
        this.__name = name;
        this.__dataType = dataType;
        this.valueChanged = new Signal();
        this.nameChanged = new Signal();

        this.getName = this.getName.bind(this);
        this.setName = this.setName.bind(this);
        this.getValue = this.getValue.bind(this);
        this.setValue = this.setValue.bind(this);

        this.__cleanerFn = undefined;
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
        if(this.__cleanerFn === cleanerFn)
            return false;

        if(!cleanerFn || (this.__cleanerFn &&  this.__cleanerFn !== cleanerFn)) {
            throw("Error setting cleaner Fn. Can only have one cleaner bound.");
        }
        this.__cleanerFn = cleanerFn;
        this.valueChanged.emit(1); // 1 = changed via cleaner fn
    }
};



class GetterSetterParameter extends BaseParameter {
    constructor(name, getter, setter, dataType) {
        super(name, dataType);
        this.__name = name;
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
        return this.__getter();
    }

    setValue(value) {
        let prevValue = this.__getter();
        this.__setter(value);
        this.valueChanged.emit(0); // 0 = changed via set value.
    }

};


class Parameter extends BaseParameter {
    constructor(name, value, dataType) {
        super(name, dataType);
        this.__value = value;
    }

    getValue() {
        if(this.__cleanerFn) {
            this.__value = this.__cleanerFn(this.__value);
            this.__cleanerFn = undefined;
        }
        return this.__value;
    }

    setValue(value) {
        let prevValue = this.__value;
        this.__value = value;
        this.valueChanged.emit();
    }
};


export {
    GetterSetterParameter,
    Parameter
};