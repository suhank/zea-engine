import { Shaderopts } from './renderer';
import { WebGLRenderingContextExtension } from './webgl2';
export interface WebGL12RenderingContext extends WebGLRenderingContextExtension {
    name: string;
    __ext_draw_buffers: any;
    __ext_WEBGL_depth_texture: any;
    setupInstancedQuad: any;
    __quadVertexIdsBuffer: any;
    __quadattrbuffers: any;
    __quadIndexBuffer: WebGLBuffer | null;
    renderer: any;
    floatTexturesSupported: boolean;
    multiDrawArrays: any;
    multiDrawElements: any;
    multiDrawElementsInstanced: any;
    multiDrawArraysInstanced: any;
    floatGeomBuffer: any;
    shaderopts: Shaderopts;
    makeXRCompatible(): any;
    drawQuad(): void;
}
