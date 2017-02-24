import {
    shaderLibrary,
    Shader
} from '../../SceneTree/SceneTree.js';

import './utils/quadVertexFromID.js';


class DecompHDRShader extends Shader {
    
    constructor() {
        super();
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('ScreenQuadShader.vertexShader', `
precision highp float;

<%include file="utils/quadVertexFromID.glsl"/>

/* VS Outputs */
varying vec2 v_texCoord;
 
void main()
{
    vec2 position = getScreenSpaceVertexPosition();
    v_texCoord = position+0.5;
    gl_Position = vec4(position*2.0, 0.0, 1.0);
}
`);
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('DecompHDRShader.fragmentShader', `
precision highp float;

varying vec2 v_texCoord;
uniform sampler2D ldrSampler;
uniform sampler2D cdmSampler;

vec3 decodeHDR(const in vec3 ldrPixel, const in float cdmAlpha) {
    float a = (cdmAlpha * 16.0 - 8.0) / 4.0;
    vec3 color = ldrPixel / (a * (1.0 - ldrPixel));
    color.x = pow(10.0, color.x);
    color.y = pow(10.0, color.y);
    color.z = pow(10.0, color.z);
    return color;
}


void main(void) {
    vec3 color = decodeHDR(texture2D(ldrSampler, v_texCoord).rgb, texture2D(cdmSampler, v_texCoord).a);
    gl_FragColor = vec4(color, 1.0);
}

`);
    }
};


export {
    DecompHDRShader
};

