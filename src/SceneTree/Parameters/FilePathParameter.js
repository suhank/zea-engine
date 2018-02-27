import {
    Signal
} from '../../Utilities';
import {
    Parameter
} from './Parameter.js';

class FilePathParameter extends Parameter {
    constructor(name, resourceLoader) {
        super(name, '', 'FilePath');
        if(!resourceLoader)
            throw("Resource Loader not provided to FilePathParameter");
        this.__resourceLoader = resourceLoader;

        this.__file;
        this.valueChanged.connect(()=>{
            let value = this.getValue();
            if (!this.__resourceLoader.resourceAvailable(value)) {
                console.warn("Resource unavailable:" + value);
                return;
            }
            this.__file = this.__resourceLoader.resolveURL(value);
        });
    }

    getURL() {
        return this.__file.url;
    }

    cloneMembers(clonedParam) {
        clonedParam.__file = this.__file;
    }
    
    clone() {
        let clonedParam = new FilePathParameter(this.__name, this.__resourceLoader);
        this.cloneMembers();
        return clonedParam;
    }
};


export {
    FilePathParameter
};