


class GeomShaderBinding {
    constructor(gl, shaderAttrs, glattrbuffers, indexBuffer, extrAttrBuffers) {
        this.__gl = gl;
        this.__shaderAttrs = shaderAttrs;
        this.__glattrbuffers = glattrbuffers;
        this.__extrAttrBuffers = extrAttrBuffers;
        this.__indexBuffer = indexBuffer;
    }

    bind(renderstate) {
        const gl = this.__gl;

        for (let attrName in this.__shaderAttrs) {
            const attrDesc = this.__shaderAttrs[attrName];
            const location = attrDesc.location;
            if (location == -1)
                continue;
            let glattrbuffer = this.__glattrbuffers[attrName];
            if (!glattrbuffer) {
                glattrbuffer = this.__extrAttrBuffers ? this.__extrAttrBuffers[attrName] : undefined;
                if (!glattrbuffer) {
                    if (attrName != 'instancedIds') {
                        gl.disableVertexAttribArray(location);
                    }
                    continue;
                }
            }

            const dataType = glattrbuffer.dataType != undefined ? glattrbuffer.dataType : gl.FLOAT;
            const dimension = glattrbuffer.dimension;
            const stride = glattrbuffer.dimension * gl.sizeInBytes(dataType);
            const offset = glattrbuffer.offset != undefined ? glattrbuffer.offset * dimension * gl.sizeInBytes(dataType) : 0;
            const normalized = glattrbuffer.normalized==true;
            const instanced = attrDesc.instanced;

            gl.enableVertexAttribArray(location);
            gl.bindBuffer(gl.ARRAY_BUFFER, glattrbuffer.buffer);
            gl.vertexAttribPointer(location, dimension, dataType, normalized, stride, offset);
            
            if(gl.vertexAttribDivisor) {
                if(instanced==true){
                    gl.vertexAttribDivisor(location, 1); // This makes it instanced
                }
                else {
                    gl.vertexAttribDivisor(location, 0); // This makes it not-instanced
                }
            }

            // console.log("Binding :" + attrName + " to attr:" + location + " count:" + glattrbuffer.count + " dimension:" + dimension  + " stride:" + stride  + " offset:" + offset + " normalized:" + normalized + " instanced:" + instanced);
        }

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer);

        return true;
    }

    unbind() {
        const gl = this.__gl;
        for (let attrName in this.__shaderAttrs) {
            const attrDesc = this.__shaderAttrs[attrName];
            const location = attrDesc.location;
            if (location == -1)
                continue;
            gl.disableVertexAttribArray(location);
            gl.vertexAttribDivisor(location, 0); // This makes it not-instanced

            // console.log("Binding :" + attrName + " to attr:" + location + " count:" + glattrbuffer.count + " dimension:" + dimension  + " stride:" + stride  + " offset:" + offset + " normalized:" + normalized + " instanced:" + instanced);
        }

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    destroy(){
    }
};

class VAOGeomShaderBinding {
    constructor(gl, shaderAttrs, glattrbuffers, indexBuffer, extrAttrBuffers) {
        this.__gl = gl;
        this.__vao = gl.createVertexArray();
        gl.bindVertexArray(this.__vao);

        for (let attrName in shaderAttrs) {
            const attrDesc = shaderAttrs[attrName];
            const location = attrDesc.location;
            if (location == -1)
                continue;
            let glattrbuffer = glattrbuffers[attrName];
            if (!glattrbuffer) {
                glattrbuffer = extrAttrBuffers ? extrAttrBuffers[attrName] : undefined;
                if (!glattrbuffer) {
                    // console.warn("glattrbuffer missing:" + attrName + " location:" + location);
                    if (attrName != 'instancedIds')
                        gl.disableVertexAttribArray(location);
                    continue;
                }
            }

            const dataType = glattrbuffer.dataType != undefined ? glattrbuffer.dataType : gl.FLOAT;
            const dimension = glattrbuffer.dimension;
            const stride = glattrbuffer.dimension * gl.sizeInBytes(dataType);
            const offset = glattrbuffer.offset != undefined ? glattrbuffer.offset * dimension * gl.sizeInBytes(dataType) : 0;
            const normalized = glattrbuffer.normalized==true;
            const instanced = attrDesc.instanced;

            gl.enableVertexAttribArray(location);
            gl.bindBuffer(gl.ARRAY_BUFFER, glattrbuffer.buffer);
            gl.vertexAttribPointer(location, dimension, dataType, normalized, stride, offset);
            if(instanced){
                gl.vertexAttribDivisor(location, 1); // This makes it instanced
            }
            else {
                gl.vertexAttribDivisor(location, 0); // This makes it not-instanced
            }

            // console.log("Binding :" + attrName + " to attr:" + location + " count:" + glattrbuffer.count + " dimension:" + dimension  + " stride:" + stride  + " offset:" + offset + " normalized:" + normalized + " instanced:" + instanced);

        }

        this.__indexBuffer = indexBuffer;
    }

    bind(renderstate) {
        this.__gl.bindVertexArray(this.__vao);
        this.__gl.bindBuffer(this.__gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer);
        return true;
    }

    unbind() {
        const gl = this.__gl;
        for (let attrName in this.__shaderAttrs) {
            const attrDesc = this.__shaderAttrs[attrName];
            const location = attrDesc.location;
            if (location == -1)
                continue;
            gl.disableVertexAttribArray(location);
            gl.vertexAttribDivisor(location, 0); // This makes it not-instanced

            // console.log("Unbinding :" + attrName + " to attr:" + location + " count:" + glattrbuffer.count + " dimension:" + dimension  + " stride:" + stride  + " offset:" + offset + " normalized:" + normalized + " instanced:" + instanced);
        }

        this.__gl.bindVertexArray(null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    destroy(){
        this.__gl.deleteVertexArray(this.__vao);
    }
};

function generateShaderGeomBinding(gl, shaderAttrs, glattrbuffers, indexBuffer, extrAttrBuffers){
    if(gl.createVertexArray == null){
        return new GeomShaderBinding(gl, shaderAttrs, glattrbuffers, indexBuffer, extrAttrBuffers);
    }
    else{
        return new VAOGeomShaderBinding(gl, shaderAttrs, glattrbuffers, indexBuffer, extrAttrBuffers);
    }
}

export {
    generateShaderGeomBinding
};