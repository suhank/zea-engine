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

uniform sampler2D selectionDataTexture;
uniform vec2 selectionDataTextureSize;

uniform color outlineColor;

varying vec2 v_texCoord;

bool isOutlinePixel(sampler2D tex, vec2 fragCoord) {
    if( texture2D(tex, fragCoord/selectionDataTextureSize).r > 0.5 )
        return false;// this pixel is that of a selected geom

    // Search srrounding pixels for selected geoms.
    bool NW = texture2D(tex, (fragCoord + vec2( 1, 1))/selectionDataTextureSize).r > 0.5;
    bool NE = texture2D(tex, (fragCoord + vec2(-1, 1))/selectionDataTextureSize).r > 0.5;
    bool SW = texture2D(tex, (fragCoord + vec2( 1,-1))/selectionDataTextureSize).r > 0.5;
    bool SE = texture2D(tex, (fragCoord + vec2(-1,-1))/selectionDataTextureSize).r > 0.5;

    bool NN = texture2D(tex, (fragCoord + vec2( 0, 2))/selectionDataTextureSize).r > 0.5;
    bool EE = texture2D(tex, (fragCoord + vec2(-2, 0))/selectionDataTextureSize).r > 0.5;
    bool WW = texture2D(tex, (fragCoord + vec2( 2, 0))/selectionDataTextureSize).r > 0.5;
    bool SS = texture2D(tex, (fragCoord + vec2( 0,-2))/selectionDataTextureSize).r > 0.5;

    if( NW || NE || SW || SE || NN || EE || WW || SS) {
        return true;
    }
    return false;
}


#ifdef ENABLE_ES3
out vec4 fragColor;
#endif

void main(void) {


    // fragColor = texture2D(selectionDataTexture, v_texCoord);;

    //can also use gl_FragCoord.xy
    mediump vec2 fragCoord = v_texCoord * selectionDataTextureSize; 

    /////////////////
    // Selection Outlines
    if(isOutlinePixel(selectionDataTexture, fragCoord)){
#ifndef ENABLE_ES3
        gl_FragColor = outlineColor;
#else
        fragColor = outlineColor;
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

