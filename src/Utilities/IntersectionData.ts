import { Ray, Vec2, Vec3 } from '../Math'
import { TreeItem } from '../SceneTree/TreeItem'

interface GeomItemAndDist {
  geomItem: TreeItem
  componentId: number
  dist: number
}

class IntersectionData {
  screenPos?: Vec2
  pointerRay: Ray
  intersectionPos: Vec3
  geomData: Float32Array | Uint8Array
  geomItem: TreeItem
  componentId: number
  dist: number
  constructor(
    screenPos: Vec2,
    pointerRay: Ray,
    intersectionPos: Vec3,
    geomData: Float32Array | Uint8Array,
    geomItemAndDist: GeomItemAndDist
  ) {
    this.screenPos = screenPos
    this.pointerRay = pointerRay
    this.intersectionPos = intersectionPos
    this.geomData = geomData
    this.geomItem = geomItemAndDist.geomItem
    this.componentId = geomItemAndDist.componentId
    this.dist = geomItemAndDist.dist
  }
}
export { IntersectionData, GeomItemAndDist }
