# Loading a label pack.


```javascript
fetch("https://cdn.glitch.com/be58caa6-3757-4c0c-a11c-b4eaa9f5d339%2FLabelPack.labels?v=1599494954724")
        .then(response => response.json())
        .then(data => {
          labelManager.loadLibrary('LabelPack', data)
          addLabel(new Vec3(0, 0, 0), new Vec3(0, 0.05, 0.08), new Color(1, 1, 0), "MyCustomLabel");
        });
```


> See the live example

<!-- Copy and Paste Me -->
<div class="glitch-embed-wrap" style="height: 420px; width: 100%;">
  <iframe
    src="https://glitch.com/embed/#!/embed/zea-multilingual-labels?path=src/main.js&previewSize=100"
    title="zea-multilingual-labels on Glitch"
    allow="geolocation; microphone; camera; midi; vr; encrypted-media"
    style="height: 100%; width: 100%; border: 0;">
  </iframe>
</div>
<br>