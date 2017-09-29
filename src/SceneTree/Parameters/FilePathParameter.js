import {
    Signal
} from '../../Math';
import {
    Parameter
} from './Parameter.js';

class FilePathParameter extends Parameter {
    constructor(name, resourceLoader) {
        super(name, '', 'FilePath');
        this.__resourceLoader = resourceLoader;

        this.__url;
        this.valueChanged.connect(()=>{
            let value = this.getValue();
            if (!this.__resourceLoader.resourceAvailable(value)) {
                console.warn("Resource unavailable:" + value);
                return;
            }
            this.__url = this.__resourceLoader.resolveURL(value);
        });
    }

    getURL() {
        return this.__url;
    }


};


export {
    FilePathParameter
};