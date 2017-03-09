/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @fileoverview This file contains functions every webgl program will need
 * a version of one way or another.
 *
 * Instead of setting up a context manually it is recommended to
 * use. This will check for success or failure. On failure it
 * will attempt to present an approriate message to the user.
 *
 *       gl = WebGLUtils.setupWebGL(canvas);
 *
 * For animated WebGL apps use of setTimeout or setInterval are
 * discouraged. It is recommended you structure your rendering
 * loop like this.
 *
 *       function render() {
 *         window.requestAnimFrame(render, canvas);
 *
 *         // do rendering
 *         ...
 *       }
 *       render();
 *
 * This will call your rendering function up to the refresh rate
 * of your display but will stop rendering if your app is not
 * visible.
 */

/**
 * Creates the HTLM for a failure message
 * @param {string} canvasContainerId id of container of th
 *        canvas.
 * @return {string} The html.
 */
var makeFailHTML = function(msg) {
  return '' +
    '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
    '<td align="center">' +
    '<div style="display: table-cell; vertical-align: middle;">' +
    '<div style="">' + msg + '</div>' +
    '</div>' +
    '</td></tr></table>';
};

/**
 * Mesasge for getting a webgl browser
 * @type {string}
 */
var GET_A_WEBGL_BROWSER = '' +
  'This page requires a browser that supports WebGL.<br/>' +
  '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

/**
 * Mesasge for need better hardware
 * @type {string}
 */
var OTHER_PROBLEM = '' +
  "It doesn't appear your computer can support WebGL.<br/>" +
  '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';

/**
 * Creates a webgl context. If creation fails it will
 * change the contents of the container of the <canvas>
 * tag to an error message with the correct links for WebGL.
 * @param {Element} canvas. The canvas element to create a
 *     context from.
 * @param {WebGLContextCreationAttirbutes} opt_attribs Any
 *     creation attributes you want to pass in.
 * @return {WebGLRenderingContext} The created context.
 */
var setupWebGL = function(canvas, opt_attribs) {
  function showLink(str) {
    var container = canvas.parentNode;
    if (container) {
      container.innerHTML = makeFailHTML(str);
    }
  };

  if (!window.WebGLRenderingContext) {
    showLink(GET_A_WEBGL_BROWSER);
    return null;
  }

  var context = create3DContext(canvas, opt_attribs);
  if (!context) {
    showLink(OTHER_PROBLEM);
  }
  return context;
};

/**
 * Creates a webgl context.
 * @param {!Canvas} canvas The canvas tag to get context
 *     from. If one is not passed in one will be created.
 * @return {!WebGLContext} The created context.
 */
var create3DContext = function(canvas, opt_attribs) {
  var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
  var context = null;
  for (var ii = 0; ii < names.length; ++ii) {
    try {
      context = canvas.getContext(names[ii], opt_attribs);
    } catch(e) {}
    if (context) {
      break;
    }
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

  context.__ext_float = context.getExtension("OES_texture_float");
  context.__ext_float_linear = context.getExtension("OES_texture_float_linear");
  context.__ext_std_derivatives = context.getExtension("OES_standard_derivatives");
  // context.__ext_sRGB = context.getExtension("EXT_sRGB");
  // context.__ext_draw_buffers = this.__renderer.gl.getExtension("WEBGL_draw_buffers");

  context.__ext_Inst = context.getExtension("ANGLE_instanced_arrays");
  context.__ext_VAO = context.getExtension("OES_vertex_array_object");
  context.__ext_element_index_uint = context.getExtension("OES_element_index_uint");

  context.setupInstancedQuad = function(){
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
  context.drawQuad = function(){
    this.drawElements(this.TRIANGLES, 6, this.UNSIGNED_SHORT, 0);
  }


  return context;
};


// Hack to see if the code is running in node.js.
// This is beause in node, we have no 'window', so this code should not run. 
if (process === 'undefined' || process.browser == true) {
  /**
   * Provides requestAnimationFrame in a cross browser way.
   */
  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
             return window.setTimeout(callback, 1000/60);
           };
  })();

  /**
   * Provides cancelAnimationFrame in a cross browser way.
   */
  window.cancelAnimFrame = (function() {
    return window.cancelAnimationFrame ||
           window.webkitCancelAnimationFrame ||
           window.mozCancelAnimationFrame ||
           window.oCancelAnimationFrame ||
           window.msCancelAnimationFrame ||
           window.clearTimeout;
  })();
}


var onResize = function(element, callback) {
  if (!onResize.watchedElementData) {
    // First time we are called, create a list of watched elements
    // and hook up the event listeners.
    onResize.watchedElementData = [];

    var checkForChanges = function() {
      onResize.watchedElementData.forEach(function(data) {
        if (data.element.offsetWidth !== data.offsetWidth ||
            data.element.offsetHeight !== data.offsetHeight) {
          data.offsetWidth = data.element.offsetWidth;
          data.offsetHeight = data.element.offsetHeight;
          data.callback();
        }
      });
    };

    // Listen to the window's size changes
    window.addEventListener('resize', checkForChanges);

    // Listen to changes on the elements in the page that affect layout 
    var observer = new MutationObserver(checkForChanges);
    observer.observe(document.body, { 
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true 
    });
  }

  // Save the element we are watching
  onResize.watchedElementData.push({
    element: element,
    offsetWidth: element.offsetWidth,
    offsetHeight: element.offsetHeight,
    callback: callback
  });
};


export {
    create3DContext,
    setupWebGL,
    onResize
};

