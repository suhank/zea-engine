import {
    ParamFlags,
    Parameter
} from './Parameter.js';
import {
    resourceLoader
} from '../ResourceLoader.js';

class FilePathParameter extends Parameter {
    constructor(name) {
        super(name, '', 'FilePath');

        this.__file;
        this.valueChanged.connect(()=>{
            let value = this.getValue();
            if (!resourceLoader.resourceAvailable(value)) {
                console.warn("Resource unavailable:" + value);
                return;
            }
            this.__file = resourceLoader.resolveFile(value);
        });
    }

    getURL() {
        return this.__file ? this.__file.url : undefined;
    }

    cloneMembers(clonedParam) {
        clonedParam.__file = this.__file;
    }
    
    clone() {
        let clonedParam = new FilePathParameter(this.__name, resourceLoader);
        this.cloneMembers();
        return clonedParam;
    }


    //////////////////////////////////////////
    // Persistence


    toJSON(flags = 0) {
        if((this.__flags&ParamFlags.USER_EDITED) == 0)
            return;
        return { value: this.__value };
    }

    fromJSON(j) {
        if(j.value == undefined){
            console.warn("Invalid Parameter JSON");
            return;
        }
        this.setValue(j.value);
        // Note: JSON data is only used to store user edits, so 
        // parameters loaed from JSON are considered user edited.
        this.__flags |= ParamFlags.USER_EDITED;
    }

};


export {
    FilePathParameter
};