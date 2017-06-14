import { shaderLibrary }  from '../ShaderLibrary';
import { Shader }  from '../Shader';

class GizmoShader extends Shader {
    constructor(gl) {
        super(gl);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('WireShader.vertexShader', `
precision highp float;

attribute vec3 positions;    //(location = 0)

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform mat4 cameraMatrix;
uniform bool isOrthographic;
uniform bool fixedScreenSpaceSize;
uniform float fovY;
uniform vec2 viewportFrustumSize;

/* VS Outputs */

void main(void) {
    mat4 modelViewProjectionMatrix = projectionMatrix * viewMatrix * modelMatrix;

    if(fixedScreenSpaceSize){
        vec3 scaledPos = positions;
        if(isOrthographic){
            // this constant value renders the geometry approximately the same size in the orthographic viewport to the perspective. 
            float sizeFudge = 0.003;
            scaledPos *= viewportFrustumSize.y * sizeFudge;
        }
        else{
            vec3 cameraPos = vec3(cameraMatrix[3][0], cameraMatrix[3][1], cameraMatrix[3][2]);
            vec3 geomPos = vec3(modelMatrix[3][0], modelMatrix[3][1], modelMatrix[3][2]);
            float dist = length(cameraPos - geomPos);
            float scaleFactor = dist * fovY * 0.12;
            scaledPos *= scaleFactor;
        }
        gl_Position = modelViewProjectionMatrix * vec4(scaledPos, 1.0);
    }
    else{
        gl_Position = modelViewProjectionMatrix * vec4(positions, 1.0);
    }
}
`);
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('GizmoShader.fragmentShader', `
precision highp float;

uniform color color;

void main(void) {
    gl_FragColor = color;
}
`);
    }
};

class GizmoDataShader extends Shader {
    constructor(gl) {
        super(gl);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('GizmoDataShader.vertexShader', `
precision highp float;

attribute vec3 positions;    //(location = 0)

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform mat4 cameraMatrix;
uniform bool isOrthographic;
uniform float fovY;
uniform vec2 viewportFrustumSize;

/* VS Outputs */
varying vec4 v_viewPos;
varying vec3 v_viewNormal;
varying vec2 v_texCoord;

void main(void) {
    mat4 modelViewProjectionMatrix = projectionMatrix * viewMatrix * modelMatrix;
    //gl_Position = modelViewProjectionMatrix * vec4(positions, 1.0);

    vec3 scaledPos = positions;
    if(isOrthographic){
        // this constant value renders the geometry approximately the same size in the orthographic viewport to the perspective. 
        float sizeFudge = 0.003;
        scaledPos *= viewportFrustumSize.y * sizeFudge;
    }
    else{
        vec3 cameraPos = vec3(cameraMatrix[3][0], cameraMatrix[3][1], cameraMatrix[3][2]);
        vec3 geomPos = vec3(modelMatrix[3][0], modelMatrix[3][1], modelMatrix[3][2]);
        float dist = length(cameraPos - geomPos);
        float scaleFactor = dist * fovY * 0.12;
        scaledPos *= scaleFactor;
    }
    gl_Position = modelViewProjectionMatrix * vec4(scaledPos, 1.0);
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('GizmoDataShader.fragmentShader', `
precision highp float;

uniform vec4 geomData;

void main(void) {
    gl_FragColor = geomData;
}
`);
    }
};


export {
    GizmoDataShader,
    GizmoShader
};
