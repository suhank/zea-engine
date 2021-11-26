import { Registry } from '../Registry';
/* eslint-disable @typescript-eslint/no-explicit-any */
let counter = 0;
/**
 * Class representing a BaseClass.
 * The BaseClass is the foundation class of the SceneTree, as almost all classes derive from it.
 */
class BaseClass {
    /**
     * Create an BaseClass.
     */
    constructor() {
        this.__id = ++counter;
    }
    /**
     * Every instance of each class based on BaseClass is assigned a unique number.
     * This number is not persistent in between different loads of a scene.
     * Returns the unique id of the object.
     * @return - The Id of the object.
     */
    getId() {
        return this.__id;
    }
    /**
     * Returns the unmangled name of the class.
     * @return - The name of the class definition.
     */
    getClassName() {
        return Registry.getClassName(Object.getPrototypeOf(this).constructor);
    }
}
export { BaseClass };
//# sourceMappingURL=BaseClass.js.map