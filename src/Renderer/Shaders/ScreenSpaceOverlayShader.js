import {
    sgFactory
} from '../../SceneTree';
import {
    shaderLibrary
} from '../ShaderLibrary';
import {
    GLShader
} from '../GLShader.js';

class ScreenSpaceOverlayShader extends GLShader {
    constructor(gl) {
        super(gl);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('ScreenSpaceOverlayShader.vertexShader', `
precision highp float;

attribute vec3 positions;    //(location = 0)

uniform mat4 modelMatrix;

/* VS Outputs */

void main(void) {
    gl_Position = modelMatrix * vec4(positions.xy, 0.0, 1.0);
    gl_Position.x = -1.0+(gl_Position.x*2.0);
    gl_Position.y = 1.0-(gl_Position.y*2.0);
}

`);
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('ScreenSpaceOverlayShader.fragmentShader', `
precision highp float;

uniform color color;

void main(void) {
    gl_FragColor = color;
}
`);
    }
};

sgFactory.registerClass('ScreenSpaceOverlayShader', ScreenSpaceOverlayShader);
export {
    ScreenSpaceOverlayShader
};