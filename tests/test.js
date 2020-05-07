import { Scene, GLRenderer, Vec3 } from '../dist/index.esm.js'


const BASE64_MARKER = ';base64,';
function dataURIToBlob(dataURI) {
  const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  const base64 = dataURI.substring(base64Index);
  const raw = window.atob(base64);
  const rawLength = raw.length;
  const array = new Uint8Array(rawLength);

  for(let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return new Blob([array], { type: 'image/png' }); 
}

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

    renderer.getViewport().draw()
    console.log(renderer.__glcanvas)

    const blob = dataURIToBlob(renderer.__glcanvas.toDataURL());
    
    const formData = new FormData()
    formData.append('target-dir', '/Users/mauro/workspace/zea/engine/tests/')
    formData.append('test-case-title', 'Zea hello world')
    formData.append('file-to-test', blob, 'canvas.png')
    console.log(formData)

    fetch('http://localhost:8080/files/test', {
      body: formData,
      method: 'post',
    }).then((response) => {
      response.json().then((json) => {
        console.log(json)
        assert.equal(1, 1)
      })
    })


    renderer.resumeDrawing()
  })
})
