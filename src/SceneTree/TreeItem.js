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
    ParamFlags,
    ValueSetMode,
    Parameter,
    BooleanParameter,
    NumberParameter,
    ColorParameter,
    Vec2Parameter,
    XfoParameter
} from './Parameters';
import {
    ItemFlags,
    BaseItem
} from './BaseItem.js';


// Defines used to explicity specify types for WebGL.
const SAVE_FLAG_SKIP_CHILDREN = 1 << 0;
const SAVE_FLAG_SKIP_MATERIALS = 1 << 2;
const SAVE_FLAG_SKIP_GEOMETRIES = 1 << 3;

const LOAD_FLAG_SKIP_CHILDREN = 1 << 0;
const LOAD_FLAG_SKIP_MATERIALS = 1 << 2;
const LOAD_FLAG_SKIP_GEOMETRIES = 1 << 3;

class TreeItem extends BaseItem {
    constructor(name) {
        super(name)

        this.__inheritedVisiblity = true;
        this.__selectable = true;

        this.__childItems = [];

        this.__components = [];
        this.__componentMapping = {};
        this.parentChanged = this.ownerChanged;
        this.childAdded = new Signal();
        this.childRemoved = new Signal();
        this.componentAdded = new Signal();
        this.componentRemoved = new Signal();

        this.mouseDown = new Signal();
        this.mouseUp = new Signal();
        this.mouseMove = new Signal();

        this.treeItemGlobalXfoChanged = new Signal();

        ///////////////////////////////////////
        // Add parameters.

        this.__visibleParam = this.addParameter(new BooleanParameter('Visible', true));
        this.__selectedParam = this.addParameter(new BooleanParameter('Selected', false));
        this.__cutawayParam = this.addParameter(new BooleanParameter('CutawayEnabled', false));

        this.__cutawayParam.valueChanged.connect((changeType) => {
            setTimeout(() => {
                const value = this.__cutawayParam.getValue();
                for (let childItem of this.__childItems) {
                    const param = childItem.getParameter('CutawayEnabled');
                    if (param)
                        param.setValue(value);
                }
            }, 1)
        });


        this.__localXfoParam = this.addParameter(new XfoParameter('LocalXfo', new Xfo()));
        this.__globalXfoParam = this.addParameter(new XfoParameter('GlobalXfo', new Xfo()));
        this.__boundingBoxParam = this.addParameter(new Parameter('BoundingBox', new Box3()));

        // Bind handlers
        this._cleanGlobalXfo = this._cleanGlobalXfo.bind(this);
        this._setGlobalXfoDirty = this._setGlobalXfoDirty.bind(this);
        this._cleanBoundingBox = this._cleanBoundingBox.bind(this);
        this._setBoundingBoxDirty = this._setBoundingBoxDirty.bind(this);
        this._childFlagsChanged = this._childFlagsChanged.bind(this);

        this.__localXfoParam.valueChanged.connect(this._setGlobalXfoDirty);

        const _cleanLocalXfo = (prevValue) => {
            const globalXfo = this.__globalXfoParam.getValue();
            if (this.__ownerItem !== undefined)
                return this.__ownerItem.getGlobalXfo().inverse().multiply(globalXfo);
            else
                return globalXfo;
        }
        this.__globalXfoParam.valueChanged.connect((mode) => {
            // if (mode != ValueSetMode.USER_SETVALUE) {
            if(mode != ValueSetMode.OPERATOR_SETVALUE && mode != ValueSetMode.OPERATOR_DIRTIED) {
                // Note: both global and local cannot be dirty at the same time
                // because we need one clean to compute the other. If the global
                // Xfo is explicitly set, then it is now clean, so we can make local
                // dirty. 
                this.__localXfoParam.setDirty(_cleanLocalXfo);
            }
            this._setBoundingBoxDirty();
        });


        this.__visibleParam.valueChanged.connect((mode)=>{
            // Make sure our own visibility change notificaiton goes out
            // before the children.
            setTimeout(()=> {
                const visibile = this.getVisible();
                for (let childItem of this.__childItems)
                    childItem.setInheritedVisiblity(visibile);
            }, 1)
        });

        this.visibilityChanged = this.__visibleParam.valueChanged;
        this.selectedChanged = this.__selectedParam.valueChanged;
        this.localXfoChanged = this.__localXfoParam.valueChanged;
        this.globalXfoChanged = this.__globalXfoParam.valueChanged;
        this.boundingChanged = this.__boundingBoxParam.valueChanged;
    }

