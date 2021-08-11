interface WebGL12RenderingContext extends WebGLRenderingContext {
  name: string

  // GLRenderTarget.ts
  __ext_draw_buffers: any
  __ext_WEBGL_depth_texture: any

  // GLScreenQuad.ts
  __quadVertexIdsBuffer: any
  setupInstancedQuad: any
  __quadattrbuffers: any
  __quadIndexBuffer: any

  // GLBaseRenderer.ts
  renderer: any
  floatTexturesSupported: boolean
  multiDrawArrays: any
  multiDrawElements: any
  multiDrawElementsInstanced: any
  multiDrawArraysInstanced: any
  screenQuad: any
  floatGeomBuffer: any
  makeXRCompatible(): any
  shaderopts: Record<any, any>

  //GLFbo.ts
  framebufferTexture2D(target: GLenum, attachment: GLenum, textarget: GLenum, texture: GLuint, level: GLint): void
  bindFramebuffer(target: GLenum, framebuffer: GLuint): void
  createFramebuffer(): any

  // GLEnvMap.ts
  drawQuad(): void
}
