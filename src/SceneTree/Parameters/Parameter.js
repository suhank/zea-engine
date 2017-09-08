import {
    Signal
} from '../../Math';

class Parameter {
    constructor(name, value, dataType) {
        this.__name = name;
        this.__value = value;
        this.__dataType = dataType;
        this.valueChanged = new Signal();
        this.nameChanged = new Signal();

        this.getName = this.getName.bind(this);
        this.setName = this.setName.bind(this);
        this.getValue = this.getValue.bind(this);
        this.setValue = this.setValue.bind(this);

        this.setValue(value);
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
        return this.__value;
    }

    setValue(value) {
        this.__value = value;
        this.valueChanged.emit(this.__value);
    }
};


export {
    Parameter
};