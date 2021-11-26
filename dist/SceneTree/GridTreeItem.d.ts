import { Color, Box3 } from '../Math/index';
import { TreeItem } from './TreeItem';
/**
 * The GridTreeItem displays a grid of a given size and resolution. The Grid is oriented on the XY plane
 * and highlights the X and Y axes with Red and Green lines. Grids are useful in displaying scene scale and coordinate system.
 * The Grid geometry does not return a bounding box and so does not effect the bounding of the scene.
 *
 * @extends {TreeItem}
 */
declare class GridTreeItem extends TreeItem {
    /**
     * Creates an instance of GridTree.
     *
     * @param gridSize
     * @param resolution
     * @param gridColor
     */
    constructor(gridSize?: number, resolution?: number, gridColor?: Color);
    /**
     *
     * @private
     * @param bBox
     * @return - Reset Bounding Box
     */
    _cleanBoundingBox(bBox: Box3): Box3;
}
export { GridTreeItem };
