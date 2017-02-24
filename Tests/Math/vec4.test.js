import chai from 'chai';
import {
    Vec4
} from '../../lib/Visualive-0.0.5.js';

chai.expect();
const expect = chai.expect;

describe('Vec4', function() {
    let vec1;
    let vec2;
    let vec3;

    before(function() {
        vec1 = new Vec4(1, 2, 3, 6);
        vec2 = new Vec4(4, 5, 6, 4);
        vec3 = new Vec4(1, 2, 4, 1);
    });

    it('defaultConstructor', () => {
        let vec = new Vec4();
        expect(vec.toJSON()).to.deep.equal({
            "t": 0,
            "x": 0,
            "y": 0,
            "z": 0
        });
    });
    
    it('member.x', () => {
        expect(vec3.x).to.be.equal(1);
    });

    it('member.y', () => {
        expect(vec3.y).to.be.equal(2);
    });

    it('member.z', () => {
        expect(vec3.z).to.be.equal(4);
    });

    it('member.t', () => {
        expect(vec3.t).to.be.equal(1);
    });

    it('toString', function() {
        expect(vec3.toString()).to.be.equal('{"x":1,"y":2,"z":4,"t":1}');
    });

    it('toJSON', () => {
        expect(vec3.toJSON()).to.deep.equal({
            "t": 1,
            "x": 1,
            "y": 2,
            "z": 4
        });
    });
    
    it('toString Precision issue', () => {
        let vec = new Vec4(0.3, 1.0/3.0, Math.PI, 1/5);
        expect(vec.toString()).to.deep.equal('{"x":0.3,"y":0.33333,"z":3.14159,"t":0.2}');
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
        let vec = Vec4.createFromFloat32Buffer(tempdata.buffer, 4);

        expect(vec.toJSON()).to.deep.equal({
            "x": 5,
            "y": 6,
            "z": 7,
            "t": 8
        });
    });


    it('length', () => {
        expect(vec1.length()).to.be.equal(4.795831523312719);
    });

    it('lengthSquared', () => {
        expect(vec1.lengthSquared()).to.be.equal(50);
    });

    it('normalize', () => {
        expect(vec1.normalize().toString()).to.be.equal('{"x":0.14142,"y":0.28284,"z":0.42426,"t":0}');
    });

    it('dot', () => {
        expect(vec1.dot(vec2)).to.be.equal(56);
    });

    it('cross', () => {
        expect(vec1.cross(vec2).toString()).to.be.equal('{"x":-3,"y":-24,"z":20,"t":-3}');
    });

});