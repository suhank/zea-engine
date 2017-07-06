
import {
    hashStr
} from '../Math';
import { glslTypes } from './GLSLConstants.js';

class ShaderLibrary {
    constructor() {
        this.__shaderModules = {};
        this.__hashToName = {};
    }

    hasShaderModule(shaderName) {
        return shaderName in this.__shaderModules;
    }

    setShaderModule(shaderName, shader) {
        // console.log("setShaderModule:" + shaderName);
        return this.parseShader(shaderName, shader);
    }

    getShaderModule(shaderName) {
        return this.__shaderModules[shaderName];
    }

    getShaderModuleNames() {
        let shaderNames = [];
        for (let shaderName in this.__shaderModules)
            shaderNames.push(shaderName);
        return shaderNames;
    }

    parseShader(shaderName, glsl) {

        let parsePath = (path) => {
            // An absolute path
            if (path.startsWith('..')) {
                let parentFolder = fileFolder.substring(0, fileFolder.lastIndexOf("/"));
                return parentFolder + path.substring(2);
            } else if (path.startsWith('.'))
                return fileFolder + path.substring(1);
            else if (path.startsWith('/'))
                return path.substring(1);
            else
                return path;
        }


        // console.log("parseShader:" + shaderName);
        let shaderNameHash = hashStr(shaderName);
        let fileFolder = shaderName.substring(0, shaderName.lastIndexOf("/"));
        let lines = glsl.split('\n');

        let result = {
            glsl: "#line 0 " + shaderNameHash + " //starting:" + shaderName +"\n",
            lines: lines,
            numLines: 0,
            includeMetaData: [],
            uniforms: {},
            attributes: {}
        };

        let WHITESPACE_RE = /\s+/;
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            let trimmedline = line.trim();

            if (trimmedline.startsWith('<%') || trimmedline.startsWith('</%')) {

                let parseTag = function(line) {
                    if (line.startsWith('</%'))
                        line = line.slice(3);
                    else
                        line = line.slice(2);
                    if (line.endsWith('/>'))
                        line = line.slice(0, line.length - 2);
                    else
                        line = line.slice(0, line.length - 1);
                    let parts = line.split(WHITESPACE_RE);
                    let tag = parts.shift();
                    let result = {
                        tag: tag,
                        attributes: {}
                    };
                    for (let attr of parts) {
                        let pairs = attr.split('=');
                        result.attributes[pairs[0]] = pairs[1].replace(/['"]+/g, '');
                    }
                    return result;
                };

                let elements = parseTag(lines[i].trim());
                switch (elements.tag) {
                    case 'include':
                        {
                            let includeFile = parsePath(elements.attributes.file);
                            if (!this.hasShaderModule(includeFile)) {
                                throw ("Error while parsing :" + shaderName + " \nShader module not found:" + includeFile + "\n in:" + this.getShaderModuleNames());
                            }


                            let shaderModule = this.getShaderModule(includeFile);

                            let includedModuleHash = hashStr(elements.attributes.file);
                            let includedGLSL = shaderModule.glsl;

                            // Remove the first line of GLSL, and replace it with the line tag.
                            includedGLSL = includedGLSL.substring(includedGLSL.indexOf('\n')+1);
                            result.glsl = result.glsl + "#line 0 " + includedModuleHash + " //including:" + elements.attributes.file +"\n";

                            let repl = {};
                            for(let key in elements.attributes){
                                if(key == 'file')
                                    continue;
                                let value = elements.attributes[key];
                                includedGLSL = includedGLSL.replaceAll(key, value);
                                repl[key] = value;
                            }

                            result.glsl = result.glsl + includedGLSL;
                            result.includeMetaData.push({ src: result.numLines, tgt: i, length:shaderModule.numLines, key: includeFile });

                            // Add line number tag to GLSL so that the GLSL error messages have the correct file name and line number.
                            result.glsl = result.glsl + "#line " + (i-result.includeMetaData.length) + " " + shaderNameHash + " //continuing:" + shaderName +"\n";
                            result.numLines += shaderModule.numLines + 1;

                            for (let name in shaderModule.attributes) {
                                let newname = name;
                                for(let key in repl)
                                    newname = newname.replaceAll(key, repl[key]);
                                result.attributes[newname] = shaderModule.attributes[name];
                            }
                            for (let name in shaderModule.uniforms) {
                                let newname = name;
                                for(let key in repl)
                                    newname = newname.replaceAll(key, repl[key]);
                                result.uniforms[newname] = shaderModule.uniforms[name];
                            }

                            break;
                        }
                    default:
                        {
                            console.warn("Error while parsing :" + shaderName + " \nUnhandled line:" + line);
                            continue;
                        }
                }
            } else {
                let parseAttr= (parts, instanced)=>{
                    if (!(parts[1] in glslTypes))
                        throw ("Error while parsing :" + shaderName + " \nType not recognized:" + parts[1]);
                    let name = parts[2].slice(0, parts[2].length - 1);
                    result.attributes[name] = {
                        type: glslTypes[parts[1]],
                        instanced: instanced
                    } 
                    // console.log('attributes:' + name + ":" + parts[1]);

                    if (parts[1] == 'color') {
                        parts[1] = 'vec4';
                        line = parts.join(' ');
                    }
                }
                if (trimmedline.startsWith('struct')) {
                    if(trimmedline.indexOf('}') == -1){
                        i++;
                        while(true){
                            line += lines[i];
                            i++;
                            if(line.indexOf('}') != -1)
                                break;
                        }
                    }
                    let structMembers = line.substring(line.indexOf('{')+1, line.indexOf('}')-1);
                    let members = structMembers.split(';');
                    let structDesc = [];
                    for(let member of members){
                        if(member.length == 0)
                            continue;
                        let memberparts = member.trim().split(WHITESPACE_RE);
                        structDesc.push({ 'name': memberparts[1], 'type': glslTypes[memberparts[0]] });
                    }
                    let parts = trimmedline.split(WHITESPACE_RE);
                    glslTypes[parts[1]] = structDesc;
                } if (trimmedline.startsWith('attribute')) {
                    let parts = trimmedline.split(WHITESPACE_RE);
                    parseAttr(parts, false);
                } if (trimmedline.startsWith('instancedattribute')) {
                    let parts = trimmedline.split(WHITESPACE_RE);
                    parseAttr(parts, true);
                    parts[0] = 'attribute';
                    line = parts.join(' ');
                } else if (trimmedline.startsWith('uniform')) {
                    let parts = trimmedline.split(WHITESPACE_RE);
                    if (!(parts[1] in glslTypes))
                        throw ("Error while parsing :" + shaderName + " \nType not recognized:" + parts[1]);
                    let name = parts[2].slice(0, parts[2].length - 1);
                    result.uniforms[name] = glslTypes[parts[1]];
                    // console.log('uniform:' + name + ":" + parts[1]);

                    if (result.uniforms[name] == 'struct') {
                        console.log(parts);
                    }
                    if (parts[1] == 'color') {
                        parts[1] = 'vec4';
                        line = parts.join(' ');
                    }
                }

                result.glsl = result.glsl + line + '\n';
                result.numLines++;
            }
        }

        this.__hashToName[shaderNameHash] = shaderName;
        this.__shaderModules[shaderName] = result;

        return result;
    }

    getLine(shaderName, lineNum) {
        let shaderModule = this.getShaderModule(shaderName);
        // for(let includeMetaData of shaderModule.includeMetaData){
        //     if( lineNum < includeMetaData.src + includeMetaData.length ){
        //         return this.getLine(includeMetaData.key, lineNum - includeMetaData.src );
        //     }
        //     lineNum -= includeMetaData.length;
        // }
        return shaderModule.lines[lineNum];
    }

    getShaderNameFromHash(has) {
        return this.__hashToName[has];
    }
}
const shaderLibrary = new ShaderLibrary();

export {
    shaderLibrary
};