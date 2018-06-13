import {
    Signal
} from '../../Utilities';
import {
    ParamFlags,
    ValueSetMode,
    Parameter
} from './Parameter.js';
import {
    materialLibraryManager
} from '../MaterialLibraryManager.js';

class MaterialParameter extends Parameter {
    constructor(name, value) {
        super(name, value, 'Material');
        this.valueParameterValueChanged = new Signal();
    }
    
    clone() {
        let clonedParam = new MaterialParameter(this.__name, this.__value);
        this.cloneMembers();
        return clonedParam;
    }

    setValue(material, mode = ValueSetMode.USER_SETVALUE) { // 0 == normal set. 1 = changed via cleaner fn, 2=change by loading/cloning code.
        if(this.__value !== material){
            if(this.__value){
                this.__value.parameterValueChanged.disconnect(this.valueParameterValueChanged.emit);
                this.__value.removeRef(this);
            }
            this.__value = material;
            if(this.__value){
                this.__value.addRef(this);
                this.__value.parameterValueChanged.connect(this.valueParameterValueChanged.emit);
            }
            if(mode == ValueSetMode.USER_SETVALUE)
                this.__flags |= ParamFlags.USER_EDITED;
            this.valueChanged.emit(mode);
        }
    }

    //////////////////////////////////////////
    // Persistence

    toJSON(flags = 0) {
        if((this.__flags&ParamFlags.USER_EDITED) == 0)
            return;
        return {
            value: this.__value.getPath()
        }
    }

    fromJSON(j) {
        if(j.value == undefined){
            console.warn("Invalid Parameter JSON");
            return;
        }
        const materialPath = j.value;
        this.__value = materialLibraryManager.resolveMaterialFromPath(materialPath);
        this.__flags |= ParamFlags.USER_EDITED;
    }
};


export {
    MaterialParameter
};