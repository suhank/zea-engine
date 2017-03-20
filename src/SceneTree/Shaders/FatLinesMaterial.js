import {
    Color
} from '../../Math';
import {
    shaderLibrary
} from '../ShaderLibrary.js';
import {
    Material
} from '../Material.js';

import './GLSL/stack-gl/transpose.js';
import './GLSL/modelMatrix.js';


class FatLinesMaterial extends Material {

    constructor(name) {
        super(name);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('FatLinesMaterial.vertexShader', `
precision highp float;

#define USE_POSITIONS_TEXTURE
#ifdef USE_POSITIONS_TEXTURE
instancedattribute vec2 segmentIndices;
#else
instancedattribute vec4 data_0;
instancedattribute vec4 data_1;
#endif
attribute float vertexIDs;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 cameraMatrix;

<%include file="stack-gl/transpose.glsl"/>
<%include file="modelMatrix.glsl"/>

#ifdef USE_POSITIONS_TEXTURE
uniform sampler2D positionsTexture;
uniform int positionsTextureSize;
#endif

uniform float _lineThickness;

/* VS Outputs */
varying vec4 v_viewPos;
varying vec3 v_viewNormal;
varying vec2 v_texCoord;

void main(void) {
    int vertexID = int(vertexIDs);

    mat4 modelMatrix = getModelMatrix();
    mat4 modelViewMatrix = viewMatrix * modelMatrix;

    vec3 viewPos;
#ifdef USE_POSITIONS_TEXTURE
    vec4 data_0, data_1;
    data_0 = texelFetch(positionsTexture, positionsTextureSize, int(segmentIndices.x));
    data_1 = texelFetch(positionsTexture, positionsTextureSize, int(segmentIndices.y));
#endif

    vec4 pos_0 = modelViewMatrix * vec4(data_0.xyz, 1.0);
    vec4 pos_1 = modelViewMatrix * vec4(data_1.xyz, 1.0);
    float lineThickness_0 = _lineThickness * data_0.w;
    float lineThickness_1 = _lineThickness * data_1.w;

    if(vertexID < 2){
        viewPos = pos_0.xyz;
    }
    else{
        viewPos = pos_1.xyz;
    }
    if(pos_1 != pos_0){
        vec3 segmentDir = normalize(pos_1.xyz - pos_0.xyz);
        vec3 viewVector = normalize(viewPos);
        vec3 biTangent = normalize(cross(segmentDir, viewVector));
        v_viewNormal = normalize(cross(segmentDir, biTangent));

        if(vertexID < 2){
            // Move the endpoints to overlap a bit more.
            //viewPos -= vec3(segmentDir * lineThickness_0 * 0.25);
            if(mod(vertexIDs, 2.0) == 0.0){
                viewPos += vec3(biTangent * lineThickness_0);
                v_texCoord.x = 1.0;
            }
            else{
                viewPos -= vec3(biTangent * lineThickness_0);
                v_texCoord.x = 0.0;
            }
            v_texCoord.y = 0.0;
        }
        else{
            // Move the endpoints to overlap a bit more.
            //viewPos += vec3(segmentDir * lineThickness_1 * 0.25);
            if(mod(vertexIDs, 2.0) == 0.0){
                viewPos += vec3(biTangent * lineThickness_1);
                v_texCoord.x = 1.0;
            }
            else{
                viewPos -= vec3(biTangent * lineThickness_1);
                v_texCoord.x = 0.0;
            }
            v_texCoord.y = 1.0;
        }

        // Move the line towards the viewer by the line thickness.
        // this is to avoid depth issues when lines are rendered over meshes. 
        viewPos.z -= (lineThickness_0 + lineThickness_1) * 0.25;
    }

    v_viewPos       = vec4(viewPos, 1.0);
    gl_Position = projectionMatrix * v_viewPos;
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('FatLinesMaterial.fragmentShader', `
precision highp float;

/* VS Outputs */
varying vec4 v_viewPos;
varying vec3 v_viewNormal;
varying vec2 v_texCoord;

uniform color _color;
uniform mat4 cameraMatrix;

void main(void) {
    int debugLevel = 0;
    if(debugLevel == 0){

        vec3 viewVector = mat3(cameraMatrix) * normalize(-v_viewPos.xyz);
        vec3 normal = mat3(cameraMatrix) * v_viewNormal;
        float NdotV = dot(normalize(normal), normalize(viewVector));

        // Modulate the lighting using the texture coord so the line looks round.
        NdotV *= cos((v_texCoord.x - 0.5) * 2.0);

        vec4 color = _color * NdotV;
        gl_FragColor = vec4(color.rgb, _color.a);
    }
    else{
        gl_FragColor = vec4(v_texCoord.x, 0.0, 0.0, 1.0);
    }
}
`);
        this.addParameter('color', new Color(1.0, 1.0, 0.5));
        this.addParameter('opacity', 1.0);
        this.finalize();
    }
};

export {
    FatLinesMaterial
};