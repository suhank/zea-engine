import {
    isMobileDevice,
    Signal
} from '../Math';
import {
    AssetItem
} from './AssetItem.js';

import {
    loadTextfile,
    loadBinfile
} from './Utils.js';

import {
    BinReader
} from './BinReader.js';


class BinAsset extends AssetItem {
    constructor(name = undefined) {
        super(name);
        this.loaded = new Signal();
    }

    //////////////////////////////////////////
    // Persistence

    fromJSON(j, flags = 0) {
        // We want to explicitly control the transform of the asset tree, 
        // so here we cache and then reset the value, because fromJSON will
        // load values into it. 
        let localXfo = this.localXfo.clone();
        super.fromJSON(j, flags);
        this.localXfo = localXfo;
    }

    loadURL(fileUrl) {

        loadBinfile(
            fileUrl,
            (path, data) => {
                let start = performance.now();

                /////////////////////////////////
                // Un-pack the data.
                let unpack = new Unpack(data);
                let entries = unpack.getEntries();
                let assetTreeEntry = (entries[0].name.endsWith('.tree') ? entries[0] : (entries[1].name.endsWith('.tree') ? entries[1] : undefined));
                let geomDataEntry = (entries[0].name.endsWith('.geoms') ? entries[0] : (entries[1].name.endsWith('.geoms') ? entries[1] : undefined));
                if (!assetTreeEntry || !geomDataEntry)
                    throw ("Invalid Asset resource");
                let assetTreeData = unpack.decompress(assetTreeEntry.name);
                let geomData = unpack.decompress(geomDataEntry.name);
                if (!assetTreeData || !geomData)
                    throw ("Invalid Asset resource");
                unpack.close();

                let unpacked = performance.now();

                /////////////////////////////////
                // Parse the data.
                this.__geoms.readBinary(new BinReader(geomData.buffer, 0, isMobileDevice()));
                // let assetTreeStr;
                // // Note: TextDecoder is not supported on Edge yet. 
                // // TextDecoder is a lot faster if available...
                // if(window.TextDecoder)
                //     assetTreeStr = new TextDecoder("utf-8").decode(assetTree);
                // else{
                //     let textDecoder = (utf8Buffer)=>{
                //         let str = "";
                //         for(let i=0; i<utf8Buffer.length; i++)
                //             str = str + String.fromCharCode(utf8Buffer[i]);
                //         return str;
                //     }
                //     assetTreeStr = textDecoder(assetTree);
                // }
                // this.fromJSON(JSON.parse(assetTreeStr));
                this.readBinary(new BinReader(assetTreeData.buffer, 0, isMobileDevice()));

                console.log(path+ " Unpack:" + (unpacked - start).toFixed(2) + " Parse:" + (performance.now() - unpacked).toFixed(2));

                this.loaded.emit();
            },
            () => {

            },
            this);
    }

    loadURLs(fileUrl) {

        let jsonFileData, binFileData;
        let loadCount = 2;

        let fileLoaded = ()=>{
            loadCount--;
            if(loadCount>0)
                return;

            let start = performance.now();

            /////////////////////////////////
            // Parse the data.
            this.__geoms.readBinary(new BinReader(binFileData));
            this.fromJSON(JSON.parse(jsonFileData));

            console.log("Parse:" + (performance.now() - start).toFixed(2));

            this.loaded.emit();
        };

        loadTextfile(
            fileUrl+'.json',
            (path, data) => {
                jsonFileData = data;
                fileLoaded();
            },
            () => {

            },
            this);

        loadBinfile(
            fileUrl+'.bin',
            (path, data) => {
                binFileData = data;
                fileLoaded();
            },
            () => {

            },
            this);
    }
};

export {
    BinAsset
};