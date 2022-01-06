import { GLShader } from '../GLShader.js'
import { WebGL12RenderingContext } from '../types/webgl'

// eslint-disable-next-line require-jsdoc
export class ReductionShader extends GLShader {
  /**
   * Create an atlas layout shader.
   * @param gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl, 'ReductionShader')
    this.setShaderStage(
      'VERTEX_SHADER',
      `

precision highp float;

uniform int reductionTextureWidth;
uniform sampler2D geomDataTexture;

ivec2 texelCoordFromVertexId(){
  ivec2 texSize = textureSize(geomDataTexture, 0);
  return ivec2(
    gl_VertexID % texSize.x, 
    gl_VertexID / texSize.x
    );
}

vec2 pointPositionFromGeomItemId(int geomItemId){
  vec2 result = vec2(
    (float(geomItemId % reductionTextureWidth) + 0.5) / float(reductionTextureWidth), 
    (float(geomItemId / reductionTextureWidth) + 0.5) / float(reductionTextureWidth)
    );
  return vec2(-1.0, -1.0) + (result * 2.0);
}

void main()
{
  // Get the texel coordinate in the source geomdata buffer.
  // there is one point for every pixel in the geomdata texture.
  ivec2 texelCoord = texelCoordFromVertexId();
  int geomItemId = int(texelFetch(geomDataTexture, texelCoord, 0).g + 0.5);

  if (geomItemId > 0) {
    vec2 position = pointPositionFromGeomItemId(geomItemId);
    gl_Position = vec4(position, 0.0, 1.0);
    gl_PointSize = 1.0;
  } else {
    // Move it off screen
    gl_Position = vec4(-2.0, -2.0, 0.0, 1.0);
    gl_PointSize = 0.0;
  }
}

`
    )
    this.setShaderStage(
      'FRAGMENT_SHADER',
      `
precision highp float;

#ifdef ENABLE_ES3
  out vec4 fragColor;
#endif

void main(void) {
#ifndef ENABLE_ES3
  vec4 fragColor;
#endif

  fragColor = vec4(1.0, 1.0, 1.0, 1.0);

#ifndef ENABLE_ES3
  gl_FragColor = fragColor;
#endif
}

`
    )
  }
}
