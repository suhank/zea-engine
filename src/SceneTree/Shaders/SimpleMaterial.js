import {
    Color
} from '../../Math';
import {
    sgFactory
} from '../SGFactory.js';
import {
    shaderLibrary
} from '../ShaderLibrary.js';
import {
    Material
} from '../Material.js';

import './GLSL/stack-gl/transpose.js';
import './GLSL/stack-gl/gamma.js';
import './GLSL/modelMatrix.js';

class SimpleMaterial extends Material {
    
    constructor(name) {
        super(name);

        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('SimpleMaterial.vertexShader', `
precision highp float;

attribute vec3 positions;
attribute vec3 normals;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

<%include file="stack-gl/transpose.glsl"/>
<%include file="stack-gl/inverse.glsl"/>
<%include file="modelMatrix.glsl"/>

/* VS Outputs */
varying vec4 v_viewPos;
varying vec3 v_viewNormal;

void main(void) {

    mat4 modelMatrix = getModelMatrix();
    mat4 modelViewMatrix = viewMatrix * modelMatrix;
    vec4 viewPos    = modelViewMatrix * vec4(positions, 1.);
    gl_Position = projectionMatrix * viewPos;

    mat3 normalMatrix = mat3(transpose(inverse(viewMatrix * modelMatrix)));
    v_viewPos       = -viewPos;
    v_viewNormal    = normalMatrix * normals;
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('SimpleMaterial.fragmentShader', `
#extension GL_OES_standard_derivatives : enable
precision highp float;

#ifdef ENABLE_INLINE_GAMMACORRECTION

<%include file="stack-gl/gamma.glsl"/>

#endif

uniform mat4 cameraMatrix;

uniform color _baseColor;
uniform float _opacity;

/* VS Outputs */
varying vec4 v_viewPos;
varying vec3 v_viewNormal;

void main(void) {

    vec4 baseColor = toLinear(_baseColor);
    float opacity = _opacity;

    // Hacky simple irradiance. 
    vec3 viewVector = normalize(mat3(cameraMatrix) * normalize(v_viewPos.xyz));
    vec3 normal = normalize(mat3(cameraMatrix) * v_viewNormal);
    float ndotv = dot(normal, viewVector);
    if(ndotv < 0.0){
        normal = -normal;
        ndotv = dot(normal, viewVector);

        // Note: these 2 lines can be used to debug inverted meshes.
        //baseColor = vec4(1.0, 0.0, 0.0, 1.0);
        //ndotv = 1.0;
    }
    gl_FragColor = vec4(ndotv * baseColor.rgb, opacity);

#ifdef ENABLE_INLINE_GAMMACORRECTION
    gl_FragColor.rgb = toGamma(gl_FragColor.rgb);
#endif

}
`);

        this.addParameter('baseColor', new Color(1.0, 1.0, 0.5));
        this.addParameter('opacity', 1.0);
        this.nonSelectable = true;
        this.finalize();
    }
};

sgFactory.registerClass('SimpleMaterial', SimpleMaterial);

export {
    SimpleMaterial
};