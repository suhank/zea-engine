import {
  processTextureParams
} from './processTextureParams.js';

class GLRenderTarget {
  constructor(gl, params) {

    const p = processTextureParams(gl, params);

    this.resized = new Visualive.Signal();
    this.__gl = gl;
    this.type = p.type;
    this.format = p.format;
    this.internalFormat = p.internalFormat;
    this.filter = p.filter;
    this.wrap = p.wrap;
    this.flipY = p.flipY;
    this.width = p.width;
    this.height = p.height;
    this.clearColor = new Visualive.Color(0, 0, 0, 0);
    this.colorMask = [true, true, true, true];

    // -- Initialize texture targets
    this.textureTargets = [];
    const numColorChannels = p.numColorChannels != undefined ? p.numColorChannels : (p.format != undefined ? 1 : 0);
    for (let i = 0; i < numColorChannels; i++) {

      gl.activeTexture(gl.TEXTURE0 + 1);
      let colorTexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, colorTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, p.wrapS);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, p.wrapT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, p.minFilter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, p.magFilter);
      gl.texImage2D(gl.TEXTURE_2D, 0, this.internalFormat, p.width, p.height, 0, this.format, this.type, null);
      // gl.texImage2D(gl.TEXTURE_2D,
      //   0,
      //   gl.RGBA,
      //   p.width,
      //   p.height,
      //   0,
      //   gl.RGBA,
      //   gl.UNSIGNED_BYTE,
      //   null);
      this.textureTargets.push(colorTexture)
    }

    if (p.depthFormat) {
      // -- Initialize depth texture
      gl.activeTexture(gl.TEXTURE0);
      this.depthTexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, this.depthTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, p.wrapS);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, p.wrapT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, p.minFilter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, p.maxFilter);

      // the proper texture format combination can be found here
      // https://www.khronos.org/registry/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
      gl.texImage2D(gl.TEXTURE_2D,
        0,
        gl.DEPTH_COMPONENT16,
        p.width,
        p.height,
        0,
        gl.DEPTH_COMPONENT,
        gl.UNSIGNED_SHORT,
        null);
    }


    // -- Initialize frame buffer
    this.frameBuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.frameBuffer);
    if(this.textureTargets.length > 0) {
      const bufferIds = [];
      for (let i = 0; i < this.textureTargets.length; i++) {
        gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, this.textureTargets[i], 0);
        bufferIds.push(gl.COLOR_ATTACHMENT0 + i)
      }
      gl.drawBuffers(bufferIds);
    }

    if(this.depthTexture) {
      gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTexture, 0);
    }

    let status = gl.checkFramebufferStatus(gl.DRAW_FRAMEBUFFER);
    if (status != gl.FRAMEBUFFER_COMPLETE) {
      switch(status){
      case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
          throw ("The attachment types are mismatched or not all framebuffer attachment points are framebuffer attachment complete.");
      case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
          throw ("There is no attachment.");
      case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
          throw ("Height and width of the attachment are not the same.");
      case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
          throw ("The format of the attachment is not supported or if depth and stencil attachments are not the same renderbuffer.");
      case 36061: //gl.GL_FRAMEBUFFER_UNSUPPORTED:
          throw ("The framebuffer is unsupported");
      default:
          throw ("Incomplete Frambuffer");
      }
      return;
    }
    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
  }

  bindForWriting(clear=false) {
    const gl = this.__gl;
    if (gl.name == 'webgl2')
      gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.frameBuffer);
    else
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
    gl.viewport(0, 0, this.width, this.height); // Match the viewport to the texture size
    if(clear)
      this.clear();
  }

  clear(clearDepth = true) {
    const gl = this.__gl;
    gl.colorMask(...this.colorMask);
    gl.clearColor(...this.clearColor.asArray());
    let flags = 0;
    if(this.textureTargets.length > 0)
      flags |= gl.COLOR_BUFFER_BIT;
    if(this.depthTexture)
      flags |= gl.DEPTH_BUFFER_BIT;
    gl.clear(flags);
  }

  bindForReading() {
    const gl = this.__gl;
    if (gl.name == 'webgl2')
      gl.bindFramebuffer(gl.READ_FRAMEBUFFER, this.frameBuffer);
    else
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
  }

  bindColorTexture(renderstate, unif, channelId = 0) {
    const gl = this.__gl;
    const unit = renderstate.boundTextures++;
    gl.uniform1i(unif.location, unit);
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, this.textureTargets[channelId]);
    return true;
  }

  bindDepthTexture(renderstate, unif) {
    const gl = this.__gl;
    const unit = renderstate.boundTextures++;
    gl.uniform1i(unif.location, unit);
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, this.depthTexture);
    return true;
  }

  unbind() {
    const gl = this.__gl;
    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
  }

  resize(width, height, preserveData = false) {
    /*
        const gl = this.__gl;
        const sizeChanged = this.width != width || this.height != height;
        if (sizeChanged) {
          const maxSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
          if (width < 0 || width > maxSize || height < 0 || height > maxSize) {
              throw new Error("gl-texture2d: Invalid texture size. width:" + width + " height:" + height + " maxSize:" + maxSize);
          }
          const gltex = gl.createTexture();
          gl.bindTexture(gl.TEXTURE_2D, gltex);
          gl.texImage2D(gl.TEXTURE_2D, 0, this.__internalFormat, width, height, 0, this.__channels, this.__format, null);

          if (preserveData) {
            const fbo = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.__gltex, 0);

            gl.bindTexture(gl.TEXTURE_2D, gltex); // Do we need this line?
            gl.copyTexImage2D(gl.TEXTURE_2D, 0, this.__internalFormat, 0, 0, this.width, this.height, 0);

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);

            gl.deleteFramebuffer(fbo)
          }

          this.width = width;
          this.height = height;

          this.__gl.deleteTexture(this.__gltex);
          this.__gltex = gltex;
          this.__updateGLTexParams();
          if (emit) {
              this.resized.emit(width, height);
          }
        }

        if (gl.name == 'webgl2')
          gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.frameBuffer);
        else
          gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);

        // The color texture is destoryed and re-created when it is resized,
        // so we must re-bind it here..
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.__colorTexture.glTex, 0);
        if (this.depthChannel) {
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, this.__depthTexture);
          if (gl.name == 'webgl2'){
            // the proper texture format combination can be found here
            // https://www.khronos.org/registry/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT24, this.width, this.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);
          }
          else
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.width, this.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);
        }
        this.__checkFramebuffer();
        //gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        */
  }
}
export {
  GLRenderTarget
};