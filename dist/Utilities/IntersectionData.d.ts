import { Ray, Vec2, Vec3 } from '../Math';
import { TreeItem } from '../SceneTree/TreeItem';
interface GeomItemAndDist {
    geomItem: TreeItem;
    dist: number;
}
declare class IntersectionData {
    screenPos?: Vec2;
    pointerRay: Ray;
    intersectionPos: Vec3;
    geomData: Float32Array | Uint8Array;
    geomItem: TreeItem;
    dist: number;
    constructor(screenPos: Vec2, pointerRay: Ray, intersectionPos: Vec3, geomData: Float32Array | Uint8Array, geomItemAndDist: GeomItemAndDist);
}
export { IntersectionData, GeomItemAndDist };
