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


class AtlasLayoutShader extends GLShader {
    constructor(gl) {
        super(gl);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('AtlasLayoutShader.vertexShader', `

precision highp float;

<%include file="utils/quadVertexFromID.glsl"/>

uniform vec2 pos;
uniform vec2 size;
uniform vec2 textureDim;
const int border = 2;

/* VS Outputs */
varying vec2 v_texCoord;
 
void main()
{
    vec2 position = getQuadVertexPositionFromID();
    v_texCoord = position+0.5;
    gl_Position = vec4(vec2(-1.0, -1.0) + (pos * 2.0) + (v_texCoord * size * 2.0), 0.0, 1.0);

    vec2 borderVec2 = vec2(float(border), float(border));
    v_texCoord *= (textureDim + (borderVec2 * 2.0)) / textureDim;
    v_texCoord -= borderVec2 / textureDim;
}

`);
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('AtlasLayoutShader.fragmentShader', `

precision highp float;

uniform sampler2D texture;
uniform vec2 textureDim;

/* VS Outputs */
varying vec2 v_texCoord;

void main(void) {
    vec2 pixelCoord = v_texCoord*textureDim;
    vec2 uv = v_texCoord;

    // Wrap X coords
    if(pixelCoord.x < 0.0){
        uv.x += 1.0/textureDim.x;
        uv.y = 1.0 - uv.y;
    }
    else if(pixelCoord.x > textureDim.x){
        uv.x -= 1.0/textureDim.x;
        uv.y = 1.0 - uv.y;
    }

    // Wrap Y coords
    if(pixelCoord.y < 0.0){
        uv.y += 1.0/textureDim.y;
        uv.x = 1.0 - uv.x;
    }
    else if(pixelCoord.y > textureDim.y){
        uv.y -= 1.0/textureDim.y;
        uv.x = 1.0 - uv.x;
    }

    vec4 texel = texture2D(texture, uv);
    gl_FragColor = vec4(texel.rgb/texel.a, 1);
}

`);
    }
};


import './Shaders/GLSL/ImageAtlas.js';


class ImageAtlas extends GLTexture2D {
    constructor(gl, name, channels = 'RGBA', format = 'FLOAT', clearColor = [0, 0, 0, 0]) {
        super(gl);
        this.__name = name;
        this.__channels = channels;
        this.__format = format;
        this.__clearColor = clearColor;
        this.__subImages = [];
        this.__layoutNeedsRegeneration = false;
        this.__async = new Async();
        this.loaded = this.__async.ready;
    }

    isLoaded() {
        return this.__async.count == 0;
    }

    getMainImage() {
        return this.super;
    }

    addSubImage(subImage) {
        if (subImage instanceof Image2D) {
            this.__subImages.push(new GLTexture2D(this.__gl, subImage));
            if (!subImage.isLoaded()) {
                this.__async.incAsyncCount();
                subImage.loaded.connect(this.__async.decAsyncCount);
            }
        } else
            this.__subImages.push(subImage);
        this.__layoutNeedsRegeneration = true;
        return this.__subImages.length - 1;
    }

    getSubImage(index) {
        return this.__subImages[index];
    }

    numSubImages() {
        if (this.__layout)
            return this.__layout.length;
        return this.__subImages.length;
    }

