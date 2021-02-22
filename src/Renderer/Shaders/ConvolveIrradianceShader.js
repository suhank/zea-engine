import { GLShader } from '../GLShader.js'
import './GLSL/utils/quadVertexFromID.js'
import './GLSL/convolve-helpers.js'

/** Shader for convolving Environment maps.
 * @extends GLShader
 * @private
 */
class ConvolveIrradianceShader extends GLShader {
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
<%include file="convolve-helpers.glsl"/>

uniform float roughness;
uniform int faceId;
varying vec2 v_texCoord;


out vec4 fragColor;
void main(void) {

  vec3 N = cubeFaceUvToDir(v_texCoord.x, v_texCoord.y, faceId);   

  vec3 irradiance = vec3(0.0);

  vec3 up        = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
  vec3 tangent   = normalize(cross(up, N));
  vec3 bitangent = cross(N, tangent);

  float nrSamples = 0.0; 
  for(float phi = 0.0; phi < 2.0 * PI; phi += SAMPLE_DELTA)
  {
    for(float theta = 0.0; theta < 0.5 * PI; theta += SAMPLE_DELTA)
    {
      // spherical to cartesian (in tangent space)
      // from spherical coordinates to cartesian coordinates
      vec3 H = vec3(cos(phi) * sin(theta), sin(phi) * sin(theta), cos(theta));
      // tangent space to world
      vec3 sampleVec = tangent * H.x + bitangent * H.y + N * H.z;

      irradiance += sampleEnvMap(normalize(sampleVec)).rgb * cos(theta) * sin(theta);
      nrSamples++;
    }
  }
  irradiance = PI * irradiance * (1.0 / float(nrSamples));

  fragColor = vec4(irradiance, 1.0);
}

`
    )
  }
}

export { ConvolveIrradianceShader }
