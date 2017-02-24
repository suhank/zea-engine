import chai from 'chai';
import {
    Vec2,
    Rect2,
    BaseCluster,
    BinTreeNode,
    BinTreeRect,
    BinTreeRectBorder
} from '../../lib/Visualive-0.0.5.js';

chai.expect();
const expect = chai.expect;

let logTree = (node, path) => {
    console.log(path);
    if (node.child0 != undefined && node.child1 != undefined) {
        logTree(node.child0, path + ".0");
        logTree(node.child1, path + ".1");
    } else {
        if (node.cluster != undefined) {
            console.log(path + ":X");
        } else {
            console.log(path + ":O");
        }
    }
}

describe('TestBinTree', function() {

    before(function() {});

    describe('TestBinTree0', () => {
        let tree = new BinTreeNode(new BinTreeRect(new Vec2(0, 0), new BinTreeRectBorder(0, true), new BinTreeRectBorder(0, true)), true);

        let closestFit = {
            'node': undefined,
            'cost': Number.MAX_VALUE,
            'delta': undefined
        }
        let cluster1 = new BaseCluster(new Rect2(new Vec2(0, 0), new Vec2(3, 4)));
        let ins1 = tree.insert(cluster1, closestFit);
        ins1 = closestFit.node.resizeAndInsert(cluster1, closestFit.delta);

        it('ins1.rect', () => {
            expect(ins1.rect.size.toString()).to.be.equal('{"x":3,"y":4}');
        });

        // the second cluster will cause the 
        let cluster2 = new BaseCluster(new Rect2(new Vec2(0, 0), new Vec2(2, 3)));
        let ins2 = tree.insert(cluster2, closestFit);
        ins2 = closestFit.node.resizeAndInsert(cluster2, closestFit.delta);

        it('ins2.rect', () => {
            expect(ins2.rect.size.toString()).to.be.equal('{"x":2,"y":3}');
        });

        logTree(tree, 'root');
    });


    describe('TestBinTree1', () => {

        let tree = new BinTreeNode(new BinTreeRect(new Vec2(0, 0), new BinTreeRectBorder(0, true), new BinTreeRectBorder(0, true)), true);

        let closestFit = {
            'node': undefined,
            'cost': Number.MAX_VALUE,
            'delta': undefined
        }
        let cluster1 = new BaseCluster(new Rect2(new Vec2(0, 0), new Vec2(3, 4)));
        let ins1 = tree.insert(cluster1, closestFit);
        ins1 = closestFit.node.resizeAndInsert(cluster1, closestFit.delta);

        it('ins1.rect', () => {
            expect(ins1.rect.size.toString()).to.be.equal('{"x":3,"y":4}');
        });

        // the second cluster will cause the 
        let cluster2 = new BaseCluster(new Rect2(new Vec2(0, 0), new Vec2(3, 2)));
        let ins2 = tree.insert(cluster2, closestFit);
        ins2 = closestFit.node.resizeAndInsert(cluster2, closestFit.delta);

        it('ins2.rect', () => {
            expect(ins2.rect.size.toString()).to.be.equal('{"x":3,"y":2}');
        });

        logTree(tree, 'root');
    });

    it('TestBinTree2', () => {

        let tree = new BinTreeNode(new BinTreeRect(new Vec2(25.26380729675293, 23.606233596801758), new BinTreeRectBorder(34.4963785708362, true), new BinTreeRectBorder(34.4963785708362, true)), true);

        let closestFit = {
            'node': undefined,
            'cost': Number.MAX_VALUE,
            'delta': undefined
        }
        let cluster1 = new BaseCluster(new Rect2(new Vec2(-17.452299118041992, -1.559782862663269), new Vec2(25.263818740844727, 3.4861929416656494)));
        let ins1 = tree.insert(cluster1, closestFit);
        ins1 = closestFit.node.resizeAndInsert(cluster1, closestFit.delta);

        expect(ins1.rect.size.toString()).to.be.equal('{"x":25.26382,"y":3.48619}');

        logTree(tree, 'root');
    });
});