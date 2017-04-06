import {
    Color,
    Signal
} from '../Math';
import {
    Material
} from './Material.js';
import {
    BinReader
} from './BinReader.js';
import {
    sgFactory
} from './SGFactory.js';

class MaterialLibrary {
    constructor() {
        this.loaded = new Signal();
        this.__textures = {};
        this.__materials = {};


        let material = sgFactory.constructClass('StandardMaterial');
        material.baseColor.set(0.3, 0.3, 0.3);
        material.roughness = 0.2;
        material.reflectance = 0.2;
        this.__materials['DefaultMaterial'] = material;
    }

    get numMaterials(){
        return this.__materials.length;
    }
    get materials(){
        return this.__materials;
    }
    
    hasMaterial(name){
        return name in this.__materials;
    }
    
    addMaterial(material){
        this.__materials[material.name] = material;
    }
    
    getMaterial(name){
        return this.__materials[name];
    }

    load(filePath){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", filePath, true);
        xhr.ontimeout = function () {
            console.error("The request for " + filePath + " timed out.");
        };
        let _this = this;
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    _this.fromJSON.call(_this, JSON.parse(xhr.responseText));
                    onLoadDone.call(_this);
                } else {
                    console.warn(xhr.statusText);
                }
            }
        };
        xhr.send(null);
    }

    fromJSON(j, flags=0) {
        for(let name in j["textures"]){
            let texture = sgFactory.constructClass('FileImage2D');
            this.__textures[name] = texture;
        }
        for(let name in j.materials){
            let material = sgFactory.constructClass('StandardMaterial');
            material.fromJSON(j.materials[name]);
            this.__materials[name] = material;
        }
    }

    toJSON() {
        return {"numMaterials": this.geoms.length() }
    }

    toString() {
        return JSON.stringify(this.toJSON(), null, 2)
    }
};

export {
    MaterialLibrary
};

