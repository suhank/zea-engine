import { Ray, Vec2, Vec3 } from '../Math'
import { TreeItem } from '../SceneTree/TreeItem'

interface GeomItemAndDist {
  geomItem: TreeItem
  dist: number
}

class IntersectionData {
  screenPos?: Vec2
  pointerRay: Ray
  intersectionPos: Vec3
  geomData: Float32Array
  geomItem: TreeItem
  dist: number
  constructor(
    screenPos: Vec2,
    pointerRay: Ray,
    intersectionPos: Vec3,
    geomData: Float32Array,
    geomItemAndDist: GeomItemAndDist
  ) {
    this.screenPos = screenPos
    this.pointerRay = pointerRay
    this.intersectionPos = intersectionPos
    this.geomData = geomData
    this.geomItem = geomItemAndDist.geomItem
    this.dist = geomItemAndDist.dist
  }
}
export { IntersectionData, GeomItemAndDist }
