
import {
    Signal,
    Vec2
} from '../Math';
import {
    Parameter,
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
    constructor(name, resourceLoader) {
        super(name, resourceLoader);
        this.__name = name;
        this.__resourceLoader = resourceLoader;
        this.__atlasSize = new Vec2();

        this.__audioElement = new Audio();
        this.__audioElement.autoplay = true;

        let fileParam = this.addParameter(new FilePathParameter('FilePath', this.__resourceLoader));
        fileParam.valueChanged.connect(()=>{
            this.__audioElement.src = fileParam.getURL();
        });
        let autoplayParam = this.addParameter(new Parameter('Autoplay', true, 'Boolean'));
        autoplayParam.valueChanged.connect(()=>{
            this.__audioElement.autoplay = fileParam.getValue();
        });

        let gainParam = this.addParameter(new NumberParameter('Gain', 1.0));
        gainParam.setRange([0, 5]);

    }

    getDOMElement() {
        return this.__audioElement;
    }


};

export {
    AudioItem
};
