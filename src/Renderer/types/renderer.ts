import { Mat4 } from '../../Math/Mat4'
import { Vec2 } from '../../Math/Vec2'
import { Xfo } from '../../Math/Xfo'
import { GLGeom } from '../Drawing/GLGeom'
import { GLBaseViewport } from '../GLBaseViewport'
import { GLEnvMap } from '../GLEnvMap'
import { GLFbo } from '../GLFbo'
import { GLShader } from '../GLShader'
import { GLViewport } from '../GLViewport'
import { WebGL12RenderingContext } from './webgl'

export interface BaseRenderState {
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

  bindViewports(unifs: Uniforms, cb: any): void
  bindRendererUnifs(unifs: Uniforms): void

  boundTextures: number
  boundRendertarget: WebGLFramebuffer | null

  viewXfo?: Xfo
  viewScale: number
  region?: number[]
  cameraMatrix?: Mat4
}

export type Shaderopts = Record<string, string[]>

//GeomDataRender
export interface GeomDataRenderState extends BaseRenderState {
  geomDataFbo?: GLFbo // only used in geomdata buffer rendering
  floatGeomBuffer: boolean
  occlusionCulling: number
}

// only used in color rendering
export interface ColorRenderState extends BaseRenderState {
  envMap?: GLEnvMap

  exposure: number // must initialize these
  gamma: number
}

export type RenderState = BaseRenderState | GeomDataRenderState | ColorRenderState

export interface Viewport {
  region?: number[]
  viewMatrix?: Mat4
  projectionMatrix?: Mat4
  viewportFrustumSize?: Vec2
  isOrthographic?: boolean
  fovY?: number
}

export type Uniforms = Record<string, Uniform>
export interface Uniform {
  name: string
  location: number
  type: string
}
export interface Attribute {
  type: string
  instanced: boolean
}
export interface ShaderParseResult {
  glsl: string
  numLines: number
  uniforms: Record<string, string>
  attributes: Record<string, Attribute>
}
export interface AttrBuffer {
  values: Float32Array
  count: number
  dimension: number
  normalized: boolean
  dataType: string
}

export interface LayoutItem {
  pos: Vec2
  size: Vec2
}

export interface Bindings {
  textureTypeUnif: WebGLUniformLocation
}

export type JSON = Record<string, any>
