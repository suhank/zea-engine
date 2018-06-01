
import {
    Signal
} from '../../Utilities';
import {
    shaderLibrary
} from '../ShaderLibrary';
import {
    GLPass
} from '../GLPass.js';
import {
    GLTexture2D
} from '../GLTexture2D.js';
import {
    GLShader
} from '../GLShader.js';
import {
    generateShaderGeomBinding
} from '../GeomShaderBinding.js';

import '../Shaders/GLSL/glslxfo.js';

class GLAnalyticsShader extends GLShader {
    constructor(gl) {
        super(gl);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('GLAnalyticsShader.vertexShader', `
precision highp float;

instancedattribute float instanceIds;
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
    Xfo xfo = getXfo(analyticsTexture, analyticsTextureSize, int(instanceIds));
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


#ifdef ENABLE_ES3
    out vec4 fragColor;
#endif
void main(void) {

#ifndef ENABLE_ES3
    vec4 fragColor;
#endif

    fragColor = displayColor;
    fragColor.a = v_weight;
    
#ifndef ENABLE_ES3
    gl_FragColor = fragColor;
#endif
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

        let instanceIdsArray = new Float32Array(this.numDrawItems);
        for (let i = 0; i < this.numDrawItems; i++) {
            instanceIdsArray[i] = i;
        }
        let instanceIdsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, instanceIdsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, instanceIdsArray, gl.STATIC_DRAW);

        this.__glattrbuffers = {
            instanceIds: {
                buffer: instanceIdsBuffer,
                instanced: true,
                dimension: 1,
                count: instanceIdsArray.length
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
        const gl = this.__gl;

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
        
        {
            // The instance transform ids are bound as an instanced attribute.
            let location = renderstate.attrs.instanceIds.location;
            gl.enableVertexAttribArray(location);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.__instanceIdsBuffer);
            gl.vertexAttribPointer(location, 1, gl.FLOAT, false, 4, 0);
            gl.vertexAttribDivisor(location, 1); // This makes it instanced
        }

        gl.drawArraysInstanced(gl.LINES, 0, 2, this.numDrawItems);
    }

    destroy() {
        this.analyticsTexture.destroy();
    }
};

export {
    GLAnalyticsPass
};
// export default GLAnalyticsPass;