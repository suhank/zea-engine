import {
    Color
} from '../../Math';
import {
    shaderLibrary
} from '../ShaderLibrary.js';
import {
    Material
} from '../Material.js';

import './GLSL/stack-gl/transpose.js';
import './GLSL/modelMatrix.js';

class PointsMaterial extends Material {
    
    constructor(name) {
        super(name);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('PointsMaterial.vertexShader', `
precision highp float;

<%include file="utils/quadVertexFromID.glsl"/>
<%include file="stack-gl/transpose.glsl"/>
<%include file="modelMatrix.glsl"/>

instancedattribute vec3 positions;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform float _pointSize;


/* VS Outputs */
varying vec2 v_coord;

void main(void) {
    mat4 modelMatrix = getModelMatrix();
    mat4 modelViewMatrix = viewMatrix * modelMatrix;

    vec4 viewPos = modelViewMatrix * vec4(positions, 1.0);
    vec2 quadVert = getQuadVertexPositionFromID();

    viewPos += vec4(quadVert, 0, 0) * _pointSize;

    gl_Position = projectionMatrix * viewPos;

    v_coord = quadVert;
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('PointsMaterial.fragmentShader', `
precision highp float;

varying vec2 v_coord;

uniform color _color;

void main(void) {
    float len = length(v_coord);
    if(len > 0.5)
        discard;

    gl_FragColor = _color;

    // Modulate the lighting using the texture coord so the point looks round.
    gl_FragColor.rgb = gl_FragColor.rgb * cos(len * 2.0);
}
`);
        this.addParameter('color', new Color(1.0, 1.0, 0.5));
        this.addParameter('opacity', 1.0);
        this.addParameter('pointSize', 0.1);
        this.finalize();
    }
};

export {
    PointsMaterial
};



