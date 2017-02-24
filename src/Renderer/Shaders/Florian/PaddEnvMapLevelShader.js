
import {
    shaderLibrary,
    Shader
} from '../../../SceneTree/SceneTree.js';


class PaddEnvMapLevelShader extends Shader {
    
    constructor(name) {
        super();
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('PostProcessing.vertexShader', `

precision highp float;

attribute vec2 positions;    //(location = 0)
uniform vec2 pos;
uniform vec2 size;

/* VS Outputs */
varying vec2 v_texCoord;
 
void main()
{
    v_texCoord = positions*0.5+0.5;
    gl_Position = vec4(vec2(-1.0,-1.0)+(pos*2.0)+(v_texCoord*size*2.0), 0.0, 1.0);
}

`);
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('PostProcessing.fragmentShader', `

precision highp float;

uniform sampler2D texture;
uniform vec2 textureDim;

varying vec2 v_texCoord;

void main(void) {
    vec2 pixelCoord = v_texCoord*textureDim;

    vec2 acoord = abs(pixelCoord-textureDim*0.5);
    float limit = textureDim.x*0.5-1.0;
    vec2 sourceCoord = clamp(pixelCoord-1.0, 0.5, textureDim.x-2.5);
    vec2 uv = sourceCoord/(textureDim-2.0);

    if(acoord.x > limit && acoord.y > limit){
        uv = 1.0 - uv;
    }
    else if(acoord.x > limit){
        uv.y = 1.0 - uv.y;
    }
    else if(acoord.y > limit){
        uv.x = 1.0 - uv.x;
    }
    vec4 texel = texture2D(texture, uv);
    gl_FragColor = vec4(texel.rgb/texel.a, 1);
}

`);
    }
};


export {
    PaddEnvMapLevelShader
};

