import {
    Color,
    Vec3
} from '../../Math';
import {
    shaderLibrary,
    Material,
    Image2D
} from '../../SceneTree';

import '../../SceneTree/Shaders/GLSL/stack-gl/inverse.js';
import '../../SceneTree/Shaders/GLSL/stack-gl/transpose.js';
import '../../SceneTree/Shaders/GLSL/envmap-equirect.js';
import '../../SceneTree/Shaders/GLSL/envmap-octahedral.js';
import './GLSL/modelMatrix.js';

class LightmapCatcherMaterial extends Material {
    
    constructor() {
        super();
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('FlatMaterial.vertexShader', `
precision highp float;

attribute vec3 positions;
attribute vec2 lightmapCoords;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 _projectionCenter;

<%include file="stack-gl/transpose.glsl"/>
<%include file="stack-gl/inverse.glsl"/>
<%include file="modelMatrix.glsl"/>

attribute float clusterIDs;
uniform vec2 lightmapSize;

/* VS Outputs */
varying vec2 v_lightmapCoord;
varying vec3 v_worldDir;

void main(void) {

    vec4 geomItemData = getInstanceData();

    vec4 pos = vec4(positions, 1.);
    mat4 modelMatrix = getModelMatrix();
    mat4 modelViewProjectionMatrix = projectionMatrix * viewMatrix * modelMatrix;
    gl_Position     = modelViewProjectionMatrix * pos;

    vec4 worldPos = modelMatrix * pos;
    v_worldDir = worldPos.xyz - _projectionCenter;

    v_lightmapCoord = (lightmapCoords + geomItemData.xy) / lightmapSize;
}
`);
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('EnvProjectionShader.fragmentShader', `
precision highp float;

<%include file="math/constants.glsl"/>
<%include file="glslutils.glsl"/>
<%include file="pragmatic-pbr/envmap-octahedral.glsl"/>
#ifdef ENABLE_INLINE_GAMMACORRECTION
<%include file="stack-gl/gamma.glsl"/>
#endif

/* VS Outputs */
varying vec2 v_lightmapCoord;
varying vec3 v_worldDir;

uniform sampler2D lightmap;
uniform float _shadowMultiplier;

uniform color _env;
uniform sampler2D _envTex;
uniform bool _envTexConnected;

#ifdef ENABLE_INLINE_GAMMACORRECTION
uniform float exposure;
#endif

float luminanceFromRGB(vec3 rgb) {
    return 0.2126*rgb.r + 0.7152*rgb.g + 0.0722*rgb.b;
}

void main(void) {

    vec2 uv = normalToUvSphOct(normalize(v_worldDir));
    vec3 irradiance = texture2D(lightmap, v_lightmapCoord).rgb * _shadowMultiplier;
    float irradianceLum = clamp(luminanceFromRGB(irradiance), 0.0, 1.0);
    if(_envTexConnected) {
        vec4 env = texture2D(_envTex, uv);
        gl_FragColor = vec4(env.rgb/env.a, 1.0);
        gl_FragColor.rgb = mix(gl_FragColor.rgb * irradiance, gl_FragColor.rgb, irradianceLum);
    }
    else {
        gl_FragColor = _env * irradianceLum;
        gl_FragColor.a = 1.0;
    }
#ifdef ENABLE_INLINE_GAMMACORRECTION
    gl_FragColor.rgb = toGamma(gl_FragColor.rgb * exposure);
#endif

}
`);
        this.addParameter('env', new Color(0.7, 0.7, 0.95));
        this.addParameter('projectionCenter', new Vec3(0.0, 1.7, 0.0));
        this.addParameter('shadowMultiplier', 1.0);
        this.finalize();
    }

    isTransparent() {
        return !(this.env instanceof Image2D);
    }

    // bind(gl, renderstate) {
    //     gl.blendFunc(gl.DST_COLOR, gl.ZERO);
    // }

    // unbind(gl, renderstate){
    //     gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    // }
};


export {
    LightmapCatcherMaterial
};

