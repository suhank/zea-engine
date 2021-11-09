# Loading custom points data


```javascript

import {
  Color,
  GeomItem,
  AssetItem,
  FilePathParameter,
  Material,
  Points,
  sgFactory
} from '@zeainc/zea-engine'

export class CSVPointsAsset extends AssetItem {
  constructor(name) {
    super(name);
    this.loaded.setToggled(false);
    
    const fileParam = this.addParameter(new FilePathParameter('FilePath'))
    fileParam.valueChanged.connect(() => {
      const file = fileParam.getFileDesc();
      if (!file)
        return;
      this.removeAllChildren();
      this.loadDataFile(file);
    });
  }

  loadDataFile(file) {
    fetch(file.url)
      .then((response) => {
        if (response.status == 200) {
          response.text().then((text) => {
              this._parsePointData(text);
          })
        }
      })
  }

  _parsePointData(data) {

    // array of lines separated by the newline
    const lines = data.split('\n');

    const points = new Points();
    points.setNumVertices(lines.length)

    const unitScale = 0.001;

    lines.forEach((line, index) => {
      points.getVertex(index).set(...line.split(',').map(v => parseFloat(v) * unitScale));
    })

    const material = new Material('points', 'FatPointsShader');
    material.getParameter("BaseColor").setValue(new Color(1,0,0));
    material.getParameter("PointSize").setValue(0.0003);
    const geomItem = new GeomItem('points', points, material);
    this.addChild(geomItem);

    this.loaded.emit();
  }
}

sgFactory.registerClass('CSVPointsAsset', CSVPointsAsset);


```