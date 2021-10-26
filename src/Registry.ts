// import { UInt8, SInt8, UInt16, SInt16, UInt32, SInt32, Float32 } from './Utilities/MathFunctions'
import { BaseClass } from './Utilities/BaseClass'

let registeredClasses: Record<string, number> = {}
let classNames: Record<number, string> = {}
let classDefinitions: Array<typeof BaseClass> = []

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
class Registry {
  /**
   * Registers a new class to the factory.
   *
   * @param className - Name of the registered class
   * @param classDef - Class representation(Class function, type)
   */
  static register(className: string, classDef: typeof BaseClass): void {
    if (className in registeredClasses) {
      console.warn(`There's a class registered with '${className}' name`)
    }

    // Note: To provide backwards compatibility, same classDef can be stored under multiple names.
    // Thats the reason behind using indexes instead of the classDef.
    const index = classDefinitions.length
    classDefinitions.push(classDef)
    classNames[index] = className
    registeredClasses[className] = index
  }

  /**
   * Returns class definition using the name it was registered with.
   *
   * @param className - Name of the registered class
   * @return - Class representation(Class function, type)
   */
  static getClassDefinition(className: string): typeof BaseClass {
    if (!(className in registeredClasses)) throw new Error(`${className} class is not registered`)
    return classDefinitions[registeredClasses[className]]
  }

  /**
   * Returns class name registered for the instantiated object.
   * @param classDefinition - Class type definition.
   * @return - Name of the registered class
   */
  static getClassName(classDefinition: typeof BaseClass): string {
    const classId = classDefinitions.indexOf(classDefinition)
    if (classId >= 0 && classNames[classId]) return classNames[classId]

    throw new Error(`class is not registered`)
  }

  /**
   * The factory function that construct the class registered under the given name.
   *
   * @param className - Name of the registered class
   * @return - Instantiated object of the specified class
   */
  static constructClass(className: string): BaseClass {
    const classDefinition = classDefinitions[registeredClasses[className]]
    if (!classDefinition) throw new Error(`${className} class is not registered`)

    return new classDefinition()
  }

  /**
   * For testing purpose only, never call this outside of the test scope.
   *
   * @private
   */
  static flush(): void {
    registeredClasses = {}
    classNames = {}
    classDefinitions = []
  }
}

export { Registry }
