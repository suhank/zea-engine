import packageJson from '../package.json'

import { zeaDebug } from './helpers/zeaDebug'
import { LibsRegistry } from './LibsRegistry'

import { SystemDesc } from './SystemDesc'
import { Registry } from './Registry'
import * as Math from './Math/index'
import * as Utilities from './Utilities/index'
import * as SceneTree from './SceneTree/index'
import * as Renderer from './Renderer/index'

const ZeaEngine = {
  SystemDesc,
  Registry,
  ...Math,
  ...Utilities,
  ...SceneTree,
  ...Renderer,
}

const libsRegistry = new LibsRegistry(packageJson.version)

zeaDebug('Zea Engine version %s', packageJson.version)

export * from './SystemDesc'
export * from './Registry'
export * from './Math/index'
export * from './Utilities/index'
export * from './SceneTree/index'
export * from './Renderer/index'

export { libsRegistry, packageJson, ZeaEngine }

// Note: Needed if we try to load tne engine as an ESM module.
// TODO: Remove this. We should just use a bundler or umd.
// @ts-ignore
globalThis.zeaEngine = ZeaEngine
