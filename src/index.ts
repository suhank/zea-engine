import packageJson from './package.json'

import { LibsRegistry } from './LibsRegistry'

const libsRegistry = new LibsRegistry(packageJson.version)

console.log(`Zea Engine v${packageJson.version}`)

export * from './SystemDesc'
export * from './Registry'
export * from './Math/index'
export * from './Utilities/index'
export * from './SceneTree/index'
export * from './Renderer/index'

export { libsRegistry, packageJson }
