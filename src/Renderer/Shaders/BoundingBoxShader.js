import { shaderLibrary } from '../ShaderLibrary.js'
import { GLShader } from '../GLShader.js'

import './GLSL/stack-gl/inverse.js'
import './GLSL/stack-gl/transpose.js'
import './GLSL/materialparams.js'

class BoundingBoxShader extends GLShader {
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

attribute vec4 positions;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 cameraMatrix;

<%include file="stack-gl/transpose.glsl"/>
<%include file="stack-gl/inverse.glsl"/>
<%include file="drawItemId.glsl"/>
<%include file="drawItemTexture.glsl"/>
<%include file="modelMatrix.glsl"/>

/* VS Outputs */
varying vec4 v_color;

void main(void) {

  int drawItemId = getDrawItemId();
  vec4 geomItemData  = getInstanceData(drawItemId);
  // mat4 modelMatrix = getModelMatrix(drawItemId);
  vec4 bboxMin = fetchTexel(instancesTexture, instancesTextureSize, (drawItemId * pixelsPerItem) + 6);
  vec4 bboxMax =  fetchTexel(instancesTexture, instancesTextureSize, (drawItemId * pixelsPerItem) + 7);

  v_color = vec4(0.0, 0.0, 0.0, 0.5);
  v_color.g = float(drawItemId);

  vec4 pos = positions;
  if (pos.x < 0.0) pos.x = bboxMin.x;
  else if (pos.x > 0.0) pos.x = bboxMax.x;
  if (pos.y < 0.0) pos.y = bboxMin.y;
  else if (pos.y > 0.0) pos.y = bboxMax.y;
  if (pos.z < 0.0) pos.z = bboxMin.z;
  else if (pos.z > 0.0) pos.z = bboxMax.z;

  // pos.x += float(drawItemId) * 2.0;
  // pos.z += geomItemData.w; // geomId
  
  mat4 modelViewProjectionMatrix = projectionMatrix * viewMatrix;
  gl_Position = modelViewProjectionMatrix * pos;
}
`
    )

    this.setShaderStage(
      'FRAGMENT_SHADER',
      `
precision highp float;

/* VS Outputs */
varying vec4 v_color;

#ifdef ENABLE_ES3
  out vec4 fragColor;
#endif
void main(void) {
#ifndef ENABLE_ES3
  vec4 fragColor;
#endif

  fragColor = v_color;

#ifndef ENABLE_ES3
  gl_FragColor = fragColor;
#endif
}
`
    )
  }
}

export { BoundingBoxShader }
