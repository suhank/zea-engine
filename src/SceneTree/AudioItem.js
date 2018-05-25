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
    NumberParameter
} from './Parameters';
import {
    TreeItem,
    LOADFLAGS_SKIP_MATERIALS
} from './TreeItem.js';
import {
    GeomLibrary
} from './GeomLibrary.js';
import {
    MaterialLibrary
} from './MaterialLibrary.js';

class AudioItem extends TreeItem {
    constructor(name, audioElement) {
        super(name, audioElement);
        this.getDOMElement = () => {
            return audioElement;
        }
        const muteParam = this.addParameter(new Parameter('Muted', false, 'Boolean'));
        muteParam.valueChanged.connect(() => {
            audioElement.muted = muteParam.getValue();
        });

        this.addParameter(new NumberParameter('Gain', 1.0)).setRange([0, 5]);
        this.addParameter(new NumberParameter('refDistance', 2));
        this.addParameter(new NumberParameter('maxDistance', 10000));
        this.addParameter(new NumberParameter('rolloffFactor', 1));
        this.addParameter(new NumberParameter('coneInnerAngle', 120));
        this.addParameter(new NumberParameter('coneOuterAngle', 180));
        this.addParameter(new NumberParameter('coneOuterGain', 0.2));
        this.mute = (value)=>{
            audioElement.muted = value;
            muteParam.setValue(value, ValueSetMode.CUSTOM);
        }
    }
};


class FileAudioItem extends AudioItem {
    constructor(name, resourceLoader) {

        const audioElement = new Audio();
        audioElement.style.display = 'none';
        audioElement.autoplay = true;
        audioElement.crossOrigin = "anonymous";
        document.body.appendChild(audioElement);

        super(name, audioElement);


        const fileParam = this.addParameter(new FilePathParameter('FilePath', resourceLoader));
        fileParam.valueChanged.connect(() => {
            audioElement.src = fileParam.getURL();
        });
        const autoplayParam = this.addParameter(new Parameter('Autoplay', true, 'Boolean'));
        autoplayParam.valueChanged.connect(() => {
            audioElement.autoplay = autoplayParam.getValue();
        });
        const playStateParam = this.addParameter(new NumberParameter('PlayState', 0));
        playStateParam.valueChanged.connect((mode) => {
            if(mode != ValueSetMode.CUSTOM){
                switch (playStateParam.getValue()) {
                    case 0:
                        audioElement.pause();
                        break;
                    case 1:
                        const promise = audioElement.play();
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
            const promise = audioElement.play();
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
            audioElement.pause();
            playStateParam.setValue(0, ValueSetMode.CUSTOM);
        }

    }
};

export {
    AudioItem,
    FileAudioItem
};