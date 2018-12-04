import { shaderLibrary }  from '../ShaderLibrary';
import { GLShader }  from '../GLShader.js';
import {
    sgFactory
} from '../../SceneTree';

import './GLSL/stack-gl/inverse.js';
import './GLSL/stack-gl/transpose.js';
import './GLSL/modelMatrix.js';

class SelectedGeomsShader extends GLShader {
    constructor(gl, floatGeomBuffer) {
        super(gl);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('SelectedGeomsShader.vertexShader', `
precision highp float;

attribute vec3 positions;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

<%include file="stack-gl/transpose.glsl"/>
<%include file="modelMatrix.glsl"/>


void main(void) {
    mat4 modelMatrix = getModelMatrix();
    mat4 modelViewMatrix = viewMatrix * modelMatrix;
    vec4 viewPos = modelViewMatrix * vec4(positions, 1.0);
    gl_Position = projectionMatrix * viewPos;
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('SelectedGeomsShader.fragmentShader', `
precision highp float;

#ifdef ENABLE_ES3
    out vec4 fragColor;
#endif
void main(void) {

#ifndef ENABLE_ES3
    vec4 fragColor;
#endif

    fragColor = vec4(1.0);


#ifndef ENABLE_ES3
    gl_FragColor = fragColor;
#endif
}
`);
    }
};

sgFactory.registerClass('SelectedGeomsShader', SelectedGeomsShader);
export {
    SelectedGeomsShader
};
