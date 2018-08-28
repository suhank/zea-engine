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
            // Note: the file path is selected by using the file browser
            // For now it can return an aboslute path(within the project)
            // and we convert to relative when we save.
            const resourceId = this.getValue();
            if (!resourceLoader.resourceAvailable(resourceId)) {
                console.warn("Resource unavailable:" + resourceId);
                return;
            }
            this.__file = resourceLoader.getFile(resourceId);
        });
    }

    getFilepath() {
        if(this.__file) {
            return resourceLoader.getFilepath(this.__file.id);
        }
        return '';
    }

    setFilepath(filePath, mode) {
        const resourceId = resourceLoader.resolveFilePathToId(filePath);
        if(!resourceId) {
            console.warn("Resource unavailable:" + filePath);
            return;
        }
        this.setValue(resourceId, mode);
    }

    getFilename() {
        if(this.__file) {
            return this.__file.name;
        }
    }

    getExt(){
        const filename = this.getFilename();
        const suffixSt = filename.lastIndexOf('.')
        if (suffixSt != -1)
            return filename.substring(suffixSt).toLowerCase()
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

    getFileFolder() {
        if(this.__file) {
            if(this.__file.parent)
                return resourceLoader.resolveFile(this.__file.parent);
            return resourceLoader.getRootFolder();
        }
    }

    getFileFolderPath() {
        const filePath = this.getFilepath();
        if(filePath) {
            return filePath.substring(0, filePath.lastIndexOf("/")) + '/';
        }
    }

    getFile() {
        return this.__file;
    }

    getFileDesc() {
        console.warn("Deprecated method: 'getFileDesc'. Please use 'getFile'")
        return this.__file;
    }

    getURL() {
        return this.__file ? this.__file.url : undefined;
    }

    cloneMembers(clonedParam) {
        clonedParam.__file = this.__file;
    }
    
    clone() {
        const clonedParam = new FilePathParameter(this.__name);
        this.cloneMembers(clonedParam);
        return clonedParam;
    }


    setDirty(cleanerFn) {
        throw("Cannot drive a filepath param from an oporator")
    }

    setValue(value, mode = ValueSetMode.USER_SETVALUE) { // 0 == normal set. 1 = changed via cleaner fn, 2=change by loading/cloning code.
        if (value == undefined) {
            throw ("Invalid value for setValue.");
        }
        if(value.indexOf('.') > 0) {
            console.warn("Deprecation warning for setValue. setValue should now only take a file id, not a path.");
            return this.setFilepath(value, mode)
        }

        // Note: equality tests only work on simple types.
        // Important here because file changes cause reloads..
        if(value == this.__value) {
            return;
        }
        this.__value = value;
        if(mode == ValueSetMode.USER_SETVALUE)
            this.__flags |= ParamFlags.USER_EDITED;
        this.valueChanged.emit(mode);
    }
    //////////////////////////////////////////
    // Persistence


    toJSON(context) {
        if((this.__flags&ParamFlags.USER_EDITED) == 0)
            return;
        const j =  {  };
        if(this.__file)
            j.value = this.__file.id;
        return j;
    }

    fromJSON(j, context) {
        if(j.value){
            const resourceId = resourceLoader.resolveFilePathToId(j.value);
            this.setValue(resourceId, ValueSetMode.DATA_LOAD);
        }
        else if(j.resourceId){
            this.setValue(j.resourceId, ValueSetMode.DATA_LOAD);
        }
        // Note: JSON data is only used to store user edits, so 
        // parameters loaed from JSON are considered user edited.
        this.__flags |= ParamFlags.USER_EDITED;
    }


};


export {
    FilePathParameter
};