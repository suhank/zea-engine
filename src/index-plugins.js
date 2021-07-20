import { ArchiveUnpackerPlugin } from './SceneTree/ResourceLoader/ArchiveUnpackerPlugin'
import { JsonLoaderPlugin } from './SceneTree/ResourceLoader/JsonLoaderPlugin'
import { TextLoaderPlugin } from './SceneTree/ResourceLoader/TextLoaderPlugin'
import { BinaryLoaderPlugin } from './SceneTree/ResourceLoader/BinaryLoaderPlugin'

const archiveUnpackerPlugin = new ArchiveUnpackerPlugin()
window.zeaEngine.resourceLoader.registerPlugin(archiveUnpackerPlugin)
const jsonLoaderPlugin = new JsonLoaderPlugin()
window.zeaEngine.resourceLoader.registerPlugin(jsonLoaderPlugin)
const textLoaderPlugin = new TextLoaderPlugin()
window.zeaEngine.resourceLoader.registerPlugin(textLoaderPlugin)
const binaryLoaderPlugin = new BinaryLoaderPlugin()
window.zeaEngine.resourceLoader.registerPlugin(binaryLoaderPlugin)
