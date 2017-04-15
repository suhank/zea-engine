import {
    Vec2,
    Vec3,
    Vec4,
    Color,
    Mat4
} from '../Math/Math.js';
import {
    GLLabelItem
} from './GLLabelItem.js';
import {
    BillboardShader
} from './Shaders/BillboardShader.js';
import {
    GLPass
} from './GLPass.js';
import {
    GLShader
} from './GLShader.js';


class GLBillboardsPass extends GLPass {
    constructor(gl, collector) {
        super(gl, collector);

        this.__glshader = new GLShader(gl, new BillboardShader(gl));
        this.__billboards = [];
        this.__atlas = new ImageAtlas(gl, 'Billboards', channels='RGB', format = 'UNSIGNED_BYTE');

        if (!gl.__quadVertexIdsBuffer) {
            gl.setupInstancedQuad();
        }

        this.__buffers = {
            'billboardIds': gl.createBuffer()
        };

        this.__collector.billboardDiscovered.connect(this.addBillboard, this);
    }

    addBillboard(billboard) {

        billboard.visibilityChanged.connect(() => {
            //this.__updateLabelInstanceData();
        });

        billboard.destructing.connect(this.removeBillboardItem, this);
        billboard.billboard.__assignedToPass = true;

        this.__billboards.push({
            billboard: billboard,
            imageIndex: this.__atlas.addSubImage(billboard.image2d);
        });

        this.__uploadRequired = true;
    }

    removeBillboardItem(billboard) {
        let index = this.__billboards.indexOf(billboard);
        billboard.destructing.disconnect(this.removeBillboardItem, this);
        this.__billboards.splice(index, 1);
    }


    __populateBillboardDataArray(billboard, index, dataArray){
        let mat4 = billboard.getGlobalXfo().toMat4();

        let stride = 16; // The number of floats per draw item.
        let offset = index * stride;
        let col0 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset);
        let col1 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset+4);
        let col2 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset+8);
        let col3 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset+12);
        col0.set(mat4.xAxis.x, mat4.yAxis.x, mat4.zAxis.x, mat4.translation.x);
        col1.set(mat4.xAxis.y, mat4.yAxis.y, mat4.zAxis.y, mat4.translation.y);
        col2.set(mat4.xAxis.z, mat4.yAxis.z, mat4.zAxis.z, mat4.translation.z);
        let flags = 0;
        if(gldrawItem.isMirrored())
            flags = 1;
        let materialId = 0;
        col3.set(lightmapCoordsOffset.x, lightmapCoordsOffset.y, materialId, flags);
    }

    __updateBillboardInstanceData() {
        if(this.__billboards.length == 0)
            return;

        let gl = this.__renderer.gl;
        let stride = 4; // The number of pixels per draw item.
        let size = Math.round(Math.sqrt(this.__billboards.length * stride) + 0.5);
        let dataArray = new Float32Array((size * size) * 4); /*each pixel has 4 floats*/
        for (let i=0; i<this.__billboards.length; i++) {
            this.__populateBillboardDataArray(this.__billboards[i], i, dataArray);
        }
        if(!this.__instancesTexture){
            this.__instancesTexture = new GLTexture2D(gl, {
                channels: 'RGBA',
                format: 'FLOAT',
                width: size,
                height: size,
                filter: 'NEAREST',
                wrap: 'CLAMP_TO_EDGE',
                data: dataArray,
                mipMapped: false
            });
        }
        else{
            this.__instancesTexture.resize(size, size, dataArray);
        }

        let indexArray = new Float32Array(indices.length);
        for (let i=0; i<this.__billboards.length; i++) {
            indexArray[i] = i;
        }
        let indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, indexArray, gl.STATIC_DRAW);

        this.__glattrbuffers = {
            billboardIndices: {
                buffer: indexBuffer,
                instanced: true,
                dimension: 1,
                count: indices.length
            }
        };
    }

    __updateBillboard(index, billboard){
        if(!this.__instancesTexture)
            return;

        let gl = this.__renderer.gl;

        let stride = 16; // The number of floats per draw item.
        let dataArray = new Float32Array(stride);
        this.__populateBillboardDataArray(billboard, 0, dataArray);

        gl.bindTexture(gl.TEXTURE_2D, this.__instancesTexture.glTex);
        let xoffset = index*(stride/4); /*each pixel has 4 floats*/
        let yoffset = 0;
        let width = stride/4;
        let height = 1;
        gl.texSubImage2D(gl.TEXTURE_2D, 0, xoffset, yoffset, width, height, gl.RGBA, gl.FLOAT, dataArray);

    }

    draw(renderstate) {

        if (this.__billboards.length == 0)
            return;


        let gl = this.__gl;
        this.__glshader.bind(renderstate);

        let shaderBinding = this.__shaderBindings[renderstate.shaderkey];
        if (!shaderBinding) {
            shaderBinding = generateShaderGeomBinding(gl, renderstate.attrs, this.__glattrbuffers, gl.__quadIndexBuffer, extrAttrBuffers, transformIds);
            this.__shaderBindings[renderstate.shaderkey] = shaderBinding;
        }
        shaderBinding.bind(renderstate);

        let unifs = renderstate.unifs;
        this.__instancesTexture.bind(renderstate, unifs.billboardInstancesTexture.location);
        gl.uniform1i(unifs.billboardInstancesTextureSize.location, this.__instancesTexture.width);

        gl.__ext_Inst.drawElementsInstancedANGLE(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0, this.__billboards.length);
    }
};

export {
    GLBillboardsPass
};