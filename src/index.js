import packageJson from '../package.json'

import { LibsRegistry } from './LibsRegistry'

import { SystemDesc } from './SystemDesc'
import { Registry } from './Registry'
import * as Math from './Math/index'
import * as Utilities from './Utilities/index'
import * as SceneTree from './SceneTree/index'
import * as Renderer from './Renderer/index'

const libsRegistry = new LibsRegistry(packageJson.version)
const ZeaEngine = {
  libsRegistry,
  SystemDesc,
  Registry,
  ...Math,
  ...Utilities,
  ...SceneTree,
  ...Renderer,
}

console.log(`Zea Engine v${packageJson.version}`)

export * from './SystemDesc'
export * from './Registry'
export * from './Math/index'
export * from './Utilities/index'
export * from './SceneTree/index'
export * from './Renderer/index'

export { libsRegistry, packageJson, ZeaEngine }
