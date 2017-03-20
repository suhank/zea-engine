import {
    shaderLibrary,
    Shader
} from '../../SceneTree';

import '../../SceneTree/Shaders/GLSL/Florian/Lookup.js';
import '../../SceneTree/Shaders/GLSL/stack-gl/diffuse-lambert.js';

class IrradianceMapAccumulate extends Shader {
    
    constructor() {
        super();
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('IrradianceMapAccumulate.vertexShader', `
precision highp float;

uniform mat4 modelMatrix;

attribute vec3 positions;        //(location = 0)
attribute vec3 normals;          //(location = 1)
attribute vec2 irradianceMapCoords;   //(location = 2)

uniform mat4 lightViewMatrix;
uniform mat4 lightProjectionMatrix;
uniform vec2 irradianceMapSize;
uniform vec2 irradianceMapCoordsOffset;

/* VS Outputs */
varying vec3 v_normal;
varying vec2 v_depthMapCoords;
varying float v_depth;

void main(void) {
    mat4 mvpMatrix = lightProjectionMatrix * lightViewMatrix * modelMatrix;
    vec4 lightSpacePos = mvpMatrix * vec4(positions, 1.0);

    mat3 normalMatrix = mat3(modelMatrix);
    v_normal = normalMatrix * normals;

    v_depthMapCoords = ((lightSpacePos.xy + 1.0) * 0.5);
    v_depth = (lightSpacePos.z / lightSpacePos.w) * 0.5 + 0.5;

    vec2 screenCoords = ((((irradianceMapCoordsOffset+irradianceMapCoords) / irradianceMapSize) - 0.5) * 2.0);
    //screenCoords += irradianceMapBorders * borderWidth;
    gl_Position = vec4(screenCoords.xy, 0.0, 1.0);
}
`);
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('IrradianceMapAccumulate.fragmentShader', `
#extension GL_OES_standard_derivatives : enable
precision highp float;

<%include file="Florian/Lookup.glsl"/>
<%include file="stack-gl/diffuse-lambert.glsl" block="main"/>

uniform sampler2D depthTexture; // texture 1
uniform vec2 depthTextureSize;
uniform vec3 lightSourceDir;
uniform float totalLuminance;
uniform sampler2D envMap;       // texture 0

/* VS Outputs */
varying vec3 v_normal;
varying vec2 v_depthMapCoords;
varying float v_depth;

float texture2DCompare(sampler2D depths, vec2 uv, float compare){
    float depth = texture2D(depths, uv).r;
    return step(compare, depth);
}

float texture2DShadowLerp(sampler2D depths, vec2 size, vec2 uv, float compare){
    vec2 texelSize = vec2(1.0)/size;
    vec2 f = fract(uv*size+0.5);
    vec2 centroidUV = floor(uv*size+0.5)/size;

    float lb = texture2DCompare(depths, centroidUV+texelSize*vec2(0.0, 0.0), compare);
    float lt = texture2DCompare(depths, centroidUV+texelSize*vec2(0.0, 1.0), compare);
    float rb = texture2DCompare(depths, centroidUV+texelSize*vec2(1.0, 0.0), compare);
    float rt = texture2DCompare(depths, centroidUV+texelSize*vec2(1.0, 1.0), compare);
    float a = mix(lb, lt, f.y);
    float b = mix(rb, rt, f.y);
    float c = mix(a, b, f.x);
    return c;
}

const int shadowTechnique = 2;
float isIlluminated(){
    float illuminated = 0.0;
    if(shadowTechnique == 0){
        illuminated = 1.0;
    }
    else if(shadowTechnique == 1){
        float texDepth = texture2D(depthTexture, v_depthMapCoords).x;
        if(texDepth < v_depth - 0.005)
            illuminated = 0.0;
        else
            illuminated = 1.0;
    }
    else if(shadowTechnique == 2){
        illuminated = texture2DShadowLerp(depthTexture, depthTextureSize, v_depthMapCoords, v_depth - 0.005);
    }
    return illuminated;
}

float luminanceFromRGB(vec3 rgb){
    return 0.2126*rgb.r + 0.7152*rgb.g + 0.0722*rgb.b;
}

const int debugId = 0;
void main(void) {

    if(debugId==0){
        float illuminated = isIlluminated();
        if(illuminated < 0.001){
            gl_FragColor = vec4(0.0,0.0,0.0,1.0);
            return;
        }

        // Sample the environment using the sample multiplier as a roughness. 
        // This is because with fewer samples, we need to use a rougher value to 
        // ensure we gather approximately the same amount of light.
        vec3 lightColor = textureEnv(envMap, lightSourceDir, 0.0);
        float NdotL = max(0.0, dot(lightSourceDir, normalize(v_normal)));
        gl_FragColor = vec4(lightColor * NdotL, 1.0);
    }
    else if(debugId==1){
        gl_FragColor = vec4(abs(v_normal.x), abs(v_normal.y), abs(v_normal.z),  1.0);
    }
    else if(debugId==2){
        vec3 lightColor = vec3(abs(v_normal.x), abs(v_normal.y), abs(v_normal.z));
        gl_FragColor = vec4(lightColor * lambertDiffuse(lightSourceDir, v_normal), 1.0);
    }
    else if(debugId==3){
        float illuminated = isIlluminated();
        if(illuminated < 0.001){
            gl_FragColor = vec4(0.0,0.0,0.0,1.0);
            return;
        }
        vec3 lightColor = vec3(abs(v_normal.x), abs(v_normal.y), abs(v_normal.z));
        gl_FragColor = vec4(lightColor * lambertDiffuse(lightSourceDir, v_normal), 1.0);
    }
}`);
    }
};

