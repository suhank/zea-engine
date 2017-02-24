import chai from 'chai';
import {
    Vec3
} from '../../lib/Visualive-0.0.5.js';

chai.expect();
const expect = chai.expect;

describe('Vec3', function() {
    let vec1;
    let vec2;
    let vec3;

    before(function() {
        vec1 = new Vec3(1, 2, 3);
        vec2 = new Vec3(4, 5, 6);
        vec3 = new Vec3(1, 2, 4);
    });

    it('defaultConstructor', () => {
        let vec = new Vec3();
        expect(vec.toJSON()).to.deep.equal({
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

    it('toString', function() {
        expect(vec3.toString()).to.be.equal('{"x":1,"y":2,"z":4}');
    });

    it('toJSON', () => {
        expect(vec3.toJSON()).to.deep.equal({
            "x": 1,
            "y": 2,
            "z": 4
        });
    });
    
    it('toString Precision issue', () => {
        let vec = new Vec3(0.3, 1.0/3.0, Math.PI);
        expect(vec.toString()).to.deep.equal('{"x":0.3,"y":0.33333,"z":3.14159}');
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
        let vec = Vec3.createFromFloat32Buffer(tempdata.buffer, 7);

        expect(vec.toJSON()).to.deep.equal({
            "x": 8,
            "y": 9,
            "z": 0
        });
    });


    it('length', () => {
        expect(vec1.length()).to.be.equal(3.7416573867739413);
    });

    it('lengthSquared', () => {
        expect(vec1.lengthSquared()).to.be.equal(14);
    });

    it('normalize', () => {
        expect(vec1.normalize().toString()).to.be.equal('{"x":0.26726,"y":0.53452,"z":0.80178}');
    });

    it('dot', () => {
        expect(vec1.dot(vec2)).to.be.equal(32);
    });

    it('angle', () => {
        expect(vec1.normalize().angleTo(vec2.normalize())).to.be.equal(0.2257261629160217);
    });

    it('cross', () => {
        expect(vec1.cross(vec2).toString()).to.be.equal('{"x":-3,"y":6,"z":-3}');
    });

});