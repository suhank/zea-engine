import chai from 'chai';
import {
  Vec2,
  Vec3,
  BaseGeom,
  Rect,
  Mesh,
  Plane,
  Cuboid
} from '../../../lib/Visualive-0.0.5.js';

chai.expect();
const expect = chai.expect;

describe('Geometries', function() {

  describe('TestBaseGeom', () => {
    let baseGeom = new BaseGeom('baseGeom');
    baseGeom.setNumVertices(8);
    baseGeom.getVertex(0).set(1, -1, -1);
    baseGeom.setVertex(1, new Vec3(1, 1, 1));

    it('getVertex 0', () => {
      expect(String(baseGeom.getVertex(0))).to.be.equal('{"x":1,"y":-1,"z":-1}');
    });
    it('getVertex 1', () => {
      expect(String(baseGeom.getVertex(1))).to.be.equal('{"x":1,"y":1,"z":1}');
    });
  });


  it('TestMesh', () => {
    let myMesh = new Mesh('myMesh');

    expect(String(myMesh)).to.be.equal(`{
  "vertexAttributes": {
    "positions": "{\\n  \\"dataType\\": \\"Vec3\\",\\n  \\"length\\": 0\\n}"
  },
  "tris": 0,
  "quads": 0
}`);
  });


  it('TestPlane', () => {
    let myPlane = new Plane('myPlane', 2.5, 3.2, 4, 6);

    expect(String(myPlane)).to.be.equal(`{
  "vertexAttributes": {
    "positions": "{\\n  \\"dataType\\": \\"Vec3\\",\\n  \\"length\\": 35\\n}",
    "texCoords": "{\\n  \\"dataType\\": \\"Vec2\\",\\n  \\"length\\": 35\\n}",
    "normals": "{\\n  \\"dataType\\": \\"Vec3\\",\\n  \\"length\\": 35\\n}"
  },
  "tris": 0,
  "quads": 96,
  "x": 2.5,
  "y": 3.2,
  "xDivisions": 4,
  "yDivisions": 6
}`);
  });



  it('TestCuboid', () => {
    let myCuboid = new Cuboid('myCuboid', 2, 3, 4);

    expect(String(myCuboid)).to.be.equal(`{
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
}`);
  });




  it('TestRect', () => {
        let myRect = new Rect('myRect', 2, 3);

    expect(String(myRect)).to.be.equal(`{
  "vertexAttributes": {
    "positions": "{\\n  \\"dataType\\": \\"Vec3\\",\\n  \\"length\\": 4\\n}"
  },
  "indices": 8,
  "x": 2,
  "y": 3
}`);
  });



});