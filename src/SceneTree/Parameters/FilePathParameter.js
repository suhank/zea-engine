import {
    ValueSetMode,
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
            const path = this.getValue();
            if (!resourceLoader.resourceAvailable(path)) {
                console.warn("Resource unavailable:" + path);
                return;
            }
            this.__file = resourceLoader.resolveFile(path);
        });
    }

    getFilename() {
        const path = this.getValue();
        const parts = path.split('/');
        if(parts.length)
            return parts[parts.length-1];
    }

    getStem() {
        const filename = this.getFilename();
        if(filename) {
            const parts = filename.split('.');
            if(parts.length == 2)
                return parts[0];
            else
                return filename;
        }
    }

    getURL() {
        return this.__file ? this.__file.url : undefined;
    }

    cloneMembers(clonedParam) {
        clonedParam.__file = this.__file;
    }
    
    clone() {
        const clonedParam = new FilePathParameter(this.__name, resourceLoader);
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
        this.setValue(j.value, ValueSetMode.DATA_LOAD);
        // Note: JSON data is only used to store user edits, so 
        // parameters loaed from JSON are considered user edited.
        this.__flags |= ParamFlags.USER_EDITED;
    }

};


export {
    FilePathParameter
};