    destroy() {
        this.removeAllChildren();
        super.destroy();
    }

    clone() {
        const cloned = new TreeItem();
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
        if (this.__ownerItem) {
            this.__ownerItem.globalXfoChanged.disconnect(this._setGlobalXfoDirty);
        }
        super.setOwner(parentItem);

        this._setGlobalXfoDirty();
        if (this.__ownerItem) {
            this.__ownerItem.globalXfoChanged.connect(this._setGlobalXfoDirty);
        }
    }

    __updatePath() {
        super.__updatePath();
        for (let childItem of this.__childItems)
            childItem.__updatePath();
        for (let component of this.__components)
            component.__updatePath();
    }

    getParentItem() {
        return this.getOwner();
    }

    setParentItem(parentItem) {
        this.setOwner(parentItem);
    }

    get parentItem() {
        throw (("getter is deprectated. Please use 'getParentItem'"));
    }

    set parentItem(parentItem) {
        throw (("setter is deprectated. Please use 'setParentItem'"));
    }


    //////////////////////////////////////////
    // Global Matrix

    get localXfo() {
        throw (("getter is deprectated. Please use 'getLocalXfo'"));
    }
    set localXfo(xfo) {
        throw (("setter is deprectated. Please use 'setLocalXfo'"));
    }
    get globalXfo() {
        throw (("getter is deprectated. Please use 'getGlobalXfo'"));
    }
    set globalXfo(xfo) {
        throw (("setter is deprectated. Please use 'setGlobalXfo'"));
    }

    getLocalXfo() {
        return this.__localXfoParam.getValue();
    }

    setLocalXfo(xfo) {
        this.__localXfoParam.setValue(xfo);
    }

    getGlobalXfo(mode) {
        return this.__globalXfoParam.getValue(mode);
    }

