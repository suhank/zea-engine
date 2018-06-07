import {
    Signal
} from '../Utilities';
import {
    MaterialLibrary
} from './MaterialLibrary.js';
import {
    resourceLoader
} from './ResourceLoader.js';
import {
    loadTextfile
} from './Utils.js';


class MaterialLibraryManager {
    constructor() {
        this.__materialLibraries = {};
        this.materialLibraryLoaded = new Signal();

        resourceLoader.registerResourceCallback('.matlib', (filename, file)=>{
            loadTextfile(file.url,
                (data) => {
                    const j = JSON.parse(data);
                    const m = new MaterialLibrary();
                    m.fromJSON(j);
                    const stem = filename.split('.')[0];// trim off the extension
                    this.__materialLibraries[stem] = m;
                }
            );
        })
    }

    getMaterialLibraryNames() {
        let names = [];
        for(let name in this.__materialLibraries) {
            names.push(name);
        }
        return names;
    }

    hasMaterialLibrary(name) {
        return name in this.__materialLibraries;
    }

    getMaterialLibrary(name, assert=true) {
        const res = this.__materialLibraries[name];
        if(!res && assert){
            throw("MaterialLibrary:" + name+ " not found in library:" + this.getMaterialLibraryNames())
        }
        return res;
    }

    resolveMaterialFromPath(path) {
        const materialLibrary = this.getMaterialLibrary(path[0]);
        return materialLibrary.getMaterial(path[1]);
    }
 
};

const materialLibraryManager = new MaterialLibraryManager();
export {
    materialLibraryManager
};