import { shaderLibrary }  from '../ShaderLibrary';
import { GLShader }  from '../GLShader.js';

import './GLSL/stack-gl/inverse.js';
import './GLSL/stack-gl/transpose.js';
import './GLSL/modelMatrix.js';

class GeomDataShader extends GLShader {
    constructor(gl) {
        super(gl);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('GeomDataShader.vertexShader', `
precision highp float;

attribute vec3 positions;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

<%include file="stack-gl/transpose.glsl"/>
<%include file="modelMatrix.glsl"/>


varying vec4 v_viewPos;
varying vec4 v_geomData;

void main(void) {
    mat4 modelMatrix = getModelMatrix();
    mat4 modelViewMatrix = viewMatrix * modelMatrix;
    v_viewPos = modelViewMatrix * vec4(positions, 1.0);
    gl_Position = projectionMatrix * v_viewPos;

    int id = getID();
    v_geomData.x = float(id);
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('GeomDataShader.fragmentShader', `
precision highp float;

varying vec4 v_viewPos;
varying vec4 v_geomData;

void main(void) {
    gl_FragColor = v_geomData;
    gl_FragColor.a = length(v_viewPos.xyz);
}
`);
    }
};

export {
    GeomDataShader
};
