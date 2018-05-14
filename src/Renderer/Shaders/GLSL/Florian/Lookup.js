import { shaderLibrary } from '../../../ShaderLibrary.js';

import './Boilerplate.js';

shaderLibrary.setShaderModule('Florian/Lookup.glsl', `

<%include file="Florian/Boilerplate.glsl"/>

vec2 environmentSize = vec2(2069, 1292+1026);
//uniform float environmentSize;
uniform float environmentRotation;
uniform float environmentMaxLuminance;
uniform float environmentSaturation;

vec2 normalToUvRectOct(vec3 normal){
    normal /= sum(abs(normal));
    if(normal.y > 0.0){
        return normal.xz*0.5+0.5;
    }
    else{
        vec2 suv = sectorize(normal.xz);
        vec2 uv = suv-suv*abs(normal.zx);
        return uv*0.5+0.5;
    }
}

vec3 uvToNormalRectOct(vec2 uv){
    uv = uv*2.0-1.0;
    vec2 auv = abs(uv);
    vec2 suv = sectorize(uv);
    float l = sum(auv);

    if(l > 1.0){
        uv = (1.0-auv.ts)*suv;
    }

    return normalize(vec3(uv.s,1.0-l,uv.t));
}

vec2 normalToUvSphOct(vec3 normal){
    normal = normalize(normal);
    vec3 aNorm = abs(normal);
    vec3 sNorm = sectorize(normal);

    vec2 dir = max(aNorm.xz, 1e-20);
    float orient = atan(dir.x, dir.y)/(PI*0.5);

    dir = max(vec2(aNorm.y, length(aNorm.xz)), 1e-20);
    float pitch = atan(dir.y, dir.x)/(PI*0.5);

    vec2 uv = vec2(sNorm.x*orient, sNorm.z*(1.0-orient))*pitch;

    if(normal.y < 0.0){
        uv = sNorm.xz - abs(uv.ts)*sNorm.xz;
    }
    return uv*0.5+0.5;
}

vec3 uvToNormalSphOct(vec2 uv){
    uv = uv*2.0-1.0;
    vec2 suv = sectorize(uv);
    float pitch = sum(abs(uv))*PI*0.5;

    if(sum(abs(uv)) > 1.0){
        uv = (1.0-abs(uv.ts))*suv;
    }

    float orient = (abs(uv.s)/sum(abs(uv)))*PI*0.5;
    float sOrient = sin(orient);
    float cOrient = cos(orient);
    float sPitch = sin(pitch);
    float cPitch = cos(pitch);

    return vec3(
        sOrient*suv.s*sPitch,
        cOrient*suv.t*sPitch,
        cPitch
    );
}

#define uvToNormal uvToNormalSphOct
#define normalToUv normalToUvSphOct
//#define uvToNormal uvToNormalRectOct
//#define normalToUv normalToUvRectOct

uniform float environmentContrast;
uniform float environmentContrastMidp;

vec3 contrast(vec3 color){
    //float mid = mix(0.5, environmentMaxLuminance, environmentContrastMidp);
    float mid = environmentContrastMidp;
    if(environmentContrast > 0.0){
        color = (color - mid)/(1.0-environmentContrast)+mid;
    }
    else{
        color = (color - mid)*(1.0+environmentContrast)+mid;
    }
    return clamp(color, vec3(0.0), vec3(environmentMaxLuminance));
}

vec3 saturation(vec3 color){
    const vec3 W = vec3(0.2125, 0.7154, 0.0721);
    vec3 intensity = vec3(dot(color,W));
    if(environmentSaturation > 0.0){
        color += (intensity - color) * (1.0-1.0/(1.001-environmentSaturation));
    }
    else{
        color += (intensity - color) * -environmentSaturation;
    }
    return clamp(color, vec3(0.0), vec3(environmentMaxLuminance));
}

vec3 getRadianceMip(sampler2D envMap, vec2 uv, float vOffset, float lod){
    float size = pow(2.0, lod);
    
    float hOffset = pow(2.0, lod)-1.0 + lod*2.0;
    vec2 texcoord = (vec2(hOffset, vOffset)+1.0+uv*size)/environmentSize;
    return texture2D(envMap, texcoord).rgb;
}

vec3 getRadianceSlice(sampler2D envMap, vec2 uv, float slice, float angularChange){
    float size = max(128.0, pow(2.0, slice+4.0));
    float offset0 = 130.0*min(slice,4.0);
    float i2 = max(slice-4.0, 0.0);
    float offset1 = pow(2.0, i2+8.0) - 256.0 + 2.0*i2;
    float vOffset = offset0 + offset1;

    float maxLod = log(size)/log(2.0);
    return getRadianceMip(envMap, uv, vOffset, floor(maxLod));

    // the following code causes atrifacts in the rendering. 
    // we see grey pixels. I beleive its because the angularChange value,
    // under some circumstances is invalid. 

    //float pixelsPerChange = size*0.7*angularChange; // approximately 1/sqrt(2)
    //float lod = log(pixelsPerChange)/log(2.0);
    //lod = clamp(maxLod-lod, 0.0, maxLod);

    //return mix(
    //    getRadianceMip(envMap, uv, vOffset, floor(lod)),
    //    getRadianceMip(envMap, uv, vOffset, floor(lod)+1.0),
    //    fract(lod)
    //);
}

vec3 textureEnv(sampler2D envMap, vec3 dir, float roughness){
    float envRot = radians(environmentRotation);
    float rS = sin(envRot);
    float rC = cos(envRot);

    float nX = dir.x*rC - dir.z*rS;
    float nZ = dir.x*rS + dir.z*rC;
    dir.x = nX;
    dir.z = nZ;

    // Disabling this level of filterig because it causes artifacts. 
    float angularChange = 0.0;//acos(dot(normalize(dir+fwidth(dir)), dir))/PI;

    vec2 uv = normalToUv(dir);

    float slice = (1.0-roughness)*6.0;
    float slice0 = floor(slice);
    float slice1 = slice0 + 1.0;
    float f = fract(slice);

    vec3 color0 = getRadianceSlice(envMap, uv, slice0, angularChange);
    vec3 color1 = getRadianceSlice(envMap, uv, slice1, angularChange);

    vec3 color = mix(color0, color1, f);
    //color = contrast(color);
    //color = saturation(color);
    
    return color;
}

`);