import {
    shaderLibrary
} from '../../ShaderLibrary.js';

// https://gist.github.com/pyalot/cc7c3e5f144fb825d626
shaderLibrary.setShaderModule('pragmatic-pbr/envmap-octahedral.glsl', `

const float PI = 3.1415926;
#define sectorize(value) step(0.0, (value))*2.0-1.0
#define sum(value) dot(clamp((value), 1.0, 1.0), (value))
#define PI 3.141592653589793

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

#define highdef 1
vec2 normalToUvSphOct(vec3 normal){
    vec3 aNorm = abs(normal);
    vec3 sNorm = sectorize(normal);

    #if highdef
        vec2 dir = aNorm.xz;
        float orient = atan(dir.x, max(dir.y,0.0000000000000001))/(PI*0.5);

        dir = vec2(aNorm.y, length(aNorm.xz));
        float pitch = atan(dir.y, dir.x)/(PI*0.5);
    #else
        float orient = acos(normalize(aNorm.xz).y)/(PI*0.5);
        float pitch = acos(aNorm.y)/(PI*0.5);
    #endif

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
        cPitch,
        cOrient*suv.t*sPitch
    );  
}

`);
