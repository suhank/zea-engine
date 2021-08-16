interface WebGL12RenderingContext extends WebGLRenderingContext {
  name: string

  // GLRenderTarget.ts
  __ext_draw_buffers: any
  __ext_WEBGL_depth_texture: any

  // GLScreenQuad.ts
  setupInstancedQuad: any
  __quadVertexIdsBuffer: any
  __quadattrbuffers: any
  __quadIndexBuffer: WebGLBuffer

  // GLBaseRenderer.ts
  renderer: any
  floatTexturesSupported: boolean
  multiDrawArrays: any
  multiDrawElements: any
  multiDrawElementsInstanced: any
  multiDrawArraysInstanced: any
  floatGeomBuffer: any
  shaderopts: Record<any, any>
  makeXRCompatible(): any
  // GLEnvMap.ts
  drawQuad(): void
}
