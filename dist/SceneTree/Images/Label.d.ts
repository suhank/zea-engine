import { BooleanParameter, NumberParameter, ColorParameter, StringParameter } from '../Parameters/index';
import { DataImage } from './DataImage';
/**
 * Represents a 2D label item the scene.
 * Since displaying text in the scene is not an easy task,
 * we've abstracted the complicated logic behind this class, transforming any text into a 2D image(`DataImage`).
 *
 * **Library List**
 * * LabelPack
 *
 * **Parameters**
 * * **Library(`StringParameter`):** Library you wan to use for your label, see **Library List** above.
 * * **Text(`StringParameter`):**
 * * **FontColor(`ColorParameter`):**
 * * **Margin(`NumberParameter`):**
 * * **BorderWidth(`NumberParameter`):**
 * * **BorderRadius(`NumberParameter`):**
 * * **Outline(`BooleanParameter`):**
 * * **OutlineColor(`BooleanParameter`):**
 * * **Background(`BooleanParameter`):**
 * * **ColorParameter(`BackgroundColor`):**
 * * **FillBackground(`BooleanParameter`):**
 * * **StrokeBackgroundOutline(`BooleanParameter`):**
 * * **FontSize(`NumberParameter`):** Represents FontSize of the label
 * * **Font(`StringParameter`):**
 *
 * **Events**
 * * **loaded:** Triggered when label's data is loaded.
 * * **updated:** Triggered when label's data changes.
 * * **labelRendered:** Triggered when the text image is rendered. Contains `width`, `height` and data of the image.
 *
 * @extends DataImage
 */
declare class Label extends DataImage {
    protected needsRender: boolean;
    protected canvasElem: HTMLCanvasElement;
    protected requestedReRender: boolean;
    /**
     * Creates a label instance. Creating a canvas element that hosts the specified text.
     *
     * @param name - The name value.
     * @param library - The library value.
     */
    marginParam: NumberParameter;
    borderRadiusParam: NumberParameter;
    /**
     * @member libraryParam - Library you wan to use for your label, see **Library List** above.
     */
    libraryParam: StringParameter;
    /**
     * @member textParam - text to display on the label
     */
    textParam: StringParameter;
    /**
     * @member fontColorParam - TODO
     */
    fontColorParam: ColorParameter;
    /**
     * @member - TODO
     */
    fontSizeParam: NumberParameter;
    /**
     * @member fontParam - TODO
     */
    fontParam: StringParameter;
    /**
     * @member borderWidthParam - Border around the label
     */
    borderWidthParam: NumberParameter;
    /**
     * @member outlineParam - TODO
     */
    outlineParam: BooleanParameter;
    /**
     * @member outlineColorParam - TODO
     */
    outlineColorParam: ColorParameter;
    /**
     * @member backgroundParam - TODO
     */
    backgroundParam: BooleanParameter;
    /**
     * @member backgroundColorParam - TODO
     */
    backgroundColorParam: ColorParameter;
    /**
     * @member fillBackgroundParam - TODO
     */
    fillBackgroundParam: BooleanParameter;
    /**
     * @member strokeBackgroundOutlineParam - TODO
     */
    strokeBackgroundOutlineParam: BooleanParameter;
    constructor(name?: string, library?: string);
    /**
     * This method can be overridden in derived classes
     * to perform general updates (see GLPass or BaseItem).
     *
     * @param event - The event object.
     * @private
     */
    __parameterValueChanged(event: Record<string, any>): void;
    /**
     * Method in charge of basically do everything, set text, load/update it, get the library, load the font, etc.
     */
    loadLabelData(): void;
    /**
     * Renders the label text to a canvas element ready to display.
     * Here is where all parameters are applied to the canvas containing the text,
     * then the image data is extracted from the canvas context.
     */
    renderLabelToImage(): void;
    /**
     *  Returns all parameters and class state values(Including data).
     *
     * @return - The return value.
     */
    getParams(): Record<string, any>;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context: Record<string, any>): Record<string, any>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j: Record<string, any>, context: Record<string, any>): void;
}
export { Label };
