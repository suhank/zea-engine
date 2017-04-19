import {
    shaderLibrary,
    Shader
} from '../../SceneTree';

import './utils/quadVertexFromID.js';

class ScreenQuadShader extends Shader {
    
    constructor() {
        super();
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('ScreenQuadShader.vertexShader', `
precision highp float;

<%include file="utils/quadVertexFromID.glsl"/>

uniform vec2 pos;
uniform vec2 size;

/* VS Outputs */
varying vec2 v_texCoord;
 
void main()
{
    vec2 position = getQuadVertexPositionFromID();
    v_texCoord = position+0.5;
    //gl_Position = vec4(position*2.0, 0, 1);
    gl_Position = vec4(vec2(-1.0, -1.0) + (pos * 2.0) + (v_texCoord * size * 2.0), 0.0, 1.0);
}
`);
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('ScreenQuadShader.fragmentShader', `
precision highp float;

uniform sampler2D texture;

varying vec2 v_texCoord;

void main(void) {
    vec4 texel = texture2D(texture, v_texCoord);
    gl_FragColor = vec4(texel.rgb/texel.a, 1.0);
}

`);
        this.finalize();
    }
};

export {
    ScreenQuadShader
};

