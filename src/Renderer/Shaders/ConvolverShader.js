import {
    shaderLibrary,
    Shader
} from '../../SceneTree/SceneTree.js';

import './utils/quadVertexFromID.js';

import {
    ScreenQuadShader
} from './ScreenQuadShader.js'


class ConvolverShader extends Shader {
    
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
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('ConvolverShader.fragmentShader', `
precision highp float;

<%include file="utils/imagePyramid.glsl" ATLAS_NAME="EnvMap"/>
<%include file="pragmatic-pbr/envmap-equirect.glsl"/>

uniform float roughness;
varying vec2 v_texCoord;

uniform sampler2D hammersleyMap;
vec2 Hammersley(int i, int N) {
    return texture2D(hammersleyMap, vec2((float(i) + 0.5)/float(N)), 0.5).rg;
}

mat3 matrixFromVector(vec3 n) { // frisvad
    float a = 1.0 / (1.0 + n.z);
    float b = -n.x * n.y * a;
    vec3 b1 = vec3(1.0 - n.x * n.x * a, b, -n.x);
    vec3 b2 = vec3(b, 1.0 - n.y * n.y * a, -n.y);
    return mat3(b1, b2, n);
}

vec3 ImportanceSampleGGX(vec2 Xi, float a) {
    float phi = 2.0 * PI * Xi.x;
    float cos_theta = sqrt((1.0 - Xi.y)/(1.0 + (a*a - 1.0) * Xi.y));
    float sin_theta = sqrt(1.0 - cos_theta * cos_theta);

    // float phi = Xi.y * 2.0 * PI;
    // float cos_theta = sqrt(1.0 - Xi.x);
    // float sin_theta = sqrt(1.0 - cos_theta * cos_theta);

    vec3 H;
    H.x = sin_theta * cos(phi);
    H.y = sin_theta * sin(phi);
    H.z = cos_theta;
    return H;
}


// Compute a LOD level for filtered importance sampling.
// From GPU Gems 3: GPU-Based Importance Sampling.
//float compute_lod(in vec3 H, in float pdf, in int num_samples, in int ww, in int hh)
//{
 //   return max(0.0, 0.5*log2((ww*hh)/float(num_samples)) - 0.5*log2(pdf));
//}


void main(void) {
    vec3 N = envMapEquirect_DirFromUV(v_texCoord);

    if(false){
        vec2 uv = envMapEquirect_UvFromDir(N);
        gl_FragColor = sampleImagePyramid_EnvMap(uv, roughness);
    }
    else{
        const int numSamples = NUM_SAMPLES;

        vec4 color = vec4(0.0,0.0,0.0,0.0);
        float weight = 0.0;
        mat3 vecSpace = matrixFromVector(N);
        float a = roughness*roughness;
        for(int i=0; i<numSamples; i++) {
            vec2 Xi = Hammersley(i, numSamples);
            vec3 H = ImportanceSampleGGX(Xi, a);
            vec3 V = normalize(vecSpace * H);
            float VdotN = dot(V, N);

            vec2 uv = envMapEquirect_UvFromDir(V);
            color += sampleImagePyramid_EnvMap(uv, 0.0) * VdotN;
            weight += VdotN;
        }
        color /= float(weight);
        gl_FragColor = vec4(color.rgb, 1.0);
    }
}

`);
    }
};


export {
    ConvolverShader
};

