
import {
    SInt32,
    UInt32,
    Float32,
    Vec2,
    Vec3,
    Vec4,
    Mat3,
    Mat4,
    Color
} from '../Math';
import { Image2D } from '../SceneTree/Image2D.js';

const glslTypes = {
    'bool': Boolean,
    'int': SInt32,
    'uint': UInt32,
    'float': Float32,
    'vec2': Vec2,
    'vec3': Vec3,
    'vec4': Vec4,
    'ivec2': Vec2,
    'color': Color,
    'mat3': Mat3,
    'mat4': Mat4,
    'sampler2D': Image2D
};

export {
    glslTypes
};