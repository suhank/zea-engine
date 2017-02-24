




class GeomShaderBinding {
    constructor(gl, shaderAttrs, glattrbuffers, indexBuffer, extrAttrBuffers, transformIdsBuffer) {

        this.__gl = gl;
        this.__glattrbuffers = glattrbuffers;
        this.__extrAttrBuffers = extrAttrBuffers;
        this.__indexBuffer = indexBuffer;
        this.__transformIdsBuffer = transformIdsBuffer;
    }

    bind(renderstate) {
        let gl = this.__gl;

        let attrs = renderstate.attrs;
        for (let attrName in attrs) {
            let attrDesc = attrs[attrName];
            let location = attrDesc.location;
            if (location == -1)
                continue;
            let glattrbuffer = this.__glattrbuffers[attrName];
            if (!glattrbuffer) {
                glattrbuffer = this.__extrAttrBuffers ? this.__extrAttrBuffers[attrName] : undefined;
                if (!glattrbuffer) {
                    if (attrName == 'instancedTransformIds' && this.__transformIdsBuffer) {

                        // The instanced transform ids are bound as an instanced attribute.
                        let dimension = 1;
                        gl.bindBuffer(gl.ARRAY_BUFFER, this.__transformIdsBuffer);
                        gl.enableVertexAttribArray(location);
                        gl.vertexAttribPointer(location, dimension, gl.FLOAT, false, dimension*4, 0);
                        gl.__ext_Inst.vertexAttribDivisorANGLE(location, 1); // This makes it instanced
                    } else {
                        gl.disableVertexAttribArray(location);
                    }
                    continue;
                }
            }

            let dataType = glattrbuffer.dataType != undefined ? glattrbuffer.dataType : gl.FLOAT;
            let dimension = glattrbuffer.dimension;
            let stride = glattrbuffer.dimension * gl.sizeInBytes(dataType);
            let offset = glattrbuffer.offset != undefined ? glattrbuffer.offset * dimension * gl.sizeInBytes(dataType) : 0;
            let normalized = glattrbuffer.normalized==true;
            let instanced = attrDesc.instanced;

            gl.bindBuffer(gl.ARRAY_BUFFER, glattrbuffer.buffer);
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(location, dimension, dataType, normalized, stride, offset);
            if(instanced==true){
                gl.__ext_Inst.vertexAttribDivisorANGLE(location, 1); // This makes it instanced
            }

            // console.log("Binding :" + attrName + " to attr:" + location + " count:" + glattrbuffer.count + " dimension:" + dimension  + " stride:" + stride  + " offset:" + offset + " normalized:" + normalized + " instanced:" + instanced);
        }

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer);

        return true;
    }

    unbind() {
        // this.__gl.__ext_VAO.bindVertexArrayOES(null);
    }
};

class VAOGeomShaderBinding {
    constructor(gl, shaderAttrs, glattrbuffers, indexBuffer, extrAttrBuffers, transformIdsBuffer) {

        this.__gl = gl;
        this.__vao = gl.__ext_VAO.createVertexArrayOES();
        gl.__ext_VAO.bindVertexArrayOES(this.__vao);

        for (let attrName in shaderAttrs) {
            let attrDesc = shaderAttrs[attrName];
            let location = attrDesc.location;
            if (location == -1)
                continue;
            let glattrbuffer = glattrbuffers[attrName];
            if (!glattrbuffer) {
                glattrbuffer = extrAttrBuffers ? extrAttrBuffers[attrName] : undefined;
                if (!glattrbuffer) {
                    // console.warn("glattrbuffer missing:" + attrName);
                    if (attrName != 'instancedTransformIds' || !transformIdsBuffer)
                        gl.disableVertexAttribArray(location);
                    continue;
                }
            }

            let dataType = glattrbuffer.dataType != undefined ? glattrbuffer.dataType : gl.FLOAT;
            let dimension = glattrbuffer.dimension;
            let stride = glattrbuffer.dimension * gl.sizeInBytes(dataType);
            let offset = glattrbuffer.offset != undefined ? glattrbuffer.offset * dimension * gl.sizeInBytes(dataType) : 0;
            let normalized = glattrbuffer.normalized==true;
            let instanced = attrDesc.instanced;

            gl.bindBuffer(gl.ARRAY_BUFFER, glattrbuffer.buffer);
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(location, dimension, dataType, normalized, stride, offset);
            if(instanced){
                gl.__ext_Inst.vertexAttribDivisorANGLE(location, 1); // This makes it instanced
            }

            // console.log("Binding :" + attrName + " to attr:" + location + " count:" + glattrbuffer.count + " dimension:" + dimension  + " stride:" + stride  + " offset:" + offset + " normalized:" + normalized + " instanced:" + instanced);

        }

        if (transformIdsBuffer && shaderAttrs.instancedTransformIds) {
            // The instanced transform ids are bound as an instanced attribute.
            let location = shaderAttrs.instancedTransformIds.location;
            gl.bindBuffer(gl.ARRAY_BUFFER, transformIdsBuffer);
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(location, 1, gl.FLOAT, false, 4, 0);
            gl.__ext_Inst.vertexAttribDivisorANGLE(location, 1); // This makes it instanced
        }

        this.__indexBuffer = indexBuffer;
        //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    }

    bind(renderstate) {
        this.__gl.__ext_VAO.bindVertexArrayOES(this.__vao);
        this.__gl.bindBuffer(this.__gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer);
        return true;
    }

    unbind() {
        this.__gl.__ext_VAO.bindVertexArrayOES(null);
    }
};

function generateShaderGeomBinding(gl, shaderAttrs, glattrbuffers, indexBuffer, extrAttrBuffers, transformIdsBuffer){
    if(gl.__ext_VAO == null){
        return new GeomShaderBinding(gl, shaderAttrs, glattrbuffers, indexBuffer, extrAttrBuffers, transformIdsBuffer);
    }
    else{
        return new VAOGeomShaderBinding(gl, shaderAttrs, glattrbuffers, indexBuffer, extrAttrBuffers, transformIdsBuffer);
    }
}

export {
    generateShaderGeomBinding
};