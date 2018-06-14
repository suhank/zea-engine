
import {
    ParamFlags,
    ValueSetMode,
    Parameter
} from './Parameter.js';


class StructParameter extends Parameter {
    constructor(name) {
        super(name, {}, 'Struct');
        this.__params = [];
    }

    _addMember(parameter) {
        this.__value[parameter.getName()] = parameter.getValue();
        parameter.valueChanged.connect(()=>{
            this.__value[parameter.getName()] = parameter.getValue();
        });
        this.__params.push(parameter);
        this.valueChanged.emit();
        return parameter;
    }

    getMember(name) {
        for(let p of this.__params) {
            if(p.getName() == name)
                return p;
        }
    }

    //////////////////////////////////////////
    // Persistence

    toJSON(flags = 0) {
        if((this.__flags&ParamFlags.USER_EDITED) == 0)
            return;
        const params = [];
        for(let p of this.__params) 
            params.push(p.toJSON(flags));
        return {
            params
        };
    }

    fromJSON(j) {
        if(j.value == undefined){
            console.warn("Invalid Parameter JSON");
            return;
        }
        // Note: JSON data is only used to store user edits, so 
        // parameters loaed from JSON are considered user edited.
        this.__flags |= ParamFlags.USER_EDITED;

        for(let i=0; i<j.params.length; i++) {
            this.__params[i].fromJSON(j.params[i]);
        }
    }
};



export {
    StructParameter
};