    generateAtlasLayout() {
        let maxRez = [this.__subImages[0].width, this.__subImages[0].height];
        let border = 2;
        let initialWidth = maxRez[0] + (border * 2);
        let initialHeight = (maxRez[1] * 1.5) + (border * 2);
        let levels = this.__subImages.length;
        let tree = new BinTreeNode(new BinTreeRect(
            new Vec2(0, 0),
            new BinTreeRectBorder(initialWidth, true),
            new BinTreeRectBorder(initialHeight, true)
        ), true);
        this.__layout = [];

        for (let j = 0; j < this.__subImages.length; j++) {
            let subImage = this.__subImages[j];
            let rectSize = new Vec2(subImage.width, subImage.height);
            rectSize.x += border * 2;
            rectSize.y += border * 2;
            let closestFit = {
                'node': undefined,
                'cost': Number.MAX_VALUE,
                'delta': undefined
            }
            let node = tree.insert(rectSize, closestFit);
            if (node == undefined) {
                if (!closestFit.node)
                    throw ("Error packing image atlas:" + result);
                // we failed to find a space big enought tof our cluster, 
                // but we found a good candidate node bordering a movable border.
                // we move the border(thereby growing the size of the map), and
                // then continue packing
                node = closestFit.node.resizeAndInsert(rectSize, closestFit.delta);
            }
            this.__layout.push({
                pos: new Vec2(node.rect.pos.x + border, node.rect.pos.y + border),
                size: new Vec2(rectSize.x - (border * 2), rectSize.y - (border * 2)),
                boundingRect: {
                    pos: node.rect.pos,
                    size: rectSize
                }
            });
        }

        let width = tree.rect.right.value;
        let height = tree.rect.top.value;

        console.log(this.__name + " Atlas Texture size:" + width.toFixed() + ", " + height.toFixed());

        // Note: only RGBA Float textures can be rendered to on Firefox.(Not RGB)
        this.configure({
            width,
            height,
            channels: (this.__format == 'FLOAT' && this.__channels == 'RGB') ? 'RGBA' : this.__channels,
            format: this.__format,
            filter: 'LINEAR'
        });

        let gl = this.__gl;
        this.__fbo = new GLFbo(gl, this);
        this.__fbo.setClearColor(this.__clearColor);

        if (!gl.__quadVertexIdsBuffer)
            gl.setupInstancedQuad();

        if (!gl.__atlasLayoutShader) {
            gl.__atlasLayoutShader = new AtlasLayoutShader(gl);
            let shaderComp = gl.__atlasLayoutShader.compileForTarget('ImageAtlas');
            gl.__atlasLayoutShaderBinding = generateShaderGeomBinding(gl, shaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer);
        }


        {
            let dataArray = new Float32Array(this.__layout.length * 4); /*each pixel has 4 floats*/
            for (let i = 0; i < this.__layout.length; i++) {
                let imageLayout = this.__layout[i];
                let vec4 = Vec4.createFromFloat32Buffer(dataArray.buffer, i * 4);
                vec4.set(imageLayout.pos.x / width, imageLayout.pos.y / height, imageLayout.size.x / width, imageLayout.size.y / height)
            }
            if (!this.__atlasLayoutTexture) {
                this.__atlasLayoutTexture = new GLTexture2D(gl, {
                    channels: 'RGBA',
                    format: 'FLOAT',
                    width: this.__layout.length,
                    height: 1,
                    filter: 'NEAREST',
                    wrap: 'CLAMP_TO_EDGE',
                    data: dataArray,
                    mipMapped: false
                });
            } else {
                this.__atlasLayoutTexture.resize(this.__layout.length, 1, dataArray);
            }
        }

        this.__layoutNeedsRegeneration = false;
    }

    renderAtlas(cleanup = true) {
        if (this.__layoutNeedsRegeneration) {
            this.generateAtlasLayout();
        }
        if (!this.__fbo)
            return;
        this.__fbo.bindAndClear();

        let gl = this.__gl;
        let renderstate = {};
        gl.__atlasLayoutShader.bind(renderstate, 'ImageAtlas');
        gl.__atlasLayoutShaderBinding.bind(renderstate);
        let scl = new Vec2(1.0 / this.width, 1.0 / this.height);

        let unifs = renderstate.unifs;
        for (let j = 0; j < this.__subImages.length; j++) {
            let image = this.__subImages[j];
            let item = this.__layout[j];
            image.bind(renderstate, unifs.texture.location);
            gl.uniform2fv(unifs.pos.location, item.boundingRect.pos.multiply(scl).asArray());
            gl.uniform2fv(unifs.size.location, item.boundingRect.size.multiply(scl).asArray());
            gl.uniform2f(unifs.textureDim.location, image.width, image.height);
            gl.drawQuad();
        }

        if (cleanup) {
            this.cleanup();
        }

        this.updated.emit();
    }

    bind(renderstate, location) {
        let structName = 'atlas' + this.__name;

        let unifs = renderstate.unifs;
        if (location) {
            super.bind(renderstate, location);
        } else if (unifs[structName + '_image']) {
            super.bind(renderstate, unifs[structName + '_image'].location);
        }

        let atlasLayoutUnifName = structName + '_layout';
        if (atlasLayoutUnifName in unifs)
            this.__atlasLayoutTexture.bind(renderstate, unifs[atlasLayoutUnifName].location);

        let atlasDescUnifName = structName + '_desc';
        if (atlasDescUnifName in unifs)
            this.__gl.uniform4f(unifs[atlasDescUnifName].location, this.width, this.height, this.__layout.length, 0.0);
    }

    cleanup() {
        for (let image of this.__subImages) {
            image.destroy();
        }
        if (this.__fbo)
            this.__fbo.destroy();
        this.__subImages = [];
        this.__fbo = null;
    }

    destroy() {
        this.cleanup();
        super.destroy();
    }

};

export {
    ImageAtlas
};
// export default ImageAtlas;