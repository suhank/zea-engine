import { EventEmitter } from '../../Utilities/index';
import '../../SceneTree/GeomItem';
import { GeomItem } from '../../SceneTree/GeomItem';
import { RenderState } from '../types/renderer';
import { WebGL12RenderingContext } from '../types/webgl';
declare const GLGeomItemChangeType: {
    GEOMITEM_CHANGED: number;
    GEOM_CHANGED: number;
    VISIBILITY_CHANGED: number;
    HIGHLIGHT_CHANGED: number;
};
declare const GLGeomItemFlags: {
    GEOMITEM_FLAG_CUTAWAY: number;
    GEOMITEM_INVISIBLE_IN_GEOMDATA: number;
};
/** This class is responsible for managing a GeomItem within the renderer.
 * @private
 * @extends EventEmitter
 */
declare class GLGeomItem extends EventEmitter {
    protected listenerIDs: Record<string, number>;
    material: any;
    GLGeomItemSet: any;
    geomItemParamChanged: any;
    GLShaderGeomSets?: any;
    protected gl: WebGL12RenderingContext;
    geomItem: GeomItem;
    drawItemId: number;
    geomId: number;
    materialId: number;
    protected supportInstancing: boolean;
    protected geomVisible: boolean;
    visible: boolean;
    protected culled: boolean;
    protected cutDataChanged: boolean;
    protected cutData: number[];
    protected geomData: any;
    protected geomMatrixDirty: boolean;
    protected modelMatrixArray: any;
    protected geomMatrixChanged: any;
    protected cutAwayChanged: any;
    protected highlightChanged: any;
    /**
     * Create a GL geom item.
     * @param gl - The gl value.
     * @param geomItem - The geomItem value.
     * @param drawItemId - The drawItemId value.
     * @param geomId - The geomId value.
     * @param materialId - The materialId value.
     * @param supportInstancing - a boolean to disable instancing support on some mobile platforms
     */
    constructor(gl: WebGL12RenderingContext, geomItem: GeomItem, drawItemId: number, geomId: number, materialId: number, supportInstancing?: boolean);
    /**
     * The getGeomItem method.
     * @return - The return value.
     */
    getGeomItem(): GeomItem;
    /**
     * The isVisible method.
     * @return - The return value.
     */
    isVisible(): boolean;
    /**
     * The getId method.
     * @return - The return value.
     */
    getDrawItemId(): number;
    /**
     * The updateVisibility method.
     */
    updateVisibility(): void;
    /**
     * Sets the additional culled value which controls visiblity
     * @param culled - True if culled, else false.
     */
    setCulled(culled: boolean): void;
    /**
     * The bind method.
     * @param renderstate - The object tracking the current state of the renderer
     * @return - The return value.
     */
    bind(renderstate: RenderState): boolean;
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy(): void;
}
export { GLGeomItemChangeType, GLGeomItemFlags, GLGeomItem };
