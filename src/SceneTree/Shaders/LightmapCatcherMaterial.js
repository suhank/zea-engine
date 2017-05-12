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

<%include file="stack-gl/transpose.glsl"/>
<%include file="stack-gl/inverse.glsl"/>
<%include file="modelMatrix.glsl"/>

attribute float clusterIDs;
uniform vec2 lightmapSize;

/* VS Outputs */
varying vec2 v_lightmapCoord;

void main(void) {

    vec4 geomItemData = getInstanceData();

    vec4 pos = vec4(positions, 1.);
    mat4 modelMatrix = getModelMatrix();
    mat4 modelViewProjectionMatrix = projectionMatrix * viewMatrix * modelMatrix;
    gl_Position     = modelViewProjectionMatrix * pos;

    v_lightmapCoord = (lightmapCoords + geomItemData.xy) / lightmapSize;
}
`);
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('EnvProjectionShader.fragmentShader', `
precision highp float;

#ifdef ENABLE_INLINE_GAMMACORRECTION
<%include file="stack-gl/gamma.glsl"/>
#endif

/* VS Outputs */
varying vec2 v_lightmapCoord;

uniform sampler2D lightmap;

#ifdef ENABLE_INLINE_GAMMACORRECTION
uniform float exposure;
#endif

float luminanceFromRGB(vec3 rgb) {
    return 0.2126*rgb.r + 0.7152*rgb.g + 0.0722*rgb.b;
}

void main(void) {

    vec3 irradiance = texture2D(lightmap, v_lightmapCoord).rgb;
    gl_FragColor.rgb = irradiance * 0.25;
    gl_FragColor.a = 1.0;

#ifdef ENABLE_INLINE_GAMMACORRECTION
    gl_FragColor.rgb = toGamma(gl_FragColor.rgb * exposure);
#endif

}
`);
        this.addParameter('exposure', 1.0);
        this.addParameter('gamma', 2.2);
        this.finalize();
    }

    isTransparent() {
        return true;
    }

    bind(gl, renderstate) {
        gl.blendFunc(gl.DST_COLOR, gl.ZERO);
    }

    unbind(gl, renderstate){
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }
};


export {
    LightmapCatcherMaterial
};

