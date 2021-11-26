import { Color, Vec2 } from '../Math/index';
import { BooleanParameter, NumberParameter, ColorParameter, ImageParameter, Vec2Parameter } from './Parameters/index';
import { TreeItem } from './TreeItem';
import { Registry } from '../Registry';
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
class BillboardItem extends TreeItem {
    constructor(name, image) {
        super(name);
        /**
         * Creates a billboard item.
         *
         * @param name - The name of the billboard item.
         * @param image - The image value.
         */
        /**
         * @member imageParam - Is the BaseImage you want to display on the board.
         */
        this.imageParam = new ImageParameter('Image');
        /**
         * @member pixelsPerMeterParam - Quality and Size of the board. The bigger the number, the smaller the board.
         */
        this.pixelsPerMeterParam = new NumberParameter('PixelsPerMeter', 1000.0);
        /**
         * @member alphaParam - Transparency of the board, from 0 to 1.
         */
        this.alphaParam = new NumberParameter('Alpha', 1.0);
        /**
         * @member colorParam - The color of the billboard
         */
        this.colorParam = new ColorParameter('Color', new Color(1.0, 1.0, 1.0));
        /**
         * @member alignedToCameraParam - Faces or not the board to the camera at all time(Moves with camera movement).
         */
        this.alignedToCameraParam = new BooleanParameter('AlignedToCamera', false);
        /**
         * @member drawOnTopParam - The billboards are rendered overlaid on the scene.
         */
        this.drawOnTopParam = new BooleanParameter('DrawOnTop', false);
        /**
         * @member fixedSizeOnscreenParam - The billboards are rendered at a fixed size on screen, regardless of the distance to the billboard.
         */
        this.fixedSizeOnscreenParam = new BooleanParameter('FixedSizeOnscreen', false);
        /**
         * @member pivotParam - Where the pivot of the billboard is.
         */
        this.pivotParam = new Vec2Parameter('Pivot', new Vec2(0.5, 0.0));
        const imageParamResult = this.addParameter(this.imageParam);
        if (image)
            imageParamResult.value = image; // Note: this dirties the param and will ensure it is saved to JSON
        this.addParameter(this.pixelsPerMeterParam);
        this.addParameter(this.alphaParam);
        this.addParameter(this.colorParam);
        this.addParameter(this.alignedToCameraParam);
        this.addParameter(this.drawOnTopParam);
        this.addParameter(this.fixedSizeOnscreenParam);
        this.addParameter(this.pivotParam);
    }
}
Registry.register('BillboardItem', BillboardItem);
export { BillboardItem };
//# sourceMappingURL=BillboardItem.js.map