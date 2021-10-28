/**
 * Libraries registry.
 */
class LibsRegistry {
  /**
   * Construct a new libraries registry for the specific version.
   * @param {string} version - The version of the Zea Engine that will be validated against the registered libraries.
   */
  constructor(version) {
    this.version = version
    this.registry = {}
  }

  /**
   * Validate and register a library.
   * @param {object} packageJson - The package.json of the library to register.
   */
  registerLib(packageJson) {
    const libName = packageJson.name
    const libVersion = packageJson.version

    this.registry[libName] = libVersion
    console.log(`Registered lib '${libName}' v${libVersion}`)
  }

  /**
   * List the registered libraries with their versions.
   * @return {object} Libraries list.
   */
  listLibs() {
    return this.registry
  }
}

export { LibsRegistry }
