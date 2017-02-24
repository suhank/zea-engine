import chai from 'chai';
import {
    Vec2
} from '../../lib/Visualive-0.0.5.js';

chai.expect();
const expect = chai.expect;

describe('Vec2', function() {
    let vec2;

    before(function() {
        vec2 = new Vec2(1, 2);
    });

    it('defaultConstructor', () => {
        let vec = new Vec2();
        expect(vec.toJSON()).to.deep.equal({
            "x": 0,
            "y": 0
        });
    });
    
    it('member.x', () => {
        expect(vec2.x).to.be.equal(1);
    });

    it('member.y', () => {
        expect(vec2.y).to.be.equal(2);
    });

    it('toString', function() {
        expect(vec2.toString()).to.be.equal('{"x":1,"y":2}');
    });

    it('toJSON', () => {
        expect(vec2.toJSON()).to.deep.equal({
            "x": 1,
            "y": 2
        });
    });
    
    it('toString Precision issue', () => {
        let vec = new Vec2(0.3, 1.0/3.0);
        expect(vec.toString()).to.deep.equal('{"x":0.3,"y":0.33333}');
    });

    it('createFromFloat32Buffer', () => {

        let tempdata = new Float32Array(10);
        tempdata[0] = 1;
        tempdata[1] = 2;
        tempdata[2] = 3;
        tempdata[3] = 4;
        tempdata[4] = 5;
        tempdata[5] = 6;
        tempdata[6] = 7;
        tempdata[7] = 8;
        tempdata[8] = 9;
        tempdata[9] = 0;
        let vec = Vec2.createFromFloat32Buffer(tempdata.buffer, 7);

        expect(vec.toJSON()).to.deep.equal({
            "x": 8,
            "y": 9
        });
    });

});