import { shaderLibrary }  from '../../SceneTree/ShaderLibrary';
import { Shader }  from '../../SceneTree/Shader';
import './utils/quadVertexFromID.js';
import { ScreenQuadShader } from './ScreenQuadShader.js'


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
    vec2 position = getQuadVertexPositionFromID();
    v_texCoord = position+0.5;
    gl_Position = vec4(position*2.0, 0.0, 1.0);
}
`);
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('ConvolverShader.fragmentShader', `
precision highp float;

<%include file="math/constants.glsl"/>
<%include file="glslutils.glsl"/>
<%include file="utils/imagePyramid.glsl"/>
<%include file="pragmatic-pbr/envmap-octahedral.glsl"/>

uniform float roughness;
varying vec2 v_texCoord;

uniform sampler2D hammersleyMap;
vec2 Hammersley(int i, int N) {
    vec4 rgba =  texture2D(hammersleyMap, vec2((float(i) + 0.5)/float(N)), 0.5);
    return rgba.rg;
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

// TODO: use tobias's code. The guy clearly knows what he's doing...
// https://github.com/thefranke/dirtchamber/blob/master/shader/importance.hlsl
// Compute a LOD level for filtered importance sampling.
// From GPU Gems 3: GPU-Based Importance Sampling.
//float compute_lod(in vec3 H, in float pdf, in int num_samples, in int ww, in int hh)
//{
 //   return max(0.0, 0.5*log2((ww*hh)/float(num_samples)) - 0.5*log2(pdf));
//}

// uniform ImageAtlas atlasEnvMap;
uniform sampler2D atlasEnvMap_layout;
uniform vec4 atlasEnvMap_desc;
uniform sampler2D atlasEnvMap_image;

void main(void) {
    vec3 N = uvToNormalSphOct(v_texCoord);

    if(false){
        vec2 uv = normalToUvSphOct(N);
        gl_FragColor = vec4(uv.x, uv.y, 0.0, 1.0);
        //gl_FragColor = sampleImagePyramid(uv, roughness, atlasEnvMap);
        //gl_FragColor = sampleSubImage(uv, 0, atlasEnvMap);
        //gl_FragColor = texture2D(atlasEnvMap, uv);
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

            vec2 uv = normalToUvSphOct(V);
            // float pdf = D_ggx(a, NoH) * NoH / (4 * VoH);
            // float lod = compute_lod(H, );

            color += sampleImagePyramid(uv, 0.0, atlasEnvMap_layout, atlasEnvMap_image, atlasEnvMap_desc) * VdotN;
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
//export default ConvolverShader;

