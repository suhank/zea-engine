import { Xfo } from '../Math/Xfo';
import { Box3 } from '../Math/Box3';
import { Signal } from '../Math/Signal';
import { sgFactory } from './SGFactory.js';


// Defines used to explicity specify types for WebGL.
const LOADFLAGS_SKIP_CHILDREN   = 1 << 0;
const LOADFLAGS_SKIP_MATERIALS  = 1 << 2;
const LOADFLAGS_SKIP_GEOMETRIES  = 1 << 3;
const LOADFLAGS_ASSETTREE_UPDATE  = 1 << 4;

class TreeItem {
    constructor(name) {
        if (name == undefined)
            name = this.constructor.name;
        this.__name = name;
        this.__localXfo = new Xfo();
        this.__globalXfo = new Xfo();
        this.__boundingBox = new Box3();
        this.__boundingBoxDirty = true;
        this.__visible = true;
        this.__inheritedVisiblity = true;
        this.__selectable = true;
        this.__selected = false;

        // this.__private = new WeakMap(); // Not sure if this is necessary.
        this.__parentItem = undefined; // TODO: will create a circular ref. Figure out and use weak refs
        this.__childItems = [];

        this.__metaData = new Map();

        this.nameChanged = new Signal();
        this.localXfoChanged = new Signal();
        this.globalXfoChanged = new Signal();
        this.parentChanged = new Signal();
        this.childAdded = new Signal();
        this.childRemoved = new Signal();
        this.visibilityChanged = new Signal();
        this.boundingBoxChanged = new Signal();
        this.selectedChanged = new Signal();
        this.destructing = new Signal();

        this.treeItemGlobalXfoChanged = new Signal();

        this.__updatePath();
    }

    destroy() {
        this.removeAllChildren();
        this.destructing.emit();
    }

    clone(){
        let cloned = new TreeItem();
        this.copyTo(cloned);
        return cloned;
    }
    copyTo(cloned){
        cloned.name = this.__name;
        cloned.localXfo = this.__localXfo.clone();
        cloned.__visible = this.__visible;
        cloned.__selectable = this.__selectable;
        for(let childItem of this.__childItems)
            cloned.addChild(childItem.clone());
    }

    //////////////////////////////////////////
    // Name and Path

    getName(){
        return this.__name;
    }
    setName(name){
        this.__name = name;
        this.__updatePath();
        this.nameChanged.emit(name);
    }
    get name() {
        console.warn(("getter is deprectated. Please use 'getName'"));
        return this.getName();
    }
    set name(name) {
        console.warn(("setter is deprectated. Please use 'setName'"));
        this.setName(name);
    }

    __updatePath() {
        if (this.__parentItem == undefined)
            this.__path = this.__name;
        else
            this.__path = this.__parentItem.getPath() + '/' + this.__name;

        for (let childItem of this.__childItems)
            childItem.__updatePath();
    }

    getPath() {
        return this.__path;
    }

    traversePath(pathParts, index){

        let childItem = this.getChildByName(pathParts[index]);
        if (childItem == undefined)
        {
            //report("Unable to resolve path '"+"/".join(pathParts)+"' after:"+this.getName());
            throw("No child called :" + pathParts[index]);
            return nullptr;
        }
        if (pathParts.length == index + 1)
            return childItem;
        else
            return childItem.traversePath(pathParts, index + 1);
    }

    resolvePath(path)
    {
        // the path is relative to this item, and does not include the item in the path
        // the item name.
        if (path == "")
            return this;
        let pathParts = path.split('/');
        if (pathParts.length == 0){
            console.warn("Invalid path:" + path);
            return undefined;
        }
        if (pathParts.length == 1 && pathParts[0] == this.__name){
            return this;
        }
        return this.traversePath( pathParts, 1 );
    }

    //////////////////////////////////////////
    // Parent Item

    getParentItem() {
        // return this.__private.get('parentItem');
        return this.__parentItem;
    }

    setParentItem(parentItem) {
        // this.__private.set(parentItem, parentItem);
        this.__parentItem = parentItem;
        this.__updatePath();
        this.updateGlobalXfo();

        // Notify:
        this.parentChanged.emit();
    }

    get parentItem() {
        console.warn(("getter is deprectated. Please use 'getParentItem'"));
        // return this.__private.get('parentItem');
        return this.getParentItem();
    }

    set parentItem(parentItem) {
        console.warn(("setter is deprectated. Please use 'setParentItem'"));
        this.setParentItem(parentItem);
    }

    //////////////////////////////////////////
    // Global Matrix

