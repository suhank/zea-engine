import {
    shaderLibrary,
    Shader
} from '../../SceneTree';

import '../../SceneTree/Shaders/GLSL/stack-gl/inverse.js';
import '../../SceneTree/Shaders/GLSL/stack-gl/transpose.js';
import '../../SceneTree/Shaders/GLSL/envmap-equirect.js';
import './utils/quadVertexFromID.js';

class EnvMapShader extends Shader {
    
    constructor() {
        super();
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('EnvMapShader.vertexShader', `
precision highp float;

<%include file="utils/quadVertexFromID.glsl"/>

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;

<%include file="stack-gl/inverse.glsl"/>
<%include file="stack-gl/transpose.glsl"/>

/* VS Outputs */
varying vec3 v_worldDir;
varying vec2 v_texCoord;
 
void main()
{
    vec2 position = getScreenSpaceVertexPosition() * 2.0;

    mat4 inverseProjection = inverse(projectionMatrix);
    mat3 inverseModelview = transpose(mat3(viewMatrix));

    //transform from the normalized device coordinates back to the view space
    vec3 unprojected = (inverseProjection * vec4(position, 0, 1)).xyz;

    //transfrom from the view space back to the world space
    //and use it as a sampling vector
    v_worldDir = inverseModelview * unprojected;
    v_texCoord = (position*0.5)+0.5;

    gl_Position = vec4(position, 0, 1);
}

`);
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('EnvMapShader.fragmentShader', `
precision highp float;

<%include file="pragmatic-pbr/envmap-equirect.glsl"/>
<%include file="utils/imagePyramid.glsl" ATLAS_NAME="EnvMap"/>
<%include file="stack-gl/gamma.glsl"/>

uniform float focus;

#define ENABLE_INLINE_GAMMACORRECTION
#ifdef ENABLE_INLINE_GAMMACORRECTION
uniform float exposure;
#endif

/* VS Outputs */
varying vec3 v_worldDir;
varying vec2 v_texCoord;

void main(void) {

    vec2 uv = latLongUVsFromDir(normalize(v_worldDir));
    if(false){
        // Use these lines to debug the src GL image.
        vec4 texel = texture2D(atlas_EnvMap, uv);
        gl_FragColor = vec4(texel.rgb/texel.a, 1.0);
    }
    else{
        gl_FragColor = vec4(sampleImagePyramid_EnvMap(uv, focus).rgb, 1.0);
    }

#ifdef ENABLE_INLINE_GAMMACORRECTION
    gl_FragColor.rgb = toGamma(gl_FragColor.rgb * exposure);
#endif
}
`);
        this.finalize();
    }
};


export {
    EnvMapShader
};

