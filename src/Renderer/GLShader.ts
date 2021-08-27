/* eslint-disable valid-jsdoc */
/* eslint-disable guard-for-in */
import { AnyARecord } from 'dns'
import { BaseItem, Material } from '../SceneTree'
import { StringFunctions } from '../Utilities/StringFunctions'
import { shaderLibrary } from './ShaderLibrary'

// interface Result {
//   attrs: Record<string, any>
//   unifs: Record<string, any>
//   shaderHdls: any
//   shaderProgramHdl: any
// }
// Every instance of every shader should have a unique id.
// This is so that we can uniquely identify the bound shader during
// rendering. Materials and geometries cache bindings to shaders.
// And need the id to be unique. (Note: we used to use the constructor.name
// which was only unique if the same shader was constructed once, and
// never unique in release mode after the port to Rollup)
let shaderInstanceId = 0

/** Class representing a GL shader.
 * @extends BaseItem
 * @private
 */
class GLShader extends BaseItem {
  protected __gl: WebGL12RenderingContext
  protected __shaderStagesGLSL: Record<string, string>
  protected __shaderStages: Record<string, ShaderParseResult>
  protected __shaderProgramHdls: Record<string, any>
  protected __gltextures: Record<string, any>
  //protected __id: number

  protected __shaderCompilationAttempted!: boolean
  /**
   * Create a GL shader.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   */
  constructor(gl?: WebGL12RenderingContext, name?: string) {
    super(name)
    this.__gl = gl
    this.__shaderStagesGLSL = {}
    this.__shaderStages = {}

    this.__shaderProgramHdls = {}
    this.__gltextures = {}

    this.__id = shaderInstanceId++
  }

  /**
   * Sets the GL context to the shader.
   * > Note: normally the context should be passed to the constructor. This method us used when using the Registry to construct shaders.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   */
  setGLContext(gl: WebGL12RenderingContext) {
    this.__gl = gl
  }

  /**
   * Sets the GLSL code for a given shader stage.
   * @param {string} stageName - The name of the stage. currently only 'VERTEX_SHADER' or 'FRAGMENT_SHADER' are supported.
   * @param {string} glsl - The GLSL code for the shader stage.
   */
  setShaderStage(stageName: string, glsl: string) {
    this.__shaderStagesGLSL[stageName] = glsl
    this.clearProgramsCache()
  }

  /**
   * Gets the GLSL code for a given shader stage.
   * @param {string} stageName - The name of the stage. currently only 'VERTEX_SHADER' or 'FRAGMENT_SHADER' are supported.
   * @return {string} - The GLSL code for the shader stage.
   */
  getShaderStage(stageName: string) {
    return this.__shaderStagesGLSL[stageName]
  }

  /**
   * Clears all cached shader compilations for this shader.
   */
  clearProgramsCache() {
    const gl = this.__gl
    for (const shaderProgramkey in this.__shaderProgramHdls) {
      const shaderCompilationResult = this.__shaderProgramHdls[shaderProgramkey]

      for (const shaderKey in shaderCompilationResult.shaderHdls) {
        gl.deleteShader(shaderCompilationResult.shaderHdls[shaderKey])
      }

      gl.deleteProgram(shaderCompilationResult.shaderProgramHdl)
    }
  }

  /**
   * The isTransparent method.
   * @return {boolean} - The return value.
   */
  static isTransparent() {
    return false
  }

  /**
   * The isOverlay method.
   * @return {boolean} - The return value.
   */
  static isOverlay() {
    return false
  }

  // /////////////////////////////////
  // Compilation

