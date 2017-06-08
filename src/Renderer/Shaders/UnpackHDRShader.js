import { shaderLibrary } from '../../SceneTree/ShaderLibrary';
import { Shader } from '../../SceneTree/Shader';

import './utils/quadVertexFromID.js';
import './utils/unpackHDR.js';


class UnpackHDRShader extends Shader {
    
    constructor() {
        super();
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('UnpackHDRShader.vertexShader', `
precision highp float;

<%include file="utils/quadVertexFromID.glsl"/>

/* VS Outputs */
varying vec2 v_texCoord;
 
void main()
{
    vec2 position = getQuadVertexPositionFromID();
    v_texCoord = position+0.5;
    gl_Position = vec4(position*2.0, 0.0, 1.0);
}
`);
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('UnpackHDRShader.fragmentShader', `
precision highp float;

varying vec2 v_texCoord;
uniform sampler2D ldrSampler;
uniform sampler2D cdmSampler;
uniform float exposure;
uniform vec4 tint;

<%include file="utils/unpackHDR.glsl"/>

void main(void) {
    vec3 color = decodeHDR(ldrSampler, cdmSampler, v_texCoord);
    gl_FragColor = vec4(color * tint.rgb * exposure, 1.0);
}

`);
    }
};


class UnpackAndMixHDRShader extends UnpackHDRShader {
    
    constructor() {
        super();
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('UnpackAndMixHDRShader.fragmentShader', `
precision highp float;

varying vec2 v_texCoord;

uniform sampler2D ldrSampler0;
uniform sampler2D cdmSampler0;
uniform float weight0;

uniform sampler2D ldrSampler1;
uniform sampler2D cdmSampler1;
uniform float weight1;

#ifdef UNPACK_SRC2
uniform sampler2D ldrSampler2;
uniform sampler2D cdmSampler2;
uniform float weight2;
#endif

<%include file="utils/unpackHDR.glsl"/>

void main(void) {
    gl_FragColor = vec4(0.0);
    gl_FragColor += vec4(decodeHDR(ldrSampler0, cdmSampler0, v_texCoord) * weight0, 1.0);
    gl_FragColor += vec4(decodeHDR(ldrSampler1, cdmSampler1, v_texCoord) * weight1, 1.0);

#ifdef UNPACK_SRC2
    gl_FragColor += vec4(decodeHDR(ldrSampler2, cdmSampler2, v_texCoord) * weight2, 1.0);
#endif
}

`);
    }
};


export {
    UnpackAndMixHDRShader,
    UnpackHDRShader
};


