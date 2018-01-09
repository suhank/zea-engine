import {
    Vec2,
    Vec3,
    Color
} from '../Math';
import {
    Signal
} from '../Utilities';

import {
    RefCounted
} from './RefCounted.js';

import {
    Parameter,
    NumberParameter,
    Vec2Parameter,
    Vec3Parameter,
    ColorParameter
} from './Parameters';

class ParameterOwner extends RefCounted {
    constructor() {
        super();

        this.__params = [];
        this.__paramMapping = {};

        this.parameterAdded = new Signal();
        this.parameterRemoved = new Signal();
        this.parameterValueChanged = new Signal();
        this.parameterNameChanged = new Signal();
    }

    copyTo(cloned) {
        for (let param of this.__params) {
            if(cloned.hasParameter(param.getName())){
                cloned.getParameter(param.getName()).setValue(param.getValue(), 2);
            }
            else {
                cloned.addParameterInstance(param.clone());
            }
        }
    }

    //////////////////////////////////////////
    // Params

    getParameters() {
        return this.__params;
    }

    getParameterByIndex(index) {
        return this.__params[index];
    }

    hasParameter(paramName) {
        return paramName in this.__paramMapping;
    }

    getParameter(paramName) {
        return this.__params[this.__paramMapping[paramName]];
    }

    addParameter(paramName, defaultValue) {
        if (paramName instanceof Parameter) {
            return this.addParameterInstance(paramName);
        }
        if (defaultValue instanceof Parameter) {
            return this.addParameterInstance(defaultValue);
        }

        let param;
        if (typeof defaultValue == 'boolean' || defaultValue === false || defaultValue === true) {
            param = new Parameter(paramName, defaultValue, 'Boolean');
        } else if (typeof defaultValue == 'string') {
            param = new Parameter(paramName, defaultValue, 'String');
        } else if (Number.isNumeric(defaultValue)) {
            param = new NumberParameter(paramName, defaultValue);
        } else if (defaultValue instanceof Vec2) {
            param = new Vec2Parameter(paramName, defaultValue);
        } else if (defaultValue instanceof Vec3) {
            param = new Vec3Parameter(paramName, defaultValue);
        } else if (defaultValue instanceof Color) {
            param = new ColorParameter(paramName, defaultValue);
        } else {
            param = new Parameter(paramName, defaultValue);
        }
        this.addParameterInstance(param);
        return param;
    }

    addParameterInstance(param) {
        param.valueChanged.connect(() => this.parameterValueChanged.emit(param.getName()));
        param.nameChanged.connect((newName, oldName) => {
            let index = this.__paramMapping[oldName];
            delete this.__paramMapping[oldName];
            this.__paramMapping[newName] = index;
            this.parameterNameChanged.emit(newName, oldName);
        });
        this.__params.push(param)
        this.__paramMapping[param.getName()] = this.__params.length - 1;
        this.parameterAdded.emit();
        return param;
    }


    //////////////////////////////////////////
    // Persistence


    toJSON(flags = 0) {
        let paramsJSON = [];
        for (let param of this.__params)
            paramsJSON.push(param.toJSON())
        return {
            "params": paramsJSON,
        }
    }

    fromJSON(j, flags) {

        // TODO: make this work
        // for (let param of j.params)
        //     paramsJSON.push(param.toJSON());
    }

    readBinary(reader, flags) {
        // TODO: make this work
        // for (let param of j.params)
        //     paramsJSON.push(param.toJSON());
    }

    toString() {
        return JSON.stringify(this.toJSON(), null, 2)
    }
};

export {
    ParameterOwner
};