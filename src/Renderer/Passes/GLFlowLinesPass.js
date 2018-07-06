import {
    Vec3, 
    Vec4
} from '../../Math';
import {
    FlowLineItem
} from '../../SceneTree';
import {
    FlowLineShader
} from '../Shaders/FlowLineShader.js';
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


const pixelsPerItem = 5; // The number of pixels per draw item.

class GLFlowLinesPass extends GLPass {
    constructor() {
        super();
    }
    
    init(gl, collector, passIndex) {
        super.init(gl, collector, passIndex);

        this.__flowLines = [];
        this.__closestFlowLine = 0.0;
        this.__updateRequested = false;

        this.__collector.renderTreeUpdated.connect(()=> this.__updateFlowLines());

        this.__prevSortCameraPos = new Vec3();

        this.__atlas = new ImageAtlas(gl, 'FlowLines', 'RGBA', 'UNSIGNED_BYTE', [1, 1, 1, 0]);
        this.__atlas.loaded.connect(this.updated.emit);
        this.__atlas.updated.connect(this.updated.emit);

        collector.registerSceneItemFilter((treeItem, rargs)=>{
            if(treeItem instanceof FlowLineItem) {
                this.addFlowLine(treeItem);
                return true;
            }
        });
    }

    /////////////////////////////////////
    // Bind to Render Tree

    filterRenderTree() {}

    __requestUpdate(){
        if(!this.__updateRequested) {
            this.__updateRequested = true;
            setTimeout(()=>{
              this.__updateFlowLines();  
            }, 100);
        }
    }

