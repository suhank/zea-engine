import {
    ListParameter
} from './ListParameter.js';
import {
    TreeItemParameter
} from './TreeItemParameter.js';


class TreeItemGroupParameter extends ListParameter {
    constructor(name, filterFn) {
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
        const clonedParam = new TreeItemGroupParameter(this.__name, clonedValue, this.__dataType);
        this.cloneMembers(clonedParam);
        return clonedParam;
    }
};


export {
    TreeItemGroupParameter
};