import semver from 'semver'
import { zeaDebug } from './helpers/zeaDebug'

/**
 * Libraries registry.
 */
class LibsRegistry {
  registry: Record<string, unknown>
  version: string

  /**
   * Construct a new libraries registry for the specific version.
   * @param {string} version - The version of the Zea Engine that will be validated against the registered libraries.
   */
  constructor(version: string) {
    this.version = version
    this.registry = {}
  }

  /**
   * Validate and register a library.
   * @param {Record<string, unknown>} packageJson - The package.json of the library to register.
   */
  registerLib(packageJson: Record<string, any>): void {
    const libName = packageJson.name
    const libVersion = packageJson.version
    const expected = packageJson.dependencies['@zeainc/zea-engine']

    if (semver.satisfies(this.version, expected)) {
      this.registry[libName] = libVersion
      zeaDebug(`Registered lib '${libName}' v${libVersion}`)
      return
    }

    throw new Error(
      `The library '${libName}' is not compatible with this version of the Zea Engine (${this.version}). It expects version '${expected}'.`
    )
  }

  /**
   * List the registered libraries with their versions.
   * @return {Record<string, unknown>} Libraries list.
   */
  listLibs(): Record<string, unknown> {
    return this.registry
  }
}

export { LibsRegistry }
