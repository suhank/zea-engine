interface RenderState {
  gl?: WebGL12RenderingContext
  glShader?: GLShader
  shaderkey?: string
  shaderopts: Record<any, any>
  attrs: Record<any, any>
  unifs: Record<any, any>
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
  viewport?: any // Viewport
  viewports?: any //Array<Viewport>

  bindViewports?: any
  bindRendererUnifs?: any
  boundTextures: number
  boundRendertarget: WebGLFramebuffer | null

  envMap?: GLEnvMap
  exposure: number
  gamma: number

  viewXfo?: Xfo
  viewScale: number
  region?: any[]
  cameraMatrix?: Mat4
  depthRange?: Record<any, any>
}

interface Viewport {
  region?: any
  viewMatrix?: Mat4
  projectionMatrix?: Mat4
  viewportFrustumSize?: Vec2
  isOrthographic?: boolean
  fovY?: number
}