    __populateNURBSCurveDataArray(nurbsCurve) {
        const dataArray = new Float32Array(nurbsCurve);
        const flowLine = nurbsCurve.flowLine;
        const mat4 = flowLine.getGlobalXfo().toMat4();
        const scale = flowLine.getParameter('scale').getValue();
        let flags = 0;
        if(flowLine.getParameter('alignedToCamera').getValue())
            flags |= 1<<2;
        const alpha = flowLine.getParameter('alpha').getValue();
        const color = flowLine.getParameter('color').getValue();

        const offset = index * pixelsPerItem * 4;
        const col0 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset);
        const col1 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 4);
        const col2 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 8);
        const col3 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 12);
        col0.set(mat4.xAxis.x, mat4.yAxis.x, mat4.zAxis.x, mat4.translation.x);
        col1.set(mat4.xAxis.y, mat4.yAxis.y, mat4.zAxis.y, mat4.translation.y);
        col2.set(mat4.xAxis.z, mat4.yAxis.z, mat4.zAxis.z, mat4.translation.z);
        col3.set(scale, flags, flowLineData.imageIndex, alpha);

        const col4 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 16);
        col4.set(color.r, color.g, color.b, color.a);
    }

    addFlowLine(flowLine) {

        const image = flowLine.getParameter('image').getValue();
        const index = this.__flowLines.length;
        this.__flowLines.push({
            flowLine,
            index,
            imageIndex: this.__atlas.addSubImage(image)
        });

        flowLine.visibilityChanged.connect(() => {
            this.__updateFlowLine(index);
            this.updated.emit();
        });
        flowLine.getParameter('image').getValue().updated.connect(() => {
            // throw("TODO: update the atlas:" + index);
            this.__updateFlowLine(index);
        });
        flowLine.getParameter('alpha').valueChanged.connect(() => {
            this.__updateFlowLine(index);
            this.updated.emit();
        });

        flowLine.destructing.connect(this.removeFlowLineItem.bind(this));
        this.__requestUpdate();
    }

    removeFlowLineItem(flowLine) {
        const index = this.__flowLines.indexOf(flowLine);
        flowLine.destructing.disconnect(this.removeFlowLineItem.bind(this));
        this.__flowLines.splice(index, 1);
        this.__requestUpdate();
    }


    __populateFlowLineDataArray(flowLineData, index, dataArray) {
        const flowLine = flowLineData.flowLine;
        const mat4 = flowLine.getGlobalXfo().toMat4();
        const scale = flowLine.getParameter('scale').getValue();
        let flags = 0;
        if(flowLine.getParameter('alignedToCamera').getValue())
            flags |= 1<<2;
        const alpha = flowLine.getParameter('alpha').getValue();
        const color = flowLine.getParameter('color').getValue();

        const offset = index * pixelsPerItem * 4;
        const col0 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset);
        const col1 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 4);
        const col2 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 8);
        const col3 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 12);
        col0.set(mat4.xAxis.x, mat4.yAxis.x, mat4.zAxis.x, mat4.translation.x);
        col1.set(mat4.xAxis.y, mat4.yAxis.y, mat4.zAxis.y, mat4.translation.y);
        col2.set(mat4.xAxis.z, mat4.yAxis.z, mat4.zAxis.z, mat4.translation.z);
        col3.set(scale, flags, flowLineData.imageIndex, alpha);

        const col4 = Vec4.createFromFloat32Buffer(dataArray.buffer, offset + 16);
        col4.set(color.r, color.g, color.b, color.a);
    }

    __updateFlowLines() {
        if (!this.__updateRequested)
            return;

        // Note: When the camera moves, this array is sorted and re-upload.
        this.__indexArray = new Float32Array(this.__flowLines.length);
        for (let i = 0; i < this.__flowLines.length; i++) {
            this.__indexArray[i] = this.__flowLines[i].index;
        }

        const gl = this.__gl;
        if(!this.__glshader) {
            if (!gl.__quadVertexIdsBuffer) {
                gl.setupInstancedQuad();
            }
            this.__glshader = new FlowLineShader(gl);
            let shaderComp = this.__glshader.compileForTarget('GLFlowLinesPass', this.__collector.getRenderer().getShaderPreproc());
            this.__shaderBinding = generateShaderGeomBinding(gl, shaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer);
        }

        const doIt = ()=>{

            // Note: Currently the atlas destroys all the source images
            // after loading them(to save memory). This means we can't
            // re-render the atlas. If re-rendering is needed, add an age
            this.__atlas.renderAtlas();

            if(!gl.floatTexturesSupported || !gl.drawElementsInstanced) {
                this.__modelMatrixArray = [];
                this.__flowLineDataArray = [];
                this.__tintColorArray = [];
                this.__flowLines.forEach((flowLineData, index)=>{

                    const flowLine = flowLineData.flowLine;
                    const mat4 = flowLine.getGlobalXfo().toMat4();
                    const scale = flowLine.getParameter('scale').getValue();
                    const flags = flowLine.getParameter('flags').getValue();
                    const alpha = flowLine.getParameter('alpha').getValue();
                    const color = flowLine.getParameter('color').getValue();

                    this.__modelMatrixArray[index] = mat4.asArray();
                    this.__flowLineDataArray[index] = [scale, flags, flowLineData.imageIndex, alpha];
                    this.__tintColorArray[index] = [color.r, color.g, color.b, color.a];
                });
                this.__updateRequested = false;
                return;
            }


            let size = Math.round(Math.sqrt(this.__flowLines.length * pixelsPerItem) + 0.5);
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

            if (!this.__drawItemsTexture) {
                this.__drawItemsTexture = new GLTexture2D(gl, {
                    format: 'RGBA',
                    type: 'FLOAT',
                    width: size,
                    height: size,
                    filter: 'NEAREST',
                    wrap: 'CLAMP_TO_EDGE',
                    mipMapped: false
                });
            } else {
                this.__drawItemsTexture.resize(size, size);
            }

            for (let i = 0; i < this.__flowLines.length; i++) {
                this.__updateFlowLine(i);
            }


            this.__instanceIdsBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.__instanceIdsBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.__indexArray, gl.STATIC_DRAW);

            this.__updateRequested = false;
        };

        if (this.__atlas.isLoaded()) {
            doIt();
        } else {
            this.__atlas.loaded.connect(doIt)
        }
    }

    __updateFlowLine(index) {
        if (!this.__drawItemsTexture)
            return;

        const flowLineData = this.__flowLines[index];
        const gl = this.__gl;

        const dataArray = new Float32Array(pixelsPerItem * 4);
        this.__populateFlowLineDataArray(flowLineData, 0, dataArray);

        gl.bindTexture(gl.TEXTURE_2D, this.__drawItemsTexture.glTex);
        const xoffset = (index * pixelsPerItem) % this.__width;
        const yoffset = Math.floor((index * pixelsPerItem) / this.__width);

        const width = pixelsPerItem;
        const height = 1;
        // console.log("xoffset:" + xoffset + " yoffset:" + yoffset +" width:" + width + " dataArray:" + dataArray.length);
        // gl.texSubImage2D(gl.TEXTURE_2D, 0, xoffset, yoffset, width, height, gl.RGBA, gl.FLOAT, dataArray);

        const type = this.__drawItemsTexture.getType();
        const format = this.__drawItemsTexture.getFormat();

        if (type == 'FLOAT') {
            gl.texSubImage2D(gl.TEXTURE_2D, 0, xoffset, yoffset, width, height, gl[format], gl[type], dataArray);
        } else {
            const unit16s = Math.convertFloat32ArrayToUInt16Array(dataArray);
            gl.texSubImage2D(gl.TEXTURE_2D, 0, xoffset, yoffset, width, height, gl[format], gl[type], unit16s);
        }

    }

    sort(cameraPos) {
        for (let flowLineData of this.__flowLines) {
            flowLineData.dist = flowLineData.flowLine.getGlobalXfo().tr.distanceTo(cameraPos);
        }
        this.__indexArray.sort((a, b) => (this.__flowLines[a].dist > this.__flowLines[b].dist) ? -1 : ((this.__flowLines[a].dist < this.__flowLines[b].dist) ? 1 : 0));

        const gl = this.__gl;
        if(gl.floatTexturesSupported && this.__instanceIdsBuffer) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.__instanceIdsBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.__indexArray, gl.STATIC_DRAW);
        }
    }


    draw(renderstate) {

        if(this.__flowLines.length == 0)
            return;



        const gl = this.__gl;

        gl.disable(gl.CULL_FACE);
        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        let cameraPos = renderstate.cameraMatrix.translation;
        let dist = cameraPos.distanceTo(this.__prevSortCameraPos);
        // Avoid sorting if the camera did not move more than 3 meters.
        if (dist > this.__closestFlowLine) {
            this.sort(cameraPos);
            this.__prevSortCameraPos = cameraPos.clone();
            this.__closestFlowLine = this.__flowLines[0].dist;
        }

        this.__glshader.bind(renderstate);
        this.__shaderBinding.bind(renderstate);

        const unifs = renderstate.unifs;
        this.__atlas.bindToUniform(renderstate, unifs.atlasFlowLines);

        if(!gl.floatTexturesSupported || !gl.drawElementsInstanced) {
            const len = this.__indexArray.length;
            for (let i = 0; i < len; i++) {
                // this.__drawItems[i].bind(renderstate);
                // this.__glgeom.draw();

                gl.uniformMatrix4fv(unifs.modelMatrix.location, false, this.__modelMatrixArray[i]);
                gl.uniform4fv(unifs.flowLineData.location, this.__flowLineDataArray[i]);
                gl.uniform4fv(unifs.tintColor.location, this.__tintColorArray[i]);
                gl.uniform4fv(unifs.layoutData.location, this.__atlas.getLayoutData(this.__flowLines[i].imageIndex));
                ;
                gl.drawQuad();
            };
        }
        else
        {
            this.__drawItemsTexture.bindToUniform(renderstate, unifs.instancesTexture);
            gl.uniform1i(unifs.instancesTextureSize.location, this.__width);


            {
                // The instance transform ids are bound as an instanced attribute.
                let location = renderstate.attrs.instanceIds.location;
                gl.enableVertexAttribArray(location);
                gl.bindBuffer(gl.ARRAY_BUFFER, this.__instanceIdsBuffer);
                gl.vertexAttribPointer(location, 1, gl.FLOAT, false, 4, 0);
                gl.vertexAttribDivisor(location, 1); // This makes it instanced
            }


            gl.drawElementsInstanced(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0, this.__flowLines.length);
        }

        gl.disable(gl.BLEND);
    }
};

export {
    GLFlowLinesPass
};
// export default GLFlowLinesPass;