
class TypeRegistry {
    constructor() {
        this.__types = {};
    }

    registerType(key, type) {
        this.__types[key] = type;
    }

    getType(key) {
        return this.__types[key];
    }
}
let typeRegistry = new TypeRegistry();

export {
    typeRegistry
};
// export default typeRegistry;