import { Shaderopts } from './renderer'
import { WebGLRenderingContextExtension } from './webgl2';

export interface WebGL12RenderingContext extends WebGLRenderingContextExtension {
  name: string

  // GLRenderTarget.ts
  __ext_draw_buffers: any
  __ext_WEBGL_depth_texture: any

  // GLScreenQuad.ts
  setupInstancedQuad: any
  __quadVertexIdsBuffer: any
  __quadattrbuffers: any
  __quadIndexBuffer: WebGLBuffer | null

  // GLBaseRenderer.ts
  renderer: any
  floatTexturesSupported: boolean
  multiDrawArrays: any
  multiDrawElements: any
  multiDrawElementsInstanced: any
  multiDrawArraysInstanced: any
  floatGeomBuffer: any
  shaderopts: Shaderopts
  makeXRCompatible(): any
  // GLEnvMap.ts
  drawQuad(): void
}
