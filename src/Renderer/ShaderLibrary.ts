import { Material } from '../SceneTree'
import { glslTypes } from './GLSLConstants'

let GlslTypes = <GLSLTypes>glslTypes

interface GLSLTypes {
  [key: string]: string // TODO: make a new type from glsl types
}

/*
  regex variables
*/
const WHITESPACE_RE = /\s+/

/** Class representing a shader library.
 * @private
 */
class ShaderLibrary {
  __shaderModules: Record<string, string>
  materialTemplates: Record<string, Material>

  /**
   * Create a shader library.
   */
  constructor() {
    this.__shaderModules = {}
    this.materialTemplates = {}
  }

  /**
   * The setShaderModule method. Shader must be set before parsing.
   * @param {string} shaderName - The shader name.
   * @param {string} shader - The unparsed shader GLSL.
   */
  setShaderModule(shaderName: string, shader: string) {
    if (!(shaderName in this.__shaderModules)) {
      this.__shaderModules[shaderName] = shader
      return
    }
    // note: this code does not update shader snippets, whatever is first, stays.
    // important for creating tests, since shaderLibrary is global.
  }

  /**
   * The getShaderModule method. Access specific uniforms, attributes of a particular module.
   * @param {string} shaderName - The shader name.
   * @return {any} - The return value.
   */
  getShaderModule(shaderName: string) {
    return this.__shaderModules[shaderName]
  }

  /**
   * The getShaderModuleNames method.
   * @return {array} - The return value.
   */
  getShaderModuleNames() {
    const shaderNames = []
    // eslint-disable-next-line guard-for-in
    for (const shaderName in this.__shaderModules) shaderNames.push(shaderName)
    return shaderNames
  }

  /**
   * The parseAttr
   * @param {string} parts - parts
   * @param {bool} instanced - instanced
   * @param {object} result - result object to store parsed data
   */
  parseAttr(parts: string[], instanced: boolean, result: ShaderParseResult, line: string) {
    // see if type is valid
    if (!(parts[1] in GlslTypes)) {
      throw new Error('Error while parsing \nType not recognized:' + parts[1])
    }

    const name = parts[2].slice(0, parts[2].length - 1)
    result.attributes[name] = {
      type: GlslTypes[parts[1]],
      instanced: instanced,
    }

    // console.log('attributes:' + name + ":" + parts[1]);
    if (parts[1] == 'color') {
      parts[1] = 'vec4'
      line = parts.join(' ')
    }
  }

  /**
   * The handleImport method -- takes the includeFile and if it exists, adds the parsed glsl, uniforms, and attributes to the result, recursively.
   * @param {object} result - result object that stores the glsl, attribute, uniform
   * @param {string} shaderName - shaderName
   * @param {string} includeFile - file name of the shader snippet/module
   * @param {array} includes - keep track of what was included
   * @param {number} lineNumber - keep track of what line we're on
   */
  handleImport(
    result: ShaderParseResult,
    shaderName: string,
    includeFile: string,
    includes: string[],
    lineNumber: number
  ) {
    if (includeFile in this.__shaderModules) {
      const includedGLSL = this.__shaderModules[includeFile] // get glsl snippet code to add
      if (!includedGLSL) throw Error('snippet not loaded or does not exists!')

      // recursively includes glsl snippets
      const reursiveResult = this.parseShaderHelper(shaderName, includedGLSL, includes, lineNumber)

      // adding code + snippet glsl, if not already added.
      includes.push(includeFile) // keep track of imports
      result.glsl = result.glsl + reursiveResult.glsl
      result.numLines += reursiveResult.numLines
      result.uniforms = {
        ...result.uniforms,
        ...reursiveResult.uniforms,
      }
      result.attributes = {
        ...result.attributes,
        ...reursiveResult.attributes,
      }

      // console.log('\n glsl snippet: ' + reursiveResult.glsl) // print out snippets
    } else {
      // throw new Error(shaderName + ': SNIPPET NOT FOUND: ' + includeFile)
      console.log('shaderName: ' + shaderName)
      console.log('SNIPPET NOT FOUND: ' + includeFile)
    }
  }

  /**
   * The parseShader method.
   * @param {string} shaderName - The shader name.
   * @param {string} glsl - The glsl param.
   * @return {object} - returns the 'result' object
   */
  parseShader(shaderName: string, glsl: string) {
    return this.parseShaderHelper(shaderName, glsl, [], 0)
  }

