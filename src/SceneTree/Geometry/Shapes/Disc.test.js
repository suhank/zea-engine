import { Disc } from './Disc'

describe('Disc', () => {
  it('tests default parameters', () => {
    const disc = new Disc()

    expect(disc.getParameter('Radius').getValue()).toBe(0.5)
    expect(disc.getParameter('Sides').getValue()).toBe(32)
  })

  it('updates parameters', () => {
    const disc = new Disc()
    disc.getParameter('Radius').setValue(4)
    disc.getParameter('Sides').setValue(16)

    expect(disc.getParameter('Radius').getValue()).toBe(4)
    expect(disc.getParameter('Sides').getValue()).toBe(16)
  })

  it('saves to JSON (serialization).', () => {
    const disc = new Disc(3, 16)
    const outputJSON = disc.toJSON()

    expect(outputJSON).toMatchSnapshot()
  })

  it('restores from JSON (serialization).', () => {
    const disc = new Disc()
    const jsonStr =
      '{"params":{"Radius":{"value":3},"Sides":{"value":16,"range":[3,200],"step":1}},"type":"Disc","numVertices":17,"vertexAttributes":{"positions":{"data":[0,0,0,0,3,0,1.148050308227539,2.7716386318206787,0,2.1213202476501465,2.1213202476501465,0,2.7716386318206787,1.148050308227539,0,3,1.8369701465288538e-16,0,2.7716386318206787,-1.148050308227539,0,2.1213202476501465,-2.1213202476501465,0,1.148050308227539,-2.7716386318206787,0,3.6739402930577075e-16,-3,0,-1.148050308227539,-2.7716386318206787,0,-2.1213202476501465,-2.1213202476501465,0,-2.7716386318206787,-1.148050308227539,0,-3,-5.510910704284357e-16,0,-2.7716386318206787,1.148050308227539,0,-2.1213202476501465,2.1213202476501465,0,-1.148050308227539,2.7716386318206787,0],"dataType":"Vec3","defaultValue":0,"length":17,"splits":{},"splitValues":[]},"texCoords":{"data":[0.5,0.5,0.5,1,0.6913416981697083,0.9619397521018982,0.8535534143447876,0.8535534143447876,0.9619397521018982,0.6913416981697083,1,0.5,0.9619397521018982,0.30865827202796936,0.8535534143447876,0.1464466154575348,0.6913416981697083,0.03806023299694061,0.5,0,0.30865827202796936,0.03806023299694061,0.1464466154575348,0.1464466154575348,0.03806023299694061,0.30865827202796936,0,0.5,0.03806023299694061,0.6913416981697083,0.1464466154575348,0.8535534143447876,0.30865827202796936,0.9619397521018982],"dataType":"Vec2","defaultValue":1.7976931348623157e+308,"length":17,"splits":{},"splitValues":[]},"normals":{"data":[0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1],"dataType":"Vec3","defaultValue":1.7976931348623157e+308,"length":17,"splits":{},"splitValues":[]}},"faceCounts":[16],"faceVertexIndices":[0,1,2,0,2,3,0,3,4,0,4,5,0,5,6,0,6,7,0,7,8,0,8,9,0,9,10,0,10,11,0,11,12,0,12,13,0,13,14,0,14,15,0,15,16,0,16,1]}'
    disc.fromJSON(JSON.parse(jsonStr))

    const newDisc = new Disc(3, 16)
    expect(disc.toJSON()).toEqual(newDisc.toJSON())
  })
})
