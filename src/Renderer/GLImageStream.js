import {
    Vec2
} from '../Math/Vec2';
import {
    Vec4
} from '../Math/Vec4';
import {
    Rect2
} from '../Math/Rect2';
import {
    BinTreeNode
} from '../Math/BinTreeNode';
import {
    Async
} from '../Math/Async';
import {
    BinTreeRect,
    BinTreeRectBorder
} from '../Math/BinTreeNode';
import {
    Image2D
} from '../SceneTree/Image2D';
import {
    shaderLibrary
} from './ShaderLibrary';
import {
    GLShader
} from './GLShader.js';
import {
    GLTexture2D
} from './GLTexture2D.js';
import {
    GLFbo
} from './GLFbo.js';
import {
    generateShaderGeomBinding
} from './GeomShaderBinding.js';



import './Shaders/GLSL/ImageStream.js';


class GLImageStream extends GLTexture2D {
    constructor(gl, params) {
        super(gl, params);

        this.__streamImage = params;
        this.__descParam = this.__streamImage.getParameter('StreamAtlasDesc');
        this.__indexParam = this.__streamImage.getParameter('StreamAtlasIndex');
         this.__indexParam.valueChanged.connect(this.updated.emit);
    }

    bindToUniform(renderstate, unif) {

        if(!super.bindToUniform(renderstate, unif, 2)){
            return false;
        }

        let textureDescUnif = renderstate.unifs[unif.name+'Desc'];
        if (textureDescUnif){
            this.__gl.uniform4f(textureDescUnif.location, ...this.__descParam.getValue().asArray());
        }

        
        let textureIndexUnif = renderstate.unifs[unif.name+'Index'];
        if (textureIndexUnif){
            this.__gl.uniform1i(textureIndexUnif.location, this.__indexParam.getValue());
        }

        return true;
    }

};

export {
    GLImageStream
};