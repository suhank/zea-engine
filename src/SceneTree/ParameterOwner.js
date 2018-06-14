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

        // Paramters are not intended to be dynamic.
        // Instead they are part of the mixin architecture.
        // Note: Materials add/remove paramters when the
        // shader name is changed.
        this.parameterAdded = new Signal();
        this.parameterRemoved = new Signal();
        this.parameterValueChanged = new Signal();
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

    getParameterIndex(paramName) {
        return this.__paramMapping[paramName];
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
            defaultValue.setName(paramName);
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
        param.valueChanged.connect((mode) => this.parameterValueChanged.emit(param.getName(), mode));
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

    removeParameter(index){
        const param = this.__params[index]
        this.__params.splice(index, 1)
        this.parameterRemoved.emit(param.getName());
    }

    _removeAllParameters(){
        for (let i=this.__params.length-1; i>=0; i--) {
            this.removeParameter(i);
        }
    }
    //////////////////////////////////////////
    // Persistence


    toJSON(flags = 0) {
        let paramsJSON = {};
        let savedParams = 0;
        for (let param of this.__params){
            const paramJSON = param.toJSON();
            if(paramJSON){
                paramsJSON[param.getName()] = paramJSON;
                savedParams++;
            }
        }
        if(savedParams > 0)
            return { params: paramsJSON };
    }

    fromJSON(j, flags) {
        if(j.params) {
            for (let key in j.params) {
                const param = this.getParameter(key);
                if(!param) 
                    console.warn("Param not found:" + paramJSON.name);
                else
                    param.fromJSON(j.params[key]);
            }
        }
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