import {
    Signal
} from '../../Utilities';
import {
    ParamFlags,
    ValueSetMode,
    Parameter,
    ListParameter
} from './Parameter.js';

class TreeItemParameter extends Parameter {
    constructor(name, filterFn) {
        super(name, undefined, 'TreeItem');
        this.__filterFn = filterFn;
        this.valueParameterValueChanged = new Signal();
    }
    
    clone() {
        const clonedParam = new TreeItemParameter(this.__name, this.__value);
        this.cloneMembers(clonedParam);
        return clonedParam;
    }

    setOwner(owner) {
        this.__owner = owner;
    }

    getOwner() {
        return this.__owner;
    }

    setFilterFn(flterFn) {
        this.__filterFn = filterFn;
    }

    getFilterFn() {
        return this.__filterFn;
    }

    setValue(treeItem, mode = ValueSetMode.USER_SETVALUE) { // 0 == normal set. 1 = changed via cleaner fn, 2=change by loading/cloning code.
        if(this.__value !== treeItem){
            if(this.__value){
                this.__value.parameterValueChanged.disconnect(this.valueParameterValueChanged.emit);
                this.__value.removeRef(this);
            }
            this.__value = treeItem;
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
        const itemPath = j.value;
        const findAsset = () => {
            return this.__owner.getOwner();
        }
        const assetItem = findAsset(this.__owner);
        if(assetItem) {
            const onloaded = ()=>{
                this.setValue(assetItem.resolvePath(itemPath));
                assetItem.loaded.disconnect(onloaded)
            }
            assetItem.loaded.connect(onloaded)
            this.__flags |= ParamFlags.USER_EDITED;
        }
    }
};

/*
class TreeItemListParameter extends ListParameter {
    constructor(name, filterFn) {
        super(name, 'TreeItem');
        this.__filterFn = filterFn;
        this.valueParameterValueChanged = new Signal();
    }
    
    clone() {
        const clonedParam = new TreeItemParameter(this.__name, this.__value);
        this.cloneMembers(clonedParam);
        return clonedParam;
    }

    setOwner(owner) {
        this.__owner = owner;
    }

    getOwner() {
        return this.__owner;
    }

    setFilterFn(flterFn) {
        this.__filterFn = filterFn;
    }

    getFilterFn() {
        return this.__filterFn;
    }

    setValue(treeItem, mode = ValueSetMode.USER_SETVALUE) { // 0 == normal set. 1 = changed via cleaner fn, 2=change by loading/cloning code.
        if(this.__value !== treeItem){
            if(this.__value){
                this.__value.parameterValueChanged.disconnect(this.valueParameterValueChanged.emit);
                this.__value.removeRef(this);
            }
            this.__value = treeItem;
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
        const itemPath = j.value;
        const findAsset = () {

        }
        const assetItem = findAsset(this.__owner);
        if(assetItem) {
            const onloaded = ()=>{
                this.setValue(assetItem.resolvePath(itemPath));
                assetItem.loaded.disconnect(onloaded)
            }
            assetItem.loaded.connect(onloaded)
            this.__flags |= ParamFlags.USER_EDITED;
        }
    }
};
*/

export {
    TreeItemParameter/*,
    TreeItemListParameter*/
};