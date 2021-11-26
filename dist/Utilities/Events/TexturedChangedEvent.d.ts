import { BaseEvent } from '../BaseEvent';
declare class TexturedChangedEvent extends BaseEvent {
    isTextured: boolean;
    param: Record<string, any>;
    constructor(isTextured: boolean, param: Record<string, any>);
}
export { TexturedChangedEvent };
