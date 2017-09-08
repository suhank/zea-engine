import {
    Signal
} from '../../Math';

import {
    Parameter
} from './Parameter.js';


class ParameterSet {
    constructor(name) {
        this.name = name;
        this.__params = [];
        this.__paramMapping = {};
        this.parameterAdded = new Signal();
        this.parameterRemoved = new Signal();
        this.parameterValueChanged = new Signal();
        this.parameterNameChanged = new Signal();
    }

    getParameterByIndex(index) {
        return this.__params[index];
    }

    getParameter(name) {
        return this.__params[this.__paramMapping[name]];
    }

    addParameter(param) {
        param.valueChanged.connect((value)=>this.parameterValueChanged.emit(param.getName(), value));
        param.nameChanged.connect((newName, oldName)=> {
            let index = this.__paramMapping[oldName];
            delete this.__paramMapping[oldName];
            this.__paramMapping[newName] = index;
            this.parameterNameChanged.emit(newName, oldName);
        });
        this.__params.push(param)
        this.__paramMapping[param.getName()] = this.__params.length - 1;
        this.parameterAdded.emit();
    }
};


export {
    ParameterSet
};