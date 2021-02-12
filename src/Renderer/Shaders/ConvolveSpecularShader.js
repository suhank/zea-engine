import { GLShader } from '../GLShader.js'
import './GLSL/utils/quadVertexFromID.js'
import './GLSL/convolve-helpers.js'

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
<%include file="ImportanceSampleGGX.glsl"/>
<%include file="convolve-helpers.glsl"/>


uniform float roughness;
uniform int faceId;
varying vec2 v_texCoord;


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
