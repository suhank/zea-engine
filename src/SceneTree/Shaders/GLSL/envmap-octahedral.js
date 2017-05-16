import {
    shaderLibrary
} from '../../ShaderLibrary.js';

// https://gist.github.com/pyalot/cc7c3e5f144fb825d626
shaderLibrary.setShaderModule('pragmatic-pbr/envmap-octahedral.glsl', `

#define sectorize(value) step(0.0, (value))*2.0-1.0
#define sum(value) dot(clamp((value), 1.0, 1.0), (value))


vec2 normalToUvSphOct(vec3 normal){
    normal = normalize(normal);
    vec3 aNorm = abs(normal);
    vec3 sNorm = sectorize(normal);

    vec2 dir = max(aNorm.xz, 1e-20);
    float orient = atan(dir.x, dir.y)/HalfPI;

    dir = max(vec2(aNorm.y, length(aNorm.xz)), 1e-20);
    float pitch = atan(dir.y, dir.x)/HalfPI;

    vec2 uv = vec2(sNorm.x*orient, sNorm.z*(1.0-orient))*pitch;

    if(normal.y < 0.0){
        uv = sNorm.xz - abs(uv.ts)*sNorm.xz;
    }
    return uv*0.5+0.5;
}


vec3 uvToNormalSphOct(vec2 uv){
    uv = uv*2.0-1.0;
    vec2 suv = sectorize(uv);
    float sabsuv =  sum(abs(uv));
    float pitch = sabsuv*HalfPI;

    if (pitch <= 0.0) {
        return vec3(0.0, 1.0, 0.0);
    }
    if (abs(pitch - PI) < 0.000001) {
        return vec3(0.0, -1.0, 0.0);
    }
    if(sabsuv > 1.0){
        uv = (1.0-abs(uv.ts))*suv;
    }

    float orient = (abs(uv.s)/sabsuv)*HalfPI;
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
