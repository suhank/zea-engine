import chai from 'chai';
import {
    Mat4
} from '../../lib/Visualive-0.0.5.js';

chai.expect();
const expect = chai.expect;

describe('Mat4', function() {
    let m1;
    let m2;

    before(function() {
        m1 = new Mat4(
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            0,
            11,
            12,
            13,
            14,
            15,
            16,
            17);
    });

    it('defaultConstructor', () => {
        let mat = new Mat4();
        expect(mat.toJSON()).to.deep.equal({
            "m00": 1,
            "m01": 0,
            "m02": 0,
            "m03": 0,
            "m10": 0,
            "m11": 1,
            "m12": 0,
            "m13": 0,
            "m20": 0,
            "m21": 0,
            "m22": 1,
            "m23": 0,
            "m30": 0,
            "m31": 0,
            "m32": 0,
            "m33": 1
        });
    });

    it('member.m00', () => {
        expect(m1.m00).to.be.equal(1);
    });

    it('member.m01', () => {
        expect(m1.m01).to.be.equal(2);
    });

    it('member.m02', () => {
        expect(m1.m02).to.be.equal(3);
    });

    it('toString', function() {
        expect(m1.toString()).to.be.equal('{"m00":1,"m01":2,"m02":3,"m03":4,"m10":5,"m11":6,"m12":7,"m13":8,"m20":9,"m21":0,"m22":11,"m23":4,"m30":13,"m31":14,"m32":15,"m33":16}');
    });

    it('toJSON', () => {
        expect(m1.toJSON()).to.deep.equal({
            "m00": 1,
            "m01": 2,
            "m02": 3,
            "m03": 4,
            "m10": 5,
            "m11": 6,
            "m12": 7,
            "m13": 8,
            "m20": 9,
            "m21": 0,
            "m22": 11,
            "m23": 4,
            "m30": 13,
            "m31": 14,
            "m32": 15,
            "m33": 16
        });
    });

    it('createFromFloat32Buffer', () => {

        let tempdata = new Float32Array(16);
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
        tempdata[10] = 11;
        tempdata[11] = 12;
        tempdata[12] = 13;
        tempdata[13] = 14;
        tempdata[14] = 15;
        tempdata[15] = 16;
        tempdata[16] = 17;
        let mat = Mat4.createFromFloat32Buffer(tempdata.buffer, 0);

        expect(mat.toJSON()).to.deep.equal({
            "m00": 1,
            "m01": 2,
            "m02": 3,
            "m03": 4,
            "m10": 5,
            "m11": 6,
            "m12": 7,
            "m13": 8,
            "m20": 9,
            "m21": 0,
            "m22": 11,
            "m23": 4,
            "m30": 13,
            "m31": 14,
            "m32": 15,
            "m33": 16
        });
    });

});