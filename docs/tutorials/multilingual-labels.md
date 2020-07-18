# Loading a label pack.


```javascript
fetch("LabelPack.labels")
  .then(response => response.json())
  .then(data => {
    labelManager.loadLibrary('LabelPack', data)
    addLabel(new Vec3(0, 0, 0), new Vec3(0, 0.05, 0.08), new Color(1, 1, 0), "MyCustomLabel");
  });
```


> See the live example

[MultilingualLabels](./MultilingualLabels.html ':include :type=iframe width=100% height=800px')

<a id="raw-url" href="./tutorials/MultilingualLabels.html" download>Download</a>
