import { Color } from '../../Math/Color';
import { shaderLibrary } from '../ShaderLibrary.js';
import { Material } from '../Material.js';
import './GLSL/stack-gl/transpose.js';
import './GLSL/modelMatrix.js';

class LinesMaterial extends Material {

    constructor(name) {
        super(name);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('LinesMaterial.vertexShader', `
precision highp float;

attribute vec3 positions;    //(location = 0)

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

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('LinesMaterial.fragmentShader', `
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
export {
    LinesMaterial
};
// LinesMaterial;