
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
import {
    sgFactory
} from './SGFactory.js';

const dataLoaders = {};

class AssetItem extends TreeItem {
    constructor(name) {
        super(name);

        this.loaded = new Signal(true);
        // Assets that are generated inline can be considered loaded
        this.loaded.setToggled(true);

        // A signal that is emitted once all the geoms are loaded.
        // Often the state machine will activate the first state
        // when this signal emits. 
        this.geomsLoaded = new Signal(true);
        this.geomsLoaded.setToggled(true);

        const fileParam = this.addParameter(new FilePathParameter('FilePath'));
        fileParam.valueChanged.connect(()=>{
            const filePath = fileParam.getValue()
            const url = fileParam.getURL();
            this.loaded.setToggled(false);
            this.geomsLoaded.setToggled(false);
            loadTextfile(url,
                (data) => {
                    const j = JSON.parse(data);
                    this.fromJSON(j, { assetItem: this }, ()=>{
                        if(!this.loaded.isToggled())
                            this.loaded.emit();
                    });

                }
            );
        });

        this.__datafileParam = this.addParameter(new Visualive.FilePathParameter('DataFilePath'));
        this.__datafileParam.valueChanged.connect((mode) => {
            this.loaded.setToggled(false);
            this.geomsLoaded.setToggled(false);
            const ext = this.__datafileParam.getExt();
            const loader = dataLoaders[ext] ? dataLoaders[ext][dataLoaders[ext].length-1] : undefined;
            if(loader && loader != this.__loader){
                this.unloadDataFromTree();
                this.__loader = loader;
                this.__loader(this, this.__datafileParam, ()=>{
                    if(mode == Visualive.ValueSetMode.USER_SETVALUE)
                        this.loaded.emit();
                    else if(this.__datafileLoaded) {
                        this.__datafileLoaded();
                    }
                },
                ()=>{
                    this.geomsLoaded.emit();
                });
            }
            else {
                console.warn("No loaders found for ext:" + ext + ". loading file:" + this.__datafileParam.getValue());
            }
        });
    }

    getLoader(){
        return this.__loader;
    }

    //////////////////////////////////////////
    // Persistence

    readBinary(reader, context={}) {
        context.assetItem = this;
        context.numTreeItems = 0;
        context.numGeomItems = 0;
        super.readBinary(reader, context);

        console.log("numTreeItems:", context.numTreeItems, " numGeomItems:", context.numGeomItems)
    }
    
    toJSON(context) {
        if(!context) 
            context = {};
        context.assetItem = this;
        const j = super.toJSON(context);
        return j;
    }

    fromJSON(j, context, onDone) {
        if(!context) 
            context = {};
        context.assetItem = this;
        context.numTreeItems = 0;
        context.numGeomItems = 0;

        const loadAssetJSON = ()=>{
            super.fromJSON(j, context);
            onDone();
        }

        if(j.params && j.params.DataFilePath) {
            // Save the callback function for later.
            this.__datafileLoaded = loadAssetJSON;
            const filePathJSON = j.params.DataFilePath;
            delete j.params.DataFilePath;
            this.__datafileParam.fromJSON(filePathJSON, context);
        }
        else {
            loadAssetJSON();
        }


    }

    unloadDataFromTree() {
        // TODO: only remove the children loaded by the data load. (these items need to be flagged);
        this.removeAllChildren();
    }

    //////////////////////////////////////////
    // Static Methods


    static registerDataLoader(ext, cls){
        const regExt = (ext)=>{
            ext = ext.toLowerCase();
            if(!dataLoaders[ext])
                dataLoaders[ext] = [];
            else {
                console.warn("overriding loader for ext:" + ext + ". Prev loader:" + dataLoaders[ext] + ". New loader:" + cls);
            }
            dataLoaders[ext].push(cls);
        }

        if(Array.isArray(ext)){
            for(let e of ext)
                regExt(e);
        }
        else {
            regExt(ext);
        }
    }
};

export {
    AssetItem
};
