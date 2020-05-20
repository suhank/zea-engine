/* eslint-disable require-jsdoc */
import { Scene, GLRenderer, Vec3 } from './dist/index.esm.js'

function arrayToBase64String(a) {
  return btoa(String.fromCharCode(...a));
}

function base64StringToArray(s) {
  let asciiString = atob(s);
  return new Uint8Array([...asciiString].map(char => char.charCodeAt(0)));
}

const BASE64_MARKER = ';base64,'
function dataURLToArrayBuffer(dataURL) {
  const base64Index = dataURL.indexOf(BASE64_MARKER) + BASE64_MARKER.length
  const base64 = dataURL.substring(base64Index)
  return base64StringToArray(base64)
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


async function loadRefImage(fileName) {
  return new Promise((resolve, reject) => {
    const url = '/base/tests/refs/' + fileName
    fetch(url).then((response) => {
      if (response.status == 404) {
        resolve(false)
        return
      }
      response.arrayBuffer().then((buffer) => {
        var base64Flag = 'data:image/jpeg;base64,';
        var imageStr = arrayToBase64String(new Uint8Array(buffer));
        
        const refImage = new Image()
        refImage.addEventListener("load", () => {
          resolve(refImage)
        })
        refImage.src = base64Flag + imageStr
      });
    })
    .catch((error) => {
      console.log("Ref Image not Found:", fileName)
      reject();
    });
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

    fetch('http://localhost:8080/tests/refs', {
      body: formData,
      method: 'post',
    }).then((response) => {
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

async function setupVisualTest(runTest) {

  const div = document.createElement('div')
  div.style.position = 'relative'
  div.style.padding = '10px'
  document.body.appendChild(div)
  const viewportDiv = document.createElement('div')
  viewportDiv.style.position = 'relative'
  viewportDiv.style.width = '480px'
  viewportDiv.style.height = '340px'
  div.appendChild(viewportDiv)

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

  const container = document.createElement('div')
  container.style.position = 'absolute'
  container.style.margin = '0 auto;'
  container.style.display = 'flex'
  container.style['justify-content'] = 'space-between';
  container.style['background'] = '#A0C5E8';
  document.body.appendChild(container)
  
  async function compareRendererToRefImage(refImageName, threshold) {
    renderer.getViewport().draw()
    const dataURL = renderer.__glcanvas.toDataURL()
    let refImage = await loadRefImage(refImageName)
    if (!refImage) {
      console.log(`==No Ref Image found. Saving Ref Image: ${refImageName} ==`)
      await saveRefImage(dataURL, refImageName)
      assert.fail(`==No Ref Image found. Saving Ref Image: ${refImageName} ==`)
    } else {
      refImage.style.position = 'relative'
      refImage.style.padding = '10px'
      container.appendChild(refImage)

      const cmp = await compareImages(dataURL, imageToDataUrl(refImage))
      console.log(`==Ref Image found: ${refImageName}. misMatchPercentage: ${cmp.misMatchPercentage} ==`)
      const diffImageData = cmp.getImageDataUrl()
      const diffImage = await createDiffImage(diffImageData)
      diffImage.style.position = 'relative'
      diffImage.style.padding = '10px'
      container.appendChild(diffImage)

      const misMatchPercentage = Number.parseFloat(cmp.misMatchPercentage)

      if (misMatchPercentage > 0.0) {
        container.style['background'] = '#FF0000';
        const parts = refImageName.split('.')
        parts.pop()
        const diffImageName = parts.join('.') + "-diff.png"
        await saveRefImage(diffImageData, diffImageName)
        const btn = document.createElement("button");
        btn.innerHTML = "UPDATE";
        btn.addEventListener('click', () => {
          saveRefImage(dataURL, refImageName).then(() => {
            console.log(`==Updated Ref Image: ${refImageName} ==`)
          })
        })
        container.appendChild(btn)
      }
      assert.isBelow(misMatchPercentage, threshold, `expect: ${cmp.misMatchPercentage}.to.be.below:${threshold}`)
      // assert(misMatchPercentage < threshold)
    }
  }
  async function cleanup() {
    console.log("Cleaning up")
    const gl = renderer.gl
    gl.getExtension('WEBGL_lose_context').loseContext();
  }

  runTest({
    scene,
    renderer,
    compareRendererToRefImage,
    cleanup
  })

}

export {
  setupVisualTest
}