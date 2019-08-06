import {
    GLShader
} from '../GLShader.js';
import {
    shaderLibrary
} from '../ShaderLibrary.js';


class OutlinesShader extends GLShader {
    
    constructor(gl) {
        super(gl);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('OutlinesShader.vertexShader', `
precision highp float;

attribute vec3 positions;    //(location = 0)

/* VS Outputs */
varying vec2 v_texCoord;
 
void main()
{
    v_texCoord = positions.xy+0.5;
    gl_Position = vec4(positions.xy*2.0, 0.0, 1.0);
}

`);
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('OutlinesShader.fragmentShader', `
precision highp float;

uniform sampler2D highlightDataTexture;
uniform vec2 highlightDataTextureSize;

uniform color outlineColor;

varying vec2 v_texCoord;


bool isOutlinePixel(vec3 p) {
    return p.r > 0.01 || p.g > 0.01 || p.b > 0.01;
}
void accumOutlinePixel(vec2 fragCoord, inout vec4 res) {
    vec3 p = texture2D(highlightDataTexture, fragCoord/highlightDataTextureSize).rgb;
    if(p.r > 0.01 || p.g > 0.01 || p.b > 0.01) {
        res.r += p.r;
        res.g += p.g;
        res.b += p.b;
        res.a += 1.0;
    }
}
vec3 getOutlinePixelColor(vec2 fragCoord) {
    vec3 M = texture2D(highlightDataTexture, fragCoord/highlightDataTextureSize).rgb;
    if( isOutlinePixel(M) )
        return vec3(0.0, 0.0, 0.0);// this pixel is that of a selected geom
    // Search surrounding pixels for selected geoms.
    vec4 res;
    accumOutlinePixel(fragCoord+vec2( 1, 1), res); // NW
    accumOutlinePixel(fragCoord+vec2(-1, 1), res); // NE
    accumOutlinePixel(fragCoord+vec2( 1,-1), res); // SW
    accumOutlinePixel(fragCoord+vec2(-1,-1), res); // SE
    accumOutlinePixel(fragCoord+vec2( 0, 2), res); // NN
    accumOutlinePixel(fragCoord+vec2(-2, 0), res); // EE
    accumOutlinePixel(fragCoord+vec2( 2, 0), res); // WW
    accumOutlinePixel(fragCoord+vec2( 0,-2), res); // SS
    accumOutlinePixel(fragCoord+vec2( 1, 2), res); // NNW
    accumOutlinePixel(fragCoord+vec2(-1, 2), res); // NNE
    accumOutlinePixel(fragCoord+vec2(-2, 1), res); // EEN
    accumOutlinePixel(fragCoord+vec2(-2,-1), res); // EES
    accumOutlinePixel(fragCoord+vec2( 2, 1), res); // WWN
    accumOutlinePixel(fragCoord+vec2( 2,-1), res); // WWS
    accumOutlinePixel(fragCoord+vec2( 1,-2), res); // SSW
    accumOutlinePixel(fragCoord+vec2(-1,-2), res); // SSE
    return res.rgb / res.a;
}


#ifdef ENABLE_ES3
out vec4 fragColor;
#endif

void main(void) {

    // fragColor = texture2D(highlightDataTexture, v_texCoord);;
    //can also use gl_FragCoord.xy
    mediump vec2 fragCoord = v_texCoord * highlightDataTextureSize; 
    /////////////////
    // Selection Outlines
    vec3 outlineColor = getOutlinePixelColor(fragCoord);
    if(isOutlinePixel(outlineColor)){
#ifndef ENABLE_ES3
        gl_FragColor.rgb = outlineColor;
#else
        fragColor.rgb = outlineColor;
#endif
    }
    else {
        discard;
    }
}

`);
    }
};


export {
    OutlinesShader
};

