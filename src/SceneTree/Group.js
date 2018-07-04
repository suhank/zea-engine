import {
    Vec2,
    Xfo
} from '../Math';
import {
    Signal
} from '../Utilities';
import {
    ValueSetMode
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

        this.__cutawayParam = this.addParameter('CutawayEnabled', false);
        this.__initialGlobalXfoParam = this.addParameter('InitialGlobalXfo', new Xfo());
        this.__invInitialXfo = new Xfo();
        this.__initialXfos = [];

        this.__items = [];
        // this.__visibleParam = this.addParameter('Visible', true);
        this.__visibleParam.valueChanged.connect((changeType)=>{
            const value = this.__visibleParam.getValue();
            const len = this.__items.length;
            for (let i = 0; i < len; i++) {
                this.__items[i].getParameter('Visible').setValue(value);
            }
        });
        this.__selectedParam.valueChanged.connect((changeType)=>{
            const value = this.__selectedParam.getValue();
            const len = this.__items.length;
            for (let i = 0; i < len; i++) {
                this.__items[i].getParameter('Selected').setValue(value);
            }
        });
        // Groups can be used to control Cutaway toggles for their members.
        this.__cutawayParam.valueChanged.connect((changeType)=>{
            const value = this.__cutawayParam.getValue();
            const len = this.__items.length;
            for (let i = 0; i < len; i++) {
                const itemParam = this.__items[i].getParameter('CutawayEnabled');
                if(itemParam)
                    itemParam.setValue(value);
            }
        });
        this.__initialGlobalXfoParam.valueChanged.connect((changeType)=>{
            this.__invInitialXfo = this.__initialGlobalXfoParam.getValue().inverse();
        });
        this.__globalXfoParam.valueChanged.connect((changeType)=>{
            if(this.__items.length == 0) {
                const xfo = this.__globalXfoParam.getValue();
                this.__initialGlobalXfoParam.setValue(xfo, changeType);
            }
            else {
                let delta;
                // const delta = this.__invInitialXfo.multiply(xfo);
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
            const xfo = item.getGlobalXfo();
            const pxfo = item.getParentItem().getGlobalXfo();
            xfo.sc = pxfo.sc;
            this.setGlobalXfo(xfo);
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
        j.treeItems = treeItems;
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
        const treeItems = j.treeItems;
        const onloaded = ()=>{
            // this.setValue(assetItem.resolvePath(itemPath));
            for(let i=0; i<j.treeItems.length; i++) {
                const treeItem = context.assetItem.resolvePath(treeItems[i]);
                this.addItem(treeItem);
            }
            context.assetItem.loaded.disconnect(onloaded)
        }
        context.assetItem.loaded.connect(onloaded);

    }
};

sgFactory.registerClass('Group', Group);

export {
    Group
};