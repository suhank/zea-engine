import {
    Vec2,
    Vec3,
    Color
} from '../Math';
import {
    Signal
} from '../Utilities';
import {
    sgFactory
} from './SGFactory.js';

import {
    ParameterOwner
} from './ParameterOwner.js';


class BaseItem extends ParameterOwner {
    constructor(name) {
        super();
        if (this.constructor.name == 'BaseItem') {
            throw ("BaseItem should not be instantiated directly.");
        }
        if (name == undefined)
            name = this.constructor.name;
        this.__name = name;
        this.__path = [name];
        this.__ownerItem = undefined; // TODO: will create a circular ref. Figure out and use weak refs

        this.__metaData = new Map();

        this.nameChanged = new Signal();
        this.ownerChanged = new Signal();
    }

    destroy() {
        super.destroy();
    }

    clone() {
        throw (this.constructor.name + " does not implment its clone method");
    }

    copyTo(cloned) {
        super.copyTo(cloned)
        cloned.setName(this.__name);
    }

    //////////////////////////////////////////
    // Name and Path

    getName() {
        return this.__name;
    }

    setName(name) {
        this.__name = name;
        this.__updatePath();
        this.nameChanged.emit(name);
    }

    __updatePath() {
        if (this.__ownerItem == undefined)
            this.__path = [this.__name];
        else {
            this.__path = this.__ownerItem.getPath().slice();
            this.__path.push(this.__name);
        }
    }

    getPath() {
        return this.__path;
    }


    //////////////////////////////////////////
    // Path Traversial

    resolvePath(path, index) {
        if (path[index] == this.__name) {
            return this;
        }
        let parts = path[index].split(':');
        if (parts[0] != this.__name) {
            throw ("Invalid path:" + path);
        }
        return this.getParameter(parts[2]);
    }


    //////////////////////////////////////////
    // Owner Item

    getOwnerItem() {
        // return this.__private.get('ownerItem');
        return this.__ownerItem;
    }

    setOwnerItem(ownerItem) {
        // this.__private.set(ownerItem, ownerItem);
        this.__ownerItem = ownerItem;
        this.__updatePath();

        // Notify:
        this.ownerChanged.emit();
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
        const j = super.toJSON(flags);
        j.name = this.__name;
        return j;
    }

    fromJSON(j, flags, asset) {
        super.fromJSON(j, flags);
        this.__name = j.name;
    }

    readBinary(reader, flags, asset) {
        let type = reader.loadStr();
        this.setName(reader.loadStr());

        // Note: parameters follow name...
        super.readBinary(reader, flags);
    }

    toString() {
        return JSON.stringify(this.toJSON(), null, 2)
    }
};

export {
    BaseItem
};