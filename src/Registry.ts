// import { UInt8, SInt8, UInt16, SInt16, UInt32, SInt32, Float32 } from './Utilities/MathFunctions'
import { BaseClass } from './Utilities/BaseClass'

let registeredClasses: Record<string, number> = {}
let classNames: Record<number, string> = {}
let classDefinitions: Array<typeof BaseClass> = []

// TODO: move me to 'Math' folder.
export class TypeDefinition {
  size: number
  numElements: number
  constructor(size: number, numElements: number = 0) {
    this.size = size
    this.numElements = numElements
  }
}

let registeredMathTypes: Record<string, number> = {}
let mathTypeNames: Record<number, string> = {}
let mathTypeDefinitions: Array<TypeDefinition> = []

/**
 * Registry is a static factory that handles registration/reconstruction of
 * classes bases on BaseClass. Registered classes can then be constructed by the Registry by name.
 *
 * Note: className is required because on minification process
 * the name of classes change and we can't simply use '....constructor.name'.
 * So, we need a way of relating minified class names to the one stored for persistency.
 * <br>
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
   * @param {string} className - Name of the registered class
   * @param {BaseClass} classDef - Class representation(Class function, type)
   */
  static register(className: string, classDef: typeof BaseClass): void {
    if (className in registeredClasses) throw new Error(`There's a class registered with '${className}' name`)

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
   * @param {string} className - Name of the registered class
   * @return {typeof BaseClass} - Class representation(Class function, type)
   */
  static getClassDefinition(className: string): typeof BaseClass {
    if (!(className in registeredClasses)) throw new Error(`${className} class is not registered`)
    return classDefinitions[registeredClasses[className]]
  }

  /**
   * Returns class name registered for the instantiated object.
   * @param {typeof BaseClass} classDefinition - Class type definition.
   * @return {string} - Name of the registered class
   */
  static getClassName(classDefinition: typeof BaseClass): string {
    // throw new Error(`getClassName is deprecated`)
    const classId = classDefinitions.indexOf(classDefinition)
    if (classId >= 0 && classNames[classId]) return classNames[classId]

    throw new Error(`class is not registered`)
  }

  /**
   * The factory function that construct the class registered under the given name.
   *
   * @param {string} className - Name of the registered class
   * @return { Record<string, unknown> | unknown } - Instantiated object of the specified class
   */
  static constructClass(className: string): BaseClass {
    const classDefinition = classDefinitions[registeredClasses[className]]
    if (!classDefinition) throw new Error(`${className} class is not registered`)

    return new classDefinition()
  }

  /**
   * Returns class name registered for the instantiated object.
   *@deprecated
   * @param {typeof BaseClass} classDefinition - Class representation(Class function, type)
   * @return {string} - Name of the registered class
   */
  static getBlueprintName(classDefinition: typeof BaseClass): string {
    return this.getClassName(classDefinition)
  }

  /**
   * Returns class definition using the class name it was registered with.
   *
   * @param {string} className - Name of the registered class
   * @return {BaseClass} - Class definition(Class function, type)
   */
  static getBlueprint(className: string): typeof BaseClass {
    return this.getClassDefinition(className)
  }

  /**
   * Registers a new class to the factory.
   *
   * @param {string} typeName - Name of the registered class
   * @param {TypeDefinition} typeDef - Type definition structure
   */
  static registerMathType(typeName: string, typeDef: TypeDefinition): void {
    if (registeredMathTypes[typeName])
      throw new Error(`There's a math type definition registered with '${typeName}' name`)

    // Note: To provide backwards compatibility, same typeDef can be stored under multiple names.
    // Thats the reason behind using indexes instead of the typeDef.
    const index = mathTypeDefinitions.length
    mathTypeDefinitions.push(typeDef)
    mathTypeNames[index] = typeName
    registeredMathTypes[typeName] = index
  }

  /**
   * Returns class definition using the type name it was registered with.
   *
   * @param {string} typeName - Name of the registered math type
   * @return {TypeDefinition} - Class describing a math type
   */
  static getMathTypeDefinition(typeName: string): TypeDefinition {
    if (!(typeName in registeredMathTypes)) throw new Error(`${typeName} Math type is not registered`)
    return mathTypeDefinitions[registeredMathTypes[typeName]]
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

    registeredMathTypes = {}
    mathTypeNames = {}
    mathTypeDefinitions = []
  }
}

Registry.registerMathType('UInt8', new TypeDefinition(1))
Registry.registerMathType('SInt8', new TypeDefinition(1))
Registry.registerMathType('UInt16', new TypeDefinition(2))
Registry.registerMathType('SInt16', new TypeDefinition(2))
Registry.registerMathType('UInt32', new TypeDefinition(4))
Registry.registerMathType('SInt32', new TypeDefinition(4))
Registry.registerMathType('Float32', new TypeDefinition(4))

export { Registry }
