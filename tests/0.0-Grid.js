/* eslint-disable require-jsdoc */
import { Scene, GLRenderer, Vec3 } from '../dist/index.esm.js'

// const resemble = require("resemblejs")

const BASE64_MARKER = ';base64,'
function dataURLToArrayBuffer(dataURL) {
  const base64Index = dataURL.indexOf(BASE64_MARKER) + BASE64_MARKER.length
  const base64 = dataURL.substring(base64Index)
  const raw = window.atob(base64)
  const rawLength = raw.length
  const array = new Uint8Array(rawLength)

  for(let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i)
  }
  return array
}

function imageToDataUrl(img) {
  // Create canvas
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  // Set width and height
  canvas.width = img.width
  canvas.height = img.height
  // Draw the image
  ctx.drawImage(img, 0, 0)
  return canvas.toDataURL('image/png')
}

function loadRefImage(name) {
  const url = '/base/tests/refs/' + name
  return new Promise((resolve, reject) => {
    const refImage = new Image()
    refImage.addEventListener("load", () => {
      resolve(refImage)
    })
    refImage.addEventListener("error", () => {
      resolve(false)
    })
    refImage.crossOrigin = 'anonymous'
    refImage.src = url
  })
}

function compareImages(image1, image2) {
  return new Promise((resolve, reject) => {
    const options = {
      output: {
        errorColor: {
          red: 255,
          green: 0,
          blue: 255
        },
        outputDiff: true
      },
      scaleToSameSize: true,
      ignore: "antialiasing"
    };
    resemble.compare(image1, image2, options, (err, data) => {
      resolve(data)
    })
  })
}

function saveRefImage(dataURL, fileName) {
  console.log("saveRefImage:", fileName)
  return new Promise((resolve, reject) => {
    const array = dataURLToArrayBuffer(dataURL)

    const blob = new Blob([array], { type: 'image/png' })

    const formData = new FormData()
    formData.append('ref-file', blob, fileName)
    console.log(formData)

    fetch('http://localhost:8080/tests/refs', {
      body: formData,
      method: 'post',
    }).then((response) => {
      resolve("saveRefImage:", fileName)
    })
  })
}

function createDiffImage(dataURL) {
  return new Promise((resolve, reject) => {
    const refImage = new Image()
    refImage.addEventListener("load", () => {
      resolve(refImage)
    })
    refImage.addEventListener("error", () => {
      resolve(false)
    })
    refImage.crossOrigin = 'anonymous'
    refImage.src = dataURL
  })
}

async function setupSceneAndRenderer(runTest) {

  const container = document.createElement('div')
  container.style.position = 'absolute'
  container.style.margin = '0 auto;'
  container.style.display = 'flex'
  container.style['justify-content'] = 'space-between';
  container.style['background'] = '#A0C5E8';
  
  const div = document.createElement('div')
  div.style.position = 'relative'
  div.style.padding = '10px'
  container.appendChild(div)
  const viewportDiv = document.createElement('div')
  viewportDiv.style.position = 'relative'
  viewportDiv.style.width = '480px'
  viewportDiv.style.height = '340px'
  div.appendChild(viewportDiv)
  document.body.appendChild(container)

  const scene = new Scene()

  const renderer = new GLRenderer(viewportDiv, {
    options: {
      webglOptions: {
        canvasPosition: 'relative',
        alpha: false,
      },
    },
  })
  renderer.setScene(scene)
  renderer.resumeDrawing()


  runTest({
    scene,
    renderer,
  })

  renderer.getViewport().draw()
  const dataURL = renderer.__glcanvas.toDataURL()
  let refImage = await loadRefImage(refImageName)
  if (!refImage) {
    let res = await saveRefImage(dataURL, refImageName)
    console.log(res)
    assert(false)
  } else {
    refImage.style.position = 'relative'
    refImage.style.padding = '10px'
    container.appendChild(refImage)
    console.log("====", refImage.width, refImage.height)

    let cmp = await compareImages(dataURL, imageToDataUrl(refImage))
    console.log("cmp:", cmp.misMatchPercentage)
    const diffImage = await createDiffImage(cmp.getImageDataUrl())
    diffImage.style.position = 'relative'
    diffImage.style.padding = '10px'
    container.appendChild(diffImage)
    
    // assert.equal(1, 1)
    const misMatchPercentage = Number.parseFloat(cmp.misMatchPercentage)

    if (misMatchPercentage > 2) {
      container.style['background'] = '#FF0000';
      var btn = document.createElement("button");
      btn.innerHTML = "UPDATE";
      btn.addEventListener('click', ()=>{
        saveRefImage(dataURL, refImageName).then(res => {
          console.log(res)
        })
      })
      container.appendChild(btn)
    }
    expect(misMatchPercentage).to.be.below(threshold)
    
  }
}

describe('0.0-Grid', () => {
  it('Render a simple grid', async () => {
    setupSceneAndRenderer(async (appData)=>{
      const { scene, renderer } = appData 

      scene.setupGrid(5.0, 50)
      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(2, 2, 1.7), new Vec3(0, 0, 0.4))
  
      await compreRendererToRefImage(renderer, '0.0-Grid.png', 2)
    })
  })
})
