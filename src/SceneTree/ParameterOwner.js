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
        const name = param.getName();
        if(this.__paramMapping[name] != undefined) {
            console.warn("Replacing Parameter:" + name)
            this.removeParameter(name);
        }
        param.valueChanged.connect((mode) => this.parameterValueChanged.emit(param, mode));
        param.setOwner(this)
        this.__params.push(param)
        this.__paramMapping[name] = this.__params.length - 1;
        this.parameterAdded.emit();
        return param;
    }

    removeParameter(name){
        if(this.__paramMapping[name] == undefined) {
            console.throw("Unable to Remove Parameter:" + name);
        }
        const index = this.__paramMapping[name];
        this.__params.splice(index, 1)
        const paramMapping = {};
        for (let i=0; i<this.__params.length; i++){
            paramMapping[this.__params[i].getName()] = i;
        }
        this.__paramMapping = paramMapping;
        this.parameterRemoved.emit(name);
    }

    // _removeAllParameters(){
    //     for (let i=this.__params.length-1; i>=0; i--) {
    //         this.removeParameter(i);
    //     }
    // }
    //////////////////////////////////////////
    // Persistence


    toJSON(context) {
        let paramsJSON = {};
        let savedParams = 0;
        for (let param of this.__params){
            const paramJSON = param.toJSON(context);
            if(paramJSON){
                paramsJSON[param.getName()] = paramJSON;
                savedParams++;
            }
        }
        if(savedParams > 0)
            return { params: paramsJSON };
    }

    fromJSON(j, context) {
        if(j.params) {
            for (let key in j.params) {
                const param = this.getParameter(key);
                if(!param) 
                    console.warn("Param not found:" + key);
                else
                    param.fromJSON(j.params[key], context);
            }
        }
    }

    readBinary(reader, context) {
        // TODO: make this work
    }

    toString() {
        return JSON.stringify(this.toJSON(), null, 2)
    }

    destroy(){
        for (let param of this.__params){
            param.destroy();
        }
        super.destroy();
    };
};

export {
    ParameterOwner
};