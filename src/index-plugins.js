/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArchiveUnpackerPlugin } from './SceneTree/ResourceLoader/ArchiveUnpackerPlugin'
import { JsonLoaderPlugin } from './SceneTree/ResourceLoader/JsonLoaderPlugin'
import { TextLoaderPlugin } from './SceneTree/ResourceLoader/TextLoaderPlugin'
import { BinaryLoaderPlugin } from './SceneTree/ResourceLoader/BinaryLoaderPlugin'

const archiveUnpackerPlugin = new ArchiveUnpackerPlugin()
;(window as any).zeaEngine.resourceLoader.registerPlugin(archiveUnpackerPlugin)
const jsonLoaderPlugin = new JsonLoaderPlugin()
;(window as any).zeaEngine.resourceLoader.registerPlugin(jsonLoaderPlugin)
const textLoaderPlugin = new TextLoaderPlugin()
;(window as any).zeaEngine.resourceLoader.registerPlugin(textLoaderPlugin)
const binaryLoaderPlugin = new BinaryLoaderPlugin()
;(window as any).zeaEngine.resourceLoader.registerPlugin(binaryLoaderPlugin)
