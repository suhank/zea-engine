import { GLShader } from '../GLShader.js'

import './GLSL/utils/quadVertexFromID.js'

class SilhouetteShader extends GLShader {
  /**
   * Create a GL shader.
   * @param {WebGLRenderingContext} gl - The webgl rendering context.
   */
  constructor(gl) {
    super(gl)
    this.setShaderStage(
      'VERTEX_SHADER',
      `
precision highp float;
attribute vec3 positions;    //(location = 0)

/* VS Outputs */
varying vec2 v_texCoord;
 
void main()
{
    v_texCoord = positions.xy+0.5;
    gl_Position = vec4(positions.xy*2.0, 0.0, 1.0);
}
`
    )
    this.setShaderStage(
      'FRAGMENT_SHADER',
      `
precision highp float;

uniform sampler2D depthTexture;
uniform vec2 screenSize;
uniform vec2 depthRange;

uniform float outlineThickness;
uniform color outlineColor;
uniform float outlineDepthMultiplier;
uniform float outlineDepthBias;

varying vec2 v_texCoord;


// http://web.archive.org/web/20130416194336/http://olivers.posterous.com/linear-depth-in-glsl-for-real
float LinearEyeDepth(float z_b) {
    float z_n = 2.0 * z_b - 1.0;
    float z_e = 2.0 * depthRange.x * depthRange.y / (depthRange.y + depthRange.x - z_n * (depthRange.y - depthRange.x));
    return z_e;
}

// https://www.vertexfragment.com/ramblings/unity-postprocessing-sobel-outline/#depth-based-outline
// https://github.com/ssell/UnitySobelOutline/blob/2e1f4a5b4e703ae2c96aaf08d5518ce58abbaab9/Assets/Resources/Shaders/SobelOutlineHLSL.shader

float SobelDepth(float ldc, float ldl, float ldr, float ldu, float ldd)
{
    return abs(ldl - ldc) +
        abs(ldr - ldc) +
        abs(ldu - ldc) +
        abs(ldd - ldc);
}

float SobelSampleDepth(vec2 uv, vec3 offset)
{
    float pixelCenter = LinearEyeDepth(texture(depthTexture, uv).r);
    float pixelLeft   = LinearEyeDepth(texture(depthTexture, uv - offset.xz).r);
    float pixelRight  = LinearEyeDepth(texture(depthTexture, uv + offset.xz).r);
    float pixelUp     = LinearEyeDepth(texture(depthTexture, uv + offset.zy).r);
    float pixelDown   = LinearEyeDepth(texture(depthTexture, uv - offset.zy).r);

    return SobelDepth(pixelCenter, pixelLeft, pixelRight, pixelUp, pixelDown);
}


#ifdef ENABLE_ES3
    out vec4 fragColor;
#endif
void main(void) {
#ifndef ENABLE_ES3
    vec4 fragColor;
#endif

    vec3 offset = vec3((1.0 / screenSize.x), (1.0 / screenSize.y), 0.0) * outlineThickness;
    float sobelDepth = SobelSampleDepth(v_texCoord, offset);
    sobelDepth = pow(clamp(sobelDepth, 0.0, 1.0) * outlineDepthMultiplier, outlineDepthBias);

    fragColor = vec4(outlineColor.rgb, sobelDepth);

#ifndef ENABLE_ES3
    gl_FragColor = fragColor;
#endif
}
`
    )
    this.finalize()
  }
}

export { SilhouetteShader }
