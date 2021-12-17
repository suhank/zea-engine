import { version } from './package.json'

import { LibsRegistry } from './LibsRegistry'

const libsRegistry = new LibsRegistry(version)

console.log(`Zea Engine v${version}`)

export * from './SystemDesc'
export * from './Registry'
export * from './Math/index'
export * from './Utilities/index'
export * from './Utilities/Events/index'
export * from './SceneTree/index'
export * from './Renderer/index'

export { libsRegistry }
