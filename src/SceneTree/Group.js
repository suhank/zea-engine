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
    TreeItem
} from './TreeItem';
import {
    sgFactory
} from './SGFactory.js';


class Group extends TreeItem {
    constructor(name) {
        super(name);

        this.__initialBlobalXfoParam = this.addParameter('InitialGlobalXfo', new Xfo());
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
        this.__initialBlobalXfoParam.valueChanged.connect((changeType)=>{
            this.__invInitialXfo = this.__initialBlobalXfoParam.getValue().inverse();
        });
        this.__globalXfoParam.valueChanged.connect((changeType)=>{
            const xfo = this.__globalXfoParam.getValue();
            if(this.__items.length == 0) {
                this.__initialBlobalXfoParam.setValue(xfo, changeType);
            }
            else {
                const delta = this.__invInitialXfo.multiply(xfo);
                const len = this.__items.length;
                for (let i = 0; i < len; i++) {
                    // TODO: should we cache the initial xfo of each bound item
                    // so we can make this system deterministic?
                    const item = this.__items[i];
                    const itemXfo = delta.multiply(this.__initialXfos[i]);
                    item.setGlobalXfo(itemXfo, ValueSetMode.OPERATOR_SETVALUE);
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

    resolveItems(rootItem, paths) {
        for(let path of paths) {
            let treeItem = rootItem.resolvePath(path);
            if(treeItem) {
                this.addItem(treeItem);
            }
            else {
                console.warn("Group could not resolve item:" + path)
            }
        }
    }


    addItem(item) {
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