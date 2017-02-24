import chai from 'chai';
import {
    Vec3,
    Signal
} from '../../lib/Visualive-0.0.5.js';

chai.expect();
const expect = chai.expect;

describe('Signal', function() {

    it('signal.emit', () => {
        let signal0 = new Signal('root');
        signal0.connect(function(data) {
            expect(String(data)).to.be.equal('{"x":1,"y":2,"z":3}');
        }, this);
        signal0.emit(new Vec3(1, 2, 3));
    });

    describe('TestNotifier', () => {

        class TestNotifierObj {
            constructor() {
                this.signal0 = new Signal();
                this.signal1 = new Signal();
            }

            emitSignals(data) {
                this.signal0.emit(data);
                this.signal1.emit(data);
            }
        };

        class TestObserverObj {
            constructor(notifierObj) {
                this.notifierObj = notifierObj;
                this.notifierObj.signal0.connect(this.__signal0Emitted, this);
                this.notifierObj.signal1.connect(this.__signal1Emitted, this);
            }

            __signal0Emitted(data) {
                it('__signal0Emitted', () => {
                    expect(String(data)).to.be.equal('{"x":5,"y":6,"z":7}');
                });
            }

            __signal1Emitted(data) {
                it('__signal1Emitted', () => {
                    expect(String(data)).to.be.equal('{"x":5,"y":6,"z":7}');
                });
            }
        };

        let notiferObj = new TestNotifierObj();
        let observerObj = new TestObserverObj(notiferObj);
        notiferObj.emitSignals(new Vec3(5, 6, 7));
    });
});