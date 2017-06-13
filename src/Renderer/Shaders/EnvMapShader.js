import { shaderLibrary }  from '../ShaderLibrary';
import { Shader }  from '../Shader';

import './GLSL/stack-gl/inverse.js';
import './GLSL/stack-gl/transpose.js';
import './GLSL/envmap-octahedral.js';
import './GLSL/envmap-equirect.js';
import './GLSL/utils/quadVertexFromID.js';

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
    vec2 position = getQuadVertexPositionFromID() * 2.0;

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

<%include file="math/constants.glsl"/>
<%include file="glslutils.glsl"/>
<%include file="pragmatic-pbr/envmap-octahedral.glsl"/>
<%include file="utils/imagePyramid.glsl"/>
<%include file="stack-gl/gamma.glsl"/>

uniform float focus;

#define ENABLE_INLINE_GAMMACORRECTION
#ifdef ENABLE_INLINE_GAMMACORRECTION
uniform float exposure;
#endif

// uniform ImageAtlas atlasEnvMap;
uniform sampler2D atlasEnvMap_layout;
uniform vec4 atlasEnvMap_desc;
uniform sampler2D atlasEnvMap_image;

/* VS Outputs */
varying vec3 v_worldDir;
varying vec2 v_texCoord;

void main(void) {

    vec2 uv = normalToUvSphOct(normalize(v_worldDir));
    if(false){
        // Use these lines to debug the src GL image.
        vec4 texel = texture2D(atlasEnvMap_image, uv);
        gl_FragColor = vec4(texel.rgb/texel.a, 1.0);
    }
    else{
        gl_FragColor = vec4(sampleImagePyramid(uv, focus, atlasEnvMap_layout, atlasEnvMap_image, atlasEnvMap_desc).rgb, 1.0);
    }

#ifdef ENABLE_INLINE_GAMMACORRECTION
    gl_FragColor.rgb = toGamma(gl_FragColor.rgb * exposure);
#endif
}
`);
        this.finalize();
    }
};

class LatLongBackgroundShader extends EnvMapShader {
    
    constructor() {
        super();
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('LatLongBackgroundShader.fragmentShader', `
precision highp float;

<%include file="math/constants.glsl"/>
<%include file="glslutils.glsl"/>
<%include file="pragmatic-pbr/envmap-equirect.glsl"/>

#define ENABLE_INLINE_GAMMACORRECTION
#ifdef ENABLE_INLINE_GAMMACORRECTION
<%include file="stack-gl/gamma.glsl"/>
uniform float exposure;
#endif

uniform sampler2D latLongBackgroundImage;


/* VS Outputs */
varying vec3 v_worldDir;
varying vec2 v_texCoord;

void main(void) {

    vec2 uv = latLongUVsFromDir(normalize(v_worldDir));
    // Use these lines to debug the src GL image.
    vec4 texel = texture2D(latLongBackgroundImage, uv);
    gl_FragColor = vec4(texel.rgb/texel.a, 1.0);

#ifdef ENABLE_INLINE_GAMMACORRECTION
    //gl_FragColor.rgb = toGamma(gl_FragColor.rgb * exposure);

    // Assuming a simple RGB image in gamma space for now.
    gl_FragColor.rgb = gl_FragColor.rgb * exposure;
#endif
}
`);
        this.finalize();
    }
};


export {
    EnvMapShader,
    LatLongBackgroundShader
};

