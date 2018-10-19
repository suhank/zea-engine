import {
    Color
} from '../../Math';
import {
    Signal,
    decodeText
} from '../../Utilities';
import {
    sgFactory
} from '../SGFactory.js';
import {
    VLHImage
} from './VLHImage.js';
import {
    resourceLoader
} from '../ResourceLoader.js';

import {
    Parameter,
    NumberParameter,
    Vec4Parameter,
    FilePathParameter,
    ParameterSet
} from '../Parameters';

const EnvMapMappping = {
    LATLONG: 1,
    OCTAHEDRAL: 2
};



const sq = (x) => (x * x)
const step = (edge, x) => (x < edge ? 0.0 : 1.0)

function sum(value) {
    return value.dot(new Vec2(1.0, 1.0));
}
function sum(value) {
    return value.dot(new Vec3(1.0, 1.0, 1.0));
}
function abs(value) {
    return new Vec2(
               fabs(value.x),
               fabs(value.y)
           );
}
function max(vec, value) {
    return new Vec2(
               std::max(vec.x, value),
               std::max(vec.y, value)
           );
}
function abs(value) {
    return new Vec3(
               fabs(value.x),
               fabs(value.y),
               fabs(value.z)
           );
}
function sectorize(value) {
    return new Vec2(
               step(0.0, value.x) * 2.0 - 1.0,
               step(0.0, value.y) * 2.0 - 1.0
           );
}
function sectorize(value) {
    return new Vec3(
               step(0.0, value.x) * 2.0 - 1.0,
               step(0.0, value.y) * 2.0 - 1.0,
               step(0.0, value.z) * 2.0 - 1.0
           );
}


function latLongUVsFromDir(Vec3_32f dir) {
    // Math function taken from...
    // http://gl.ict.usc.edu/Data/HighResProbes/
    // Note: Scaling from u=[0,2], v=[0,1] to u=[0,1], v=[0,1]
    const phi = Math.acos(dir.z);
    const theta = Math.atan2(dir.x, -dir.y);
    return new Vec2((1 + theta / Float32(Math.PI)) / 2, phi / Float32(Math.PI));
}

// Note: when u == 0.5 z = 1
function dirFromLatLongUVs(Float32 u, Float32 v) {
    // http://gl.ict.usc.edu/Data/HighResProbes/
    const theta = Float32(Math.PI)*((u * 2) - 1);
    const phi = Float32(Math.PI)*v;
    return new Vec3(sin(phi)*sin(theta), -sin(phi)*cos(theta), cos(phi));
}


function dirToSphOctUv(normal) {
    const aNorm = abs(normal);
    const sNorm = sectorize(normal);
    const aNorm_xy(aNorm.x, aNorm.y);

    const dir = max(aNorm_xy, 1e-20);
    const orient = atan2(dir.x, dir.y) / Math.HALF_PI;

    dir = max(new Vec2(aNorm.z, aNorm_xy.length()), 1e-20);
    const pitch = atan2(dir.y, dir.x) / Math.HALF_PI;

    const uv = new Vec2(sNorm.x * orient, sNorm.y * (1.0 - orient)) * pitch;

    if (normal.z < 0.0) {
        ts = new Vec2(uv.y, uv.x);
        sNorm_xy = new Vec2(sNorm.x, sNorm.y);
        uv = sNorm_xy - abs(ts) * sNorm_xy;
    }
    return uv * 0.5 + 0.5;
}
function sphOctUvToDir(uv) {
    uv = (uv * 2) - 1;
    const suv = sectorize(uv);
    const sabsuv = sum(abs(uv));
    const pitch = sabsuv * Math.PI * 0.5;

    if (pitch <= 0.0) {
        return new Vec3(0.0, 0.0, 1.0);
    }
    if (fabs(pitch - Math.PI) < 0.000001) {
        return new Vec3(0.0, 0.0, -1.0);
    }
    if (sabsuv > 1.0) {
        Vec2_32f ts(uv.y, uv.x);
        uv = (abs(ts).negate() + 1.0) * suv;

        sabsuv = sum(abs(uv));
    }

    const orient = (Math.fabs(uv.x) / sabsuv) * Math.HALF_PI;
    const sOrient = Math.sin(orient);
    const cOrient = Math.cos(orient);
    const sPitch = Math.sin(pitch);
    const cPitch = Math.cos(pitch);

    return new Vec3(
               sOrient * suv.x * sPitch,
               cOrient * suv.y * sPitch,
               cPitch
           );
}

class EnvMap extends VLHImage {
    constructor(name, params = {}) {
        super(name, params);

        this.mapping = EnvMapMapping.OCTAHEDRAL;
    }

    __decodeData(entries) {
        super.__decodeData(entries);

        const samples = entries.samples;

        if(samples) {
            if(window.TextDecoder)
                this.__sampleSets = JSON.parse((new TextDecoder("utf-8")).decode(samples));
            else
                this.__sampleSets = JSON.parse(decodeText(samples));
        }
    }
    
    getSampleSets() {
        return this.__sampleSets;
    }


    dirToUv(dir) {
        switch(this.mapping) {
        case EnvMapMapping.LATLONG:
            return latLongUVsFromDir(dir);
            break;
        case EnvMapMapping.OCTAHEDRAL:
            return dirToSphOctUv(dir);
            break;
        }
    }

    dirToLuminance(dir) {
        const uv = this.dirToUv(dir);
        const thmbPixel = Math.round(uv.y * 32) + Math.round(uv.x);
        return this.__sampleSets.luminanceThumbnail[thmbPixel];
    }

};

sgFactory.registerClass('EnvMap', EnvMap);


export {
    EnvMap
};