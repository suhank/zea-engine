import pkg from '../package.json'

import { zeaDebug } from './helpers/zeaDebug'
import { LibsRegistry } from './LibsRegistry'
import { Env } from './Utilities/index'

zeaDebug('Zea Engine version %s', pkg.version)
zeaDebug('Zea Engine env %O', Env)

export * from './SystemDesc'
export * from './Registry'
export * from './Math/index'
export * from './Utilities/index'
export * from './SceneTree/index'
export * from './Renderer/index'

export const libsRegistry = new LibsRegistry(pkg.version)
