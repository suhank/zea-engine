
import {
    Signal
} from '../Utilities';
import {
    FilePathParameter
} from './Parameters';
import {
    TreeItem
} from './TreeItem.js';
import {
    loadTextfile
} from './Utils.js';


class AssetItem extends TreeItem {
    constructor(name) {
        super(name);
        this.__name = name;

        let fileParam = this.addParameter(new FilePathParameter('FilePath'));
        fileParam.valueChanged.connect(()=>{
            let filePath = fileParam.getValue()
            let url = fileParam.getURL();
            this.loaded.untoggle();
            loadTextfile(url,
                (data) => {
                    const j = JSON.parse(data);
                    this.fromJSON(j);
                }
            );
        });

        this.loaded = new Signal(true);
    }

    //////////////////////////////////////////
    // Persistence

    toJSON(flags = 0) {
        let j = super.toJSON(flags);
        return j;
    }

    fromJSON(j, flags = 0) {
        super.fromJSON(j, flags);
    }

};

export {
    AssetItem
};