class IrradianceMapPostProcess extends Shader {
    
    constructor() {
        super();
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('IrradianceMapPostProcess.vertexShader', `
precision highp float;

attribute vec2 positions;    //(location = 0)
uniform vec2 pos;
uniform vec2 size;

/* VS Outputs */
varying vec2 v_texCoord;
 
void main()
{
    v_texCoord = vec2((positions.x+1.0)*0.5, (positions.y+1.0)*0.5);
    gl_Position = vec4(vec2(-1, -1)+size+(pos*2.0)+(positions * size), 0, 1);
}

`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('IrradianceMapPostProcess.fragmentShader', `
precision highp float;

uniform sampler2D texture;
uniform vec2 textureDim;
varying vec2 v_texCoord;

void accumulateValue(in vec2 offset, inout vec4 color)
{
    vec4 val = texture2D(texture, v_texCoord + (offset / textureDim));
    if(val.a > 0.01)
        color += val;
}

void main(void) {
    // Get texel position from gl_FragCoord
    ivec2 uvi = ivec2(gl_FragCoord.xy);
    vec4 color = texture2D(texture, v_texCoord);
    if(color.a < 0.01)
    {
        // If this pixel does not have irradiance,
        // average the neighboring pixel values. 
        accumulateValue(vec2(-1, 0), color);
        accumulateValue(vec2( 1, 0), color);
        accumulateValue(vec2( 0, 1), color);
        accumulateValue(vec2( 0,-1), color);

        // diagonals...
        if(color.a == 0.0){
            accumulateValue(vec2(-1,-1), color);
            accumulateValue(vec2(-1, 1), color);
            accumulateValue(vec2( 1, 1), color);
            accumulateValue(vec2( 1,-1), color);
        }

        // 2 pixel ring...
        if(color.a == 0.0){
            accumulateValue(vec2(-2, 0), color);
            accumulateValue(vec2(-2, 1), color);
            accumulateValue(vec2(-2,-1), color);
            
            accumulateValue(vec2( 2, 0), color);
            accumulateValue(vec2( 2, 1), color);
            accumulateValue(vec2( 2,-1), color);
            
            accumulateValue(vec2( 0, 2), color);
            accumulateValue(vec2(-1, 2), color);
            accumulateValue(vec2( 1, 2), color);
            
            accumulateValue(vec2( 0,-2), color);
            accumulateValue(vec2(-1,-2), color);
            accumulateValue(vec2( 1,-2), color);
        }


        // 3 pixel ring...
        if(color.a == 0.0){
            accumulateValue(vec2(-3, 0), color);
            accumulateValue(vec2(-3, 1), color);
            accumulateValue(vec2(-3,-1), color);
            
            accumulateValue(vec2( 3, 0), color);
            accumulateValue(vec2( 3, 1), color);
            accumulateValue(vec2( 3,-1), color);
            
            accumulateValue(vec2( 0, 3), color);
            accumulateValue(vec2(-1, 3), color);
            accumulateValue(vec2( 1, 3), color);
            
            accumulateValue(vec2( 0,-3), color);
            accumulateValue(vec2(-1,-3), color);
            accumulateValue(vec2( 1,-3), color);

            accumulateValue(vec2(-2,-2), color);
            accumulateValue(vec2(-2, 2), color);
            accumulateValue(vec2( 2, 2), color);
            accumulateValue(vec2( 2,-2), color);
        }

        // 4 pixel ring...
        if(color.a == 0.0){
            accumulateValue(vec2(-4, 0), color);
            accumulateValue(vec2(-4, 1), color);
            accumulateValue(vec2(-4,-1), color);
            
            accumulateValue(vec2( 4, 0), color);
            accumulateValue(vec2( 4, 1), color);
            accumulateValue(vec2( 4,-1), color);
            
            accumulateValue(vec2( 0, 4), color);
            accumulateValue(vec2(-1, 4), color);
            accumulateValue(vec2( 1, 4), color);
            
            accumulateValue(vec2( 0,-4), color);
            accumulateValue(vec2(-1,-4), color);
            accumulateValue(vec2( 1,-4), color);

            accumulateValue(vec2(-3,-2), color);
            accumulateValue(vec2(-2,-3), color);

            accumulateValue(vec2(-3, 2), color);
            accumulateValue(vec2(-2, 3), color);

            accumulateValue(vec2( 3, 2), color);
            accumulateValue(vec2( 2, 3), color);

            accumulateValue(vec2( 3,-2), color);
            accumulateValue(vec2( 2,-3), color);
        }
    }
    if(color.a > 0.0)
        color /= color.a;
    gl_FragColor = color;
}
        `);
    }
}

export {
    IrradianceMapAccumulate,
    IrradianceMapPostProcess
};
