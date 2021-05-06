import { shaderLibrary } from '../../ShaderLibrary.js'

shaderLibrary.setShaderModule(
  'computeViewNormal.glsl',
  `
vec3 computeViewNormal(vec3 viewPos) {
  vec3 fdx = dFdx(viewPos);
  vec3 fdy = dFdy(viewPos);
  return normalize(cross(fdx, fdy));
}
`
)
