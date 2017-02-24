import chai from 'chai';
import {
    Quat
} from '../../lib/Visualive-0.0.5.js';

chai.expect();
const expect = chai.expect;

describe('Quat', function() {
    let quat1;
    let quat2;
    let quat3;

    before(function() {
        quat1 = new Quat(1, 2, 3, 6);
        quat2 = new Quat(4, 5, 6, 4);
        quat3 = new Quat(1, 2, 4, 1);
    });

    it('defaultConstructor', () => {
        let quat = new Quat();
        expect(quat.toJSON()).to.deep.equal({
            "w": 0,
            "x": 0,
            "y": 0,
            "z": 0
        });
    });
    
    it('member.x', () => {
        expect(quat3.x).to.be.equal(1);
    });

    it('member.y', () => {
        expect(quat3.y).to.be.equal(2);
    });

    it('member.z', () => {
        expect(quat3.z).to.be.equal(4);
    });

    it('member.w', () => {
        expect(quat3.w).to.be.equal(1);
    });

    it('toString', function() {
        expect(quat3.toString()).to.be.equal('{"x":1,"y":2,"z":4,"w":1}');
    });

    it('toJSON', () => {
        expect(quat3.toJSON()).to.deep.equal({
            "x": 1,
            "y": 2,
            "z": 4,
            "w": 1
        });
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
        let quat = Quat.createFromFloat32Buffer(tempdata.buffer, 4);

        expect(quat.toJSON()).to.deep.equal({
            "x": 5,
            "y": 6,
            "z": 7,
            "w": 8
        });
    });
    it('rotateVec', () => {
        let quat = new Quat();
        quat.rotateY(Math.PI * 0.5);
        expect(quat.toMat3().toString()).to.be.equal('TODO');
        expect(quat.rotateVec3(new Vec3(0, 0, 1)).toString()).to.be.equal('TODO');
        quat.rotateY(Math.PI * 0.25);
        expect(quat.rotateVec3(new Vec3(0, 0, 1)).toString()).to.be.equal('TODO');
        let quat2 = new Quat();
        quat2.rotateX(Math.PI * 0.25);
        expect(quat2.rotateVec3(new Vec3(0, 0, 1)).toString()).to.be.equal('TODO');
    }
    it('setFromDirectionAndUpvector', () => {
            let pos = new Vec3(1, 0, 0);
            let up = new Vec3(0, 1, 0);
            let mat3 = new Mat3();
            mat3.setFromDirectionAndUpvector(pos.negate(), up);

            let quat = new Quat();
            quat.setFromMat3(mat3);
            quat.normalizeInPlace();

        expect(mat3.toString()).to.be.equal('TODO');
        expect(quat.toMat3().toString()).to.be.equal('TODO');
        expect(quat.toMat3().toString()).to.be.equal('TODO');
        expect(mat3.multiplyVec3(new Vec3(0, 0, 1)).toString()).to.be.equal('TODO');
        expect(quat.rotateVec3(new Vec3(0, 0, 1)).toString()).to.be.equal('TODO');
    }
}
});