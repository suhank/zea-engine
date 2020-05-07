import { Scene, GLRenderer, Vec3 } from '../dist/index.esm.js'

describe('HelloWorld', () => {
  it('Render a simple grid', async () => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    const scene = new Scene()
    scene.setupGrid(5.0, 50)

    const renderer = new GLRenderer(div, {
      options: {
        webglOptions: {
          alpha: false,
        },
      },
    })
    renderer.setScene(scene)
    renderer
      .getViewport()
      .getCamera()
      .setPositionAndTarget(new Vec3(2, 2, 1.7), new Vec3(0, 0, 0.4))

    // renderer.redrawOccured.connect(() => {

      renderer.getViewport().draw()
      console.log('in callback')
      console.log(renderer.__glcanvas)
      // console.log(renderer.__gl)

      const gl = renderer.__gl
      var pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
      gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
      // console.log(pixels); // Uint8Array

      // pixels.forEach(v => {
      //   if (v != 128 && v != 255)
      //     console.log(v)
      // })

      const outcanvas = document.createElement('canvas')
      const w = gl.drawingBufferWidth
      const h = gl.drawingBufferHeight
      var ctx = outcanvas.getContext("2d");
      // var UAC = new Uint8ClampedArray( pixels, w, h);
      // var DAT = new ImageData(UAC, w, h);
      // ctx.putImageData( DAT, 0, 0 );

      var imageData = ctx.createImageData(w, h);
      for (var i = 0; i < imageData.data.length; i++) {
        imageData.data[i] = pixels[i];
      }
      ctx.putImageData(imageData, 0, 0);
      const dataUrl = outcanvas.toDataURL();
      console.log('dataUrl')
      console.log(dataUrl)
      
      // var DAT = new ImageData(UAC, wid, hig);
      // ctx.putImageData( pixels, ORG_X, ORG_Y );  
      // const base64Data = btoa(String.fromCharCode.apply(null, pixels));
      // console.log(base64Data);

    // var c = renderer.__glcanvas.getContext('3d');
    // var p = c.getImageData(10, 10, 1, 1).data; 
    //   console.log(p)
      // const dataUrl = renderer.__glcanvas.toDataURL()
      // console.log('dataUrl')
      // console.log(dataUrl)

      renderer.__glcanvas.toBlob(function (err, blob) {
        console.log(err)
        console.log('blob', blob)
        // {{{ Server.
        const formData = new FormData()
        formData.append(
          'target-dir',
          '/Users/mauro/workspace/zea/engine/tests/'
        )
        formData.append('test-case-title', 'Zea hello world')
        formData.append('file-to-test', blob, 'canvas.png')
        console.log(formData)

        fetch('http://localhost:8080/files/test', {
          body: formData,
          method: 'post',
        }).then((response) => {
          response.json().then((json) => {
            console.log(json)
          })
        })
        // }}}
      })

      assert.equal(1, 1)
    // })

    renderer.resumeDrawing()
  })
})
