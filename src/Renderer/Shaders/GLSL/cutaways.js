import { shaderLibrary } from '../../ShaderLibrary.js';

shaderLibrary.setShaderModule('cutaways.glsl', `


uniform int _cutawayEnabled;
uniform vec3 _planeNormal;
uniform float _planeDist;
uniform color _cutColor;

#define RAY_EPS 0.0000001
struct Ray {
    vec3 start;
    vec3 dir;
};

float intersectRayPlane(Ray ray, Ray plane) {
    vec3 w = ray.start - plane.start;
    float D = dot(plane.dir, ray.dir);
    float N = dot(-plane.dir, w);

    if (abs(D) < RAY_EPS) {
        // segment is parallel to plane
        if (N == 0.0)
            return -1.0; // segment lies in plane
        else
            return -1.0; // no intersection
    }
    // they are not parallel
    // compute intersect param
    float sI = N / D;
    if (sI < -RAY_EPS) {
        return -1.0; // no intersection
    }
    return sI;
}

bool cutaway(vec3 worldPos, out vec4 fragColor) {
    if(_cutawayEnabled == 0)
        return false;

    vec3 planePos = _planeNormal * _planeDist;
    vec3 planeDir = worldPos - planePos;
    float planeOffset = dot(planeDir, _planeNormal);
    if(planeOffset < 0.0){
        discard;
        return true;
    }
    if(!gl_FrontFacing){
        fragColor = _cutColor;

        // Note: Moving the backfacing fragements forward onto the cutting plane.
        // This can never work, because it means back facing fragments will be rendered over 
        // front facing fragments that are closer to the camera (but behind the cutting plane)
// #ifdef GL_EXT_frag_depth
//         vec3 cameraPos = vec3(cameraMatrix[3][0], cameraMatrix[3][1], cameraMatrix[3][2]);
//         vec3 viewDir = normalize(mat3(cameraMatrix) * normalize(v_viewPos));
//         float dist = intersectRayPlane(Ray(cameraPos, viewDir), Ray(planePos, planeDir));
//         if(dist > 0.0) {
//             vec3 cutworldPos = cameraPos + (viewDir * dist);
//             vec4 projPos = (projectionMatrix * viewMatrix) * vec4(cutworldPos, 1.0);
//             gl_FragDepthEXT = projPos.z / projPos.w;
//         }
// #endif
        return true;
    }
    return  false;
}
`);