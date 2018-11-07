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

// Explicit impport of files to avoid importing all the parameter types.
// Note: soon these imports should be removed, once all code avoids calling 
// 'addPArameter' without the parameter instance.
import {
    Parameter,
} from './Parameters/Parameter.js';
import {
    NumberParameter,
} from './Parameters/NumberParameter.js';
import {
    Vec2Parameter,
} from './Parameters/Vec2Parameter.js';
import {
    Vec3Parameter,
} from './Parameters/Vec3Parameter.js';
import {
    ColorParameter,
} from './Parameters/ColorParameter.js';

class ParameterOwner extends RefCounted {
    constructor() {
        super();

        this.__params = [];
        this.__paramMapping = {};
        this.__paramSignalIds = {};

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
        else {
            console.warn("Add Paremter will soon only take a single argument of a parameter instance")
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
        this.__paramSignalIds[name] = param.valueChanged.connect((mode) => this.parameterValueChanged.emit(param, mode));
        param.addRef(this);
        this.__params.push(param)
        this.__paramMapping[name] = this.__params.length - 1;
        this.parameterAdded.emit(name);
        return param;
    }

    removeParameter(name){
        if(this.__paramMapping[name] == undefined) {
            console.throw("Unable to Remove Parameter:" + name);
        }
        const index = this.__paramMapping[name];
        const param = this.__params[this.__paramMapping[name]]
        param.removeRef(this);
        param.valueChanged.disconnectId(this.__paramSignalIds[name]);
        this.__params.splice(index, 1)
        const paramMapping = {};
        for (let i=0; i<this.__params.length; i++){
            paramMapping[this.__params[i].getName()] = i;
        }
        this.__paramMapping = paramMapping;
        this.parameterRemoved.emit(name);
    }

    replaceParameter(param){
        const name = param.getName();
        const index = this.__paramMapping[name];
        const prevparam = this.__params[this.__paramMapping[name]]
        prevparam.removeRef(this);
        prevparam.valueChanged.disconnectId(this.__paramSignalIds[name]);

        param.addRef(this);
        this.__paramSignalIds[name] = param.valueChanged.connect((mode) => this.parameterValueChanged.emit(param, mode));
        this.__params[index] = param;
    }

    // _removeAllParameters(){
    //     for (let i=this.__params.length-1; i>=0; i--) {
    //         this.removeParameter(i);
    //     }
    // }


    addCommand(command) {
        const name = command.getName();
        command.setOwner(this)
        this.__params.push(command)
        this.__paramMapping[name] = this.__params.length - 1;
        return command;
    }
    //////////////////////////////////////////
    // Persistence


    toJSON(context) {

        const paramsJSON = {};
        let savedParams = 0;
        for (let param of this.__params){
            if(param.numRefs() > 1 && param.getRefIndex(this) != 0) {
                paramsJSON[param.getName()] = {
                    paramPath: context.makeRelative(param.getPath())
                }
                savedParams++;
            }
            else {
                const paramJSON = param.toJSON(context);
                if(paramJSON){
                    paramsJSON[param.getName()] = paramJSON;
                    savedParams++;
                }
            }
        }
        if(savedParams > 0)
            return { params: paramsJSON };
    }

    fromJSON(j, context) {
        if(j.params) {
            for (let key in j.params) {
                const pj = j.params[key];
                const param = this.getParameter(key);
                if(!param) 
                    console.warn("Param not found:" + key);
                else {
                    if(pj.paramPath){
                        const param = context.resolvePath(pj.paramPath, 0);
                        if(param)
                            this.replaceParameter(param)
                    }
                    else {
                        param.fromJSON(pj, context);
                    }
                }
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