  /**
   * The __compileShaderStage method.
   * @param {string} glsl - The glsl value.
   * @param {string} stageID - The stageID value.
   * @param {string} name - The name value.
   * @param {Shaderopts} shaderopts - The shaderopts value.
   * @return {WebGLShader} - The return value.
   * @private
   */
  __compileShaderStage(glsl: string, stageID: number, name: string, shaderopts: Shaderopts) {
    const gl = this.__gl

    // console.log("__compileShaderStage:" + this.name+"."+name + " glsl:\n" + glsl);
    if (!shaderopts) shaderopts = gl.shaderopts // TODO: shaderopts doesn't exist on gl
    if (shaderopts) {
      if (shaderopts.repl) {
        for (const key in shaderopts.repl) glsl = StringFunctions.replaceAll(glsl, key, shaderopts.repl[key])
      }
      if (shaderopts.directives) {
        const defines = shaderopts.directives.join('\n') + '\n'
        glsl = defines + glsl
      }
    }

    let prefix
    if (gl.name == 'webgl2') {
      glsl = StringFunctions.replaceAll(glsl, 'attribute', 'in')
      if (name == 'vertexShader') glsl = StringFunctions.replaceAll(glsl, 'varying', 'out')
      else glsl = StringFunctions.replaceAll(glsl, 'varying', 'in')
      glsl = StringFunctions.replaceAll(glsl, 'texture2D', 'texture')

      prefix = '#version 300 es\n'
      glsl = prefix + glsl
    }

    const shaderHdl = gl.createShader(stageID)
    if (!shaderHdl) throw Error('shaderHdl not defined')
    gl.shaderSource(shaderHdl, glsl)

    // Compile the shader program.
    gl.compileShader(shaderHdl)

    // See if it compiled successfully
    if (!gl.getShaderParameter(shaderHdl, gl.COMPILE_STATUS)) {
      console.log('Errors in :' + this.constructor.name)
      const errors: Record<string, any> = (<string>gl.getShaderInfoLog(shaderHdl)).split('\n')
      const errorLines: Record<string, any> = {}
      for (let i = 0; i < errors.length; i++) {
        if (errors[i].startsWith("'")) {
          errors[i - 1] = errors[i - 1] + errors[i]
          delete errors[i]
          i--
          continue
        }
        const parts = errors[i].split(':')
        if (parts.length >= 2) {
          const lineNum = parseInt(parts[2]) // TODO check against ATI and intel cards
          if (!isNaN(lineNum)) {
            if (errorLines[lineNum]) errorLines[lineNum].push(errors[i])
            else errorLines[lineNum] = [errors[i]]
          }
        }
      }
      const numberedLinesWithErrors = []
      const lines = glsl.split('\n')
      for (const key in errorLines) {
        const lineNumber = Number.parseInt(key) - 1
        for (let i = Math.max(0, lineNumber - 4); i < lineNumber; i++)
          numberedLinesWithErrors.push((lineNumber + 1 + ' ').padStart(3) + lines[i])
        numberedLinesWithErrors.push((lineNumber + 1 + '>').padStart(3) + lines[lineNumber])
        for (let i = lineNumber + 1; i < Math.min(lines.length - 1, lineNumber + 5); i++)
          numberedLinesWithErrors.push((lineNumber + 1 + ' ').padStart(3) + lines[i])
        const errors = errorLines[key]
        for (const error of errors) {
          numberedLinesWithErrors.push(error)
        }
      }

      // throw("An error occurred compiling the shader \n\n" + numberedLinesWithErrors.join('\n') + "\n\n=================\n" + this.constructor.name + "." + name + ": \n\n" + errors.join('\n'));
      throw new Error(
        'An error occurred compiling the shader \n=================\n' +
          this.constructor.name +
          '.' +
          name +
          ': \n\n' +
          numberedLinesWithErrors.join('\n')
      )
      return null
    }
    return shaderHdl
  }

