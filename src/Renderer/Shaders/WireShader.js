
import {
    shaderLibrary
} from '../../SceneTree/ShaderLibrary.js';
import {
    Shader
} from '../../SceneTree/Shader.js';

import '../../SceneTree/Shaders/GLSL/stack-gl/inverse.js';
import '../../SceneTree/Shaders/GLSL/stack-gl/transpose.js';

class WireShader extends Shader {
    
    constructor(name) {
        super(name);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('WireShader.vertexShader', `
precision highp float;

attribute vec3 positions;    //(location = 0)

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

/* VS Outputs */

void main(void) {
    mat4 modelViewProjectionMatrix = projectionMatrix * viewMatrix * modelMatrix;
    gl_Position = modelViewProjectionMatrix * vec4(positions, 1.0);

    // Apply the perspective transform, and then move the vertices
    //  towards the camera by a tiny little bit...
    gl_Position.z -= 0.001 / gl_Position.w;
    //gl_Position.z *= 0.999;
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('WireShader.fragmentShader', `
precision highp float;

uniform color wireColor;

void main(void) {
    gl_FragColor = wireColor;
}
`);
    }
};

export {
    WireShader
};



