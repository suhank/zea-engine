import {
    Xfo,
    Box3
} from '../Math';
import {
    Signal
} from '../Utilities';
import {
    sgFactory
} from './SGFactory.js';
import {
    BaseItem
} from './BaseItem.js';


// Defines used to explicity specify types for WebGL.
const LOADFLAGS_SKIP_CHILDREN = 1 << 0;
const LOADFLAGS_SKIP_MATERIALS = 1 << 2;
const LOADFLAGS_SKIP_GEOMETRIES = 1 << 3;
const LOADFLAGS_ASSETTREE_UPDATE = 1 << 4;

class TreeItem extends BaseItem {
    constructor(name) {
        super(name)

        this.__inheritedVisiblity = true;
        this.__selectable = true;

        this.__childItems = [];
        this.__items = [];
        this.__itemMapping = {};
        

        this.__visibleParam = this.addParameter('visible', true);
        this.__selectedParam = this.addParameter('selected', false);
        this.__localXfoParam = this.addParameter('localXfo', new Xfo());
        this.__globalXfoParam = this.addParameter('globalXfo', new Xfo());
        this.__boundingBoxParam = this.addParameter('boundingBox', new Box3());

        // Bind handlers (havk to )
        this._cleanGlobalXfo = this._cleanGlobalXfo.bind(this);
        this._setGlobalXfoDirty = this._setGlobalXfoDirty.bind(this);
        this._cleanBoundingBox = this._cleanBoundingBox.bind(this);
        this._setBoundingBoxDirty = this._setBoundingBoxDirty.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);

        this.__localXfoParam.valueChanged.connect(this._setGlobalXfoDirty);

        let _cleanLocalXfo = (prevValue)=>{
            let globalXfo = this.__globalXfoParam.getValue();
            if (this.__ownerItem !== undefined)
                return this.__ownerItem.getGlobalXfo().inverse().multiply(globalXfo);
            else
                return globalXfo;
        }
        this.__globalXfoParam.valueChanged.connect((changeType)=>{
            if(changeType == 0){
                // Note: both global and local cannot be dirty at the same time
                // because we need one clean to compute the other. If the global
                // Xfo is explicitly set, then it is now clean, so we can make local
                // dirty. 
                this.__localXfoParam.setDirty(_cleanLocalXfo);
            }
            this._setBoundingBoxDirty();
        });


        this.__visibleParam.valueChanged.connect((changeType)=>{
            let visibile = this.getVisible();
            for (let childItem of this.__childItems)
                childItem.setInheritedVisiblity(visibile);
        });

        this.visibilityChanged = this.__visibleParam.valueChanged;
        this.selectedChanged = this.__selectedParam.valueChanged;
        this.localXfoChanged = this.__localXfoParam.valueChanged;
        this.globalXfoChanged = this.__globalXfoParam.valueChanged;
        this.boundingChanged = this.__boundingBoxParam.valueChanged;

        this.parentChanged = this.ownerChanged;
        this.childAdded = new Signal();
        this.childRemoved = new Signal();

        this.itemAdded = new Signal();
        this.itemRemoved = new Signal();

        this.mouseDown = new Signal();
        this.mouseUp = new Signal();
        this.mouseMove = new Signal();
        
