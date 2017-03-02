import {
    Signal
} from '../Math/Math.js';
import {
    shaderLibrary,
    Shader
} from '../SceneTree/SceneTree.js';

import {
    GLShader
} from './GLShader.js';
import {
    GLTexture2D
} from './GLTexture2D.js';
import {
    GLHDRImage
} from './GLHDRImage.js';
import {
    GLProbe
} from './GLProbe.js';
import {
    ConvolverShader
} from './Shaders/ConvolverShader.js';
import {
    EnvMapShader
} from './Shaders/EnvMapShader.js';
import {
    GLFbo
} from './GLFbo.js';

import {
    ImagePyramid
} from './ImagePyramid.js';

import {
    generateShaderGeomBinding,
} from './GeomShaderBinding.js';

import {
    Vec3,
    hammersley
} from '../Math/Math.js';


// // https://threejs.org/examples/?q=sky#webgl_shaders_sky
// import './Shaders/zz85/sky.js';
// https://threejs.org/examples/?q=sky#webgl_shaders_sky
import '../SceneTree/Shaders/GLSL/stack-gl/inverse.js';
import './Shaders/wwwtyro/glsl-atmosphere.js';

class SkyShader extends Shader {
    
    constructor(name) {
        super();
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('SkyShader.vertexShader', `

<%include file="utils/quadVertexFromID.glsl"/>
<%include file="stack-gl/inverse.glsl"/>

uniform mat4 projectionMatrix;

/* VS Outputs */
varying vec2 v_texCoord;
varying vec4 v_viewPos;
 
void main()
{
    vec2 position = getScreenSpaceVertexPosition();
    v_texCoord = position+0.5;
    gl_Position = vec4(position*2.0, 0.0, 1.0);

    v_viewPos = inverse(projectionMatrix) * gl_Position;
}

`);
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('SkyShader.fragmentShader', `

precision highp float;

// https://github.com/wwwtyro/glsl-atmosphere
<%include file="wwwtyro/glsl-atmosphere.glsl"/>

precision highp float;

uniform mat4 cameraMatrix;
uniform vec3 sunPos;

varying vec2 v_texCoord;
varying vec4 v_viewPos;



//////////////////////////////////////////////////
// https://www.shadertoy.com/view/lss3DS [ in the comments]
// In complement : real position of sun at a given date and latitude longitude

const float 
    pi2 = 2.*PI,
    AU = 149597870.61, // Astronomical Unit = Mean distance of the earth from the sun - Km
    toRad = PI/180.,
    toDeg = 180./PI;
    
float julianDay2000(in float unixTimeS) {
    return (unixTimeS / 86400.0) - 10957.5;// = + 2440587.5-2451545;
}

vec2 SunAtTime(in float julianDay2000, in float latitude, in float longitude) {
    float zs,rightAscention, declination, sundist,
        t  = julianDay2000, //= jd - 2451545., // nb julian days since 01/01/2000 (1 January 2000 = 2451545 Julian Days)
        t0 = t/36525.,           // nb julian centuries since 2000      
        t1 = t0+1.,              // nb julian centuries since 1900
        Ls = fract(.779072+.00273790931*t)*pi2, // mean longitude of sun
        Ms = fract(.993126+.0027377785 *t)*pi2, // mean anomaly of sun
        GMST = 280.46061837 + 360.98564736629*t + (0.000387933 - t0/38710000.)*t0*t0, // Greenwich Mean Sidereal Time   
    // position of sun
        v = (.39785-.00021*t1)*sin(Ls)-.01*sin(Ls-Ms)+.00333*sin(Ls+Ms),
        u = 1.-.03349*cos(Ms)-.00014*cos(2.*Ls)+.00008*cos(Ls),
        w = -.0001-.04129 * sin(2.*Ls)+(.03211-.00008*t1)*sin(Ms)
            +.00104*sin(2.*Ls-Ms)-.00035*sin(2.*Ls+Ms);
    // calcul distance of sun
    sundist = 1.00021*sqrt(u)*AU;
    // calcul right ascention
    zs = w / sqrt(u-v*v);
    rightAscention = Ls + atan(zs/sqrt(1.-zs*zs));
    // calcul declination
    zs = v / sqrt(u);
    declination = atan(zs/sqrt(1.-zs*zs));

    // position relative to geographic location
    float
        sin_dec = sin(declination),   cos_dec = cos(declination),
        sin_lat = sin(toRad*latitude),cos_lat = cos(toRad*latitude),
        lmst = mod((GMST + longitude)/15., 24.);
    if (lmst<0.) lmst += 24.;
    lmst = toRad*lmst*15.;
    float
        ha = lmst - rightAscention,       
        elevation = asin(sin_lat * sin_dec + cos_lat * cos_dec * cos(ha)),
        azimuth   = acos((sin_dec - (sin_lat*sin(elevation))) / (cos_lat*cos(elevation)));
    
    return vec2(sin(ha)>0.? azimuth : pi2-azimuth, elevation);
}

void main() {
    vec3 viewVector = mat3(cameraMatrix) * normalize(v_viewPos.xyz);

    vec3 color = atmosphere(
        normalize(viewVector),           // normalized ray direction
        vec3(0,6372e3,0),               // ray origin
        sunPos,                        // position of the sun
        22.0,                           // intensity of the sun
        6371e3,                         // radius of the planet in meters
        6471e3,                         // radius of the atmosphere in meters
        vec3(5.5e-6, 13.0e-6, 22.4e-6), // Rayleigh scattering coefficient
        21e-6,                          // Mie scattering coefficient
        8e3,                            // Rayleigh scale height
        1.2e3,                          // Mie scale height
        0.758                           // Mie preferred scattering direction
    );

    // Apply exposure.
    color = 1.0 - exp(-1.0 * color);

    gl_FragColor = vec4(color, 1);
}

`);
    }
};

