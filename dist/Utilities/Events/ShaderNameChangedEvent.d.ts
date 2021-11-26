import { BaseEvent } from '../BaseEvent';
declare class ShaderNameChangedEvent extends BaseEvent {
    shaderName: string;
    constructor(shaderName: string);
}
export { ShaderNameChangedEvent };