        this.treeItemGlobalXfoChanged = new Signal();
    }

    destroy() {
        this.removeAllChildren();
        super.destroy();
    }

    clone() {
        let cloned = new TreeItem();
        this.copyTo(cloned);
        return cloned;
    }

    copyTo(cloned) {
        super.copyTo(cloned);
        // cloned.__visible = this.__visible;
        cloned.__selectable = this.__selectable;
        for (let childItem of this.__childItems)
            cloned.addChild(childItem.clone());
    }


    //////////////////////////////////////////
    // Parent Item

    setOwner(parentItem) {
        if(this.__ownerItem) {
            this.__ownerItem.globalXfoChanged.disconnect(this._setGlobalXfoDirty);
        }

        
        // this.__private.set(parentItem, parentItem);
        super.setOwner(parentItem);

        this._setGlobalXfoDirty();
        if(this.__ownerItem) {
            this.__ownerItem.globalXfoChanged.connect(this._setGlobalXfoDirty);
        }
        this.__localXfoParam.valueChanged.connect(this._setGlobalXfoDirty);
    }

    __updatePath() {
        super.__updatePath();
        for (let childItem of this.__childItems)
            childItem.__updatePath();
    }

    getParentItem() {
        return this.getOwner();
    }

    setParentItem(parentItem) {
        this.setOwner(parentItem);
    }

    get parentItem() {
        throw(("getter is deprectated. Please use 'getParentItem'"));
    }

    set parentItem(parentItem) {
        throw(("setter is deprectated. Please use 'setParentItem'"));
    }


    //////////////////////////////////////////
    // Items

    addItem(item) {
        this.__items.push(item);
        this.__itemMapping[item.getName()] = this.__items.length - 1;

        item.setOwner(this);

        this.itemAdded.emit(item);
    }

    removeItem(name) {
        const index = this.__itemMapping[name]
        const item = this.__items[index];
        item.setOwner(undefined);
        this.__items.splice(index, 1);

        const itemMapping = {};
        for (let i =0; i< this.__items.length; i++)
            itemMapping[this.__items[i].getName()] = i;
        this.__itemMapping = itemMapping;

        this.itemAdded.emit(item);
        return item;
    }

    getItem(name) {
        return this.__items[this.__itemMapping[name]];
    }

    //////////////////////////////////////////
    // Path Traversial

    // resolveMember(path) {
    //     if(path.startsWith('item')){
    //         let itemName = path.substring(5);
    //         const pos = itemName.indexOf(':');
    //         let suffix;
    //         if(pos){
    //             itemName = itemName.substring(0, pos);
    //             suffix = itemName.substring(pos+1);
    //         }
    //         const item = this.getItem(itemName); 
    //     }
    //     super.resolveMember(path)
    // }

    resolvePath(path, index=0) {
        if(typeof path == 'string')
            path = path.split('/');
        // if(path[0] == '.')
        //     path = path.splice(1);
        if (path.length == 0) {
            throw("Invalid path:" + path);
        }
        if (index == path.length-1){
            if (path[index] == this.__name) {
                return this;
            }
            // const pos = path[index].indexOf(':');
            // const prefix = path[index].substring(0, pos);
            // const suffix = path[index].substring(pos+1);
            // if (prefix != this.__name) {
            //     throw ("Invalid path:" + path);
            // }
            // return this.resolveMember(suffix);
            // return super.resolvePath(path, index);

            return super.resolvePath(path[index]);
            // if(path[index].startswith('parameter')){
            //     return this.getParameter(path[index].substring(10)); 
            // }
            // throw("Invalid path:" + path);
        }

        const childName = path[index+1].split(':')[0];
        let childItem = this.getChildByName(childName);
        if (childItem == undefined) {
            const item = this.getItem(childName);
            if(item){
                if (path.length == index + 1)
                    return item;
                else
                    return item.resolvePath(path[index + 1]);
            }

            //report("Unable to resolve path '"+"/".join(path)+"' after:"+this.getName());
            console.warn("Unable to resolve path :" + (path)+" after:"+this.getName() + "\nNo child called :" + path[index+1]);
            return null;
        }
        if (path.length == index + 1)
            return childItem;
        else
            return childItem.resolvePath(path, index + 1);
    }

    //////////////////////////////////////////
    // Global Matrix

    get localXfo() {
        throw(("getter is deprectated. Please use 'getLocalXfo'"));
    }
    set localXfo(xfo) {
        throw(("setter is deprectated. Please use 'setLocalXfo'"));
    }
    get globalXfo() {
        throw(("getter is deprectated. Please use 'getGlobalXfo'"));
    }
    set globalXfo(xfo) {
        throw(("setter is deprectated. Please use 'setGlobalXfo'"));
    }

    getLocalXfo() {
        return this.__localXfoParam.getValue();
    }

    setLocalXfo(xfo) {
        this.__localXfoParam.setValue(xfo);
    }

    getGlobalXfo() {
        return this.__globalXfoParam.getValue();;
    }

    setGlobalXfo(xfo) {
        this.__globalXfoParam.setValue(xfo);
    }

    _cleanGlobalXfo(prevValue) {
        let parentItem = this.getParentItem();
        if (parentItem !== undefined)
            return parentItem.getGlobalXfo().multiply(this.__localXfoParam.getValue());
        else
            return this.__localXfoParam.getValue();
    }

    _setGlobalXfoDirty() {
        this.__globalXfoParam.setDirty(this._cleanGlobalXfo);
    }

    //////////////////////////////////////////
    // Visibility

    getVisible() {
        return this.__inheritedVisiblity && this.__visibleParam.getValue();
    }

    setVisible(val) {
        this.__visibleParam.setValue(val);
    }

    setInheritedVisiblity(val) {
        if (this.__inheritedVisiblity != val) {
            let prev = this.getVisible();
            this.__inheritedVisiblity = val;
            let visibile = this.getVisible();
            if (prev != visibile) {
                for (let childItem of this.__childItems)
                    childItem.setInheritedVisiblity(visibile);
                this.visibilityChanged.emit(visibile);
            }
        }
    }

    //////////////////////////////////////////
    // Selectability and Selection

    getSelectable() {
        return this.__selectable;
    }

    setSelectable(val, propagateToChildren = true) {
        if (this.__selectable != val || propagateToChildren) {
            this.__selectable = val;
            for (let childItem of this.__childItems)
                childItem.setSelectable(this.__selectable, propagateToChildren);
        }
    }

    getSelected() {
        return this.__selectedParam.getValue();
    }

    setSelected(sel) {
        if (this.__selectedParam.getValue() != sel) {
            this.__selectedParam.setValue(sel);
        }
    }

    //////////////////////////////////////////
    // BoundingBox

    get boundingBox() {
        console.warn(("getter is deprectated. Please use 'getBoundingBox'"));
        return this.getBoundingBox();
    }

    getBoundingBox() {
        return this.__boundingBoxParam.getValue();
    }

    _cleanBoundingBox(bbox) {
        bbox.reset();
        for (let childItem of this.__childItems) {
            if (childItem.getVisible())
                bbox.addBox3(childItem.getBoundingBox());
        }
        return bbox;
    }

    _setBoundingBoxDirty() {
        this.__boundingBoxParam.setDirty(this._cleanBoundingBox);
    }

    //////////////////////////////////////////
    // Children

    getChildren() {
        return this.__childItems;
    }

    numChildren() {
        return this.__childItems.length;
    }

    addChild(childItem, checkCollisions = true) {
        if (checkCollisions && this.getChildByName(childItem.getName()) !== null)
            throw ("Item '" + childItem.getName() + "' is already a child of :" + this.path);
        if (!(childItem instanceof TreeItem))
            throw ("Object is is not a tree item :" + childItem.constructor.name);

        this.__childItems.push(childItem);
        childItem.setOwner(this);

        childItem.setInheritedVisiblity(this.getVisible());
        childItem.setSelectable(this.getSelectable(), true);

        childItem.boundingChanged.connect(this._setBoundingBoxDirty);
        childItem.visibilityChanged.connect(this._setBoundingBoxDirty);

        // Propagate mouse event up ths tree.
        childItem.mouseDown.connect(this.onMouseDown);
        childItem.mouseUp.connect(this.onMouseUp);
        childItem.mouseMove.connect(this.onMouseMove);

        this._setBoundingBoxDirty();
        this.childAdded.emit(childItem);
    }


    getChild(index) {
        return this.__childItems[index];
    }

    getChildByName(name) {
        for (let childItem of this.__childItems)
            if (childItem != null && childItem.getName() == name)
                return childItem;
        return null;
    }

    removeChild(index, destroy = true) {
        let childItem = this.__childItems[index];
        this.__childItems.splice(index, 1);

        childItem.setParentItem(undefined);

        childItem.boundingChanged.disconnect(this._setBoundingBoxDirty);
        childItem.visibilityChanged.disconnect(this._setBoundingBoxDirty);

        // Propagate mouse event up ths tree.
        childItem.mouseDown.disconnect(this.onMouseDown);
        childItem.mouseUp.disconnect(this.onMouseUp);
        childItem.mouseMove.disconnect(this.onMouseMove);

        if (destroy)
            childItem.destroy();
        this._setBoundingBoxDirty();
    }

    removeChildByHandle(childItem, destroy = true) {
        let index = this.__childItems.indexOf(childItem);
        if (index == -1)
            throw ("Error in removeChildByHandle. Child not found:" + childItem.getName());
        return this.removeChild(index, destroy);
    }

    removeAllChildren(destroy = true) {
        if (destroy)
            for (let childItem of this.__childItems)
                childItem.destroy();
        this.__childItems = [];
        this._setBoundingBoxDirty();
    }

    indexOfChild(childItem) {
        return this.__childItems.indexOf(childItem);
    }

    /////////////////////////
    // Events

    onMouseDown(mousePos, event) {
        this.mouseDown.emit(mousePos, event);
        return false;
    }

    onMouseUp(mousePos, event) {
        this.mouseUp.emit(mousePos, event);
        return false;
    }

    onMouseMove(mousePos, event) {
        this.mouseMove.emit(mousePos, event);
        return false;
    }

    //////////////////////////////////////////
    // Persistence


    toJSON(flags = 0) {
        let j = super.toJSON(flags);
        let childItemsJSON = [];
        for (let childItem of this.__childItems)
            childItemsJSON.push(childItem.toJSON());
        j.childItems = childItemsJSON;
        return j;
    }

    fromJSON(j, flags, asset) {
        super.fromJSON(j, flags);

        // if ('bbox' in j){
        //     let box = new Box3();
        //     box.fromJSON(j.bbox);
        //     this.__boundingBoxParam.setValue(box);
        // }

        if ((flags & LOADFLAGS_SKIP_CHILDREN) == 0 && 'children' in j && j.children != null) {
            let childrenJson = j.children;
            let printProgress = childrenJson.length > 10000;
            let progress = 0;
            let i = 0;
            for (let childJson of childrenJson) {
                let childType = childJson.type;
                let childName = childJson.name;

                // Note: During loading of asset trees, we have an
                // existing tree generated by loading the asset before
                // the tree. Now we find existing items and load deltas.
                // Note2: This becomes a bit slow on huge trees.
                let childItem;
                if (flags & LOADFLAGS_ASSETTREE_UPDATE) {
                    childItem = this.getChildByName(childName);
                    if (childItem) {
                        childItem.fromJSON(childJson, flags, asset);
                    }
                } else {
                    childItem = sgFactory.constructClass(childType);
                    if (childItem) {
                        childItem.fromJSON(childJson, flags, asset);
                        this.addChild(childItem, false);
                    }
                }

                if (printProgress) {
                    // Avoid printing too much as it slows things down.
                    i++;
                    let curr = Math.round((i / childrenJson.length) * 100);
                    if (curr != progress) {
                        progress = curr;
                        console.log("Loading " + this.__name + ": " + String(progress + "%"));
                    }
                }
            }
        }
    }

    readBinary(reader, flags, asset) {
        super.readBinary(reader, flags);

        let itemflags = reader.loadUInt8();

        const visibilityFlag = 1 << 1;
        // this.setVisibility(itemflags&visibilityFlag);

        //this.setVisibility(j.visibility);
        // Note: to save space, some values are skipped if they are identity values 
        const localXfoFlag = 1 << 2;
        if (itemflags & localXfoFlag) {
            let xfo = new Xfo();
            xfo.tr = reader.loadFloat32Vec3();
            xfo.ori = reader.loadFloat32Quat();
            xfo.sc.set(reader.loadFloat32());
            // console.log(this.getPath() + " TreeItem:" + xfo.toString());
            this.setLocalXfo(xfo);
        }

        const bboxFlag = 1 << 3;
        if (itemflags & bboxFlag)
            this.__boundingBoxParam.setValue(new Box3(reader.loadFloat32Vec3(), reader.loadFloat32Vec3()), 2);

        let numChildren = reader.loadUInt32();
        if ( /*(flags&LOADFLAGS_SKIP_CHILDREN) == 0 &&*/ numChildren > 0) {

            let toc = reader.loadUInt32Array(numChildren);

            let printProgress = numChildren > 10000;
            let progress = 0;
            for (let i = 0; i < numChildren; i++) {
                reader.seek(toc[i]); // Reset the pointer to the start of the item data.
                let childType = reader.loadStr();
                // let childName = reader.loadStr();
                let childItem = sgFactory.constructClass(childType);
                if (!childItem)
                    continue;
                reader.seek(toc[i]); // Reset the pointer to the start of the item data.
                childItem.readBinary(reader, flags, asset);
                this.addChild(childItem, false);

                if (printProgress) {
                    // Avoid printing too much as it slows things down.
                    let curr = Math.round((i / numChildren) * 100);
                    if (curr != progress) {
                        progress = curr;
                        console.log("Loading " + this.__name + ": " + String(progress + "%"));
                    }
                }
            }
        }
    }
};

sgFactory.registerClass('TreeItem', TreeItem);

export {
    LOADFLAGS_SKIP_CHILDREN,
    LOADFLAGS_SKIP_MATERIALS,
    LOADFLAGS_SKIP_GEOMETRIES
};
export {
    TreeItem
};