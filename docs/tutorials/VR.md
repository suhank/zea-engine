
## Launching a VR Session

Modern wbe browsers now come with a powerful new API called (WebXR)[https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API] for interacting with VR and AR hardware. 

This API enables the browser start a presentation using a VR Display that might be plugged into the computer, or a mobile device.

WebXR Enables developers to build web apps that can work on mobile devices like recent phones and tablets, or 


```javascript
const vrButton = document.querySelector('#vrbutton');
vrButton.addEventListener('mouseup', () =>{
  vrButton.classList.add('invisible')

  renderer.getXRViewport().then(xrViewport => {
    xrViewport.startPresenting().then(() => {
      const xfo = xrViewport.getXfo()
      xfo.tr = headPos
      xrViewport.setXfo(xfo)

      xrViewport.presentingChanged.connect(() => {
        vrButton.classList.remove('invisible')
      })
    })
  })
  .catch(reason => {
    console.warn('Unable to setup XR:' + reason)
  })
})
```

[VR](./VR.html ':include :type=iframe width=100% height=800px')

<div class="download-section">
  <a class="download-btn" title="Download"
    onClick="downloadTutorial('vr.zip', ['./tutorials/VR.html', './tutorials/img/vricon.png'])" download>
    Download
  </a>
</div>
<br>