import {
    isMobileDevice,
    getBrowserDesc
} from '../BrowserDetection.js';


var create3DContext = function(canvas, opt_attribs) {

    const browserDesc = getBrowserDesc();
    console.log(browserDesc);

    let names = [ 'webgl2', 'webgl'];
    let context = null;
    names.some((name)=>{
        try {
            context = canvas.getContext(name, opt_attribs);
            context.name = name;
        } catch (e) {}
        if (context) {
            return true;
        }
    });
    if (!context) {
        return;
    }

    // context.setupInstancedQuad = setupInstancedQuad;
    // context.bindInstancedQuad = bindInstancedQuad;
    context.sizeInBytes = function(type) {
        switch (type) {
            case this.BYTE:
            case this.UNSIGNED_BYTE:
                return 1;
            case this.SHORT:
            case this.UNSIGNED_SHORT:
                return 2;
            case this.INT:
            case this.UNSIGNED_INT:
            case this.FLOAT:
                return 4;
            default:
                throw "unknown type";
        }
    };

    if (context.name == 'webgl2') {
        context.floatTexturesSupported = true;
        context.__ext_float_linear = context.getExtension("OES_texture_float_linear");
        if (context.__ext_half_float) {
            context.HALF_FLOAT = context.__ext_half_float.HALF_FLOAT_OES;  
            context.floatTextureFilteringSupported = true;
        }
        context.__ext_texture_half_float_linear = context.getExtension("OES_texture_half_float_linear");
        if (context.__ext_texture_half_float_linear) {
            context.floatTextureFilteringSupported = true;
        }

        // Needed for rendering to flat textures in an Fbo
        context.__ext_color_buffer_float = context.getExtension("EXT_color_buffer_float");


        context.__ext_std_derivatives = context.getExtension("OES_standard_derivatives");
    } else {
        context.__ext_float = context.getExtension("OES_texture_float");
        if (context.__ext_float) {
            context.floatTexturesSupported = true;
            context.__ext_float_linear = context.getExtension("OES_texture_float_linear");
            if (context.__ext_half_float) {
                context.floatTextureFilteringSupported = true;
            }
        } else {
            console.warn("OES_texture_float is not available");
        }

        context.__ext_half_float = context.getExtension("OES_texture_half_float");
        if (context.__ext_half_float) {
            context.HALF_FLOAT = context.__ext_half_float.HALF_FLOAT_OES;  
            context.floatTexturesSupported = true;
            context.__ext_texture_half_float_linear = context.getExtension("OES_texture_half_float_linear");
            if (context.__ext_texture_half_float_linear) {
                context.floatTextureFilteringSupported = true;
            }
        }

        // Needed for rendering to flat textures in an Fbo
        context.__ext_color_buffer_float = context.getExtension("EXT_color_buffer_float");

        context.__ext_std_derivatives = context.getExtension("OES_standard_derivatives");
        // context.__ext_sRGB = context.getExtension("EXT_sRGB");
        // context.__ext_draw_buffers = context.getExtension("WEBGL_draw_buffers");

        context.__ext_Inst = context.getExtension("ANGLE_instanced_arrays");
        if(context.__ext_Inst) {
            context.vertexAttribDivisor = context.__ext_Inst.vertexAttribDivisorANGLE.bind(context.__ext_Inst);
            context.drawArraysInstanced = context.__ext_Inst.drawArraysInstancedANGLE.bind(context.__ext_Inst);
            context.drawElementsInstanced = context.__ext_Inst.drawElementsInstancedANGLE.bind(context.__ext_Inst);
        }
        if(browserDesc.browserName != 'Safari'){
            context.__ext_VAO = context.getExtension("OES_vertex_array_object");
            if(context.__ext_VAO) {
                context.createVertexArray = context.__ext_VAO.createVertexArrayOES.bind(context.__ext_VAO);
                context.deleteVertexArray = context.__ext_VAO.deleteVertexArrayOES.bind(context.__ext_VAO);
                context.bindVertexArray = context.__ext_VAO.bindVertexArrayOES.bind(context.__ext_VAO);
            }
        }
        context.__ext_element_index_uint = context.getExtension("OES_element_index_uint");
        context.__ext_WEBGL_depth_texture = context.getExtension("WEBGL_depth_texture"); // Or browser-appropriate prefix
        if(context.__ext_WEBGL_depth_texture) {
            gl.UNSIGNED_INT_24_8 = context.__ext_WEBGL_depth_texture.UNSIGNED_INT_24_8_WEBGL;
        }

        context.DRAW_FRAMEBUFFER = context.FRAMEBUFFER;
    }


    context.__ext_frag_depth = context.getExtension("EXT_frag_depth");


    context.setupInstancedQuad = function() {
        //////////////////////////////
        // Generate a buffer for drawing a full screen quad.
        let vertexIDs = new Float32Array([
            0.0,
            1.0,
            2.0,
            3.0
        ]);
        let indices = new Uint16Array([
            0, 1, 2, 2, 1, 3
        ]);

        this.__quadVertexIdsBuffer = this.createBuffer();
        this.bindBuffer(this.ARRAY_BUFFER, this.__quadVertexIdsBuffer);
        this.bufferData(this.ARRAY_BUFFER, vertexIDs, this.STATIC_DRAW);

        this.__quadIndexBuffer = this.createBuffer();
        this.bindBuffer(this.ELEMENT_ARRAY_BUFFER, this.__quadIndexBuffer);
        this.bufferData(this.ELEMENT_ARRAY_BUFFER, indices, this.STATIC_DRAW);

        this.__quadattrbuffers = {
            'vertexIDs': {
                buffer: this.__quadVertexIdsBuffer,
                instanced: false,
                dataType: this.FLOAT,
                dimension: 1,
                count: vertexIDs.length
            }
        };
    }
    context.drawQuad = function() {
        this.drawElements(this.TRIANGLES, 6, this.UNSIGNED_SHORT, 0);
    }

    context.setupLineSegAttrBuffers = function() {
        //////////////////////////////
        // Generate a buffer for drawing an instanced 2 point line
        let vertexIDs = new Float32Array([
            0.0,
            1.0
        ]);
        let vertexIdsBuffer = context.createBuffer();
        context.bindBuffer(context.ARRAY_BUFFER, vertexIdsBuffer);
        context.bufferData(context.ARRAY_BUFFER, vertexIDs, context.STATIC_DRAW);

        context.__linesegattrbuffers = {
            vertexIDs: {
                buffer: vertexIdsBuffer,
                dimension: 1,
                count: vertexIDs.length
            }
        };
    }


    return context;
};


export {
    create3DContext
};