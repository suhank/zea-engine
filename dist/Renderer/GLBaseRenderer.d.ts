import { TreeItem, ParameterOwner, Scene } from '../SceneTree/index';
import { GLScreenQuad } from './GLScreenQuad';
import { GLViewport } from './GLViewport';
import { XRViewport } from './VR/XRViewport';
import { GLMaterialLibrary } from './Drawing/GLMaterialLibrary';
import { GLGeomLibrary } from './Drawing/GLGeomLibrary';
import { GLGeomItemLibrary } from './Drawing/GLGeomItemLibrary';
import { GLPass } from './Passes/GLPass';
import { GLShader } from './GLShader';
import { WebGL12RenderingContext } from './types/webgl';
import { RenderState, GeomDataRenderState } from './types/renderer';
/**
 * Class representing a GL base renderer.
 *
 * @extends ParameterOwner
 */
declare class GLBaseRenderer extends ParameterOwner {
    protected listenerIDs: Record<number, Record<string, number>>;
    protected directives: string[];
    solidAngleLimit: number;
    __gl: WebGL12RenderingContext;
    protected __glcanvas: HTMLCanvasElement | null;
    protected __scene: Scene | null;
    protected __shaderDirectives: Record<string, string>;
    protected __renderGeomDataFbosRequested: boolean;
    protected __shaders: Record<string, GLShader>;
    protected __passes: Record<number, GLPass[]>;
    protected __passesRegistrationOrder: GLPass[];
    protected __passCallbacks: any[];
    protected __viewports: GLViewport[];
    protected __activeViewport: GLViewport | undefined;
    protected __continuousDrawing: boolean;
    protected __redrawRequested: boolean;
    protected __isMobile: boolean;
    protected __drawSuspensionLevel: number;
    __xrViewportPresenting: boolean;
    floatGeomBuffer: boolean;
    protected __supportXR: boolean;
    protected __xrViewport: XRViewport | undefined;
    protected __xrViewportPromise: Promise<XRViewport>;
    glMaterialLibrary: GLMaterialLibrary;
    glGeomItemLibrary: GLGeomItemLibrary;
    glGeomLibrary: GLGeomLibrary;
    screenQuad: GLScreenQuad | null;
    private resizeObserver?;
    /**
     * Create a GL base renderer.
     * @param $canvas - The canvas element.
     * @param options - The options value.
     */
    constructor($canvas: HTMLCanvasElement, options?: Record<string, any>);
    /**
     * The addShaderPreprocessorDirective method.
     * @param name - The name value.
     * @param value - The value param.
     */
    addShaderPreprocessorDirective(name: string, value?: string): void;
    /**
     * Returns HTMLCanvasElement's width
     *
     * @return - The return value.
     */
    getWidth(): number;
    /**
     * Returns HTMLCanvasElement's Height
     * @return - The return value.
     */
    getHeight(): number;
    /**
     * Adds a new viewport(viewing region) to the scene.
     *
     * @param name - The name of the viewport.
     * @return - The return value.
     */
    addViewport(name: string): GLViewport;
    /**
     * Returns a viewport element by specifying its index in the list of viewports.
     *
     * @param index - The index value.
     * @return - The return value.
     */
    getViewport(index?: number): GLViewport;
    /**
     * Returns a viewport element under the specified XY coordinates.
     *
     * @param offsetX - The viewport offset in the X axis.
     * @param offsetY - The viewport offset in the Y axis.
     * @return - The return value.
     */
    getViewportAtPos(offsetX: number, offsetY: number): GLViewport | undefined;
    /**
     * Sets as `active` the specified viewport.
     *
     * @param vp - The viewport.
     */
    activateViewport(vp: GLViewport): void;
    /**
     * Sets as àctive` the viewport under the specified XY coordinates.
     *
     * @param offsetX - The viewport offset in the X axis.
     * @param offsetY - The viewport offset in the Y axis.
     */
    activateViewportAtPos(offsetX: number, offsetY: number): void;
    /**
     * Returns current active viewport.
     *
     * @return - The return value.
     */
    getActiveViewport(): GLViewport | undefined;
    /**
     * The suspendDrawing method.
     */
    suspendDrawing(): void;
    /**
     * The resumeDrawing method.
     */
    resumeDrawing(): void;
    /**
     * The renderGeomDataFbos method. Frame buffer (FBO).
     */
    renderGeomDataFbos(): void;
    /**
     * Returns current scene(Environment where all assets live) object.
     *
     * @return - The return value.
     */
    getScene(): Scene;
    /**
     * Sets scene to the renderer.
     *
     * @param scene - The scene value.
     */
    setScene(scene: Scene): void;
    /**
     * Adds tree items to the renderer, selecting the correct pass to delegate rendering too, and listens to future changes in the tree.
     *
     * @param treeItem - The tree item to add.
     */
    addTreeItem(treeItem: TreeItem): void;
    /**
     * Searches through the passes and finds the appropriate pass to draw the given tree items.
     *
     * @param treeItem - The tree item to assign.
     */
    assignTreeItemToGLPass(treeItem: TreeItem): void;
    /**
     * Remove tree items from the scene.
     *
     * @param treeItem - The tree item to remove.
     */
    removeTreeItem(treeItem: TreeItem): void;
    /**
     * Getter for gl.
     */
    get gl(): WebGL12RenderingContext;
    /**
     * The getGL method.
     * @return - The return value.
     */
    getGL(): WebGL12RenderingContext;
    /**
     * Handle the canvas's parent resizing.
     *
     * @param newWidth - The new width of the canvas.
     * @param newHeight - The new height of the canvas.
     *
     * @private
     */
    handleResize(newWidth: number, newHeight: number): void;
    /**
     * Returns host div of the canvas element.
     *
     * @return - The return value.
     */
    getDiv(): HTMLElement | null;
    /**
     * Setups the WebGL configuration for the renderer, specifying the canvas element where our
     * @private
     * @param $canvas - The $canvas element.
     * @param webglOptions - The webglOptions value.
     */
    private setupWebGL;
    /**
     * Binds IO event handlers to the canvas
     */
    bindEventHandlers(): void;
    /**
     * Returns canvas that was used to generate the gl context.
     *
     * @return - The return value.
     */
    getGLCanvas(): HTMLCanvasElement | null;
    /**
     * Frames the specified viewport to the entire scene.
     * > See also: ${Viewport#frameView}
     * @param viewportIndex - The viewportIndex value. If multiple viewports are configured, a viewport index will need to be provided.
     */
    frameAll(viewportIndex?: number): void;
    /**
     * A factory function used to construct new shader objects. If that specified shader has already been constructed, it returns the existing shader.
     * @param shaderName - The shader name.
     * @return - The return value.
     */
    getOrCreateShader(shaderName: string): GLShader;
    /**
     * The addPass method.
     * @param pass - The pass value.
     * @param passType - The passType value.
     * @param updateIndices - The updateIndices value.
     * @return - The return value.
     */
    addPass(pass: GLPass, passType?: number, updateIndices?: boolean): number;
    /**
     * The getPass method.
     * @param index - The index value.
     * @return - The return value.
     */
    getPass(index: number): GLPass | undefined;
    /**
     * The supportsVR method.
     * @return - The return value.
     */
    supportsVR(): boolean;
    /**
     * The __setupXRViewport method.
     * @return - The return value.
     * @private
     */
    __setupXRViewport(): XRViewport;
    /**
     * The getVRViewport method.
     * @return - The return value.
     */
    getVRViewport(): XRViewport | undefined;
    /**
     * The getXRViewport method.
     * @return - The return value.
     */
    getXRViewport(): Promise<XRViewport>;
    /**
     * The isXRViewportPresenting method.
     * @return - The return value.
     */
    isXRViewportPresenting(): boolean;
    /**
     * The isContinuouslyDrawing method.
     * @return - The return value.
     */
    isContinuouslyDrawing(): boolean;
    /**
     * The startContinuousDrawing method.
     */
    startContinuousDrawing(): void;
    /**
     * The stopContinuousDrawing method.
     */
    stopContinuousDrawing(): void;
    /**
     * The toggleContinuousDrawing method.
     */
    toggleContinuousDrawing(): void;
    /**
     * The drawItemChanged method.
     */
    drawItemChanged(): void;
    /**
     * Request a single redraw, usually in response to a signal/event.
     * @return - The return value.
     */
    requestRedraw(): boolean;
    /**
     * Forces a redraw of the viewports
     */
    forceRender(): void;
    /**
     * The bindGLBaseRenderer method.
     * @param renderstate - The renderstate value.
     */
    bindGLBaseRenderer(renderstate: RenderState): void;
    /**
     * The drawScene method.
     * @param renderstate - The renderstate value.
     */
    drawScene(renderstate: RenderState): void;
    /**
     * The drawHighlightedGeoms method.
     * @param renderstate - The renderstate value.
     */
    drawHighlightedGeoms(renderstate: RenderState): void;
    /**
     * The drawSceneGeomData method.
     * @param renderstate - The renderstate value.
     * @param mask - The mask value
     */
    drawSceneGeomData(renderstate: GeomDataRenderState, mask?: number): void;
    /**
     * The registerPass method.
     * @param cls - The cls value.
     * @param passType - The passType value.
     */
    static registerPass(cls: any, passType: any): void;
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy(): void;
}
export { GLBaseRenderer };
