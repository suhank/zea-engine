
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
        this.__name = name;
        this.__components = [];
        this.__componentMapping = {};
        this.componentAdded = new Signal();
        this.componentRemoved = new Signal();

        this.loaded = new Signal(true);
        this.loaded.setToggled(true);

        const fileParam = this.addParameter(new FilePathParameter('FilePath'));
        fileParam.valueChanged.connect(()=>{
            const filePath = fileParam.getValue()
            const url = fileParam.getURL();
            this.loaded.setToggled(false);
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
            const ext = this.__datafileParam.getExt();
            const loader = dataLoaders[ext] ? dataLoaders[ext][dataLoaders[ext].length-1] : undefined;
            if(loader && loader != this.__loader){
                this.unloadDataFromTree();
                this.__loader = loader;
                this.__loader(this, this.__datafileParam, ()=>{
                    if(mode == Visualive.ValueSetMode.USER_SETVALUE)
                        this.loaded.emit();
                    else {
                        this.__datafileParam.loaded.emit();
                    }
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
    // Components

    addComponent(component) {
        this.__components.push(component);
        this.__componentMapping[component.getName()] = this.__components.length - 1;

        component.setOwner(this);

        this.componentAdded.emit(component);
    }

    removeComponent(name) {
        const index = this.__componentMapping[name];
        if(index == undefined) {
            throw("Component not found:" + name)
        }
        const component = this.__components[index];
        component.setOwner(undefined);
        this.__components.splice(index, 1);

        const componentMapping = {};
        for (let i =0; i< this.__components.length; i++)
            componentMapping[this.__components[i].getName()] = i;
        this.__componentMapping = componentMapping;

        this.componentRemoved.emit(component, index);
        return component;
    }

    getComponent(name) {
        return this.__components[this.__componentMapping[name]];
    }
    
    //////////////////////////////////////////
    // Persistence

    readBinary(reader, context={}) {
        context.assetItem = this;
        super.readBinary(reader, context);
    }
    
    toJSON(context) {
        if(!context) 
            context = {};
        context.assetItem = this;
        const j = super.toJSON(context);

        const jcs = [];
        for(let c of this.__components)
            jcs.push(c.toJSON(context));
        if(jcs.length > 0)
            j.components = jcs;

        return j;
    }

    fromJSON(j, context, onDone) {
        if(!context) 
            context = {};
        context.assetItem = this;

        const loadAssetJSON = ()=>{
            super.fromJSON(j, context);
            if(j.components) {
                for(let cj of j.components) {
                    const component = sgFactory.constructClass(cj.type ? cj.type : cj.name);
                    if (component) {
                        component.fromJSON(cj, context);
                        this.addComponent(component);
                    }
                }
            }
            onDone();
        }

        if(j.params && j.params.DataFilePath) {
            const onbinloaded = ()=>{
              loadAssetJSON();
            }
            this.__datafileParam.loaded.connect(onbinloaded)

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