class GLProceduralSky /*extends GLProbe*/ {
    constructor(gl, sky) {
        //super(gl.gl, 'EnvMap');
        this.__gl = gl;
        this.__sky = sky;
        this.__backgroundFocus = 0.0;

        // if (!gl.__quadVertexIdsBuffer)
        //     gl.setupInstancedQuad();

        // let srcGLTex = new GLHDRImage(gl, this.__envMap);


        // this.convolveEnvMap(srcGLTex);

        this.__skyShader = new GLShader(gl, new SkyShader());
        let envMapShaderComp = this.__skyShader.compileForTarget('GLProceduralSky');
        this.__shaderBinding = generateShaderGeomBinding(gl, envMapShaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer);

        this.__sunAzumith = 0.1;
        this.updated = new Signal();
    }

    get backgroundFocus() {
        return this.__backgroundFocus;
    }

    set backgroundFocus(val) {
        this.__backgroundFocus = val;
        this.updated.emit();
    }

    get sunAzumith() {
        return this.__sunAzumith;
    }

    set sunAzumith(val) {
        this.__sunAzumith = val;
        this.updated.emit();
    }

    addGUI(gui) {
        gui.add(this, 'backgroundFocus', 0.0, 1.0);
        gui.add(this, 'sunAzumith', 0.0, 3.0);
    }

    // getShaderPreprocessorDirectives(){
    //     return {
    //         "ATLAS_NAME": "EnvMap",
    //         "EnvMap_COUNT": this.numSubImages(),
    //         "EnvMap_LAYOUT": this.getLayoutFn()
    //     }
    // }

    draw(renderstate) {
            let gl = this.__gl;
            let displayAtlas = true;
            if(displayAtlas){
                this.__skyShader.bind(renderstate, 'GLProceduralSky');
                let unifs = renderstate.unifs;
                if ('sunPos' in unifs)
                    gl.uniform3fv(unifs.sunPos.location, [0, this.__sunAzumith, -1]);

                this.__shaderBinding.bind(renderstate);
                gl.drawQuad();
            }
        //     else{
        //         ///////////////////
        //         this.__skyShader.bind(renderstate, 'GLProceduralSky');
        //         let unifs = renderstate.unifs;
        //         // this.__srcGLTex.bind(renderstate, renderstate.unifs.atlas_EnvMap.location);
        //         // this.__srcCDMTex.bind(renderstate, renderstate.unifs.atlas_EnvMap.location);
        //         //this.__imagePyramid.bind(renderstate, renderstate.unifs.atlas_EnvMap.location);
        //         this.bind(renderstate, renderstate.unifs.atlas_EnvMap.location);

        //         if ('focus' in unifs)
        //             gl.uniform1f(unifs.focus.location, this.__backgroundFocus);
        //         if ('exposure' in unifs)
        //             gl.uniform1f(unifs.exposure.location, renderstate.exposure);

        //         this.__shaderBinding.bind(renderstate);

        //         gl.depthMask(false);
        //         gl.drawQuad();
        //     }
    }
};

export {
    GLProceduralSky
};