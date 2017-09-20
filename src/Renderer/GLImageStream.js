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
        this.__streamImage.streamAtlasImageIndexChanged.connect(this.updated.emit);
    }

    bindTexture(renderstate, unifName) {

        super.bindTexture(renderstate, unifName);

        let textureDescUnif = renderstate.unifs[unifName+'Desc'];
        if (textureDescUnif){
            this.__gl.uniform4f(textureDescUnif.location, ...this.__streamImage.getStreamAtlasImageDesc().asArray());
        }

        
        let textureIndexUnif = renderstate.unifs[unifName+'Index'];
        if (textureIndexUnif){
            this.__gl.uniform1i(textureIndexUnif.location, this.__streamImage.getStreamAtlasImageIndex());
        }


    }

};

export {
    GLImageStream
};