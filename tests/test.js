
// import { Scene, GLRenderer } from "../dist/index.esm.js"

const loadScript = (src)=> {
  console.log("src:", src)
  var scriptElm = document.createElement('script');
  scriptElm.setAttribute('src',src)
  scriptElm.onload = function() {
    console.log("loaded:", src)
    // resolve()
  };
  document.body.appendChild(scriptElm);
  return new Promise(resolve => {
    // console.log("src:", src)
    // scriptElm.addEventListener('load', resolve)
    // scriptElm.onload = function() {
    //   console.log("loaded:", src)
    //   resolve()
    // };
    resolve()
  })
}

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {

      // loadScript('../dist/index.esm.js').then(()=>{
      loadScript('https://unpkg.com/@zeainc/zea-engine@1.0.5/dist/index.esm.js').then(()=>{

        // const div = document.createElement('div')
        // document.body.appendChild(div)
  
        // // const canvvas = document.createElement('canvas')
        // console.log("document.body:", document.body)
        // // assert.equal(-1, [1, 2, 3].indexOf(4))
        
        // const scene = new Scene()
        // scene.setupGrid(5.0, 50)
  
        // const renderer = new GLRenderer(div)
        // renderer.setScene(scene)
        // renderer
        //   .getViewport()
        //   .getCamera()
        //   .setPositionAndTarget(new Vec3(2, 2, 1.7), new Vec3(0, 0, 0.4))
        // renderer.resumeDrawing()
  
        // document.addEventListener('keypress', (event) => {
        //   const key = String.fromCharCode(event.keyCode).toLowerCase()
        //   console.log(key)
        //   if (key == 'v' && event.shiftKey) {
        //     const vrvp = renderer.getVRViewport()
        //     if (vrvp) vrvp.togglePresenting()
        //   }
        // })
        assert.equal(-1, [1, 2, 3].indexOf(4))
      })

    })
  })
})
