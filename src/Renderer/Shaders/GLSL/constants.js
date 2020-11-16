import { shaderLibrary } from '../../ShaderLibrary.js'

shaderLibrary.setShaderModule(
  'math/constants.glsl',
  `

#define PI 3.141592653589793
#define TwoPI (2.0 * PI)
#define HalfPI (0.5 * PI)


const int ENVMAP_FLAG_HEADLIGHT =  1; // 1<<0;

const int GEOMITEM_FLAG_CUTAWAY =  1; // 1<<0;


`
)
