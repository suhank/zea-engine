import chai from 'chai';
import {
  Vec3,
  GeomItem,
  Cuboid,
  Scene
} from '../../lib/Visualive-0.0.5.js';

chai.expect();
const expect = chai.expect;

describe('GeomItem', function() {

  it('Cuboid', () => {

    let myCuboid = new Cuboid('myCuboid', 2, 3, 4);
    let cuboidItem = new GeomItem('cuboidItem', myCuboid);

    const scene = new Scene();
    scene.getRoot().addChild(cuboidItem);

    expect(String(scene)).to.be.equal(`{
  "root": {
    "name": "root",
    "childItems": [
      {
        "name": "Camera",
        "childItems": []
      },
      {
        "name": "cuboidItem",
        "childItems": [],
        "geom": {
          "vertexAttributes": {
            "positions": "{\\n  \\"dataType\\": \\"Vec3\\",\\n  \\"length\\": 8\\n}",
            "texCoords": "{\\n  \\"dataType\\": \\"Vec2\\",\\n  \\"length\\": 8\\n}",
            "normals": "{\\n  \\"dataType\\": \\"Vec3\\",\\n  \\"length\\": 8\\n}"
          },
          "tris": 0,
          "quads": 24,
          "x": 2,
          "y": 3,
          "z": 4
        }
      }
    ]
  },
  "boundingBox": {
    "p0": {
      "x": -1,
      "y": -1.5,
      "z": -2
    },
    "p1": {
      "x": 1,
      "y": 1.5,
      "z": 2
    }
  }
}`);
  });
});