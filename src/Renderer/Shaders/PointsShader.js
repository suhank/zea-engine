import {
    sgFactory
} from '../../SceneTree';
import {
    shaderLibrary
} from '../ShaderLibrary';
import {
    Shader
} from '../Shader';

import './GLSL/stack-gl/inverse.js';
import './GLSL/stack-gl/transpose.js';

class PointsShader extends Shader {

    constructor(name) {
        super(name);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('PointsShader.vertexShader', `
precision highp float;

attribute vec3 positions;    //(location = 0)

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform float pointSize;

/* VS Outputs */

void main(void) {
    mat4 modelViewProjectionMatrix = projectionMatrix * viewMatrix * modelMatrix;
    gl_Position = modelViewProjectionMatrix * vec4(positions, 1.0);
    gl_PointSize = pointSize;
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('PointsShader.fragmentShader', `
precision highp float;

uniform color pointColor;

void main(void) {
    gl_FragColor = pointColor;
}
`);
    }
};

sgFactory.registerClass('PointsShader', PointsShader);
export {
    PointsShader
};