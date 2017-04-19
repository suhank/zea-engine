import {
    Vec3,
    Vec4
} from '../../Math';
import {
    BillboardShader
} from '../Shaders/BillboardShader.js';
import {
    GLPass
} from '../GLPass.js';
import {
    GLShader
} from '../GLShader.js';
import {
    ImageAtlas
} from '../ImageAtlas.js';
import {
    GLTexture2D
} from '../GLTexture2D.js';
import {
    generateShaderGeomBinding,
} from '../GeomShaderBinding.js';

class GLBillboardsPass extends GLPass {
    constructor(gl, collector) {
        super(gl, collector);

        if (!gl.__quadVertexIdsBuffer) {
            gl.setupInstancedQuad();
        }

        this.__billboards = [];
        this.__closestBillboard = 0.0;
        this.__atlas = new ImageAtlas(gl, 'Billboards', 'RGB', 'UNSIGNED_BYTE');
        this.__glshader = new GLShader(gl, new BillboardShader(gl));

        this.__collector.billboardDiscovered.connect(this.addBillboard, this);
        this.__collector.renderTreeUpdated.connect(this.__updateBillboards, this);

        this.__prevSortCameraPos = new Vec3();
    }
    
    /////////////////////////////////////
    // Bind to Render Tree
    filterRenderTree() {
    }

    addBillboard(billboard) {

        let index = this.__billboards.length;
        this.__billboards.push({
            billboard: billboard,
            index: index,
            imageIndex: this.__atlas.addSubImage(billboard.image2d)
        });

        billboard.visibilityChanged.connect(() => {
            this.__updateBillboard(index);
        });

        billboard.destructing.connect(this.removeBillboardItem, this);
    }

    removeBillboardItem(billboard) {
        let index = this.__billboards.indexOf(billboard);
        billboard.destructing.disconnect(this.removeBillboardItem, this);
        this.__billboards.splice(index, 1);
    }


    __populateBillboardDataArray(billboardData, index, dataArray) {
        let mat4 = billboardData.billboard.globalXfo.toMat4();

        let stride = 24; // The number of floats per draw item.
        let offset = index * stride;
        let col0 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset);
        let col1 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 4);
        let col2 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 8);
        let col3 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 12);
        col0.set(mat4.xAxis.x, mat4.yAxis.x, mat4.zAxis.x, mat4.translation.x);
        col1.set(mat4.xAxis.y, mat4.yAxis.y, mat4.zAxis.y, mat4.translation.y);
        col2.set(mat4.xAxis.z, mat4.yAxis.z, mat4.zAxis.z, mat4.translation.z);
        col3.set(billboardData.billboard.scale, 1.0, billboardData.imageIndex, 0.0);

        let col4 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 16);
        let color = billboardData.billboard.color;
        col4.set(color.r, color.g, color.b, color.a);
    }

    __updateBillboards() {
        if (this.__billboards.length == 0)
            return;

        let doIt = function() {
            let gl = this.__gl;
            this.__atlas.renderAtlas();


            let stride = 6; // The number of pixels per draw item.
            let size = Math.round(Math.sqrt(this.__billboards.length * stride) + 0.5);
            let dataArray = new Float32Array((size * size) * 4); /*each pixel has 4 floats*/
            for (let i = 0; i < this.__billboards.length; i++) {
                this.__populateBillboardDataArray(this.__billboards[i], i, dataArray);
            }
            if (!this.__instancesTexture) {
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
            } else {
                this.__instancesTexture.resize(size, size, dataArray);
            }

            // Note: When the camera moves, this array is sorted and re-upload.
            this.__indexArray = new Float32Array(this.__billboards.length);
            this.__instancedIdsBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.__instancedIdsBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.__indexArray, gl.STATIC_DRAW);


            let shaderComp = this.__glshader.compileForTarget();
            this.__shaderBinding = generateShaderGeomBinding(gl, shaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer, undefined, this.__instancedIdsBuffer);

        }.bind(this);

        if (this.__atlas.isLoaded()) {
            doIt();
        } else {
            this.__atlas.loaded.connect(doIt)
        }
    }

    __updateBillboard(index, billboardData) {
        if (!this.__instancesTexture)
            return;

        let gl = this.__gl;

        let stride = 16; // The number of floats per draw item.
        let dataArray = new Float32Array(stride);
        this.__populateBillboardDataArray(billboardData, 0, dataArray);

        gl.bindTexture(gl.TEXTURE_2D, this.__instancesTexture.glTex);
        let xoffset = index * (stride / 4); /*each pixel has 4 floats*/
        let yoffset = 0;
        let width = stride / 4;
        let height = 1;
        gl.texSubImage2D(gl.TEXTURE_2D, 0, xoffset, yoffset, width, height, gl.RGBA, gl.FLOAT, dataArray);

    }

    sort(cameraPos) {
        for (let billboardData of this.__billboards){
            billboardData.dist = billboardData.billboard.globalXfo.tr.distanceTo(cameraPos);
        }
        this.__billboards.sort((a, b) => (a.dist > b.dist) ? -1 : ((a.dist < b.dist) ? 1 : 0));

        for (let i = 0; i < this.__billboards.length; i++) {
            this.__indexArray[i] = this.__billboards[i].index;
        }
        let gl = this.__gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.__instancedIdsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.__indexArray, gl.STATIC_DRAW);
    }


    draw(renderstate) {

        if (!this.__instancesTexture)
            return;

        let cameraPos = renderstate.cameraMatrix.translation;
        let dist = cameraPos.distanceTo(this.__prevSortCameraPos);
        // Avoid sorting if the camera did not move more than 3 meters.
        if (dist > this.__closestBillboard) {
            this.sort(cameraPos);
            this.__prevSortCameraPos = cameraPos.clone();
            this.__closestBillboard = this.__billboards[0].dist;
        }

        let gl = this.__gl;
        this.__glshader.bind(renderstate);
        this.__shaderBinding.bind(renderstate);

        let unifs = renderstate.unifs;
        this.__instancesTexture.bind(renderstate, unifs.instancesTexture.location);
        gl.uniform1i(unifs.instancesTextureSize.location, this.__instancesTexture.width);

        this.__atlas.bind(renderstate);

        gl.enable(gl.BLEND);
        gl.disable(gl.CULL_FACE);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.__ext_Inst.drawElementsInstancedANGLE(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0, this.__billboards.length);
    }
};

export {
    GLBillboardsPass
};