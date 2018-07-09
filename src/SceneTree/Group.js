import {
    Vec2,
    Xfo
} from '../Math';
import {
    Signal
} from '../Utilities';
import {
    ValueSetMode,
    BooleanParameter,
} from './Parameters';
import {
    ItemFlags
} from './BaseItem';
import {
    TreeItem
} from './TreeItem';
import {
    sgFactory
} from './SGFactory.js';


class Group extends TreeItem {
    constructor(name) {
        super(name);

        this.__cutawayParam = this.addParameter(new BooleanParameter('CutawayEnabled', false));
        this.__invInitialXfo = new Xfo();
        this.__initialXfos = [];

        this.__items = [];

        this.__visibleParam.valueChanged.connect((changeType)=>{
            const len = this.__items.length;
            for (let i = 0; i < len; i++) {
                this.__items[i].getParameter('Visible').setDirty(this.__visibleParam.getValue);
            }
        });
        this.__selectedParam.valueChanged.connect((changeType)=>{
            const len = this.__items.length;
            for (let i = 0; i < len; i++) {
                this.__items[i].getParameter('Selected').setDirty(this.__selectedParam.getValue);
            }
        });
        // Groups can be used to control Cutaway toggles for their members.
        this.__cutawayParam.valueChanged.connect((changeType)=>{
            const len = this.__items.length;
            for (let i = 0; i < len; i++) {
                const itemParam = this.__items[i].getParameter('CutawayEnabled');
                if(itemParam)
                    itemParam.setDirty(this.__cutawayParam.getValue);
            }
        });
        this.__globalXfoParam.valueChanged.connect((changeType)=>{
            if(this.__items.length == 0) {
                const xfo = this.__globalXfoParam.getValue();
                this.__invInitialXfo = xfo.inverse();
            }
            else {
                let delta;
                const setDirty = (item, initialXfo)=>{
                    const clean = ()=>{
                        if(!delta) {
                            const xfo = this.__globalXfoParam.getValue();
                            // Compute the skinning transform that we can
                            // apply to all the items in the group.
                            // delta = this.__invInitialXfo.multiply(xfo);
                            delta = xfo.multiply(this.__invInitialXfo);
                        }
                        return delta.multiply(initialXfo);
                    }
                    item.getParameter('GlobalXfo').setDirty(clean);
                }
                const len = this.__items.length;
                for (let i = 0; i < len; i++) {
                    setDirty(this.__items[i], this.__initialXfos[i]);
                }
            }
        });

        this.mouseDownOnItem = new Signal();
        this.mouseUpOnItem = new Signal();
        this.mouseMoveOnItem = new Signal();


    }

    destroy() {
        super.destroy();
    }

    clone() {
        let cloned = new Group();
        this.copyTo(cloned);
        return cloned;
    }

    copyTo(cloned) {
        super.copyTo(cloned);
    }

    //////////////////////////////////////////
    // Items

    resolveItems(paths, centerOnFirst=true) {
        const asset = this.getOwner();
        for(let path of paths) {
            let treeItem = asset.resolvePath(path);
            if(treeItem) {
                this.addItem(treeItem, centerOnFirst);
            }
            else {
                console.warn("Group could not resolve item:" + path)
            }
        }
    }


    addItem(item, centerOnFirst=true) { 
        if(this.__items.length == 0 && centerOnFirst) {
            this.setGlobalXfo(item.getGlobalXfo());
        }
        const index = this.__items.length;
        item.mouseDown.connect((mousePos, event)=>{
            this.mouseDownOnItem.emit(mousePos, event, item);
        });
        item.mouseUp.connect((mousePos, event)=>{
            this.mouseUpOnItem.emit(mousePos, event, item);
        });
        item.mouseMove.connect((mousePos, event)=>{
            this.mouseMoveOnItem.emit(mousePos, event, item);
        });
        item.globalXfoChanged.connect((mode)=>{
            if(mode == ValueSetMode.USER_SETVALUE)
                this.__initialXfos[index] = item.getGlobalXfo();
        });
        this.__initialXfos[index] = item.getGlobalXfo();
        this.__items.push(item);
    }


    /////////////////////////
    // Events

    onMouseDown(event) {
        return false;
    }

    onMouseUp(event) {
        return false;
    }

    onMouseMove(event) {
        return false;
    }


    //////////////////////////////////////////
    // Persistence

    toJSON(context) {
        const j = super.toJSON(context);
        const treeItems = [];
        const makeRelative = (path) => {
            const assetPath = context.assetItem.getPath();
            return path.slice(assetPath.length);
        }
        for(let p of this.__items) 
            treeItems.push(makeRelative(p.getPath()));
        j.treeItems = treeItems
        return j;
    }

    fromJSON(j, context) {
        super.fromJSON(j, context);

        // Note: JSON data is only used to store user edits, so 
        // parameters loaed from JSON are considered user edited.
        this.setFlag(ItemFlags.USER_EDITED);

        if(!j.treeItems){
            console.warn("Invalid Parameter JSON");
            return;
        }

        const addItem = (index, path)=>{
            const treeItem = context.assetItem.resolvePath(path);
            this.addItem(treeItem);
            // Note: We want the group to match the transform of the 
            if(index == 0) {
                const xfo = context.assetItem.getGlobalXfo().inverse().multiply(treeItem.getGlobalXfo());
                this.getParameter('LocalXfo').setValue(xfo, ValueSetMode.DATA_LOAD);
            }
        }
        const loadItem = (index, path)=> {
            // Note: the tree should have fully loaded by the time we are loading operators
            // even new items and groups should have been created. Operators and state machines 
            // are loaded last.
            const treeItem = context.assetItem.resolvePath(path);
            if(!treeItem) {
                const onloaded = ()=>{
                    addItem(index, treeItem);
                    context.assetItem.loaded.disconnect(onloaded);
                }
                context.assetItem.loaded.connect(onloaded);
            }
            else {
                addItem(index, treeItem);
            }
        }
        const treeItems = j.treeItems;
        for(let i=0; i<j.treeItems.length; i++) {
            addItem(i, treeItems[i]);
        }


    }
};

sgFactory.registerClass('Group', Group);

export {
    Group
};