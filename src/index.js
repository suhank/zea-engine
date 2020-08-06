export { onResize } from './external/onResize.js'
export * from './BrowserDetection.js'
export * from './Math/index'
export * from './Utilities/index'
export * from './SceneTree/index'
export * from './Renderer/index'
export * from './Registry'

import { onResize } from './external/onResize.js'
import * as BrowserDetection from './BrowserDetection.js'
import * as Math from './Math/index'
import * as Utilities from './Utilities/index'
import * as SceneTree from './SceneTree/index'
import * as Renderer from './Renderer/index'
import Registry from './Registry.js'

const ZeaEngine = {
  onResize,
  ...BrowserDetection,
  ...Math,
  ...Utilities,
  ...SceneTree,
  ...Renderer,
  Registry,
}

export default ZeaEngine
