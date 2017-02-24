import chai from 'chai';
import {
    Box3
} from '../../lib/Visualive-0.0.5.js';

chai.expect();
const expect = chai.expect;

describe('Box3', function() {
    let box;

    before(function() {
        box = new Box3();
    });

    it('toString', function() {
        expect(box.toString()).to.be.equal('{"p0":{"x":null,"y":null,"z":null},"p1":{"x":null,"y":null,"z":null}}');
    });

});