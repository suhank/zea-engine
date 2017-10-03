import {
    Vec3, 
    Vec4
} from '../../Math';
import {
    BillboardItem
} from '../../SceneTree';
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
    generateShaderGeomBinding
} from '../GeomShaderBinding.js';

class GLBillboardsPass extends GLPass {
    constructor(gl, collector) {
        super(gl, collector);

        if (!gl.__quadVertexIdsBuffer) {
            gl.setupInstancedQuad();
        }

        this.__billboards = [];
        this.__closestBillboard = 0.0;
        this.__atlasNeedsUpdating = false;
        this.__atlas = new ImageAtlas(gl, 'Billboards', 'RGBA', 'UNSIGNED_BYTE', [1, 1, 1, 0]);
        this.__glshader = new BillboardShader(gl);
        let shaderComp = this.__glshader.compileForTarget();
        this.__shaderBinding = generateShaderGeomBinding(gl, shaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer);


        this.__collector.renderTreeUpdated.connect(()=> this.__updateBillboards());

        this.__prevSortCameraPos = new Vec3();


        collector.registerSceneItemFilter((treeItem, rargs)=>{
            if(treeItem instanceof BillboardItem) {
                this.addBillboard(treeItem);
                return true;
            }
        });
    }

    /////////////////////////////////////
    // Bind to Render Tree

    filterRenderTree() {}

    addBillboard(billboard) {

        const image = billboard.getParameter('image').getValue();
        const index = this.__billboards.length;
        this.__billboards.push({
            billboard,
            index,
            imageIndex: this.__atlas.addSubImage(image)
        });

        billboard.visibilityChanged.connect(() => {
            this.__updateBillboard(index);
            this.updated.emit();
        });
        billboard.getParameter('image').getValue().updated.connect(() => {
            throw("TODO: update the atlas:" + index);
        });
        billboard.getParameter('alpha').valueChanged.connect(() => {
            this.__updateBillboard(index);
            this.updated.emit();
        });

        billboard.destructing.connect(this.removeBillboardItem.bind(this));
        this.__atlasNeedsUpdating = true;
    }

    removeBillboardItem(billboard) {
        const index = this.__billboards.indexOf(billboard);
        billboard.destructing.disconnect(this.removeBillboardItem.bind(this));
        this.__billboards.splice(index, 1);
        this.__atlasNeedsUpdating = true;
    }


