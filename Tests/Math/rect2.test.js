import chai from 'chai';
import {
    Rect2
} from '../../lib/Visualive-0.0.5.js';

chai.expect();
const expect = chai.expect;

describe('Rect2', function() {
    let box;

    before(function() {
        box = new Rect2();
    });

    it('member.pos', () => {
        expect(box.pos.toString()).to.be.equal('{"x":0,"y":0}');
    });

    it('member.size', () => {
        expect(box.size.toString()).to.be.equal('{"x":0,"y":0}');
    });

    it('toString', function() {
        expect(box.toString()).to.be.equal('{"pos":{"x":0,"y":0},"size":{"x":0,"y":0}}');
    });

});