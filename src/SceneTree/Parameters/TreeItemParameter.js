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
        this.treeItemGlobalXfoChanged = new Signal();
    }
    
    clone(flags) {
        const clonedParam = new TreeItemParameter(this.__name, this.__value);
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

    __treeItemGlobalXfoChanged(mode){
        this.treeItemGlobalXfoChanged.emit(mode);
    }

    setValue(treeItem, mode = ValueSetMode.USER_SETVALUE) { // 0 == normal set. 1 = changed via cleaner fn, 2=change by loading/cloning code.
        if(this.__value !== treeItem){
            if(this.__value){
                this.__value.globalXfoChanged.disconnect(this.__treeItemGlobalXfoChanged.bind(this));
                this.__value.removeRef(this);
            }
            this.__value = treeItem;
            if(this.__value){
                this.__value.addRef(this);
                this.__value.globalXfoChanged.connect(this.__treeItemGlobalXfoChanged.bind(this));
            }
            if(mode == ValueSetMode.USER_SETVALUE)
                this.__flags |= ParamFlags.USER_EDITED;
            this.valueChanged.emit(mode);
        }
    }

    //////////////////////////////////////////
    // Persistence

    toJSON(context, flags) {
        if((this.__flags&ParamFlags.USER_EDITED) == 0)
            return;
        const makeRelative = (path) => {
            const assetPath = context.assetItem.getPath();
            return path.slice(assetPath.length);
        }
        return {
            value: makeRelative(this.__value.getPath())
        }
    }

    fromJSON(j, context, flags) {
        if(j.value == undefined){
            console.warn("Invalid Parameter JSON");
            return;
        }
        context.resolvePath(j.value).then((treeItem)=>{
            this.setValue(treeItem);
        });
        this.__flags |= ParamFlags.USER_EDITED;
    }


    destroy(){
        if(this.__value){
            this.__value.parameterValueChanged.disconnect(this.valueParameterValueChanged.emit);
            this.__value.removeRef(this);
        }
    }
};


export {
    TreeItemParameter/*,
    TreeItemListParameter*/
};