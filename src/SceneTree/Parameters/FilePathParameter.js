import {
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
};


export {
    FilePathParameter
};