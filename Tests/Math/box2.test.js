import chai from 'chai';
import {
    Box2
} from '../../lib/Visualive-0.0.5.js';

chai.expect();
const expect = chai.expect;

describe('Box2', function() {
    let box;

    before(function() {
        box = new Box2();
    });

    it('member.p0', () => {
        expect(box.p0.toString()).to.be.equal('{"x":null,"y":null}');
    });

    it('member.p1', () => {
        expect(box.p1.toString()).to.be.equal('{"x":null,"y":null}');
    });

    it('toString', function() {
        expect(box.toString()).to.be.equal('{"p0":{"x":null,"y":null},"p1":{"x":null,"y":null}}');
    });

});