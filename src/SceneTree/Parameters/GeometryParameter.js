import {
    Signal
} from '../../Utilities';
import {
    ParamFlags,
    ValueSetMode,
    Parameter
} from './Parameter.js';

class GeometryParameter extends Parameter {
    constructor(name, value) {
        super(name, undefined, 'Geometry');
        this.boundingBoxDirtied = new Signal();
        this.setValue(value);
    }
    
    clone() {
        const clonedParam = new GeometryParameter(this.__name, this.__value);
        this.cloneMembers(clonedParam);
        return clonedParam;
    }


    setValue(geom, mode = ValueSetMode.USER_SETVALUE) { // 0 == normal set. 1 = changed via cleaner fn, 2=change by loading/cloning code.
        if(this.__value !== geom){
            if(this.__value){
                this.__value.boundingBoxDirtied.disconnect(this.boundingBoxDirtied.emit);
                this.__value.removeRef(this);
            }
            this.__value = geom;
            if(this.__value){
                this.__value.addRef(this);
                this.__value.boundingBoxDirtied.connect(this.boundingBoxDirtied.emit);
            }
            
            if(mode == ValueSetMode.USER_SETVALUE)
                this.__flags |= ParamFlags.USER_EDITED;

            // During the cleaning process, we don't want notifications.
            if(mode != ValueSetMode.OPERATOR_SETVALUE)
                this.valueChanged.emit(mode);
        }
    }

    //////////////////////////////////////////
    // Persistence

    toJSON(context) {
        return super.toJSON(context);
    }

    fromJSON(j, context) {
        return super.fromJSON(j, context);
    }

    

    destroy(){
        // Note: some parameters hold refs to geoms/materials, 
        // which need to be explicitly cleaned up.
        // e.g. freeing GPU Memory.

        if(this.__value){
            this.__value.boundingBoxDirtied.disconnect(this.boundingBoxDirtied.emit);
            this.__value.removeRef(this);
        }
    }
};


export {
    GeometryParameter
};