import chai from 'chai';
import {
  ObjAsset
} from '../../lib/Visualive-0.0.5.js';

chai.expect();
const expect = chai.expect;
// let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
// console.log(XMLHttpRequest);

let fs = require('fs');

describe('ObjAsset', function() {

  it('cow', () => {
    let objAsset = new ObjAsset('cow');
    objAsset.loaded.connect(() => {
      expect(String(objAsset)).to.be.equal(`{
  "name": "cow",
  "childItems": [
    {
      "name": "cow",
      "childItems": [],
      "geom": {
        "vertexAttributes": {
          "positions": "{\\n  \\"dataType\\": \\"Vec3\\",\\n  \\"length\\": 2903\\n}",
          "normals": "{\\n  \\"dataType\\": \\"Vec3\\",\\n  \\"length\\": 2903\\n}",
          "texCoords": "{\\n  \\"dataType\\": \\"Vec2\\",\\n  \\"length\\": 2903\\n}"
        },
        "tris": 2298,
        "quads": 10076
      }
    }
  ]
}`);
    });

    let filePath = __dirname+"\\..\\Assets\\cow.obj";
    objAsset.__incrementLoadCounter();
    fs.readFile(filePath, 'utf8', (err, contents) => {
      try {
        objAsset.parseObjData(filePath, contents);
      }
      catch(e){
        console.log("e:" + e);
      }
    });
    // objAsset.loadFile("../Assets/cow.obj");

  });


});

