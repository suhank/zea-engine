import { Signal } from '../../Math';
import { shaderLibrary } from '../ShaderLibrary';
import { Shader } from '../Shader';
import { GLPass } from '../GLPass.js';
import { GLTexture2D } from '../GLTexture2D.js';
import { GLShader } from '../GLShader.js';
import { generateShaderGeomBinding } from '../GeomShaderBinding.js';

import '../Shaders/GLSL/glslxfo.js';

class GLAnalyticsShader extends Shader {
    constructor(gl) {
        super(gl);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('GLAnalyticsShader.vertexShader', `
precision highp float;

instancedattribute vec2 ids;
attribute vec2 vertexIDs;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform float displayLength;

uniform sampler2D analyticsTexture;
uniform int analyticsTextureSize;

<%include file="glslxfo.glsl"/>

/* VS Outputs */
varying float v_weight;

void main(void) {
    Xfo xfo = getXfo(analyticsTexture, analyticsTextureSize, int(ids.x));
    mat4 viewProjectionMatrix = projectionMatrix * viewMatrix;
    if(vertexIDs.x == 0.0){
        vec3 p0 = xfo.tr;
        gl_Position = viewProjectionMatrix * vec4(p0, 1.0);
        v_weight = 1.0;
    }
    else{
        vec3 p1 = xfo.tr+(quat_rotateVec3(xfo.ori, vec3(0,0,-1))*displayLength);
        //vec3 p1 = xfo.tr + vec3(0,displayLength,0);
        gl_Position = viewProjectionMatrix * vec4(p1, 1.0);
        v_weight = 0.0;
    }
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('GLAnalyticsShader.fragmentShader', `
precision highp float;

uniform color displayColor;

/* VS Outputs */
varying float v_weight;


void main(void) {
    gl_FragColor = displayColor;
    gl_FragColor.a = v_weight;
}
`);
    }

};


class GLAnalyticsPass {
    constructor(gl, dataArray) {

        this.__gl = gl;
        this.displayColor = [1, 0, 0, 1];
        this.displayLength = 0.5;
        this.numDrawItems = dataArray.length / 8;
        let size = Math.sqrt(dataArray.length / 4);
        this.analyticsTexture = new GLTexture2D(gl, {
            channels: 'RGBA',
            format: 'FLOAT',
            width: size,
            height: size,
            filter: 'NEAREST',
            wrap: 'CLAMP_TO_EDGE',
            data: dataArray,
            mipMapped: false
        });

        let indexArray = new Float32Array(this.numDrawItems*2);
        for (let i = 0; i < this.numDrawItems; i++) {
            indexArray[(i * 2) + 0] = i;
            indexArray[(i * 2) + 1] = i;
        }
        this.__indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.__indexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, indexArray, gl.STATIC_DRAW);

        this.__glattrbuffers = {
            ids: {
                buffer: this.__indexBuffer,
                instanced: true,
                dimension: 2,
                count: indexArray.length / 2
            }
        };


        if (!gl.__linesegattrbuffers) {
            gl.setupLineSegAttrBuffers();
        }

        this.__glshader = new GLAnalyticsShader(gl);
        let shaderComp = this.__glshader.compileForTarget('GLAnalyticsPass');
        this.__shaderBinding = generateShaderGeomBinding(gl, shaderComp.attrs, this.__glattrbuffers, null, gl.__linesegattrbuffers);

        this.updated = new Signal();
        this.enabled = true;
    }

    draw(renderstate) {
        let gl = this.__gl;

        gl.enable(gl.CULL_FACE);
        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        this.__glshader.bind(renderstate, 'GLAnalyticsPass');
        let unifs = renderstate.unifs;
        let attrs = renderstate.attrs;
        gl.uniform1f(unifs.displayLength.location, this.displayLength);
        gl.uniform4fv(unifs.displayColor.location, this.displayColor);

        this.analyticsTexture.bind(renderstate, unifs.analyticsTexture.location);
        gl.uniform1i(unifs.analyticsTextureSize.location, this.analyticsTexture.width);

        this.__shaderBinding.bind(renderstate);

        gl.__ext_Inst.drawArraysInstancedANGLE(gl.LINES, 0, 2, this.numDrawItems);
    }

    destroy() {
        this.analyticsTexture.destroy();
    }
};

export {
    GLAnalyticsPass
};
// export default GLAnalyticsPass;