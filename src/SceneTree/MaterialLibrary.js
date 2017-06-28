import {
    isMobileDevice
} from '../BrowserDetection.js';
import {
    Signal,
    Color
} from '../Math';
import {
    sgFactory
} from './SGFactory.js';
import {
    Material
} from './Material.js';

class MaterialLibrary {
    constructor(resourceLoader) {
        this.__resourceLoader = resourceLoader;
        this.__textures = {};
        this.__materials = {};


        let material = new Material('Default');
        material.addParameter('baseColor', new Color(0.3, 0.3, 0.3));
        material.addParameter('roughness', 0.2);
        material.addParameter('reflectance', 0.2);
        this.__materials['Default'] = material;

        this.lod = 0;
        if(isMobileDevice())
            this.lod = 1;
        this.loaded = new Signal();
    }

    get numMaterials() {
        return this.__materials.length;
    }
    get materials() {
        return this.__materials;
    }

    setMaterialTypeMapping(materialTypeMapping) {
        this.__materialTypeMapping = materialTypeMapping;
    }

    hasMaterial(name) {
        return name in this.__materials;
    }

    addMaterial(material) {
        this.__materials[material.name] = material;
    }

    getMaterial(name) {
        return this.__materials[name];
    }

    modifyMaterials(materialNames, paramValues, shaderName = undefined) {
            for (let materialName of materialNames) {
                let material = this.__materials[materialName];
                if (!material) {
                    console.warn("Material not found:" + materialName);
                    continue;
                }
                for (let paramName in paramValues) {
                    let param = material.getParameter(paramName);
                    if (param) {
                        param.setValue(paramValues[paramName]);
                    } else {
                        material.addParameter(paramName, paramValues[paramName]);
                    }
                }
                if (shaderName)
                    material.setShaderName(shaderName);
            }
        }
        //////////////////////////////////////////
        // Persistence

    load(filePath) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", filePath, true);
        xhr.ontimeout = function() {
            console.error("The request for " + filePath + " timed out.");
        };
        let _this = this;
        xhr.onload = function() {
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

    fromJSON(j, flags = 0) {
        for (let name in j["textures"]) {
            let texture = sgFactory.constructClass('FileImage2D');
            this.__textures[name] = texture;
        }
        for (let name in j.materials) {
            let material = sgFactory.constructClass('StandardMaterial');
            material.fromJSON(j.materials[name]);
            this.__materials[name] = material;
        }
    }

    toJSON() {
        return {
            "numMaterials": this.geoms.length()
        }
    }


    readBinary(reader, flags=0) {
        this.name = reader.loadStr();

        let numTextures = reader.loadUInt32();
        for (let i = 0; i < numTextures; i++) {
            let type = reader.loadStr();
            let texture = sgFactory.constructClass(type, undefined, this.__resourceLoader);
            texture.readBinary(reader, flags, this.lod);
            this.__textures[texture.name] = texture;
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
                material.readBinary(reader, flags, this.__textures);

                this.__materials[name] = material;
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
// MaterialLibrary;