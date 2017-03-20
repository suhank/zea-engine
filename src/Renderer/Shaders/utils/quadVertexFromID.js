import {
    shaderLibrary
} from '../../../SceneTree';

shaderLibrary.setShaderModule('utils/quadVertexFromID.glsl', `

attribute float vertexIDs;

vec2 getScreenSpaceVertexPosition(){

#ifdef GLSL_ES3
    const vec2 quadVertices[4] = vec2[4]( vec2(-0.5, -0.5), vec2(0.5, -0.5), vec2(-0.5, 0.5), vec2(0.5, 0.5) );
#else
    vec2 quadVertices[4];
    quadVertices[0] = vec2(-0.5, -0.5);
    quadVertices[1] = vec2(0.5, -0.5);
    quadVertices[2] = vec2(-0.5, 0.5);
    quadVertices[3] = vec2(0.5, 0.5);
#endif
    int vertexID = int(vertexIDs);
    if(vertexID == 0)
        return quadVertices[0];
    else if(vertexID == 1)
        return quadVertices[1];
    else if(vertexID == 2)
        return quadVertices[2];
    else if(vertexID == 3)
        return quadVertices[3];

    return vec2(0,0);
}
`);
