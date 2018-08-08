import {
    Color
} from '../Math';
import {
    Signal,
    decodeText
} from '../Utilities';
import {
    sgFactory
} from './SGFactory.js';
import {
    BaseImage
} from './BaseImage.js';
import {
    resourceLoader
} from './ResourceLoader.js';

import {
    Parameter,
    NumberParameter,
    Vec4Parameter,
    FilePathParameter,
    ParameterSet
} from './Parameters';


class EnvMap extends BaseImage {
    constructor(name, resourcePath='', params = {}) {
        if(resourcePath.constructor == Object){
            params = resourcePath;
        }
        if(resourceLoader.resourceAvailable(name)) {
            resourcePath = name;
            name = undefined;
        }
        super(name, params);
        
        this.__loaded = false;
        this.__hdrexposure = 1.0;
        this.__sampleExposure = 1.0;
        this.__hdrtint = new Color(1, 1, 1, 1);
        this.__stream = 'stream' in params ? params['stream'] : false;

        const fileParam = this.addParameter(new FilePathParameter('FilePath'));
        fileParam.valueChanged.connect(()=>{
            this.loaded.untoggle();

            if (this.getName() == this.constructor.name) {
                // Generate a name from the file path.
                const stem = fileParam.getStem();
                const decorator = stem.substring(stem.length - 1);
                if (!isNaN(decorator)) {
                    // Note: ALL image names have an LOD specifier at the end.
                    // remove that off when retrieving the name.
                    this.setName(stem.substring(0, stem.length - 1));
                } else {
                    this.setName(stem);
                }
            }

            const filePath = fileParam.getValue()
            const url = fileParam.getURL();
            this.__loadURL(url, filePath);
        });
        if (resourcePath && resourcePath != '')
            fileParam.setValue(resourcePath);
    }

    getDOMElement(){
        return this.__domElement;
    }

    getResourcePath() {
        return this.getParameter('FilePath').getValue();
    }

    __loadURL(url, path) {
        const ext = this.getParameter('FilePath').getExt();
        if (ext == '.vlenv') {
            this.__loadVLENV(url, path);
        } else{
            throw(" EnvMaps can only load .vlenv files.")
        }
    }

    __loadVLENV(url, resourcePath) {
        this.type = 'FLOAT';

        resourceLoader.loadResource(resourcePath, (entries) => {
            const ldr = entries.ldr;
            const cdm = entries.cdm;
            const samples = entries.samples;

            if(window.TextDecoder)
                this.__sampleSets = JSON.parse((new TextDecoder("utf-8")).decode(samples));
            else
                this.__sampleSets = JSON.parse(decodeText(samples));
                
            
            /////////////////////////////////
            // Parse the data.
            const blob = new Blob([ldr.buffer]);
            const ldrPic = new Image();
            ldrPic.onload = () => {
                this.width = ldrPic.width;
                this.height = ldrPic.height;
                // console.log(resourcePath + ": [" + this.width + ", " + this.height + "]");
                this.__data = {
                    ldr: ldrPic,
                    cdm: cdm
                }
                if (!this.__loaded) {
                    this.__loaded = true;
                    this.loaded.emit();
                } else {
                    this.updated.emit();
                }
            }
            ldrPic.src = URL.createObjectURL(blob);

        });
    }


    isStream() {
        return false;
    }

    isLoaded() {
        return this.__loaded;
    }

    getParams() {
        const params = super.getParams();
        if (this.__loaded) {
            params['data'] = this.__data;
        }
        return params;
    }

    setSamplesExposure(sampleExposure) {
        this.__sampleExposure = sampleExposure;
    }
    getSamplesExposure() {
        return this.__sampleExposure;
    }

    setHDRExposure(hdrexposure) {
        this.__hdrexposure = hdrexposure;
    }
    getHDRExposure() {
        return this.__hdrexposure;
    }

    setHDRTint(hdrtint) {
        this.__hdrtint = hdrtint;
    }
    getHDRTint() {
        return this.__hdrtint;
    }
    
    getSampleSets() {
        return this.__sampleSets;
    }
    
    //////////////////////////////////////////
    // Persistence

    fromJSON(json) {

    }

    toJSON(json) {

    }

    readBinary(reader, context) {
        // super.readBinary(reader, context);
        this.setName(reader.loadStr());
        const resourcePath = reader.loadStr();
        if (typeof resourcePath === 'string' && resourcePath != "") {
            if (context.lod >= 0) {
                const suffixSt = resourcePath.lastIndexOf('.')
                if (suffixSt != -1) {
                    const lodPath = resourcePath.substring(0, suffixSt) + context.lod + resourcePath.substring(suffixSt);
                    if (resourceLoader.resourceAvailable(lodPath)) {
                        resourcePath = lodPath;
                    }
                }
            }
            this.getParameter('FilePath').setValue(resourcePath);

        }
    }
};

sgFactory.registerClass('EnvMap', EnvMap);


export {
    EnvMap
};