    get localXfo() {
        console.warn(("getter is deprectated. Please use 'getLocalXfo'"));
        return this.getLocalXfo();
    }
    set localXfo(xfo) {
        console.warn(("setter is deprectated. Please use 'setLocalXfo'"));
        this.setLocalXfo(xfo);
    }
    get globalXfo() {
        console.warn(("getter is deprectated. Please use 'getGlobalXfo'"));
        return this.getGlobalXfo();
    }
    set globalXfo(xfo) {
        console.warn(("setter is deprectated. Please use 'setGlobalXfo'"));
        this.setGlobalXfo(xfo);
    }
    getLocalXfo() {
        return this.__localXfo;
    }
    setLocalXfo(xfo) {
        this.__localXfo = xfo;
        this.localXfoChanged.emit(this.__localXfo);
        this.updateGlobalXfo();
    }
    getGlobalXfo() {
        return this.__globalXfo;
    }
    setGlobalXfo(xfo) {
        let parentItem = this.getParentItem();
        if (parentItem !== undefined)
            this.__localXfo = parentItem.getGlobalXfo().inverse().multiply(xfo);
        else
            this.__localXfo = xfo;
        let prevXfo = this.__globalXfo;
        this.__globalXfo = xfo;
        this.globalXfoChanged.emit(this.__globalXfo, prevXfo);

        this.setBoundingBoxDirty();

        // TODO: should we be updating here, or waiting till the global mat is needed??
        for (let childItem of this.__childItems)
            childItem.updateGlobalXfo();
    }

    updateGlobalXfo() {
        let prevXfo = this.__globalXfo;
        let parentItem = this.getParentItem();
        if (parentItem !== undefined)
            this.__globalXfo = parentItem.getGlobalXfo().multiply(this.__localXfo);
        else
            this.__globalXfo = this.__localXfo;
        this.globalXfoChanged.emit(this.__globalXfo, prevXfo);
        for (let childItem of this.__childItems)
            childItem.updateGlobalXfo();

    }

    //////////////////////////////////////////
    // Visibility

    getVisible() {
        return this.__inheritedVisiblity && this.__visible;
    }

    setVisible(val) {
        if (this.__visible != val) {
            let prev = this.getVisible();
            this.__visible = val;
            let visibile = this.getVisible();
            if(prev != visibile) {
                for (let childItem of this.__childItems)
                    childItem.setInheritedVisiblity(visibile);
                this.visibilityChanged.emit(visibile);
            }
        }
    }

