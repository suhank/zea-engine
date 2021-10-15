
## Launching a VR Session

Modern web browsers now come with a powerful new API called [WebXR](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API) for interacting with VR and AR hardware. 

This API enables the browser start a presentation using a VR Display that might be plugged into the computer, or a mobile device.

WebXR Enables developers to build web apps that can work on mobile devices like recent phones and tablets, or 


```javascript
const vrButton = document.querySelector("#vrbutton");
vrButton.addEventListener("mouseup", () => {
  vrButton.classList.add("invisible");

  const XRViewport = renderer.getXRViewport()

  XRViewport.then(xrViewport => {
      xrViewport.startPresenting().then(() => {
        xrViewport.presentingChanged.connect(() => {
          vrButton.classList.remove("invisible");
        });
      });
    })
    .catch(reason => {
      console.warn("Unable to setup XR:" + reason);
    });
});
```

<!-- Copy and Paste Me -->
<div class="glitch-embed-wrap" style="height: 420px; width: 100%;">
  <iframe
    src="https://glitch.com/embed/#!/embed/zea-vr?path=public/index.html&previewSize=100"
    title="zea-vr on Glitch"
    allow="geolocation; microphone; camera; midi; vr; encrypted-media"
    style="height: 100%; width: 100%; border: 0;">
  </iframe>
</div>
<br>