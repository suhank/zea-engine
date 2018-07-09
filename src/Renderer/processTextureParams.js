
const processTextureParams = function(gl, params) {

  if (!params.width || !params.height)
    throw ("Invalid texture params");


  const maxSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
  if (params.width <= 0 || params.width > maxSize || params.height <= 0 || params.height > maxSize) {
    throw new Error("GLTextureParams: Invalid texture size. width:" + params.width + " height:" + params.height + " maxSize:" + maxSize);
  }


  const result = {
    width: params.width,
    height: params.height,
    data: params.data
  };
  const processParam = (name, defaultValue)=>{ 
    if(name in params)
      result[name] = isNaN(params[name]) ? gl[params[name]] :  params[name]; 
    else if(defaultValue)
      result[name] = defaultValue; 
  }
  processParam('format', gl.RGBA);
  processParam('internalFormat', result.format);
  processParam('type', gl.UNSIGNED_BYTE);
  processParam('minFilter', gl.LINEAR);
  processParam('magFilter', gl.LINEAR);
  processParam('wrapS', gl.CLAMP_TO_EDGE);
  processParam('wrapT', gl.CLAMP_TO_EDGE);
  processParam('flipY', false);
  processParam('mipMapped', false);


  processParam('depthFormat');
  processParam('depthInternalFormat');
  processParam('depthType');

  // https://www.khronos.org/registry/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
  if (result.format == gl.FLOAT) {
    if (gl.name == 'webgl2') {
      if (result.filter == gl.LINEAR && !gl.__ext_float_linear) {
        console.warn('Floating point texture filtering not supported on result device');
        result.filter = gl.NEAREST;
      }
    } else {
      if (gl.__ext_float) {
        if (result.filter == gl.LINEAR && !gl.__ext_float_linear) {
          console.warn('Floating point texture filtering not supported on result device');
          result.filter = gl.NEAREST;
        }
      } else {
        if (gl.__ext_half_float) {
          result.format = gl.HALF_FLOAT;
          if (result.filter == gl.LINEAR && !gl.__ext_texture_half_float_linear) {
            console.warn('Half Float texture filtering not supported on result device');
            result.filter = gl.NEAREST;
          }
        } else {
          throw ("OES_texture_half_float is not available");
        }
      }
    }
  } else if (result.format == gl.HALF_FLOAT) {
    if (gl.name == 'webgl2') {
      // Half load linear filtering appears to be supported even without the extension.
      // if (result.filter == gl.LINEAR && !gl.__ext_texture_half_float_linear) {
      //     console.warn('Floating point texture filtering not supported on result device');
      //     result.filter = 'NEAREST';
      // }
    } else {
      if (gl.__ext_half_float) {
        if (result.filter == gl.LINEAR && !gl.__ext_texture_half_float_linear) {
          console.warn('Half Float texture filtering not supported on result device');
          result.filter = gl.NEAREST;
        }
      } else
        throw ("OES_texture_half_float is not available");
      if (result.channels == gl.RGB) {
        throw ("OES_texture_half_float onlysupports RGBA textures");
      }
    }
  } else if (result.format == 'sRGB') {
    if (!gl.__ext_sRGB)
      throw ("EXT_sRGB is not available");
  }

  //////////////////////////////////////////////////////
  // Format ... InternalFormat combos.
  // Setup the correct combos.
  // the proper texture format combination can be found here
  // https://www.khronos.org/registry/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
  if (gl.name == 'webgl2' && result.internalFormat == result.channels) {
    if (result.format == gl.FLOAT) {
      if (result.channels == gl.RGB) {
        result.internalFormat = gl.RGB32F;
      }
      else if(result.channels == gl.RGBA){
        result.internalFormat = gl.RGBA32F;
      }
    }
    else if(result.format == gl.HALF_FLOAT){
      if(result.channels == gl.RGB){
        result.internalFormat = gl.RGB16F;
      }
      else if(result.channels == gl.RGBA){
        result.internalFormat = gl.RGBA16F;
      }
    }
  }
  return result;
}

export {
  GLTextureParams
};


export {
  processTextureParams
};