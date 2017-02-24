import chai from 'chai';
import {
    Vec3,
    TreeItem
} from '../../lib/Visualive-0.0.5.js';

chai.expect();
const expect = chai.expect;

describe('TreeItem', function() {

    describe('buildTree', () => {

        let rootItem = new TreeItem('root');
        
        rootItem.childAdded.connect(function(data) {
            it('childAdded', () => {
                expect(String(data)).to.be.equal(`{
  "name": "item0",
  "childItems": [
    {
      "name": "item1",
      "childItems": []
    },
    {
      "name": "item2",
      "childItems": [
        {
          "name": "item3",
          "childItems": []
        }
      ]
    }
  ]
}`);
            });
        });
        it('rootItem.parentItem', () => {
            expect(rootItem.parentItem).to.be.equal(undefined);
        });

        let item0 = new TreeItem('item0');
        let item1 = new TreeItem('item1');
        let item2 = new TreeItem('item2');
        let item3 = new TreeItem('item3');

        item0.localXfo.translateInPlace(new Vec3(5, 6, 7));
        item1.localXfo.translateInPlace(new Vec3(15, 16, 17));
        item2.localXfo.translateInPlace(new Vec3(15, 16, 17));

        rootItem.addChild(item0);
        item0.addChild(item1);
        item0.addChild(item2);
        item2.addChild(item3);

        it('item0.parentItem', () => {
            expect(String(item0.parentItem)).to.be.equal(`{
  "name": "root",
  "childItems": [
    {
      "name": "item0",
      "childItems": [
        {
          "name": "item1",
          "childItems": []
        },
        {
          "name": "item2",
          "childItems": [
            {
              "name": "item3",
              "childItems": []
            }
          ]
        }
      ]
    }
  ]
}`);
        });

        it('rootItem', () => {
            expect(String(rootItem)).to.be.equal(`{
  "name": "root",
  "childItems": [
    {
      "name": "item0",
      "childItems": [
        {
          "name": "item1",
          "childItems": []
        },
        {
          "name": "item2",
          "childItems": [
            {
              "name": "item3",
              "childItems": []
            }
          ]
        }
      ]
    }
  ]
}`);
        });

        it('item3.path', () => {
            expect(String(item3.path)).to.be.equal('root/item0/item2/item3');
        });

        it('item3.globalMatrix', () => {
            expect(String(item3.globalMatrix)).to.be.equal('{"m00":1,"m01":0,"m02":0,"m03":0,"m10":0,"m11":1,"m12":0,"m13":0,"m20":0,"m21":0,"m22":1,"m23":0,"m30":20,"m31":22,"m32":24,"m33":1}');
        });
    });
});