/**
 * Class representing a BaseClass.
 * The BaseClass is the foundation class of the SceneTree, as almost all classes derive from it.
 */
declare class BaseClass {
    protected __id: number;
    /**
     * Create an BaseClass.
     */
    constructor();
    /**
     * Every instance of each class based on BaseClass is assigned a unique number.
     * This number is not persistent in between different loads of a scene.
     * Returns the unique id of the object.
     * @return - The Id of the object.
     */
    getId(): number;
    /**
     * Returns the unmangled name of the class.
     * @return - The name of the class definition.
     */
    getClassName(): string;
}
export { BaseClass };
