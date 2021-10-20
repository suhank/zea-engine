interface BaseRenderState {
  gl?: WebGL12RenderingContext
  glShader?: GLShader
  shaderkey?: string
  shaderopts: Shaderopts
  attrs: Record<string, Record<string, any>> // not Attribute
  unifs: Uniforms
  directives?: string[]

  drawItemsTexture?: any

  glGeom?: GLGeom

  vrviewport?: any

  passIndex: number
  pass?: string

  vrPresenting?: boolean
  supportsInstancing?: boolean
  viewport?: GLBaseViewport // Viewport
  viewports?: any //Array<Viewport>

  bindViewports(unifs: Uniforms, cb: function): function
  bindRendererUnifs(unifs: Uniforms): function // TODO:

  boundTextures: number
  boundRendertarget: WebGLFramebuffer | null

  viewXfo?: Xfo
  viewScale: number
  region?: number[4]
  cameraMatrix?: Mat4
}

type Shaderopts = Record<string, string[]>

//GeomDataRender
interface GeomDataRenderState extends BaseRenderState {
  geomDataFbo?: GLFbo // only used in geomdata buffer rendering
  floatGeomBuffer: boolean = true
}

// only used in color rendering
interface ColorRenderState extends BaseRenderState {
  envMap?: GLEnvMap

  exposure: number // must initialize these
  gamma: number
}

type RenderState = BaseRenderState | GeomDataRenderState | ColorRenderState

interface Viewport {
  region?: number[]
  viewMatrix?: Mat4
  projectionMatrix?: Mat4
  viewportFrustumSize?: Vec2
  isOrthographic?: boolean
  fovY?: number
}

type Uniforms = Record<string, Uniform>
interface Uniform {
  name: string
  location: number
  type: string
}
interface Attribute {
  type: string
  instanced: boolean
}
interface ShaderParseResult {
  glsl: string
  numLines: number
  uniforms: Record<string, string>
  attributes: Record<string, Attribute>
}
interface attrBuffer {
  values: any
  count: number
  dimension: any
  normalized: boolean
  dataType: string
}

interface LayoutItem {
  pos: Vec2
  size: Vec2
}

interface Bindings {
  textureTypeUnif: WebGLUniformLocation
}

interface Options {
  antialias: boolean
  depth: boolean
  stencil: boolean
  alpha: boolean
  disableMultiDraw: boolean
  webglContextType: string
  powerPreference: string
  preserveDrawingBuffer: boolean
  xrCompatible: boolean
  supportXR: boolean
  debugGeomIds: boolean
}

type JSON = Record<string, any>

interface RayCast {
  ray: Ray
  intersectionPos: Vec3
  geomItem: any
  dist: any
  geomData: Float32Array
}
