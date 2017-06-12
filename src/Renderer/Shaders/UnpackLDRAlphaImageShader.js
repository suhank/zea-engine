import {
    Shader
} from '../Shader';
import {
    shaderLibrary
} from '../ShaderLibrary';

import './GLSL/utils/quadVertexFromID.js';

class UnpackLDRAlphaImageShader extends Shader {
    
    constructor() {
        super();
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('UnpackLDRAlphaImageShader.vertexShader', `
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
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('UnpackLDRAlphaImageShader.fragmentShader', `
precision highp float;

varying vec2 v_texCoord;
uniform sampler2D ldrSampler;
uniform sampler2D alphaSampler;

float luminanceFromRGB(vec3 rgb) {
    return 0.2126*rgb.r + 0.7152*rgb.g + 0.0722*rgb.b;
}

void main(void) {
    gl_FragColor = vec4(texture2D(ldrSampler, v_texCoord).rgb, luminanceFromRGB(texture2D(alphaSampler, v_texCoord).rgb));
}

`);
    }
};



export {
    UnpackLDRAlphaImageShader
};