  /**
   * The parseShader recursive helper method
   * @param {string} shaderName - The shader name.
   * @param {string} glsl - The glsl param.
   * @param {array} includes - keep track of what was included
   * @param {int} lineNumber - keep track of what line we're on
   * @return {object} - The return value.
   */
  parseShaderHelper(shaderName: string, glsl: string, includes: string[], lineNumber: number) {
    // console.log('parseShader:' + shaderName)
    const addLine = (result: ShaderParseResult, line: string) => {
      result.glsl = result.glsl + line + '\n'
      result.numLines++
    }

    includes.push(shaderName)
    // result that is returned
    const result: ShaderParseResult = {
      glsl: '',
      numLines: 0,
      uniforms: {},
      attributes: {},
    }

    // go through each line of a GLSL file
    glsl = glsl.toString() // TODO: remove ideally, this cast is here just to make jest pass
    const lines = glsl.split('\n') // break up code by newlines

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i]
      const trimmedLine = line.trim()

      // Get first token of a statement and switch
      const parts = trimmedLine.split(WHITESPACE_RE)
      const firstToken = parts[0]
      switch (firstToken) {
        // TODO: deprecated - remove eventually
        case '<%include':
        case 'import': {
          // get the contents between quotes and then if there are '/' get the filename
          const includeFile: string = <string>trimmedLine.split(/'|"|`/)[1].split('/').pop() // can be undefined
          if (!includes.includes(includeFile)) {
            this.handleImport(result, shaderName, includeFile, includes, lineNumber)
          } else {
            // console.log(shaderName + ' already imported: ' + includeFile)
          }

          break
        }
        case 'attribute': {
          this.parseAttr(parts, false, result, line)
          addLine(result, line)
          break
        }
        case 'instancedattribute': {
          this.parseAttr(parts, true, result, line)
          parts[0] = 'attribute'
          line = parts.join(' ')
          addLine(result, line)
          break
        }
        case 'uniform': {
          // When a precision qualifier exists in the uniform definition.
          // e.g. uniform highp int instancesTextureSize;
          let typeIndex = 1
          if (parts.length == 4) typeIndex = 2
          const typeName = parts[typeIndex]

          if (!(typeName in GlslTypes))
            throw new Error('Error while parsing :' + shaderName + ' \nType not recognized:' + parts[1])
          const name = parts[typeIndex + 1].slice(0, parts[typeIndex + 1].length - 1)

          if (name.includes('[')) {
            // Strip off the square brackets.
            result.uniforms[name.substring(0, name.indexOf('['))] = GlslTypes[typeName]
          } else {
            result.uniforms[name] = GlslTypes[typeName]
          }

          if (result.uniforms[name] == 'struct') {
            console.log(parts)
          }
          if (parts[1] == 'color') {
            parts[1] = 'vec4'
            line = parts.join(' ')
          }

          addLine(result, line)
          break
        }
        // TODO: structs disabled in ts-migration
        // case 'struct': {
        //   let membersStr = ''
        //   if (trimmedLine.includes('}')) {
        //     membersStr = trimmedLine.substring(trimmedLine.indexOf('{') + 1, trimmedLine.indexOf('}') - 1)
        //   } else {
        //     i++
        //     while (true) {
        //       line += lines[i] + '\n'
        //       membersStr += line.trim()
        //       i++
        //       if (membersStr.includes('}')) break
        //     }
        //   }
        //   const structMembers = membersStr.substring(membersStr.indexOf('{') + 1, membersStr.indexOf('}') - 1)
        //   const members = structMembers.split(';')
        //   const structDesc = []
        //   for (const member of members) {
        //     if (member.length == 0) continue
        //     const memberparts = member.trim().split(WHITESPACE_RE)
        //     structDesc.push({
        //       name: memberparts[1],
        //       type: GlslTypes[memberparts[0]],
        //     })
        //   }
        //   GlslTypes[parts[1]] = structDesc
        //   addLine(result, line)
        //   break
        // }
        default: {
          // all other statements
          addLine(result, line)
          break
        }
      } // end of switch
    } // end of forloop

    // console.log('length of shader: ' + result.numLines)
    // console.log(result.glsl)
    return result
  }

  registerMaterialTemplate(shaderName: string, materialTemplate: any) {
    this.materialTemplates[shaderName] = materialTemplate
  }

  getMaterialTemplate(shaderName: string) {
    return this.materialTemplates[shaderName]
  }
}

const shaderLibrary = new ShaderLibrary()
export { shaderLibrary }
