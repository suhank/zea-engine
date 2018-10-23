
import {
    SInt32,
    UInt32,
    Float32
} from './Common.js';

class TypeRegistry {
    constructor() {
        this.__types = {};
        this.__names = {};

        // Types required for WebGL.
        this.registerType('SInt32', SInt32)
        this.registerType('UInt32', UInt32)
        this.registerType('Float32', Float32)
    }

    registerType(key, type) {
        this.__types[key] = type;
        if(type.name)
            this.__names[type.name] = key;
        else
            this.__names[type] = key;
    }

    getType(key) {
        return this.__types[key];
    }

    getTypeName(inst) {
        if(this.__names[inst.constructor.name])
            return this.__names[inst.constructor.name];
        return inst.constructor.name;
    }
}

const typeRegistry = new TypeRegistry();

export {
    typeRegistry
};