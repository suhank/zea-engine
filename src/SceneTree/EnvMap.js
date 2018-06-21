import {
    Color
} from '../Math';
import {
    Signal
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
    constructor(resourcePath, params = {}) {
        super(params);
        
        this.__loaded = false;
        this.__hdrexposure = 1.0;
        this.__sampleExposure = 1.0;
        this.__hdrtint = new Color(1, 1, 1, 1);
        this.__stream = 'stream' in params ? params['stream'] : false;

        const fileParam = this.addParameter(new FilePathParameter('FilePath'));
        fileParam.valueChanged.connect(()=>{
            this.loaded.untoggle();
            const filePath = fileParam.getValue()
            const url = fileParam.getURL();
            this.__loadURL(url, filePath);
        });
        if (resourcePath && resourcePath != '')
            fileParam.setValue(resourcePath);
    }

    getName() {
        const getName = (str) => {
            const p = str.split('/');
            const last = p[p.length - 1];
            const suffixSt = last.lastIndexOf('.');
            if (suffixSt != -1) {
                const decorator = last.substring(suffixSt - 1, suffixSt);
                if (!isNaN(decorator)) {
                    // Note: ALL image names have an LOD specifier at the end.
                    // remove that off when retrieving the name.
                    return last.substring(0, suffixSt - 1);
                } else {
                    return last.substring(0, suffixSt);
                }
            }
        }
        return getName(this.getParameter('FilePath').getValue());
    }

    getDOMElement(){
        return this.__domElement;
    }

    getResourcePath() {
        return this.getParameter('FilePath').getValue();
    }

    __loadURL(url, path) {
        const getExt = (str) => {
            const p = str.split('/');
            const last = p[p.length - 1];
            const suffixSt = last.lastIndexOf('.')
            if (suffixSt != -1)
                return last.substring(suffixSt).toLowerCase()
        }
        const ext = getExt(path);
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

            this.__sampleSets = JSON.parse((new TextDecoder("utf-8")).decode(samples));
            
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