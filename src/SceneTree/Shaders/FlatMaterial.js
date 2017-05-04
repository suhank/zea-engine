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

class FlatMaterial extends Material {
    
    constructor(name) {
        super(name);

        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('FlatMaterial.vertexShader', `
precision highp float;

attribute vec3 positions;    //(location = 0)

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

<%include file="stack-gl/transpose.glsl"/>
<%include file="modelMatrix.glsl"/>

/* VS Outputs */
varying vec4 v_viewPos;


void main(void) {
    mat4 modelMatrix = getModelMatrix();
    mat4 modelViewMatrix = viewMatrix * modelMatrix;

    v_viewPos = (modelViewMatrix * vec4(positions, 1.0));
    gl_Position = projectionMatrix * v_viewPos;
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('FlatMaterial.fragmentShader', `
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

void main(void) {

    vec4 baseColor = _baseColor;//toLinear(_baseColor);
    float opacity = _opacity;

    vec3 viewNormal = normalize(cross(dFdy(v_viewPos.xyz), dFdx(v_viewPos.xyz)));

    int debugLevel = 0;
    if(debugLevel == 0){
        vec3 viewVector = mat3(cameraMatrix) * normalize(v_viewPos.xyz);
        vec3 worldNormal = mat3(cameraMatrix) * viewNormal;
        float NdotV = dot(normalize(worldNormal),normalize(viewVector));

        vec4 color = baseColor * NdotV;
        gl_FragColor = vec4(color.rgb, opacity);
    }
    else if(debugLevel == 1){
        // Display the world normal
        vec3 viewVector = mat3(cameraMatrix) * normalize(v_viewPos.xyz);
        vec3 worldNormal = mat3(cameraMatrix) * viewNormal;
        gl_FragColor = vec4(worldNormal, opacity);
    }
    else{
        vec3 wsnormal = mat3(cameraMatrix) * viewNormal;
        vec4 color = vec4(abs(wsnormal.x), abs(wsnormal.y), abs(wsnormal.z), 1.0) * abs(viewNormal.z);
        gl_FragColor = vec4(color.rgb, opacity);
    }


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

sgFactory.registerClass('FlatMaterial', FlatMaterial);

export {
    FlatMaterial
};