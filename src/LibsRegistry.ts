/**
 * Libraries registry.
 */
class LibsRegistry {
  registry: Record<string, unknown>
  version: string

  /**
   * Construct a new libraries registry for the specific version.
   * @param version - The version of the Zea Engine that will be validated against the registered libraries.
   */
  constructor(version: string) {
    this.version = version
    this.registry = {}
  }

  /**
   * Validate and register a library.
   * @param packageJson - The package.json of the library to register.
   */
  registerLib(packageJson: Record<string, any>): void {
    const libName = packageJson.name
    const libVersion = packageJson.version

    if (this.registry[libName]) {
      console.warn("Library already registered:" + libName)
    }

    this.registry[libName] = libVersion
    console.log(`Registered lib '${libName}' v${libVersion}`)
  }

  /**
   * List the registered libraries with their versions.
   * @return Libraries list.
   */
  listLibs(): Record<string, unknown> {
    return this.registry
  }
}

export { LibsRegistry }
