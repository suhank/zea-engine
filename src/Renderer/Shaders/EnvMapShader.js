/* eslint-disable require-jsdoc */
import { shaderLibrary } from '../ShaderLibrary'
import { GLShader } from '../GLShader.js'

import './GLSL/stack-gl/inverse.js'
import './GLSL/stack-gl/transpose.js'
import './GLSL/envmap-octahedral.js'
import './GLSL/envmap-equirect.js'
import './GLSL/envmap-dualfisheye.js'
import './GLSL/utils/quadVertexFromID.js'

class EnvMapShader extends GLShader {
  constructor(gl) {
    super(gl)
    this.setShaderStage(
      'VERTEX_SHADER',
      `
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
  v_texCoord = position * 0.5 + 0.5;

  mat4 inverseProjection = inverse(projectionMatrix);
  mat3 inverseModelview = transpose(mat3(viewMatrix));

  // transform from the normalized device coordinates back to the view space
  vec3 unprojected = (inverseProjection * vec4(position, 0, 1)).xyz;

  // transfrom from the view space back to the world space
  // and use it as a sampling vector
  v_worldDir = inverseModelview * unprojected;

  gl_Position = vec4(position, 0, 1);
}

`
    )

    this.setShaderStage(
      'FRAGMENT_SHADER',
      `
precision highp float;

<%include file="math/constants.glsl"/>
<%include file="GLSLUtils.glsl"/>
<%include file="stack-gl/gamma.glsl"/>

uniform float focus;
uniform float exposure;

/* VS Outputs */
varying vec3 v_worldDir;
varying vec2 v_texCoord;


#define ENABLE_INLINE_GAMMACORRECTION

#define ENV_MAP_LATLONG 0
#define ENV_MAP_STERIOLATLONG 1
#define ENV_MAP_OCT 2
#define ENV_MAP_CUBE 3
#define ENV_MAP_DUALFISHEYE 4
#define ENV_MAP_CUBEPYRAMID 5
#define ENV_MAP_SH 6

#define ENV_MAPTYPE ENV_MAP_CUBEPYRAMID

#if (ENV_MAPTYPE == ENV_MAP_LATLONG)  

<%include file="pragmatic-pbr/envmap-equirect.glsl"/>

uniform sampler2D backgroundImage;

vec4 sampleEnvMap(vec3 dir) {
  vec2 uv = latLongUVsFromDir(normalize(dir));
  vec4 texel = texture2D(backgroundImage, uv) * exposure;
  return vec4(texel.rgb/texel.a, 1.0);
}

#elif (ENV_MAPTYPE == ENV_MAP_STERIOLATLONG)  

<%include file="pragmatic-pbr/envmap-equirect.glsl"/>
uniform int eye;// L = 0, R = 1;
uniform sampler2D backgroundImage;

vec4 sampleEnvMap(vec3 dir) {
  vec2 uv = latLongUVsFromDir(normalize(v_worldDir));
  uv.y *= 0.5;
  if(eye == 1){
    uv.y += 0.5;
  }
  vec4 texel = texture2D(backgroundImage, uv) * exposure;
  fragColor = vec4(texel.rgb/texel.a, 1.0);
}


uniform sampler2D backgroundImage;

#elif (ENV_MAPTYPE == ENV_MAP_OCT)  

<%include file="envmap-octahedral.glsl"/>

uniform sampler2D   envMap;

vec4 sampleEnvMap(vec3 dir) {
  vec2 uv = dirToSphOctUv(normalize(dir));
  if(false){
    vec4 texel = texture2D(envMap, uv);
    return vec4(texel.rgb/texel.a, 1.0);
  }
  else{
    return texture2D(envMap, uv) * exposure;
  }
}

#elif (ENV_MAPTYPE == ENV_MAP_CUBE)

uniform samplerCube cubeMap;

vec4 sampleEnvMap(vec3 dir) {
  return textureLod(cubeMap, dir, 0.0);// * exposure;
  // return textureLod(cubeMap, dir, exposure);
}

#elif (ENV_MAPTYPE == ENV_MAP_DUALFISHEYE)

<%include file="pragmatic-pbr/envmap-dualfisheye.glsl"/>

vec4 sampleEnvMap(vec3 dir) {
  vec2 uv = dualfisheyeUVsFromDir(dir);
  return texture2D(backgroundImage, uv) * exposure;
}

#elif (ENV_MAPTYPE == ENV_MAP_CUBEPYRAMID)

uniform samplerCube cubeMapPyramid;

vec4 sampleEnvMap(vec3 dir) {
  return textureLod(cubeMapPyramid, dir, exposure);
}

#elif (ENV_MAPTYPE == ENV_MAP_SH)

<%include file="SHCoeffs.glsl"/>

vec4 sampleEnvMap(vec3 dir) {
	return vec4(sampleSHCoeffs(dir) * exposure, 1.0);
}

#endif

#ifdef ENABLE_ES3
  out vec4 fragColor;
#endif

void main(void) {
#ifndef ENABLE_ES3
  vec4 fragColor;
#endif

  fragColor = sampleEnvMap(normalize(v_worldDir));

#ifdef ENABLE_INLINE_GAMMACORRECTION
  fragColor.rgb = toGamma(fragColor.rgb);
#endif

#ifndef ENABLE_ES3
  gl_FragColor = fragColor;
#endif
}
`
    )
  }
}

export { EnvMapShader }