    setInheritedVisiblity(val) {
        if (this.__inheritedVisiblity != val) {
            let prev = this.getVisible();
            this.__inheritedVisiblity = val;
            let visibile = this.getVisible();
            if(prev != visibile) {
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

    setSelectable(val, propagateToChildren=true) {
        if (this.__selectable != val || propagateToChildren) {
            this.__selectable = val;
            for (let childItem of this.__childItems)
                childItem.setSelectable(this.__selectable, propagateToChildren);
        }
    }

    getSelected() {
        return this.__selected;
    }

    setSelected(sel) {
        if (this.__selected != sel) {
            this.__selected = sel;
            this.selectionChanged.emit(this.__selected);
        }
    }

    //////////////////////////////////////////
    // BoundingBox

    get boundingBox() {
        if (this.__boundingBoxDirty)
            this.updateBoundingBox();
        return this.__boundingBox;
    }

    setBoundingBoxDirty() {
        this.__boundingBoxDirty = true;
        this.boundingBoxChanged.emit();
    }

    updateBoundingBox() {
        let bbox = new Box3();
        for (let childItem of this.__childItems) {
            if (childItem.getVisible())
                bbox.addBox3(childItem.boundingBox);
        }
        // TODO: transforme the bounding box by the global matrix.
        this.__boundingBox = bbox;
        this.__boundingBoxDirty = false;
    }

    //////////////////////////////////////////
    // Children

    getChildren() {
        return this.__childItems;
    }

    numChildren() {
        return this.__childItems.length;
    }

    addChild(childItem, checkCollisions=true) {
        if (checkCollisions && this.getChildByName(childItem.getName()) !== null)
            throw "Item '" + childItem.getName() + "' is already a child of :" + this.path;
        childItem.setInheritedVisiblity(this.getVisible());
        childItem.setSelectable(this.getSelectable(), true);
        this.__childItems.push(childItem);
        childItem.setParentItem(this);

        childItem.boundingBoxChanged.connect(() => {
            this.setBoundingBoxDirty();
        }, this);
        childItem.visibilityChanged.connect(() => {
            this.setBoundingBoxDirty();
        }, this);

        this.__boundingBoxDirty = true;
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
        if (destroy)
            childItem.destroy();
        this.__boundingBoxDirty = true;
    }

    removeChildByHandle(childItem, destroy = true) {
        let index = this.__childItems.indexOf(childItem);
        if(index == -1)
            throw("Error in removeChildByHandle. Child not found:" + childItem.getName());
        return this.removeChild(index, destroy);
    }

    removeAllChildren(destroy = true) {
        if (destroy)
            for (let childItem of this.__childItems)
                childItem.destroy();
        this.__childItems = [];
        this.__boundingBoxDirty = true;
    }

    indexOfChild(childItem) {
        return this.__childItems.indexOf(childItem);
    }
    
    //////////////////////////////////////////
    // Metadata

    getMetadata(key) {
        return this.__metaData.get(key)
    }

    hasMetadata(key) {
        return this.__metaData.has(key)
    }

    setMetadata(key, metaData) {
        this.__metaData.set(key, metaData);
    }


    //////////////////////////////////////////
    // Persistence


    toJSON(flags = 0) {
        let childItemsJSON = [];
        for (let childItem of this.__childItems)
            childItemsJSON.push(childItem.toJSON())
        return {
            "name": this.__name,
            "localXfo": this.__localXfo.toJSON(),
            "bbox": this.__boundingBox.toJSON(),
            "childItems": childItemsJSON
        }
    }

    fromJSON(j, flags, asset) {
        this.__name = j.name;

        //this.setVisibility(j.visibility);
        // Note: to save space, some values are skipped if they are identity values 
        if ('localXfo' in j)
            this.localXfo.fromJSON(j.localXfo);

        if ('bbox' in j)
            this.boundingBox.fromJSON(j.bbox);

        if ((flags&LOADFLAGS_SKIP_CHILDREN) == 0 && 'children' in j && j.children != null) {
            let childrenJson = j.children;
            let printProgress = childrenJson.length > 10000;
            let progress = 0;
            let i=0;
            for (let childJson of childrenJson) {
                let childType = childJson.type;
                let childName = childJson.name;

                // Note: During loading of asset trees, we have an
                // existing tree generated by loading the asset before
                // the tree. Now we find existing items and load deltas.
                // Note2: This becomes a bit slow on huge trees.
                let childItem;
                if(flags&LOADFLAGS_ASSETTREE_UPDATE){
                    childItem = this.getChildByName(childName);
                    if(childItem){
                        childItem.fromJSON(childJson, flags, asset);
                    }
                }
                else{
                    childItem = sgFactory.constructClass(childType);
                    if(childItem){
                        childItem.fromJSON(childJson, flags, asset);
                        this.addChild(childItem, false);
                    }
                }

                if(printProgress){
                    // Avoid printing too much as it slows things down.
                    i++;
                    let curr = Math.round((i / childrenJson.length) * 100);
                    if(curr != progress){
                        progress = curr;
                        console.log("Loading " + this.__name + ": " + String(progress + "%"));
                    }
                }
            }
        }
    }

    readBinary(reader, flags, asset){

        let type = reader.loadStr();
        this.name = reader.loadStr();
        let itemflags = reader.loadUInt8();

        const visibilityFlag = 1<<1;
        // this.setVisibility(itemflags&visibilityFlag);

        //this.setVisibility(j.visibility);
        // Note: to save space, some values are skipped if they are identity values 
        const localXfoFlag = 1<<2;
        if (itemflags&localXfoFlag){
            this.localXfo.tr = reader.loadFloat32Vec3();
            this.localXfo.ori = reader.loadFloat32Quat();
            this.localXfo.sc.set(reader.loadFloat32());
        }

        const bboxFlag = 1<<3;
        if (itemflags&bboxFlag)
            this.__boundingBox = new Box3(reader.loadFloat32Vec3(), reader.loadFloat32Vec3());

        let numChildren = reader.loadUInt32();
        if (/*(flags&LOADFLAGS_SKIP_CHILDREN) == 0 &&*/ numChildren > 0) {

            let toc = reader.loadUInt32Array(numChildren);

            let printProgress = numChildren > 10000;
            let progress = 0;
            for (let i=0; i< numChildren; i++) {
                reader.seek(toc[i]); // Reset the pointer to the start of the item data.
                let childType = reader.loadStr();
                // let childName = reader.loadStr();
                let childItem = sgFactory.constructClass(childType);
                if(!childItem)
                    continue;
                reader.seek(toc[i]); // Reset the pointer to the start of the item data.
                childItem.readBinary(reader, flags, asset);
                this.addChild(childItem, false);

                if(printProgress){
                    // Avoid printing too much as it slows things down.
                    let curr = Math.round((i / numChildren) * 100);
                    if(curr != progress){
                        progress = curr;
                        console.log("Loading " + this.__name + ": " + String(progress + "%"));
                    }
                }
            }
        }
    }



    toString() {
        return JSON.stringify(this.toJSON(), null, 2)
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
// TreeItem;