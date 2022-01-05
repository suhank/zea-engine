import { Color } from '../Math/index'
import { TreeItem } from './TreeItem'
import { ResourceLoader, resourceLoader } from './resourceLoader'
import { GridTreeItem } from './GridTreeItem'
import { EnvMap } from './Images/EnvMap'
import { BooleanParameter, NumberParameter, ImageParameter } from './Parameters/index'

const defaultGridColor = new Color('#DCDCDC')

/**
 * Class representing the environment where all the displayed assets live.
 */
class Scene {
  /**
   * @member envMapParam - The image displayed and used for the environment map.
   */
  envMapParam: ImageParameter = new ImageParameter('EnvMap')

  /**
   * @member displayEnvMapParam - Boolean that determines whether or not the environment map should be displayed.
   */
  displayEnvMapParam: BooleanParameter = new BooleanParameter('Display EnvMap', false)

  /**
   * @member envMapLODParam - TODO
   */
  envMapLODParam: NumberParameter = new NumberParameter('EnvMapLOD', 0)

  protected root: TreeItem = new TreeItem('root')

  /**
   * Create a scene.
   */
  constructor() {}

  /**
   * Returns the scene's root item(`TreeItem`) that owns every item in the scene.
   *
   * @return - The return value.
   */
  getRoot() {
    return this.root
  }

  /**
   * Returns resourceLoader object set on class initialization.
   *
   * @return - The return value.
   */
  getResourceLoader(): ResourceLoader {
    return resourceLoader
  }

  /**
   * Sets Environment Map with the BaseImage you'd like to display in your scene background.
   *
   * @param envMap - The envMap value.
   */
  setEnvMap(envMap: EnvMap) {
    this.envMapParam.value = envMap
  }

  /**
   * Sets up and displays the scene grid of a given size and resolution. The Grid is oriented on the XY plane
   * and highlights the X and Y axes with Red and Green lines. Grids are useful in displaying scene scale and coordinate system.
   * The Grid geometry does not return a bounding box and so does not effect the bounding of the scene.
   * The GridTreeItem display a grid of a given size and resolution. The Grid is oriented on the XY plane
   * and highlights the X and Y axes with Red and Green lines.
   *
   * @param gridSize - The size of the grid.
   * @param resolution - The resolution of the grid.
   * @param gridColor - The color of the grid.
   * @return - The return value.
   */
  setupGrid(gridSize = 5, resolution = 50, gridColor = defaultGridColor) {
    const gridTreeItem = new GridTreeItem(gridSize, resolution, gridColor)
    this.root.addChild(gridTreeItem, false)
    return gridTreeItem
  }
}

export { Scene }
