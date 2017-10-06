import {
    Signal,
    Vec2,
    Xfo
} from '../Math';
import {
    BaseItem
} from './BaseItem';
import {
    sgFactory
} from './SGFactory.js';


class Group extends BaseItem {
    constructor(name) {
        super(name);


        this.__items = [];

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
        }
    }


    addItem(item) {
        item.mouseDown.connect((mousePos, event)=>{
            this.mouseDownOnItem.emit(mousePos, event, item);
        });
        item.mouseUp.connect((mousePos, event)=>{
            this.mouseUpOnItem.emit(mousePos, event, item);
        });
        item.mouseMove.connect((mousePos, event)=>{
            this.mouseMoveOnItem.emit(mousePos, event, item);
        });
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
};

sgFactory.registerClass('Group', Group);

export {
    Group
};