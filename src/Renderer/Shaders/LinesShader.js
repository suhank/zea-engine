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
    GLShader
} from '../GLShader.js';
import './GLSL/stack-gl/transpose.js';
import './GLSL/modelMatrix.js';

class LinesShader extends GLShader {
    constructor(gl) {
        super(gl);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('LinesShader.vertexShader', `
precision highp float;

attribute vec3 positions;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

<%include file="stack-gl/transpose.glsl"/>
<%include file="modelMatrix.glsl"/>

/* VS Outputs */

void main(void) {
    mat4 modelMatrix = getModelMatrix();
    mat4 modelViewProjectionMatrix = projectionMatrix * viewMatrix * modelMatrix;
    gl_Position = modelViewProjectionMatrix * vec4(positions, 1.0);
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('LinesShader.fragmentShader', `
precision highp float;

uniform color _color;

void main(void) {
    gl_FragColor = _color;
}
`);
        this.addParameter('color', new Color(1.0, 1.0, 0.5));
        this.addParameter('opacity', 1.0);
        this.finalize();
    }
};

sgFactory.registerClass('LinesShader', LinesShader);
export {
    LinesShader
};