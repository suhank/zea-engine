import {
    Color,
    Vec3
} from '../../Math';
import {
    sgFactory,
    Image2D
} from '../../SceneTree';
import {
    Shader
} from '../Shader.js';
import {
    shaderLibrary
} from '../ShaderLibrary.js';

import './GLSL/stack-gl/inverse.js';
import './GLSL/stack-gl/transpose.js';
import './GLSL/envmap-equirect.js';
import './GLSL/envmap-octahedral.js';
import './GLSL/modelMatrix.js';

class ShadowCatcherShader extends Shader {
    constructor(gl) {
        super(gl);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('FlatShader.vertexShader', `
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
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('ShadowCatcherShader.fragmentShader', `
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

    vec4 env = _env;
    if(_envTexConnected) {
        vec2 uv = normalToUvSphOct(normalize(v_worldDir));
        env = texture2D(_envTex, uv);
    }

    vec3 irradiance = texture2D(lightmap, v_lightmapCoord).rgb * _shadowMultiplier;
    float irradianceLum = clamp(luminanceFromRGB(irradiance), 0.0, 1.0);

    gl_FragColor = vec4(env.rgb/env.a, 1.0);
    gl_FragColor.rgb = mix(gl_FragColor.rgb * irradiance, gl_FragColor.rgb, irradianceLum);

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

    bind(renderstate, key) {
        if (renderstate.pass != 'ADD')
            return false;
        return super.bind(renderstate, key);
    }
};

sgFactory.registerClass('ShadowCatcherShader', ShadowCatcherShader);


class FloatingShadowCatcherShader extends ShadowCatcherShader {
    
    constructor() {
        super();
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('FloatingShadowCatcherShader.fragmentShader', `
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

#ifdef ENABLE_INLINE_GAMMACORRECTION
uniform float exposure;
#endif

void main(void) {

    vec3 irradiance = texture2D(lightmap, v_lightmapCoord).rgb * _shadowMultiplier;

    // This material works by multiplying the image buffer values by the luminance in the lightmap.
    // 
    gl_FragColor.rgb = pow(irradiance, vec3(1.0/_shadowMultiplier));
    gl_FragColor.a = 1.0;

#ifdef ENABLE_INLINE_GAMMACORRECTION
    gl_FragColor.rgb = toGamma(gl_FragColor.rgb * exposure);
#endif

}
`);
    }

    isTransparent() {
        return true;
    }

    bind(renderstate, key) {
        if (renderstate.pass != 'MULTIPLY')
            return false;
        return super.bind(renderstate, key);
    }
};

sgFactory.registerClass('FloatingShadowCatcherShader', FloatingShadowCatcherShader);

export {
    LightmapCatcherShader
};

