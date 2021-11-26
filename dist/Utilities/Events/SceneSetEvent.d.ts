import { Scene } from '../..';
import { BaseEvent } from '../BaseEvent';
declare class SceneSetEvent extends BaseEvent {
    scene: Scene;
    constructor(scene: Scene);
}
export { SceneSetEvent };
