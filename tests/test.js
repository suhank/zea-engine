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

    renderer.redrawOccured.connect(() => {
      console.log('in callback')
      console.log(renderer.__glcanvas)
      const dataUrl = renderer.__glcanvas.toDataURL()
      console.log('dataUrl')
      console.log(dataUrl)

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
    })

    renderer.resumeDrawing()
  })
})
