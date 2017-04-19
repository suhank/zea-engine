import {
    Async,
    Signal
} from '../Math';

import {
    FileImage2D
} from './FileImage2D.js';

import {
    loadTextfile,
    loadBinfile
} from './Utils.js';

///////////////////////////////////
// ImageLibrary
class ImageLibrary {
    constructor(url) {
        this.__images = {};
        this.__async = new Async();
        this.loaded = new Signal();
        if(url)
            this.loadURL(url);
    }

    hasImage(name) {
        return name in this.__images;
    }

    getImage(name) {
        return this.__images[name];
    }

    getImageNames() {
        let names = [];
        for (let name in this.__images)
            names.push(name);
        return names;
    }

    loadURL(fileUrl) {
        let onLoad = this.__loadVLA.bind(this);
        loadBinfile(
            fileUrl,
            (fileUrl, data) => {
                onLoad(data);
            },
            function(statusText) {
                console.warn(statusText);
            },
            this
        );
    }

    __loadVLA(data) {
        let unpack = new Unpack(data);
        let entries = unpack.getEntries();

        for (let entry of entries) {
            if (entry.name.endsWith('.png') || entry.name.endsWith('.jpg')) {
                let data = unpack.decompress(entry.name);
                let url = URL.createObjectURL(new Blob([data.buffer]));
                let image = new FileImage2D(entry.name, url);
                this.__async.incAsyncCount();
                image.loaded.connect(this.__async.decAsyncCount, this.__async);
                this.__images[entry.name] = image;
            }
        }
        let images = this.__images;
        this.__async.ready.connect(()=>{
            this.loaded.emit(images);
        });
    }

}

export {
    ImageLibrary
};