import {
    Color
} from '../../Math';
import {
    sgFactory
} from '../../SceneTree';
import {
    shaderLibrary
} from '../ShaderLibrary.js';
import {
    Shader
} from '../Shader.js';
import './GLSL/stack-gl/transpose.js';
import './GLSL/modelMatrix.js';

class FatLinesShader extends Shader {
    constructor(gl) {
        super(gl);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('FatLinesShader.vertexShader', `
precision highp float;

instancedattribute vec2 segmentIndices;
attribute float vertexIDs;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 cameraMatrix;

<%include file="stack-gl/transpose.glsl"/>
<%include file="modelMatrix.glsl"/>

uniform sampler2D positionsTexture;
uniform int positionsTextureSize;

uniform float _lineThickness;

/* VS Outputs */
varying vec4 v_viewPos;
varying vec3 v_viewNormal;
varying vec2 v_texCoord;

void main(void) {
    int vertexID = int(vertexIDs);

    mat4 modelMatrix = getModelMatrix();
    mat4 modelViewMatrix = viewMatrix * modelMatrix;

    int seqentialIndex_0 = int(mod(segmentIndices.x, 2.));
    int seqentialIndex_1 = int(mod(segmentIndices.y, 2.));
    int index_0 = int(segmentIndices.x) / 2;
    int index_1 = int(segmentIndices.y) / 2;

    vec3 viewPos;
    vec4 data_0 = texelFetch(positionsTexture, positionsTextureSize, index_0);
    vec4 data_1 = texelFetch(positionsTexture, positionsTextureSize, index_1);

    vec4 pos_0 = modelViewMatrix * vec4(data_0.xyz, 1.0);
    vec4 pos_1 = modelViewMatrix * vec4(data_1.xyz, 1.0);
    // Note: multiply the per-vertex line thickness with the line thickness uniform value;
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

        if(vertexID < 2){
            vec3 segmentStartDir = segmentDir;
            if(seqentialIndex_0 != 0){
                // TODO: if index_0 == 0, get the last index in the line as previous
                int index_prev = index_0-1;
                vec4 data_prev = texelFetch(positionsTexture, positionsTextureSize, index_prev);
                vec4 pos_prev = modelViewMatrix * vec4(data_prev.xyz, 1.0);
                segmentStartDir = normalize(pos_1.xyz - pos_prev.xyz);
            }
            vec3 startBiTangent = normalize(cross(segmentStartDir, viewVector));
            v_viewNormal = normalize(cross(segmentStartDir, startBiTangent));
            // Move the endpoints to overlap a bit more.
            //viewPos -= vec3(segmentStartDir * lineThickness_0 * 0.25);
            if(mod(vertexIDs, 2.0) == 0.0){
                viewPos += vec3(startBiTangent * lineThickness_0);
                v_texCoord.x = 1.0;
            }
            else{
                viewPos -= vec3(startBiTangent * lineThickness_0);
                v_texCoord.x = 0.0;
            }
            v_texCoord.y = 0.0;
        }
        else{
            vec3 segmentEndDir = segmentDir;
            if(seqentialIndex_1 != 0){
                // TODO: if index_0 == numPoints-1, get the first index in the line as previous
                int index_next = index_1+1;
                vec4 data_next = texelFetch(positionsTexture, positionsTextureSize, index_next);
                vec4 pos_next = modelViewMatrix * vec4(data_next.xyz, 1.0);
                segmentEndDir = normalize(pos_next.xyz - pos_0.xyz);
            }
            vec3 endBiTangent = normalize(cross(segmentEndDir, viewVector));
            v_viewNormal = normalize(cross(segmentEndDir, endBiTangent));
            // Move the endpoints to overlap a bit more.
            //viewPos += vec3(segmentEndDir * lineThickness_1 * 0.25);
            if(mod(vertexIDs, 2.0) == 0.0){
                viewPos += vec3(endBiTangent * lineThickness_1);
                v_texCoord.x = 1.0;
            }
            else{
                viewPos -= vec3(endBiTangent * lineThickness_1);
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

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('FatLinesShader.fragmentShader', `
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
sgFactory.registerClass('FatLinesShader', FatLinesShader);
export {
    FatLinesShader
};