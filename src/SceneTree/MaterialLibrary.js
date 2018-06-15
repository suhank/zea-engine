import {
    SystemDesc
} from '../BrowserDetection.js';
import {
    Signal
} from '../Utilities';
import {
    sgFactory
} from './SGFactory.js';
import {
    Material
} from './Material.js';
import {
    FileImage2D
} from './FileImage2D.js';


class MaterialLibrary {
    constructor(name='MaterialLibrary') {
        this.__name = name;
        this.__images = {};
        this.__materials = {
            Default: new Material('Default', 'SimpleSurfaceShader')
        };

        this.lod = 0;
        if(SystemDesc.isMobileDevice)
            this.lod = 1;
        this.loaded = new Signal();
    }

    getPath() {
        return [this.__name];
    }

    getNumMaterials() {
        return Object.keys(this.__materials).length;
    }

    getMaterials() {
        return Object.values(this.__materials);
    }

    getMaterialNames() {
        let names = [];
        for(let name in this.__materials) {
            names.push(name);
        }
        return names;
    }

    hasMaterial(name) {
        return name in this.__materials;
    }

    addMaterial(material) {
        material.setOwner(this);
        this.__materials[material.getName()] = material;
    }

    getMaterial(name, assert=true) {
        const res = this.__materials[name];
        if(!res && assert){
            throw("Material:" + name+ " not found in library:" + this.getMaterialNames())
        }
        return res;
    }

    hasImage(name) {
        return name in this.__images;
    }

    addImage(Image) {
        Image.setOwner(this);
        this.__images[Image.getName()] = Image;
    }

    getImage(name, assert=true) {
        const res = this.__images[name];
        if(!res && assert){
            throw("Image:" + name+ " not found in library:" + this.getImageNames())
        }
        return res;
    }

    getImageNames() {
        let names = [];
        for(let name in this.__images) {
            names.push(name);
        }
        return names;
    }

    //////////////////////////////////////////
    // Persistence

    load(filePath) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", filePath, true);
        xhr.ontimeout = ()=>{
            throw("The request for " + filePath + " timed out.");
        };
        xhr.onload = ()=>{
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    this.fromJSON(JSON.parse(xhr.responseText));
                } else {
                    console.warn(xhr.statusText);
                }
            }
        };
        xhr.send(null);
    }

    fromJSON(j, context) {
        context.lod = this.lod;
        for (let name in j["textures"]) {
            let image = new FileImage2D(name);
            this.__textures[name] = texture;
        }
        for (let name in j.materials) {
            let material = new Material(name);
            material.fromJSON(j.materials[name]);
            this.addMaterial(material);
        }
    }

    toJSON() {
        return {
            "numMaterials": this.geoms.length()
        }
    }


    readBinary(reader, context) {
        this.name = reader.loadStr();

        // Specify the Lod to load the images in this library.
        context.lod = this.lod;
        context.materialLibrary = this;

        let numTextures = reader.loadUInt32();
        for (let i = 0; i < numTextures; i++) {
            let type = reader.loadStr();
            let texture = sgFactory.constructClass(type, undefined);
            texture.readBinary(reader, context);
            this.__textures[texture.getName()] = texture;
        }
        let numMaterials = reader.loadUInt32();
        if (numMaterials > 0) {
            let toc = reader.loadUInt32Array(numMaterials);
            for (let i = 0; i < numMaterials; i++) {
                let shaderName = reader.loadStr();
                let name = reader.loadStr();
                if (this.__materialTypeMapping && ('*' in this.__materialTypeMapping || name in this.__materialTypeMapping)) {
                    if (name in this.__materialTypeMapping)
                        shaderName = this.__materialTypeMapping[name];
                    else if ('*' in this.__materialTypeMapping)
                        shaderName = this.__materialTypeMapping['*'];
                }

                if(shaderName == 'StandardMaterial'){
                    shaderName = 'StandardSurfaceShader';
                }
                if(shaderName == 'TransparentMaterial'){
                    shaderName = 'TransparentSurfaceShader';
                }

                // console.log("Material:" + name);
                let material = new Material(name, shaderName);
                reader.seek(toc[i]); // Reset the pointer to the start of the item data.
                material.readBinary(reader, context, this.__textures);
                this.addMaterial(material);
            }
        }

        this.loaded.emit();
    }

    toString() {
        return JSON.stringify(this.toJSON(), null, 2)
    }
};
export {
    MaterialLibrary
};