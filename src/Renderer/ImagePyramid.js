import {
    GLTexture2D
} from './GLTexture2D.js';
import {
    GLFbo
} from './GLFbo.js';
import {
    GLShader
} from './GLShader.js';

import {
    ImageAtlas
} from './ImageAtlas.js';

import {
    Vec2,
    Rect2
} from '../Math/Math.js';

import {
    generateShaderGeomBinding
} from './GeomShaderBinding.js';

let Math_log2 = function(value){
    // IE11 doesn't support Math.log2
    return Math.log2( value )
    //return Math.log( value ) / Math.log( 2 ) - 2;
}

import {
    Shader,
    shaderLibrary
} from '../SceneTree/SceneTree.js';

import '../SceneTree/Shaders/GLSL/ImagePyramid.js';


class PyramidShader extends Shader {
    
    constructor(name) {
        super();
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('PyramidShader.vertexShader', `

<%include file="utils/quadVertexFromID.glsl"/>

uniform vec2 pos;
uniform vec2 size;

/* VS Outputs */
varying vec2 v_texCoord;
 
void main()
{
    vec2 position = getScreenSpaceVertexPosition();
    v_texCoord = position+0.5;
    gl_Position = vec4(vec2(-1.0,-1.0)+(pos*2.0)+(v_texCoord*size*2.0), 0.0, 1.0);
}

`);
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('PyramidShader.fragmentShader', `

precision highp float;

uniform sampler2D texture;
uniform vec2 textureDim;

varying vec2 v_texCoord;

void main(void) {
    vec2 pixelCoord = v_texCoord*textureDim;

    vec2 acoord = abs(pixelCoord-textureDim*0.5);
    float limit = textureDim.x*0.5-1.0;
    vec2 sourceCoord = clamp(pixelCoord-1.0, 0.5, textureDim.x-2.5);
    vec2 uv = sourceCoord/(textureDim-2.0);

    if(acoord.x > limit && acoord.y > limit){
        uv = 1.0 - uv;
    }
    else if(acoord.x > limit){
        uv.y = 1.0 - uv.y;
    }
    else if(acoord.y > limit){
        uv.x = 1.0 - uv.x;
    }
    vec4 texel = texture2D(texture, uv);
    gl_FragColor = vec4(texel.rgb/texel.a, 1);
}

`);
    }
};

class ImagePyramid extends ImageAtlas {
    constructor(gl, name, srcGLTex, screenQuad, destroySrcImage=true, minTileSize=16) {
        super(gl, name);

        let renderstate = {};
        let glshader = new GLShader(gl, new PyramidShader());
        screenQuad.bindShader(renderstate);
        this.size = srcGLTex.height;
        let aspectRatio = srcGLTex.width / srcGLTex.height;

        this.addSubImage(srcGLTex);
        let numLevels = Math_log2(this.size) - 1; // compute numLevels-1 levels(because we use the source image as the base level);
        let prevLevelTex = srcGLTex;
        for (let i = numLevels; i >= 0; --i) {
            let size = Math.pow(2, i);
            if(size < minTileSize)
                break;
            // Create a target texture for this level of the pyramid.
            // and then render to it using the base level as a source image.
            let level = new GLTexture2D(gl, {
                channels: srcGLTex.channels,
                format: srcGLTex.format,
                width: size * aspectRatio,
                height: size,
                filter: 'LINEAR',
                wrap: 'CLAMP_TO_EDGE'
            });
            let fbo = new GLFbo(gl, level);
            fbo.bindAndClear();
            screenQuad.draw(renderstate, prevLevelTex);
            fbo.destroy();

            this.addSubImage(level);

            prevLevelTex = level;
        }

        this.generateAtlas(gl, screenQuad, destroySrcImage);
    }
};

export {
    ImagePyramid
};