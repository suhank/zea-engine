import {
    Async,
    Signal
} from '../Math';
import {
    FileImage2D
} from './FileImage2D.js';


///////////////////////////////////
// ImageLibrary
class ImageLibrary {
    constructor(resourceName, resourceLoader) {
        this.__resourceLoader = resourceLoader;
        this.__images = {};
        this.__async = new Async();
        this.loaded = new Signal();
        if (resourceName)
            this.loadURL(resourceName);
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

    loadURL(resourceName) {
        this.__resourceLoader.loadResources(resourceName,
            (entries) => {
                for (let name in entries) {
                    if (name.endsWith('.png') || name.endsWith('.jpg')) {
                        let data = entries[name];
                        let url = URL.createObjectURL(new Blob([data.buffer]));
                        let image = new FileImage2D(name, url);
                        this.__async.incAsyncCount();
                        image.loaded.connect(this.__async.decAsyncCount, this.__async);
                        this.__images[name] = image;
                    }
                }
                let images = this.__images;
                this.__async.ready.connect(() => {
                    this.loaded.emit(images);
                });

            });
    }

}
export {
    ImageLibrary
};
// ImageLibrary;