import { TreeItem } from '../../SceneTree/TreeItem';
import { BaseEvent } from '../BaseEvent';
declare class ChildAddedEvent extends BaseEvent {
    index: number;
    childItem: TreeItem;
    constructor(index: number, childItem: TreeItem);
}
export { ChildAddedEvent };
