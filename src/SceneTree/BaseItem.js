import {
    Vec2,
    Vec3,
    Color,
    Signal
} from '../Math';
import {
    sgFactory
} from './SGFactory.js';

import {
    RefCounted
} from './RefCounted.js';
import {
    Parameter,
    NumberParameter,
    Vec2Parameter,
    Vec3Parameter,
    ColorParameter
} from './Parameters';


class BaseItem extends RefCounted {
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

        this.__params = [];
        this.__paramMapping = {};

        this.__metaData = new Map();

        this.nameChanged = new Signal();
        this.ownerChanged = new Signal();
        this.parameterAdded = new Signal();
        this.parameterRemoved = new Signal();
        this.parameterValueChanged = new Signal();
        this.parameterNameChanged = new Signal();


    }

    destroy() {
        super.destroy();
    }

    clone() {
        throw (this.constructor.name + " does not implment its clone method");
    }

    copyTo(cloned) {
        cloned.setName(this.__name);
        for (let param of this.__params) {
            cloned.addParameterInstance(param.clone());
        }
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
    // Params

    getParameters() {
        return this.__params;
    }

    getParameterByIndex(index) {
        return this.__params[index];
    }

    getParameter(paramName) {
        return this.__params[this.__paramMapping[paramName]];
    }

    addParameter(paramName, defaultValue) {
        if (paramName instanceof Parameter) {
            return this.addParameterInstance(paramName);
        }
        if (defaultValue instanceof Parameter) {
            return this.addParameterInstance(defaultValue);
        }

        let param;
        if (typeof defaultValue == 'string') {
            param = new Parameter(paramName, defaultValue, 'String');
        } else if (Number.isNumeric(defaultValue)) {
            param = new NumberParameter(paramName, defaultValue);
        } else if (defaultValue instanceof Vec2) {
            param = new Vec2Parameter(paramName, defaultValue);
        } else if (defaultValue instanceof Vec3) {
            param = new Vec3Parameter(paramName, defaultValue);
        } else if (defaultValue instanceof Color) {
            param = new ColorParameter(paramName, defaultValue);
        } else {
            param = new Parameter(paramName, defaultValue);
        }
        this.addParameterInstance(param);
        return param;
    }

    addParameterInstance(param) {
        param.valueChanged.connect(() => this.parameterValueChanged.emit(param.getName()));
        param.nameChanged.connect((newName, oldName) => {
            let index = this.__paramMapping[oldName];
            delete this.__paramMapping[oldName];
            this.__paramMapping[newName] = index;
            this.parameterNameChanged.emit(newName, oldName);
        });
        this.__params.push(param)
        this.__paramMapping[param.getName()] = this.__params.length - 1;
        this.parameterAdded.emit();
        return param;
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
        let paramsJSON = [];
        for (let param of this.__params)
            paramsJSON.push(param.toJSON())
        return {
            "name": this.__name,
            "params": paramsJSON,
        }
    }

    fromJSON(j, flags, asset) {
        this.__name = j.name;
    }

    readBinary(reader, flags, asset) {
        let type = reader.loadStr();
        this.setName(reader.loadStr());
    }

    toString() {
        return JSON.stringify(this.toJSON(), null, 2)
    }
};

export {
    BaseItem
};