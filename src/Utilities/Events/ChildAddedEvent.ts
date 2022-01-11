import { TreeItem } from '../../SceneTree/TreeItem'
import { BaseEvent } from '../BaseEvent'

class ChildAddedEvent extends BaseEvent {
  index: number
  childItem: TreeItem

  constructor(index: number, childItem: TreeItem) {
    super()
    this.index = index
    this.childItem = childItem
  }
}
export { ChildAddedEvent }
