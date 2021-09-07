// import semver from 'semver'

import { zeaDebug } from './helpers/zeaDebug'

const compare = (a: string, b: string) => {
  // https://stackoverflow.com/questions/6832596/how-to-compare-software-version-number-using-js-only-number
  // 2nd answer.
  const aParts = a.split('-')
  const bParts = b.split('-')
  const aNumbers = aParts.map(str => parseInt(str))
  const bNumbers = bParts.map(str => parseInt(str))
  for (let i = 0; i < 3; i++) {
    if (aNumbers[i] !== bNumbers[i]) return aNumbers[i] - bNumbers[i]
  }
  return 0
}

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

    // if (semver.satisfies(this.version, expected)) {
    if (compare(this.version, expected)) {
      this.registry[libName] = libVersion
      zeaDebug("Registered lib '%s' v%s", libName, libVersion)
      return
    }

    throw new Error(
      `The library '${libName}' is not compatible with this version of the Zea Engine (${this.version}). It expects version '${expected}'.`
    )
  }

  /**
   * List the registered libraries with their versions.
   * Record<string, unknown>@return {} Libraries list.
   */
  listLibs(): Record<string, unknown> {
    return this.registry
  }
}

export { LibsRegistry }
