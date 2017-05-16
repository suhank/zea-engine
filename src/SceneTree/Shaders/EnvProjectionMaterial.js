import {
    Color,
    Vec3
} from '../../Math';
import {
    shaderLibrary,
    Material
} from '../../SceneTree';

import '../../SceneTree/Shaders/GLSL/stack-gl/inverse.js';
import '../../SceneTree/Shaders/GLSL/stack-gl/transpose.js';
import '../../SceneTree/Shaders/GLSL/envmap-octahedral.js';
import './GLSL/modelMatrix.js';

class EnvProjectionMaterial extends Material {
    
    constructor() {
        super();
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('FlatMaterial.vertexShader', `
precision highp float;

attribute vec3 positions;    //(location = 0)

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 _projectionCenter;

<%include file="stack-gl/inverse.glsl"/>
<%include file="stack-gl/transpose.glsl"/>
<%include file="modelMatrix.glsl"/>

/* VS Outputs */
varying vec3 v_worldDir;
 
void main()
{
    vec4 pos = vec4(positions, 1.);
    mat4 modelMatrix = getModelMatrix();
    mat4 modelViewProjectionMatrix = projectionMatrix * viewMatrix * modelMatrix;

    gl_Position = modelViewProjectionMatrix * pos;

    vec4 worldPos = modelMatrix * pos;
    v_worldDir = worldPos.xyz - _projectionCenter;
}

`);
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('EnvProjectionShader.fragmentShader', `
precision highp float;

<%include file="math/constants.glsl"/>
<%include file="glslutils.glsl"/>
<%include file="pragmatic-pbr/envmap-octahedral.glsl"/>
<%include file="stack-gl/gamma.glsl"/>

uniform color _env;
uniform sampler2D _envTex;
uniform bool _envTexConnected;

uniform float _gamma;
uniform float _exposure;

/* VS Outputs */
varying vec3 v_worldDir;
varying vec2 v_texCoord;

void main(void) {

    vec2 uv = normalToUvSphOct(normalize(v_worldDir));
    vec4 texel = texture2D(_envTex, uv);
    gl_FragColor = vec4(texel.rgb/texel.a, 1.0);

    gl_FragColor.rgb = toGamma(gl_FragColor.rgb * _exposure, _gamma);
}
`);
        this.addParameter('env', new Color(1.0, 1.0, 0.5));
        this.addParameter('projectionCenter', new Vec3(0.0, 1.7, 0.0));
        this.addParameter('exposure', 1.0);
        this.addParameter('gamma', 2.2);
        this.finalize();
    }
};


export {
    EnvProjectionMaterial
};

