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
        this.__setter(value);
        this.valueChanged.emit(this.__value);
    }
};


class Parameter extends BaseParameter {
    constructor(name, value, dataType) {
        super(name, dataType);
        this.__value = value;
    }

    getValue() {
        return this.__value;
    }

    setValue(value) {
        this.__value = value;
        this.valueChanged.emit(this.__value);
    }
};


export {
    GetterSetterParameter,
    Parameter
};