  /**
   * The __createProgram method.
   * @param {Shaderopts} shaderopts - The shaderopts value.
   * @return {WebGLProgram} - The program value.
   * @private
   */
  __createProgram(shaderopts: Record<string, any>) {
    const gl = this.__gl
    this.__shaderCompilationAttempted = true
    const shaderProgramHdl = gl.createProgram()
    if (!shaderProgramHdl) throw Error('shaderProgramHdl not defined')
    const shaderHdls: Record<string, WebGLShader> = {}

    if (!this.__shaderStages['VERTEX_SHADER']) {
      // preprocess the GLSL, including all shader snippets
      this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader(
        'VERTEX_SHADER',
        this.__shaderStagesGLSL['VERTEX_SHADER']
      )
    }

    const vertexShaderGLSL = this.__shaderStages['VERTEX_SHADER'].glsl
    if (vertexShaderGLSL != undefined) {
      const vertexShader = this.__compileShaderStage(vertexShaderGLSL, gl.VERTEX_SHADER, 'vertexShader', shaderopts)
      if (!vertexShader) {
        return false
      }
      gl.attachShader(shaderProgramHdl, vertexShader)
      shaderHdls[gl.VERTEX_SHADER] = vertexShader
    }

    if (!this.__shaderStages['FRAGMENT_SHADER']) {
      // preprocess the GLSL, including all shader snippets
      this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader(
        'FRAGMENT_SHADER',
        this.__shaderStagesGLSL['FRAGMENT_SHADER']
      )
    }

    const fragmentShaderGLSL = this.__shaderStages['FRAGMENT_SHADER'].glsl
    if (fragmentShaderGLSL != undefined) {
      const fragshaderopts = Object.assign({}, gl.shaderopts, shaderopts)
      if (fragshaderopts.frag) fragshaderopts.defines = fragshaderopts.frag.defines + fragshaderopts.defines
      const fragmentShader = this.__compileShaderStage(
        fragmentShaderGLSL,
        gl.FRAGMENT_SHADER,
        'fragmentShader',
        fragshaderopts
      )
      if (!fragmentShader) {
        return false
      }
      gl.attachShader(shaderProgramHdl, fragmentShader)
      shaderHdls[gl.FRAGMENT_SHADER] = fragmentShader
    }
    gl.linkProgram(shaderProgramHdl)

    if (!gl.getProgramParameter(shaderProgramHdl, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(shaderProgramHdl)
      if (!info) throw Error('info not defined')
      if (info.includes('D3D shader compilation failed')) {
        // Usefull for debugging very nasty compiler errors generated only in the ANGL layer.
        const debugExt = gl.getExtension('WEBGL_debug_shaders')
        if (debugExt) {
          const hlsl = debugExt.getTranslatedShaderSource(shaderHdls[gl.VERTEX_SHADER])
          console.log(hlsl)
        }
      }

      console.log('vertexShaderGLSL:' + vertexShaderGLSL)
      console.log('fragmentShaderGLSL:' + fragmentShaderGLSL)
      throw new Error('Unable to link the shader program:' + this.constructor.name + '\n==================\n' + info)

      gl.deleteProgram(shaderProgramHdl)
      return false
    }

    const result = this.__extractAttributeAndUniformLocations(shaderProgramHdl, shaderopts)
    result.shaderHdls = shaderHdls
    result.shaderProgramHdl = shaderProgramHdl
    return result
  }

  /**
   * The __extractAttributeAndUniformLocations method.
   * @param {WebGLProgram} shaderProgramHdl - The shaderProgramHdl value.
   * @param {Shaderopts} shaderopts - The shaderopts value.
   * @return {Shaderopts} - The dictionary of attributes and uniform values
   * @private
   */
  __extractAttributeAndUniformLocations(shaderProgramHdl: WebGLProgram, shaderopts: Shaderopts) {
    const gl = this.__gl
    const attrs: Record<string, any> = this.getAttributes()
    const result: Record<string, any> = {
      attrs: {},
      unifs: {},
    }
    for (const attrName in attrs) {
      const location = gl.getAttribLocation(shaderProgramHdl, attrName)
      if (location == undefined) {
        console.warn('Shader attribute not found:' + attrName)
        continue
      }
      const attrDesc: Record<string, any> = attrs[attrName]
      result.attrs[attrName] = {
        name: attrName,
        location: location,
        type: attrDesc.type,
        instanced: attrDesc.instanced,
      }
    }
    const unifs: Record<string, string> = this.getUniforms() // TODO: refactor type in fn()
    for (let uniformName in unifs) {
      const unifType = unifs[uniformName]
      // TODO: array uniform disabled during ts-migration
      // if (unifType instanceof Array) {
      //   for (const member of unifType) {
      //     const structMemberName = uniformName + '.' + member.name
      //     const location = gl.getUniformLocation(shaderProgramHdl, structMemberName)
      //     if (location == undefined) {
      //       // console.warn(this.constructor.name + " uniform found in shader code but not in compiled program:" + uniformName);
      //       continue
      //     }
      //     result.unifs[structMemberName] = {
      //       name: structMemberName,
      //       location: location,
      //       type: member.type,
      //     }
      //   }
      // }
      if (shaderopts) {
        if (shaderopts.repl) {
          for (const key in shaderopts.repl) uniformName = uniformName.replace(key, shaderopts.repl[key])
        }
      }

      const location = gl.getUniformLocation(shaderProgramHdl, uniformName)
      if (location == undefined) {
        // console.warn(this.constructor.name + " uniform found in shader code but not in compiled program:" + uniformName);
        continue
      }
      result.unifs[uniformName] = {
        name: uniformName,
        location: location,
        type: unifType,
      }
    }
    return result
  }

  /**
   * The getAttributes method.
   * @return {object} - The dictionary of attributes that this shader expects to be bound.
   */
  getAttributes() {
    const attributes: Record<string, any> = {}
    for (const stageName in this.__shaderStages) {
      const shaderStageBlock = this.__shaderStages[stageName]
      for (const attrName in shaderStageBlock['attributes'])
        attributes[attrName] = shaderStageBlock['attributes'][attrName]
    }
    return attributes
  }

  /**
   * The getUniforms method.
   * @return {object} - The dictionary of uniforms that this shader expects to be bound.
   */
  getUniforms(): Record<string, string> {
    const uniforms: Record<string, string> = {}
    for (const stageName in this.__shaderStages) {
      const shaderStageBlock = this.__shaderStages[stageName]
      for (const unifName in shaderStageBlock['uniforms']) uniforms[unifName] = shaderStageBlock['uniforms'][unifName]
    }
    return uniforms
  }

  /**
   * Checks to see if the engine is compiled for the target specified by the key
   * @param {string} key - The key value.
   * @return {boolean} - The return value.
   */
  isCompiledForTarget(key: string) {
    const shaderkey = key ? key : this.getId()
    return this.__shaderProgramHdls[shaderkey] != undefined
  }

  /**
   * The compileForTarget method.
   * @param {string} key - The key value.
   * @param {Shaderopts} shaderopts - The shaderopts value.
   * @return {Record<string, any>} - The result of the shader compilation.
   */
  compileForTarget(key?: string, shaderopts?: Shaderopts): Record<string, any> {
    const shaderkey = key ? key : this.getId()
    let shaderCompilationResult = this.__shaderProgramHdls[shaderkey]
    if (!shaderCompilationResult) {
      if (shaderCompilationResult !== false) {
        // && shaderopts
        shaderCompilationResult = this.__createProgram(shaderopts)
        shaderCompilationResult.shaderkey = shaderkey
        this.__shaderProgramHdls[shaderkey] = shaderCompilationResult
      }
    }
    return shaderCompilationResult
  }

  /**
   * The compile method.
   */
  compile() {
    this.compileForTarget()
  }

  /**
   * The bind method.
   * @param {RednerState} renderstate - The object tracking the current state of the renderer
   * @param {string} key - The key value.
   * @return {boolean} - The return value.
   */
  bind(renderstate: RenderState, key?: string) {
    const gl = this.__gl

    if (renderstate.glShader != this) {
      const shaderCompilationResult = this.compileForTarget(key, renderstate.shaderopts)
      if (shaderCompilationResult === {}) {
        // TODO: compileForTarget should return null or empty
        console.warn(this.constructor.name + ' is not compiled for ' + key)
        return false
      }

      const shaderProgramHdl = shaderCompilationResult.shaderProgramHdl

      gl.useProgram(shaderProgramHdl)
      renderstate.glShader = this
      renderstate.shaderkey = shaderCompilationResult.shaderkey
      renderstate.unifs = shaderCompilationResult.unifs
      renderstate.attrs = shaderCompilationResult.attrs

      renderstate.boundTextures = 0
      // Make sure we clear the binding cached.
      renderstate.glGeom = undefined

      // Once the shader has been bound, we allow the renderer to bind any
      // of its global uniform values. (e.g. env map values etc...)
      if (renderstate.bindRendererUnifs) renderstate.bindRendererUnifs(shaderCompilationResult.unifs)
    }

    renderstate.supportsInstancing = true

    return true
  }

  /**
   * The unbind method.
   * @param {RenderState}} renderstate - The object tracking the current state of the renderer
   * @return {boolean} - The return value.
   */
  unbind(renderstate: RenderState) {
    renderstate.glShader = null
    renderstate.shaderkey = ''
    renderstate.unifs = {}
    renderstate.attrs = {}
    return true
  }

  // /////////////////////////////
  // Parameters

  /**

  /**
   * Returns the parameters that this shader expects to be provided by the material.
   * Note: the Material method setShaderName will retrieve these parameter declarations
   * to initialize and configure the parameters for the Material instance.
   * @return {array} - an array of param declarations that the shader expects the material tp provide.
   */
  static getParamDeclarations(): any[] {
    return []
  }

  /**
   * The getGeomDataShaderName method.
   * @return {string} - an array of param declarations that the shader expects the material tp provide.
   */
  getGeomDataShaderName(): string {
    return ''
  }

  /**
   * The getSelectedShaderName method.
   */
  getSelectedShaderName() {
    return ''
  }

  /**
   * The supportsInstancing method.
   * @return {boolean} - return false for shaders that cannot be rendered in instanced mode.
   */
  static supportsInstancing(): boolean {
    return true
  }

  /**
   * The getPackedMaterialData method.
   * @param {Material} material - The material param.
   * @return {Float32Array} - The return value.
   */
  static getPackedMaterialData(material: Material): Float32Array {
    const matData = new Float32Array(4)
    return matData
  }

  // /////////////////////////////////
  // Destroy

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    const gl = this.__gl
    // eslint-disable-next-line guard-for-in
    for (const key in this.__shaderProgramHdls) {
      const shaderCompilationResult = this.__shaderProgramHdls[key]
      gl.deleteProgram(shaderCompilationResult.shaderProgramHdl)
    }
    this.__shaderProgramHdls = {}
  }
}

export { GLShader }
