interface RenderState {
  gl?: WebGL12RenderingContext
  glShader?: GLShader
  shaderkey?: string
  shaderopts?: Record<any, any>
  attrs?: Record<any, any>
  directives?: any[]

  drawItemsTexture?: any

  glGeom?: GLGeom
  geomDataFbo?: GLFbo

  width?: number
  height?: number

  vrviewport?: any

  passIndex?: number
  pass?: string

  vrPresenting?: boolean
  supportsInstancing?: boolean
  viewport?: GLBaseViewport
  viewports?: GLBaseViewport[]

  bindViewports?: any
  bindRendererUnifs?: any
  boundTextures?: number
  boundRendertarget?: WebGLFramebuffer
  unifs?: Record<any, any>

  envMap?: GLEnvMap
  exposure?: number
  gamma?: number

  viewXfo?: Xfo
  viewScale?: number
  region?: any[]
  cameraMatrix?: Mat4
  depthRange?: Reocrd<any, any>
}

interface viewport {
  region?: any
  viewMatrix?: Mat4
  projectionMatrix?: Mat4
  viewportFrustumSize?: Vec2
  isOrthographic?: boolean
  fovY?: number
}
