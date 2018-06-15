
import {
    ParamFlags,
    ValueSetMode,
    Parameter
} from './Parameter.js';


class StructParameter extends Parameter {
    constructor(name) {
        super(name, {}, 'Struct');
        this.__members = [];
    }

    _addMember(parameter) {
        this.__value[parameter.getName()] = parameter.getValue();
        parameter.valueChanged.connect(()=>{
            this.__value[parameter.getName()] = parameter.getValue();
        });
        this.__members.push(parameter);
        this.__flags |= ParamFlags.USER_EDITED;
        this.valueChanged.emit();
        return parameter;
    }

    getMember(name) {
        for(let p of this.__members) {
            if(p.getName() == name)
                return p;
        }
    }

    //////////////////////////////////////////
    // Persistence

    toJSON(context) {
        if((this.__flags&ParamFlags.USER_EDITED) == 0)
            return;
        const members = [];
        for(let p of this.__members) 
            members.push(p.toJSON(context));
        return {
            members
        };
    }

    fromJSON(j, context) {
        if(j.members == undefined){
            console.warn("Invalid Parameter JSON");
            return;
        }
        // Note: JSON data is only used to store user edits, so 
        // parameters loaed from JSON are considered user edited.
        this.__flags |= ParamFlags.USER_EDITED;

        for(let i=0; i<j.members.length; i++) {
            if(j.members[i]) {
                this.__members[i].fromJSON(j.members[i], context);
            }
        }
    }
};



export {
    StructParameter
};