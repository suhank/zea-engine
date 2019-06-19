import {
    sgFactory
} from '../../SceneTree';
import {
    shaderLibrary
} from '../ShaderLibrary';
import {
    GLShader
} from '../GLShader.js';

import './GLSL/stack-gl/inverse.js';
import './GLSL/stack-gl/transpose.js';

class PointsShader extends GLShader {
    constructor(gl) {
        super(gl);
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

#ifdef ENABLE_ES3
out vec4 fragColor;
#endif

void main(void) {

#ifndef ENABLE_ES3
    vec4 fragColor;
#endif

#ifndef ENABLE_ES3
    gl_FragColor = fragColor;
#endif
}
`);
    }
};

sgFactory.registerClass('PointsShader', PointsShader);
export {
    PointsShader
};