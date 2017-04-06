import {
    Mat4,
    Xfo,
    Box3,
    Signal
} from '../Math';
import {
    sgFactory
} from './SGFactory.js';


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
        this.destructing = new Signal();
    }

    destroy() {
        this.removeAllChildren();
        this.destructing.emit();
    }

    //////////////////////////////////////////
    // Name and Path

    get name() {
        return this.__name;
    }

    set name(name) {
        this.__name = name;
        // Notify:
        this.nameChanged.emit(name);
    }

    get path() {
        let parentItem = this.parentItem;
        if (parentItem != undefined)
            return parentItem.path + '/' + this.name;
        else
            return this.name;
    }

    //////////////////////////////////////////
    // Parent Item

    get parentItem() {
        // return this.__private.get('parentItem');
        return this.__parentItem;
    }

    set parentItem(parentItem) {
        // this.__private.set(parentItem, parentItem);
        this.__parentItem = parentItem;
        this.__updateGlobal();
        // Notify:
        this.parentChanged.emit();
    }

    //////////////////////////////////////////
    // Global Matrix

    get localXfo() {
        return this.__localXfo;
    }

    set localXfo(xfo) {
        this.__localXfo = xfo;
        this.__updateGlobal();
    }

    get globalXfo() {
        return this.__globalXfo;
    }

    set globalXfo(xfo) {
        let parentItem = this.parentItem;
        if (parentItem !== undefined)
            this.__localXfo = parentItem.globalXfo.inverse().multiply(xfo);
        else
            this.__localXfo = xfo;
        this.__globalXfo = xfo;
        this.globalXfoChanged.emit(this.__globalXfo);

        this.setBoundingBoxDirty();

        // TODO: should we be updating here, or waiting till the global mat is needed??
        for (let childItem of this.__childItems)
            childItem.__updateGlobal();
    }

    __updateGlobal() {
        let parentItem = this.parentItem;
        if (parentItem !== undefined)
            this.__globalXfo = parentItem.globalXfo.multiply(this.__localXfo);
        else
            this.__globalXfo = this.__localXfo;
        this.globalXfoChanged.emit(this.__globalXfo);
        for (let childItem of this.__childItems)
            childItem.__updateGlobal();

    }

    //////////////////////////////////////////
    // Visibility

    getVisible() {
        return this.__visible;
    }

    setVisible(val) {
        if (this.__visible != val) {
            this.__visible = val;
            for (let childItem of this.__childItems)
                childItem.setVisible(val);
            this.visibilityChanged.emit(val);
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

    addChild(child, checkCollisions=true) {
        if (checkCollisions && this.getChildByName(child.name) !== null)
            throw "Item '" + child.name + "' is already a child of :" + this.path;
        this.__childItems.push(child);
        child.parentItem = this;

        child.boundingBoxChanged.connect(() => {
            this.setBoundingBoxDirty();
        }, this);
        child.visibilityChanged.connect(() => {
            this.setBoundingBoxDirty();
        }, this);

        this.__boundingBoxDirty = true;
        this.childAdded.emit(child);
    }


    getChild(index) {
        return this.__childItems[index];
    }

    getChildByName(name) {
        for (let childItem of this.__childItems)
            if (childItem != null && childItem.name == name)
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

    removeChildByHandle(childItem) {
        let index = this.__childItems.indexOf(childItem);
        if(index == -1)
            throw("Error in removeChildByHandle. Child not found:" + childItem.name);
        return this.removeChild(index);
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

    fromJSON(j, flags, materialLibrary, geomLibrary) {
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
                let childName = childJson.name;
                let childType = childJson.type;

                // Note: During loading of asset trees, we have an
                // existing tree generated by loading the asset before
                // the tree. Now we find existing items and load deltas.
                // Note2: This becomes a bit slow on huge trees.
                let childItem;
                if(flags&LOADFLAGS_ASSETTREE_UPDATE){
                    childItem = this.getChildByName(childName);
                    if(childItem){
                        childItem.fromJSON(childJson, flags, materialLibrary, geomLibrary);
                    }
                }
                else{
                    childItem = sgFactory.constructClass(childType);
                    if(childItem){
                        childItem.fromJSON(childJson, flags, materialLibrary, geomLibrary);
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

    toString() {
        return JSON.stringify(this.toJSON(), null, 2)
    }
};

sgFactory.registerClass('TreeItem', TreeItem);

export {
    TreeItem,
    LOADFLAGS_SKIP_CHILDREN,
    LOADFLAGS_SKIP_MATERIALS,
    LOADFLAGS_SKIP_GEOMETRIES
};