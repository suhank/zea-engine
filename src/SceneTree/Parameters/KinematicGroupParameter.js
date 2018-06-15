
import {
    ParamFlags,
    ValueSetMode
} from './Parameter.js';

import {
    ListParameter
} from './ListParameter.js';
import {
    TreeItemParameter
} from './TreeItemParameter.js';


class KinematicGroupParameter extends ListParameter {
    constructor(name) {
        super(name, TreeItemParameter);
        this.__globalXfoParams = [];
        this.__initialXfos = [];
        this.__deltaXfos = [];
        this.elementAdded.connect((elem, index)=>{
            const globaXfoParam = elem.getParameter('GlobalXfo');
            this.__globalXfoParams[index] = globaXfoParam;
            this.__initialXfos[index] = globaXfoParam.getValue();
            if(index > 0)
                this.__deltaXfos[index] = this.__initialXfos[0].inverse().multiply(this.__initialXfos[index]);
        });
        this.elementRemoved.connect((elem, index)=>{
            this.__globalXfoParams.splice(index, 1);
            this.__initialXfos.splice(index, 1);
            this.__deltaXfos.splice(index, 1)
        });
    }


    getInitialXfo(){
        if(this.__value.length > 0)
            return this.__initialXfos[0];
    }

    getXfo(mode=0){
        if(this.__value.length > 0)
            return this.__value[0].getGlobalXfo(mode=0);
    }

    setXfo(xfo, mode){
        if(this.__value.length > 0) {
            this.__value[0].setGlobalXfo(xfo);
            for(let i=1; i<this.__value.length; i++) {
                this.__value[i].setGlobalXfo(xfo.multiply(this.__deltaXfos[i]), mode);
            }
        }
    }

    setDirty(cleanerFn) {
        this.__cleanerFn = cleanerFn;
        for(let p of this.__globalXfoParams) {
            p.setDirty(cleanerFn);
        }
    }

    removeCleanerFn(cleanerFn) {
        for(let p of this.__globalXfoParams) {
            p.removeCleanerFn(cleanerFn);
        }
        this.__cleanerFn = undefined;
    }

    clone() {
        const clonedParam = new KinematicGroupParameter(this.__name, clonedValue, this.__dataType);
        this.cloneMembers(clonedParam);
        return clonedParam;
    }


    //////////////////////////////////////////
    // Persistence

    toJSON(context) {
        // return super.toJSON(context);
        if((this.__flags&ParamFlags.USER_EDITED) == 0)
            return;
        const treeItems = [];
        // const findAsset = () => {
        //     return this.__owner.getOwner();
        // }
        const makeRelative = (path, relTo) => {
            // for(let i=0; i<relTo.length; )
            return path.slice(relTo.length);
        }
        // const assetItem = findAsset(this.__owner);
        const assetPath = context.assetItem.getPath();
        for(let p of this.__value) 
            treeItems.push(makeRelative(p.getPath(), assetPath));
        return {
            treeItems
        };
    }

    fromJSON(j, context) {

        if(j.treeItems == undefined){
            console.warn("Invalid Parameter JSON");
            return;
        }
        // Note: JSON data is only used to store user edits, so 
        // parameters loaed from JSON are considered user edited.
        this.__flags |= ParamFlags.USER_EDITED;

        if(context.assetItem) {
            const treeItems = j.treeItems;
            const onloaded = ()=>{
                // this.setValue(assetItem.resolvePath(itemPath));
                for(let i=0; i<j.treeItems.length; i++) {
                    const treeItem = context.assetItem.resolvePath(treeItems[i]);
                    this.__value.push(treeItem);
                    this.elementAdded.emit(treeItem, this.__value.length-1)
                }
                context.assetItem.loaded.disconnect(onloaded)
            }
            context.assetItem.loaded.connect(onloaded)
            this.__flags |= ParamFlags.USER_EDITED;
        }

    }

    destroy(){
        for(let i=0; i<this.__value.length; i++) {
            this.removeElement(i);
        }
    }

};


export {
    KinematicGroupParameter
};