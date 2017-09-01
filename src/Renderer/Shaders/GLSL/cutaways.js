import { shaderLibrary } from '../../ShaderLibrary.js';

shaderLibrary.setShaderModule('cutaways.glsl', `


uniform vec3 _planeNormal;
uniform float _planeDist;

bool cutaway(vec3 worldPos) {

    vec3 planePos = _planeNormal * _planeDist;
    vec3 planeDir = worldPos - planePos;
    float planeOffset = dot(planeDir, _planeNormal);
    if(planeOffset < 0.0){
        discard;
        return true;
    }
    if(!gl_FrontFacing){
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
#ifdef GL_EXT_frag_depth
        gl_FragDepthEXT = 0.95;
#endif
        return true;
    }
    return  false;
}
`);