    setGlobalXfo(xfo, mode) {
        this.__globalXfoParam.setValue(xfo, mode);
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
        this.__selectedParam.setValue(sel);
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
            if (childItem.getVisible() && !childItem.testFlag(ItemFlags.IGNORE_BBOX))
                bbox.addBox3(childItem.getBoundingBox());
        }
        return bbox;
    }

    _setBoundingBoxDirty() {
        this.__boundingBoxParam.setDirty(this._cleanBoundingBox);
    }

    _childFlagsChanged(flags) {
        if ((flags & ParamFlags.USER_EDITED) != 0)
            this.setFlag(ItemFlags.USER_EDITED);
    }

    //////////////////////////////////////////
    // Children

    getChildren() {
        return this.__childItems;
    }

    numChildren() {
        return this.__childItems.length;
    }


    generateUniqueName(name) {
        if (!this.getChildByName(name))
            return name;

        let index = 1;
        if (name.length > 4 && !Number.isNaN(parseInt(name.substring(name.length - 4))))
            index = parseInt(name.substr(name.length - 4));
        else if (name.length > 3 && !Number.isNaN(parseInt(name.substring(name.length - 3))))
            index = parseInt(name.substr(name.length - 3));
        else if (name.length > 2 && !Number.isNaN(parseInt(name.substring(name.length - 2))))
            index = parseInt(name.substr(name.length - 2));

        const names = [];
        for (let c of this.__childItems) {
            // Sometimes we have an empty child slot.
            // We resize the child vector, and then populate it.
            if (c) {
                names.push(c.getName());
            }
        }

        let uniqueName = name;
        while (true) {
            let suffix = ''+index;
            while (suffix.length < 2){
                suffix = '0' + suffix;
            }

            uniqueName = name + suffix;
            if (names.indexOf(uniqueName) == -1)
                break;
            index++;
        }
        return uniqueName;
    }

    insertChild(childItem, index, maintainXfo = false, checkCollisions = true) {

        if (checkCollisions && this.getChildByName(childItem.getName()) !== null)
            throw ("Item '" + childItem.getName() + "' is already a child of :" + this.getPath());
        if (!(childItem instanceof TreeItem))
            throw ("Object is is not a tree item :" + childItem.constructor.name);

        if (childItem.isDestroyed()) 
            throw ("childItem is destroyed:" + childItem.getPath());

        childItem.addRef(this)
        if(childItem.getOwner() != undefined)
            childItem.getOwner().removeChildByHandle(childItem)

        let newLocalXfo;
        if (maintainXfo)
            newLocalXfo = this.getGlobalXfo().inverse().multiply(childItem.getGlobalXfo());
        this.__childItems.splice(index, 0, childItem);
        childItem.setOwner(this);

        // Remove the temporary ref.
        childItem.removeRef(this)

        if (maintainXfo)
            childItem.setLocalXfo(newLocalXfo);

        if (childItem.testFlag(ItemFlags.USER_EDITED))
            this.setFlag(ItemFlags.USER_EDITED)

        childItem.setInheritedVisiblity(this.getVisible());
        childItem.setSelectable(this.getSelectable(), true);

        childItem.boundingChanged.connect(this._setBoundingBoxDirty);
        childItem.visibilityChanged.connect(this._setBoundingBoxDirty);
        childItem.flagsChanged.connect(this._childFlagsChanged);

        this._setBoundingBoxDirty();
        this.childAdded.emit(childItem, index);


        return childItem;
    }

    addChild(childItem, maintainXfo = false, checkCollisions = true) {
        const index = this.__childItems.length;
        this.insertChild(childItem, index, maintainXfo, checkCollisions);
        return index;
    }

    getChild(index) {
        return this.__childItems[index];
    }

    getChildByName(name) {
        for (let childItem of this.__childItems) {
            if (childItem != null && childItem.getName() == name)
                return childItem;
        }
        return null;
    }

    removeChild(index) {
        const childItem = this.__childItems[index];
        this.__childItems.splice(index, 1);

        childItem.setParentItem(undefined);

        childItem.boundingChanged.disconnect(this._setBoundingBoxDirty);
        childItem.visibilityChanged.disconnect(this._setBoundingBoxDirty);
        childItem.flagsChanged.disconnect(this._childFlagsChanged);

        this.childRemoved.emit(childItem, index);

        this._setBoundingBoxDirty();
    }

    removeChildByHandle(childItem) {
        let index = this.__childItems.indexOf(childItem);
        if (index == -1)
            throw ("Error in removeChildByHandle. Child not found:" + childItem.getName());
        return this.removeChild(index);
    }

    removeAllChildren() {
        let index = this.__childItems.length;
        while (index--){
            this.removeChild(index);
        }
        this.__childItems = [];
        this._setBoundingBoxDirty();
    }

    indexOfChild(childItem) {
        return this.__childItems.indexOf(childItem);
    }

    //////////////////////////////////////////
    // Components

    addComponent(component) {
        this.__components.push(component);
        this.__componentMapping[component.getName()] = this.__components.length - 1;

        component.setOwner(this);

        this.componentAdded.emit(component);
    }

    removeComponent(name) {
        const index = this.__componentMapping[name];
        if (index == undefined) {
            throw ("Component not found:" + name)
        }
        const component = this.__components[index];
        component.setOwner(undefined);
        this.__components.splice(index, 1);

        const componentMapping = {};
        for (let i = 0; i < this.__components.length; i++)
            componentMapping[this.__components[i].getName()] = i;
        this.__componentMapping = componentMapping;

        this.componentRemoved.emit(component, index);
        return component;
    }

    hasComponent(name) {
        return (name in this.__componentMapping)
    }

    getComponent(name) {
        if (!(name in this.__componentMapping)) {
            console.log("No component named '" + name + "' found.");
            return;
        }
        return this.__components[this.__componentMapping[name]];
    }


    //////////////////////////////////////////
    // Path Traversial
    // Note: path resolution starts at the root of the 
    // tree the path was generated from. (so index=1, because we don't resolve root).
    // Note: when a path is made relative to an item in its tree, the path
    // starts with the child elements.
    resolvePath(path, index = 0) {
        if (typeof path == 'string')
            path = path.split('/');

        if (path[index] == '.')
            index++;
        else if (path[index] == '..') {
            return this.__ownerItem.resolvePath(path, index + 1);
        }

        if (index == path.length) {
            return this;
        }

        if(path[index] == '>' && index == path.length - 2) {
            if(this.hasComponent(path[index+1])) {
                const component = this.getComponent(path[index+1]);
                return component.resolvePath(path, index+2);
            }
        }

        const childName = path[index];
        let childItem = this.getChildByName(childName);
        if (childItem == undefined) {
            // Maybe the name is a component name.
            if (this.hasComponent(path[index])) {
                const component = this.getComponent(path[index]);
                if (index == path.length) {
                    return component;
                } else {
                    return component.resolvePath(path, index + 1);
                }
            }

            // Maybe the name is a parameter name.
            const param = this.getParameter(path[index]);
            if (param) {
                return param;
            }

            //report("Unable to resolve path '"+"/".join(path)+"' after:"+this.getName());
            console.warn("Unable to resolve path :" + (path) + " after:" + this.getName() + "\nNo child, component or property called :" + path[index]);
            return null;
        }
        return childItem.resolvePath(path, index + 1);
    }

    // Traverse the tree structure from this point down
    // and fire the callback for each visited item
    traverse(callback) {
        const __c = (treeItem) => {
            const children = treeItem.getChildren();
            for (let childItem of children) {
                __t(childItem);
            }
        }
        const __t = (treeItem) => {
            if (callback(treeItem) == false)
                return false;
            __c(treeItem);
        }
        __c(this);
    }
    /////////////////////////
    // Events

    onMouseDown(event) {
        this.mouseDown.emit(event);
        if(event.vleStopPropagation !== true && this.__ownerItem){
            this.__ownerItem.onMouseDown(event)
        }
        return event.vleStopPropagation;
    }

    onMouseUp(event) {
        this.mouseUp.emit(event);
        if(event.vleStopPropagation !== true && this.__ownerItem){
            this.__ownerItem.onMouseUp(event)
        }
        return event.vleStopPropagation;
    }

    onMouseMove(event) {
        this.mouseMove.emit(event);
        if(event.vleStopPropagation !== true && this.__ownerItem){
            this.__ownerItem.onMouseMove(event)
        }
        return event.vleStopPropagation;
    }

    //////////////////////////////////////////
    // Persistence


    toJSON(context, flags) {
        if (!this.testFlag(ItemFlags.USER_EDITED))
            return;

        let j = super.toJSON(context, flags);

        const jcs = [];
        for (let c of this.__components)
            jcs.push(c.toJSON(context, flags));
        if (jcs.length > 0)
            j.components = jcs;

        // Some Items, such as the SliderSceneWidget do not need thier children
        // to be saved.
        if(!(flags&SAVE_FLAG_SKIP_CHILDREN)) {
            const childItemsJSON = {};
            for (let childItem of this.__childItems) {
                const childJSON = childItem.toJSON(context, flags);
                if (childJSON)
                    childItemsJSON[childItem.getName()] = childJSON;
            }
            if (Object.keys(childItemsJSON).length > 0) {
                if (j) {
                    j.children = childItemsJSON;
                } else {
                    j = {
                        name: this.__name,
                        children: childItemsJSON
                    }
                }
            }
        }
        return j;
    }

    fromJSON(j, context, flags) {
        super.fromJSON(j, context, flags);

        context.numTreeItems++;

        // Note: JSON data is only used to store user edits, so 
        // parameters loaded from JSON are considered user edited.
        this.setFlag(ItemFlags.USER_EDITED);

        // if ('bbox' in j){
        //     let box = new Box3();
        //     box.fromJSON(j.bbox);
        //     this.__boundingBoxParam.setValue(box);
        // }

        if (j.children != null) {
            const childrenJson = j.children;
            if (Array.isArray(childrenJson)) {
                for (let childJson of childrenJson) {
                    // Note: During loading of asset trees, we have an
                    // existing tree generated by loading a bin data file.
                    let childItem = this.getChildByName(childJson.name);
                    if (childItem) {
                        childItem.fromJSON(childJson, context);
                    } else if (childJson.type) {
                        childItem = sgFactory.constructClass(childJson.type);
                        if (childItem) {
                            this.addChild(childItem, false, false);
                            childItem.fromJSON(childJson, context);
                        }
                    } else {
                        console.warn("Warning loading JSON. Child not found:" + childJson.name + " of:" + this.getPath());
                    }
                }
            } else {
                for (let childName in childrenJson) {
                    const childJson = childrenJson[childName];
                    // Note: During loading of asset trees, we have an
                    // existing tree generated by loading a bin data file.
                    let childItem = this.getChildByName(childName);
                    if (childItem) {
                        childItem.fromJSON(childJson, context);
                    } else if (childJson.type) {
                        childItem = sgFactory.constructClass(childJson.type);
                        if (childItem) {
                            // Note: we add the chile now before loading. 
                            // This is because certain items. (e.g. Groups)
                            // Calculate thier global Xfo, and use it to modify 
                            // the transform of thier members.
                            // Note: Groups bind to items in the scene which are
                            // already added as children, and so have global Xfos.
                            // We prefer to add a child afer its loaded, because sometimes
                            // In the tree is asset items, who will only toggled as
                            // unloaded once they are loaed(else they are considered inline assets.)
                            childItem.fromJSON(childJson, context);
                            this.addChild(childItem, false, false);
                        }
                    } else {
                        console.warn("Warning loading JSON. Child not found:" + childName);
                    }
                }
            }
        }


        if (j.components) {
            for (let cj of j.components) {
                const component = sgFactory.constructClass(cj.type ? cj.type : cj.name);
                if (component) {
                    component.fromJSON(cj, context);
                    this.addComponent(component);
                }
            }
        }
    }

    readBinary(reader, context) {
        super.readBinary(reader, context);

        context.numTreeItems++;

        let itemflags = reader.loadUInt8();

        const visibilityFlag = 1 << 1;
        // this.setVisible(itemflags&visibilityFlag);

        //this.setVisible(j.visibility);
        // Note: to save space, some values are skipped if they are identity values 
        const localXfoFlag = 1 << 2;
        if (itemflags & localXfoFlag) {
            let xfo = new Xfo();
            xfo.tr = reader.loadFloat32Vec3();
            xfo.ori = reader.loadFloat32Quat();
            xfo.sc.set(reader.loadFloat32());
            // console.log(this.getPath() + " TreeItem:" + xfo.toString());
            this.__localXfoParam.setValue(xfo, Visualive.ValueSetMode.DATA_LOAD);
        }

        const bboxFlag = 1 << 3;
        if (itemflags & bboxFlag)
            this.__boundingBoxParam.setValue(new Box3(reader.loadFloat32Vec3(), reader.loadFloat32Vec3()), Visualive.ValueSetMode.DATA_LOAD);

        const numChildren = reader.loadUInt32();
        if (numChildren > 0) {

            const toc = reader.loadUInt32Array(numChildren);
            for (let i = 0; i < numChildren; i++) {
                reader.seek(toc[i]); // Reset the pointer to the start of the item data.
                const childType = reader.loadStr();
                // const childName = reader.loadStr();
                const childItem = sgFactory.constructClass(childType);
                if (!childItem) {
                    const childName = reader.loadStr();
                    console.warn("Unable to construct child:" + childName + " of type:" + childType);
                    continue;
                }
                reader.seek(toc[i]); // Reset the pointer to the start of the item data.
                childItem.readBinary(reader, context);
                this.addChild(childItem, false, false);
            }
        }
    }
};

sgFactory.registerClass('TreeItem', TreeItem);

export {
    SAVE_FLAG_SKIP_CHILDREN,
    SAVE_FLAG_SKIP_MATERIALS,
    SAVE_FLAG_SKIP_GEOMETRIES,

    LOAD_FLAG_SKIP_CHILDREN,
    LOAD_FLAG_SKIP_MATERIALS,
    LOAD_FLAG_SKIP_GEOMETRIES
};
export {
    TreeItem
};