<a name="Tests for `TreeItem` Class"></a>

### Tests for TreeItem Class

Use this code to guide yourself on how to implement this class.
```javascript
import { GridTreeItem } from './GridTreeItem'
// Although we're not directly using LinesShader, we import it so it registers itself in the registry.
// eslint-disable-next-line no-unused-vars
import { LinesShader } from '../Renderer/Shaders/LinesShader'
import { Color } from '../Math/Color'

describe.skip('GridTreeItem', () => {
  it('Setup GridTreeItem', () => {
    const grid = new GridTreeItem(5, 5, new Color('#99CCCC'))
    const expectedOutput =
      '{"params":{"Visible":{"value":true},"LocalXfo":{"value":{"tr":{"x":0,"y":0,"z":0},"ori":{"x":0,"y":0,"z":0,"w":1}}},"GlobalXfo":{"value":{"tr":{"x":0,"y":0,"z":0},"ori":{"x":0,"y":0,"z":0,"w":1}}},"BoundingBox":{"value":{"p0":{"x":null,"y":null,"z":null},"p1":{"x":null,"y":null,"z":null}}}},"name":"GridTree","type":"GridTreeItem","children":{"GridItem":{"params":{"Visible":{"value":true},"LocalXfo":{"value":{"tr":{"x":0,"y":0,"z":0},"ori":{"x":0,"y":0,"z":0,"w":1}}},"GlobalXfo":{"value":{"tr":{"x":0,"y":0,"z":0},"ori":{"x":0,"y":0,"z":0,"w":1}}},"BoundingBox":{"value":{"p0":{"x":null,"y":null,"z":null},"p1":{"x":null,"y":null,"z":null}}},"Geometry":{"value":{"params":{"x":{"value":5},"y":{"value":5},"xDivisions":{"value":5},"yDivisions":{"value":5},"skipCenterLines":{"value":true}},"type":"Grid","numVertices":24,"vertexAttributes":{"positions":{"data":[-2.5,-2.5,0,-2.5,2.5,0,-1.5,-2.5,0,-1.5,2.5,0,-0.5,-2.5,0,-0.5,2.5,0,0.5,-2.5,0,0.5,2.5,0,1.5,-2.5,0,1.5,2.5,0,2.5,-2.5,0,2.5,2.5,0,-2.5,-2.5,0,2.5,-2.5,0,-2.5,-1.5,0,2.5,-1.5,0,-2.5,-0.5,0,2.5,-0.5,0,-2.5,0.5,0,2.5,0.5,0,-2.5,1.5,0,2.5,1.5,0,-2.5,2.5,0,2.5,2.5,0],"dataType":"Vec3","defaultValue":0,"length":24}},"indices":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]}},"Material":{"value":["gridMaterial"]},"GeomOffsetXfo":{"value":{"tr":{"x":0,"y":0,"z":0},"ori":{"x":0,"y":0,"z":0,"w":1}}},"GeomMat":{"value":{"0":1,"1":0,"2":0,"3":0,"4":0,"5":1,"6":0,"7":0,"8":0,"9":0,"10":1,"11":0,"12":0,"13":0,"14":0,"15":1}}},"name":"GridItem","type":"GeomItem"},"xAxisLine":{"params":{"Visible":{"value":true},"LocalXfo":{"value":{"tr":{"x":0,"y":0,"z":0},"ori":{"x":0,"y":0,"z":0,"w":1}}},"GlobalXfo":{"value":{"tr":{"x":0,"y":0,"z":0},"ori":{"x":0,"y":0,"z":0,"w":1}}},"BoundingBox":{"value":{"p0":{"x":null,"y":null,"z":null},"p1":{"x":null,"y":null,"z":null}}},"Geometry":{"value":{"type":"Lines","numVertices":2,"vertexAttributes":{"positions":{"data":[-2.5,0,0,2.5,0,0],"dataType":"Vec3","defaultValue":0,"length":2}},"indices":[0,1]}},"Material":{"value":["gridXAxisMaterial"]},"GeomOffsetXfo":{"value":{"tr":{"x":0,"y":0,"z":0},"ori":{"x":0,"y":0,"z":0,"w":1}}},"GeomMat":{"value":{"0":1,"1":0,"2":0,"3":0,"4":0,"5":1,"6":0,"7":0,"8":0,"9":0,"10":1,"11":0,"12":0,"13":0,"14":0,"15":1}}},"name":"xAxisLine","type":"GeomItem"},"yAxisLine":{"params":{"Visible":{"value":true},"LocalXfo":{"value":{"tr":{"x":0,"y":0,"z":0},"ori":{"x":0,"y":0,"z":0,"w":1}}},"GlobalXfo":{"value":{"tr":{"x":0,"y":0,"z":0},"ori":{"x":0,"y":0,"z":0,"w":1}}},"BoundingBox":{"value":{"p0":{"x":null,"y":null,"z":null},"p1":{"x":null,"y":null,"z":null}}},"Geometry":{"value":{"type":"Lines","numVertices":2,"vertexAttributes":{"positions":{"data":[-2.5,0,0,2.5,0,0],"dataType":"Vec3","defaultValue":0,"length":2}},"indices":[0,1]}},"Material":{"value":["gridZAxisMaterial"]},"GeomOffsetXfo":{"value":{"tr":{"x":0,"y":0,"z":0},"ori":{"x":0,"y":0,"z":0.7071067690849304,"w":0.7071067690849304}}},"GeomMat":{"value":{"0":1,"1":0,"2":0,"3":0,"4":0,"5":1,"6":0,"7":0,"8":0,"9":0,"10":1,"11":0,"12":0,"13":0,"14":0,"15":1}}},"name":"yAxisLine","type":"GeomItem"}}}'

    expect(JSON.stringify(grid.toJSON())).toEqual(expectedOutput)
  })
})

```