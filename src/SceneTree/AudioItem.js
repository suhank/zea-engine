import {
    Vec2
} from '../Math';
import {
    Signal
} from '../Utilities';
import {
    Parameter,
    ValueSetMode,
    FilePathParameter,
    BooleanParameter,
    NumberParameter
} from './Parameters';
import {
    TreeItem
} from './TreeItem.js';
import {
    GeomLibrary
} from './GeomLibrary.js';
import {
    MaterialLibrary
} from './MaterialLibrary.js';

class AudioItem extends TreeItem {
    constructor(name, source) {
        super(name, source);
        this.getAudioSource = () => {
            return source;
        }
        const muteParam = this.addParameter(new Parameter('Muted', false, 'Boolean'));
        muteParam.valueChanged.connect(() => {
            source.muted = muteParam.getValue();
        });

        this.addParameter(new NumberParameter('Gain', 1.0)).setRange([0, 5]);
        this.addParameter(new BooleanParameter('spatialize', true));
        this.addParameter(new NumberParameter('refDistance', 2));
        this.addParameter(new NumberParameter('maxDistance', 10000));
        // defaults taken from here.: https://github.com/mdn/webaudio-examples/blob/master/panner-node/main.js
        this.addParameter(new NumberParameter('rolloffFactor', 1));
        this.addParameter(new NumberParameter('coneInnerAngle', 360));
        this.addParameter(new NumberParameter('coneOuterAngle', 0));
        this.addParameter(new NumberParameter('coneOuterGain', 0));
        this.mute = (value)=>{
            source.muted = value;
            muteParam.setValue(value, ValueSetMode.CUSTOM);
        }


        // Note: many parts of the code assume a 'loaded' signal.
        // We should probably deprecate and use only 'updated'.
        this.loaded = new Signal(true);
        this.loaded.setToggled(false);
    }

};


class FileAudioItem extends AudioItem {
    constructor(name) {

        const source = Visualive.audioCtx.createBufferSource();
        super(name, source);

        this.__loaded = false;

        const fileParam = this.addParameter(new FilePathParameter('FilePath'));
        fileParam.valueChanged.connect(() => {
            const request = new XMLHttpRequest();
            request.open('GET', fileParam.getURL(), true);
            request.responseType = 'arraybuffer';

            request.onload = () => {
                const audioData = request.response;
                Visualive.audioCtx.decodeAudioData(audioData, 
                    (buffer) => {
                        source.buffer = buffer;
                        // source.connect(panner);
                        // panner.connect(Visualive.audioCtx.destination);
                        // positionPanner();
                        // source.loop = true;
                        source.start(0);
                        this.__loaded = true;
                        this.loaded.emit(true);
                    },
                    (e) =>{
                        console.log("Error with decoding audio data" + e.err);
                    });
            };

            request.send();

        });
        const autoplayParam = this.addParameter(new Parameter('Autoplay', true, 'Boolean'));
        autoplayParam.valueChanged.connect(() => {
            source.autoplay = autoplayParam.getValue();
        });
        const playStateParam = this.addParameter(new NumberParameter('PlayState', 0));
        playStateParam.valueChanged.connect((mode) => {
            if(mode != ValueSetMode.CUSTOM){
                switch (playStateParam.getValue()) {
                    case 0:
                        source.pause();
                        break;
                    case 1:
                        const promise = source.play();
                        if (promise !== undefined) {
                          promise.then(_ => {
                            console.log("Autoplay started!");
                          }).catch(error => {
                            console.log("Autoplay was prevented.");
                          });
                        }
                        break;
                }
            }
        });


        this.play = ()=>{
            const promise = source.play();
            if (promise !== undefined) {
              promise.then(_ => {
                console.log("Autoplay started!");
              }).catch(error => {
                console.log("Autoplay was prevented.");
              });
            }
            playStateParam.setValue(1, ValueSetMode.CUSTOM);
        }

        this.pause = ()=>{
            source.pause();
            playStateParam.setValue(0, ValueSetMode.CUSTOM);
        }

    }
    isLoaded() {
        return true;
    }
};

export {
    AudioItem,
    FileAudioItem
};