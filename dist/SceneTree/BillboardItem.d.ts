import { BooleanParameter, NumberParameter, ColorParameter, ImageParameter, Vec2Parameter } from './Parameters/index';
import { TreeItem } from './TreeItem';
import { BaseImage } from './BaseImage';
/**
 * A special type of TreeItem(Item with hierarchical abilities) class that represents a banner in a 2D dimension.
 * Can own any type of `BaseImage`.
 * **Parameters**
 * * **Image(`ImageParameter`):** Is the BaseImage you want to display on the board.
 * * **PixelsPerMeter(`NumberParameter`):** Quality and Size of the board. The bigger the number, the smaller the board.
 * * **Alpha(`NumberParameter`):** Transparency of the board, from 0 to 1.
 * * **AlignedToCamera(`BooleanParameter`):** Faces or not the board to the camera at all time(Moves with camera movement).
 * * **DrawOnTop(`BooleanParameter`):** The billboards are rendered overlaid on the scene.
 * * **FixedSizeOnscreen(`BooleanParameter`):** The billboards are rendered at a fixed size on screen, regardless of the distance to the billboard.
 *
 * @extends TreeItem
 */
declare class BillboardItem extends TreeItem {
    /**
     * Creates a billboard item.
     *
     * @param name - The name of the billboard item.
     * @param image - The image value.
     */
    /**
     * @member imageParam - Is the BaseImage you want to display on the board.
     */
    imageParam: ImageParameter;
    /**
     * @member pixelsPerMeterParam - Quality and Size of the board. The bigger the number, the smaller the board.
     */
    pixelsPerMeterParam: NumberParameter;
    /**
     * @member alphaParam - Transparency of the board, from 0 to 1.
     */
    alphaParam: NumberParameter;
    /**
     * @member colorParam - The color of the billboard
     */
    colorParam: ColorParameter;
    /**
     * @member alignedToCameraParam - Faces or not the board to the camera at all time(Moves with camera movement).
     */
    alignedToCameraParam: BooleanParameter;
    /**
     * @member drawOnTopParam - The billboards are rendered overlaid on the scene.
     */
    drawOnTopParam: BooleanParameter;
    /**
     * @member fixedSizeOnscreenParam - The billboards are rendered at a fixed size on screen, regardless of the distance to the billboard.
     */
    fixedSizeOnscreenParam: BooleanParameter;
    /**
     * @member pivotParam - Where the pivot of the billboard is.
     */
    pivotParam: Vec2Parameter;
    constructor(name?: string, image?: BaseImage);
}
export { BillboardItem };
