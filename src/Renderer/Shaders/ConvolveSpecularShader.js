import { GLShader } from '../GLShader.js'
import './GLSL/utils/quadVertexFromID.js'

/** Shader for convolving Environment maps.
 * @extends GLShader
 * @private
 */
class ConvolveSpecularShader extends GLShader {
  /**
   * Create a GL renderer.
   * @param {WebGLRenderingContext} gl - The options value.
   */
  constructor(gl) {
    super(gl)
    this.setShaderStage(
      'VERTEX_SHADER',
      `
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
`
    )
    this.setShaderStage(
      'FRAGMENT_SHADER',
      `
precision highp float;

<%include file="math/constants.glsl"/>
<%include file="GLSLUtils.glsl"/>


uniform float roughness;
uniform int faceId;
varying vec2 v_texCoord;

<%include file="Hammersley.glsl"/>
<%include file="GGX.glsl"/>


#ifdef ENVMAP_CUBE

uniform samplerCube envMap;

vec4 sampleEnvMap(vec3 dir) {
  return texture(envMap, dir);
}

#else 

uniform sampler2D   envMap;

<%include file="envmap-octahedral.glsl"/>

vec4 sampleEnvMap(vec3 dir) {
  vec2 uv = dirToSphOctUv(dir);
  vec4 texel = texture2D(envMap, uv);
  return vec4(texel.rgb/texel.a, 1.0); // TODO: Check this line. Do we need it?
}

#endif 


vec3 cubeFaceUvToDir(float u, float v, int faceId) {

  // normalize into [-1, 1] range
  float n_u = 2.0 * u - 1.0;
  float n_v = 2.0 * v - 1.0;

  vec3 dir;
  switch (faceId)
  {
  case 0: //TEXTURE_CUBE_MAP_POSITIVE_X:
    dir.x = 1.0f;
    dir.y = n_v;
    dir.z = -n_u;
    break;
  case 1: //TEXTURE_CUBE_MAP_NEGATIVE_X:
    dir.x = -1.0f;
    dir.y = n_v;
    dir.z = n_u;
    break;
  case 3: //TEXTURE_CUBE_MAP_POSITIVE_Y:
    dir.x = n_u;
    dir.y = 1.0f;
    dir.z = -n_v;
    break;
  case 2: //TEXTURE_CUBE_MAP_NEGATIVE_Y:
    dir.x = n_u;
    dir.y = -1.0f;
    dir.z = n_v;
    break;
  case 4: //TEXTURE_CUBE_MAP_POSITIVE_Z:
    dir.x = n_u;
    dir.y = n_v;
    dir.z = 1.0f;
    break;
  case 5: //TEXTURE_CUBE_MAP_NEGATIVE_Z:
    dir.x = -n_u;
    dir.y = n_v;
    dir.z = -1.0f;
    break;
  }
  return normalize(dir);
}


out vec4 fragColor;
void main(void) {

  vec3 N = cubeFaceUvToDir(v_texCoord.x, v_texCoord.y, faceId);   

  vec3 R = N;
  vec3 V = R;

  const uint SAMPLE_COUNT = 1024u;
  float totalWeight = 0.0;   
  vec3 prefilteredColor = vec3(0.0);     
  for(uint i = 0u; i < SAMPLE_COUNT; ++i)
  {
      vec2 Xi = Hammersley(i, SAMPLE_COUNT);
      vec3 H  = ImportanceSampleGGX(Xi, N, roughness);
      vec3 L  = normalize(2.0 * dot(V, H) * H - V);

      float NdotL = max(dot(N, L), 0.0);
      if(NdotL > 0.0)
      {
          prefilteredColor += sampleEnvMap(L).rgb * NdotL;
          totalWeight      += NdotL;
      }
  }
  prefilteredColor = prefilteredColor / totalWeight;

  fragColor = vec4(prefilteredColor, 1.0);
}

`
    )
  }
}

export { ConvolveSpecularShader }
