import { shaderLibrary } from '../../../ShaderLibrary.js';

shaderLibrary.setShaderModule('Florian/Boilerplate.glsl', `

#define PI 3.141592653589793
#define TAU 6.283185307179586
#define PIH 1.5707963267948966
//#define E 2.7182818284590451
#define sectorize(value) step(0.0, (value))*2.0-1.0
#define sum(value) dot(clamp((value), 1.0, 1.0), (value))

float angleBetween(vec3 a, vec3 b){ return acos(dot(a,b)); }

vec3 gammasRGB(vec3 color){
    return mix(
        color*12.92,
        pow(color, vec3(1.0/2.4))*1.055-0.055,
        step((0.04045/12.92), color)
    );
}

vec3 degammasRGB(vec3 color){
    return mix(
        color/12.92,
        pow((color+0.055)/1.055, vec3(2.4)),
        step(0.04045, color)
    );
}

//vec3 gamma(vec3 color){
//   return gammasRGB(color);
//}
//
//vec3 degamma(vec3 color){
//    return degammasRGB(color);
////}

float linstep(float edge0, float edge1, float value){
    return clamp((value-edge0)/(edge1-edge0), 0.0, 1.0);
}

float linstepOpen(float edge0, float edge1, float value){
    return (value-edge0)/(edge1-edge0);
}

vec2 linstep(vec2 edge0, vec2 edge1, vec2 value){
    return clamp((value-edge0)/(edge1-edge0), vec2(0.0), vec2(1.0));
}

vec2 linstepOpen(vec2 edge0, vec2 edge1, vec2 value){
    return (value-edge0)/(edge1-edge0);
}

float pyramidstep(float edge0, float edge1, float value){
    float f = (value-edge0)/(edge1-edge0);
    return clamp(abs(f*2.0-1.0), 0.0, 1.0);
}

vec2 pyramidstep(vec2 edge0, vec2 edge1, vec2 value){
    vec2 f = (value-edge0)/(edge1-edge0);
    return abs(f*2.0-1.0);
}

vec3 pyramidstep(vec3 edge0, vec3 edge1, vec3 value){
    vec3 f = (value-edge0)/(edge1-edge0);
    return abs(f*2.0-1.0);
}

vec2 encodeNormal(vec3 n){
    float f = sqrt(8.0*n.z+8.0);
    return n.xy / f + 0.5;
}

vec3 decodeNormal(vec2 enc){
    vec2 fenc = enc*4.0-2.0;
    float f = dot(fenc,fenc);
    float g = sqrt(1.0-f/4.0);
    return vec3(
        fenc*g,
        1.0-f/2.0
    );
}

vec2 pack16(float value){
    float sMax = 65535.0;
    int v = int(clamp(value, 0.0, 1.0)*sMax+0.5);
    int digit0 = v/256;
    int digit1 = v-digit0*256;
    return vec2(float(digit0)/255.0, float(digit1)/255.0);
}

vec2 pack16(int v){
    int digit0 = v/256;
    int digit1 = v-digit0*256;
    return vec2(float(digit0)/255.0, float(digit1)/255.0);
}

float unpack16(vec2 value){
    return (
        value.x*0.996108949416342426275150501169264316558837890625 +
        value.y*0.00389105058365758760263730664519243873655796051025390625
    );
}

`);