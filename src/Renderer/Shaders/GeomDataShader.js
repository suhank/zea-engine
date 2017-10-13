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


varying vec3 v_viewPos;
varying float v_drawItemID;

void main(void) {
    mat4 modelMatrix = getModelMatrix();
    mat4 modelViewMatrix = viewMatrix * modelMatrix;
    vec4 viewPos = modelViewMatrix * vec4(positions, 1.0);
    gl_Position = projectionMatrix * viewPos;

    v_viewPos = -v_viewPos.xyz;

    v_drawItemID = float(getID());
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('GeomDataShader.fragmentShader', `
precision highp float;

varying vec3 v_viewPos;
varying float v_drawItemID;

void main(void) {
    gl_FragColor.x = mod(v_drawItemID, 255.0) / 255.0;
    gl_FragColor.y = mod(v_drawItemID, (255.0 * 255.0)) / (255.0 * 255.0);


    // TODO: encode the dist as a 16 bit float
    // http://concord-consortium.github.io/lab/experiments/webgl-gpgpu/script.js
    gl_FragColor.a = length(v_viewPos);
}
`);
    }
};

export {
    GeomDataShader
};
