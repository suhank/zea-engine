const _registeredBlueprints = {}
const _blueprintNames = {}
const _blueprints = []

/**
 * Registry is a static factory that handles registration/reconstruction of
 * persisted type of data, this includes classes and types.
 *
 * Note: blueprintName is required because on minification process
 * the name of classes change and we can't simply use '....constructor.name'.
 * So, we need a way of relating minified blueprint names to the one stored for persistency.
 * <br>
 * i.e.
 * ```javascript
 * // Import registry class
 * class Foo() {}
 *
 * Registry.register('Foo', Foo)
 * // In case 'Foo' class gets its name changed to 'c' on minification,
 * // and the persisted data type is 'Foo', we would know how to relate them.
 * ```
 *
 * @static
 * @class Registry
 */
const Registry = {
  /**
   * Registers a new blueprint in the factory.
   *
   * @param {string} blueprintName - Name of the registered blueprint(Class, type, etc)
   * @param {function|number|any} blueprint - Blueprint representation(Class function, type)
   */
  register: (blueprintName, blueprint) => {
    if (!_registeredBlueprints[blueprintName]) {
      _registeredBlueprints[blueprintName] = {
        blueprint,
        callbacks: [],
      }
    }

    // Note: To provide backwards compatibility, same blueprint can be stored under multiple names.
    // Thats the reason behind using indexes instead of the blueprint.
    const blueprintIndex = _blueprints.length
    _blueprints.push(blueprint)
    _blueprintNames[blueprintIndex] = blueprintName
  },
  /**
   * Returns blueprint function/type by specifying its name.
   *
   * @param {string} blueprintName - Name of the registered blueprint(Class, type, etc)
   * @return {function|number|any|undefined} - Blueprint representation(Class function, type)
   */
  getBlueprint: (blueprintName) => {
    if (_registeredBlueprints[blueprintName]) return _registeredBlueprints[blueprintName].blueprint

    console.warn(`${blueprintName} blueprint is not registered`)
    return undefined
  },
  /**
   * Returns class name using passing an instantiated object.
   * If it is not registered, the name in constructor is returned.
   *
   * @param {function|number|any|undefined} blueprintInstance - Blueprint representation(Class function, type)
   * @return {string} - Name of the registered blueprint(Class, type, etc)
   */
  getBlueprintName: (blueprintInstance) => {
    let blueprint = blueprintInstance
    let blueprintName = blueprintInstance

    if (typeof blueprintInstance === 'object') {
      blueprint = blueprintInstance.constructor
      blueprintName = blueprint.name
    }

    const blueprintId = _blueprints.indexOf(blueprint)
    if (blueprintId >= 0 && _blueprintNames[blueprintId]) return _blueprintNames[blueprintId]

    console.warn(`${blueprintName} blueprint is not registered`)
    return blueprintName
  },
  /**
   * Accepting the class name and `N` number of arguments, instantiates a new object of the specified class.
   * If the class is not registered, then `null` is returned.
   * <br>
   * **Note:** Although the class arguments are not literally specified in the parameters,
   * you can pass them(As many as needed).
   *
   * @param {string} blueprintName - Name of the registered blueprint(Class, type, etc)
   * @return {object|null} - Instantiated object of the specified class
   */
  constructClass: (blueprintName, ...args) => {
    const blueprintData = _registeredBlueprints[blueprintName]
    if (!blueprintData) {
      console.warn(`${blueprintName} blueprint is not registered`)
      return null
    }

    // eslint-disable-next-line new-cap
    return new blueprintData.blueprint(...args)
  },
}

export default Registry
