import {
    shaderLibrary,
    Shader
} from '../../SceneTree/SceneTree.js';

import '../../SceneTree/Shaders/GLSL/stack-gl/inverse.js';
import '../../SceneTree/Shaders/GLSL/stack-gl/transpose.js';

class GeomDataShader extends Shader {
    
    constructor(name) {
        super(name);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('GeomDataShader.vertexShader', `
precision highp float;

attribute vec3 positions;    //(location = 0)

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

/* VS Outputs */
varying vec4 v_viewPos;
varying vec3 v_viewNormal;
varying vec2 v_texCoord;

void main(void) {
    mat4 modelViewProjectionMatrix = projectionMatrix * viewMatrix * modelMatrix;
    gl_Position = modelViewProjectionMatrix * vec4(positions, 1.0);
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('GeomDataShader.fragmentShader', `
precision highp float;

uniform vec4 geomData;

void main(void) {
    gl_FragColor = geomData;
}
`);
    }
};

export {
    GeomDataShader
};
