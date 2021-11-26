import { BaseClass } from './Utilities/BaseClass';
/**
 * Registry is a static factory that handles registration/reconstruction of
 * classes bases on BaseClass. Registered classes can then be constructed by the Registry by name.
 *
 * Note: className is required because on minification process
 * the name of classes change and we can't simply use '....constructor.name'.
 * So, we need a way of relating minified class names to the one stored for persistency.
 *
 * i.e.
 * ```javascript
 * // Import registry class
 * class Foo() extends BaseClass {}
 *
 * Registry.register('Foo', Foo)
 * // In case 'Foo' class gets its name changed to 'c' on minification,
 * // and the persisted data type is 'Foo', we would know how to relate them.
 * ```
 *
 * @static
 * @class Registry
 */
declare class Registry {
    /**
     * Registers a new class to the factory.
     *
     * @param className - Name of the registered class
     * @param classDef - Class representation(Class function, type)
     */
    static register(className: string, classDef: typeof BaseClass): void;
    /**
     * Returns class definition using the name it was registered with.
     *
     * @param className - Name of the registered class
     * @return - Class representation(Class function, type)
     */
    static getClassDefinition(className: string): typeof BaseClass;
    /**
     * Returns class name registered for the instantiated object.
     * @param classDefinition - Class type definition.
     * @return - Name of the registered class
     */
    static getClassName(classDefinition: typeof BaseClass): string;
    /**
     * The factory function that construct the class registered under the given name.
     *
     * @param className - Name of the registered class
     * @return - Instantiated object of the specified class
     */
    static constructClass(className: string): BaseClass;
    /**
     * For testing purpose only, never call this outside of the test scope.
     *
     * @private
     */
    static flush(): void;
}
export { Registry };