    __populateBillboardDataArray(billboardData, index, dataArray) {
        const billboard = billboardData.billboard;
        const mat4 = billboard.getGlobalXfo().toMat4();
        const scale = billboard.getParameter('scale').getValue();
        const flags = billboard.getParameter('flags').getValue();
        const alpha = billboard.getParameter('alpha').getValue();
        const color = billboard.getParameter('color').getValue();

        const pixelsPerItem = 6;
        const offset = index * pixelsPerItem * 4;
        const col0 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset);
        const col1 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 4);
        const col2 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 8);
        const col3 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 12);
        col0.set(mat4.xAxis.x, mat4.yAxis.x, mat4.zAxis.x, mat4.translation.x);
        col1.set(mat4.xAxis.y, mat4.yAxis.y, mat4.zAxis.y, mat4.translation.y);
        col2.set(mat4.xAxis.z, mat4.yAxis.z, mat4.zAxis.z, mat4.translation.z);
        col3.set(scale, flags, billboardData.imageIndex, alpha);

        const col4 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 16);
        col4.set(color.r, color.g, color.b, color.a);
    }

    __updateBillboards() {
        if (!this.__atlasNeedsUpdating)
            return;

        const doIt = ()=>{
            const gl = this.__gl;

            // Note: Currently the atlas destorys all the source images
            // after loading them(to save memory). This means we can't
            // re-render the atlas. If re-rendering is needed, add an age
            this.__atlas.renderAtlas();


            const pixelsPerItem = 6; // The number of pixels per draw item.
            let size = Math.round(Math.sqrt(this.__billboards.length * pixelsPerItem) + 0.5);


            // Note: the following few lines need a cleanup. 
            // We should be using power of 2 textures. The problem is that pot texture sizes don't
            // align with the 6 pixels per draw item. So we need to upload a slightly bigger teture
            // but upload the 'usable' size.

            // Only support power 2 textures. Else we get strange corruption on some GPUs
            // in some scenes.
            // Size should be a multiple of pixelsPerItem, so each geom item is always contiguous
            // in memory. (makes updating a lot easier. See __updateItemInstanceData below)
            // size = Math.nextPow2(size);

            if((size % pixelsPerItem) != 0)
                size += pixelsPerItem - (size % pixelsPerItem);

            this.__width = size;
            // if((this.__width % pixelsPerItem) != 0)
            //     this.__width -= (this.__width % pixelsPerItem);

            if (!this.__instancesTexture) {
                this.__instancesTexture = new GLTexture2D(gl, {
                    channels: 'RGBA',
                    format: 'FLOAT',
                    width: size,
                    height: size,
                    filter: 'NEAREST',
                    wrap: 'CLAMP_TO_EDGE',
                    mipMapped: false
                });
            } else {
                this.__instancesTexture.resize(size, size);
            }

            for (let i = 0; i < this.__billboards.length; i++) {
                this.__updateBillboard(i);
            }

            // Note: When the camera moves, this array is sorted and re-upload.
            this.__indexArray = new Float32Array(this.__billboards.length);
            for (let i = 0; i < this.__billboards.length; i++) {
                this.__indexArray[i] = this.__billboards[i].index;
            }
            this.__instanceIdsBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.__instanceIdsBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.__indexArray, gl.STATIC_DRAW);

            this.__atlasNeedsUpdating = false;
        };

        if (this.__atlas.isLoaded()) {
            doIt();
        } else {
            this.__atlas.loaded.connect(doIt)
        }
    }

    __updateBillboard(index) {
        if (!this.__instancesTexture)
            return;

        const billboardData = this.__billboards[index];
        const gl = this.__gl;

        const pixelsPerItem = 6; // The number of pixels per draw item.
        const dataArray = new Float32Array(pixelsPerItem * 4);
        this.__populateBillboardDataArray(billboardData, 0, dataArray);

        gl.bindTexture(gl.TEXTURE_2D, this.__instancesTexture.glTex);
        const xoffset = (index * pixelsPerItem) % this.__width;
        const yoffset = Math.floor((index * pixelsPerItem) / this.__width);
        const width = pixelsPerItem;
        const height = 1;
        // console.log("xoffset:" + xoffset + " yoffset:" + yoffset +" width:" + width + " dataArray:" + dataArray.length);
        gl.texSubImage2D(gl.TEXTURE_2D, 0, xoffset, yoffset, width, height, gl.RGBA, gl.FLOAT, dataArray);

    }

    sort(cameraPos) {
        for (let billboardData of this.__billboards) {
            billboardData.dist = billboardData.billboard.getGlobalXfo().tr.distanceTo(cameraPos);
        }
        this.__indexArray.sort((a, b) => (this.__billboards[a].dist > this.__billboards[b].dist) ? -1 : ((this.__billboards[a].dist < this.__billboards[b].dist) ? 1 : 0));

        let gl = this.__gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.__instanceIdsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.__indexArray, gl.STATIC_DRAW);
    }


    draw(renderstate) {

        if (this.__atlasNeedsUpdating)
            this.__updateBillboards();

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
        this.__instancesTexture.bindToUniform(renderstate, unifs.instancesTexture);
        gl.uniform1i(unifs.instancesTextureSize.location, this.__width);

        this.__atlas.bindToUniform(renderstate, unifs.atlasBillboards);

        {
            // The instance transform ids are bound as an instanced attribute.
            let location = renderstate.attrs.instanceIds.location;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.__instanceIdsBuffer);
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(location, 1, gl.FLOAT, false, 4, 0);
            gl.__ext_Inst.vertexAttribDivisorANGLE(location, 1); // This makes it instanced
        }


        gl.disable(gl.CULL_FACE);
        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.__ext_Inst.drawElementsInstancedANGLE(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0, this.__billboards.length);
    }
};

export {
    GLBillboardsPass
};
// export default GLBillboardsPass;