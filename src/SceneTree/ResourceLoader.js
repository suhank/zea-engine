import {
    SystemDesc
} from '../BrowserDetection.js';
import {
    Async,
    Signal
} from '../Utilities';


const asyncLoading = true;
const ResourceLoaderWorker = require("worker-loader?inline!./ResourceLoaderWorker.js");
// For synchronous loading, uncomment these lines.
// import {
//     ResourceLoaderWorker_onmessage
// } from './ResourceLoaderWorker.js';

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

class ResourceLoader {
    constructor() {
        this.loaded = new Signal();
        this.progressIncremented = new Signal();
        this.allResourcesLoaded = new Signal();

        this.__totalWork = 0;
        this.__totalWorkByCategory = {};
        this.__doneWork = 0;
        this.__doneWorkByCategory = {};
        this.__resourceRegisterCallbacks = {};
        this.__callbacks = {};
        // this.__workCategories = {};
        this.__resources = {};

        if(asyncLoading){
            this.__workers = [];
            this.__constructWorkers();
            this.__nextWorker = 0;
        }
    }

    registerResourceCallback(filter, fn) {
        this.__resourceRegisterCallbacks[filter] = fn;
    }


    __applyCallbacks(rootItem, filename=undefined) {
        const applyCallbacks = (item, filename)=>{
            for(let filter in this.__resourceRegisterCallbacks){
                if(filename.includes(filter))
                    this.__resourceRegisterCallbacks[filter](filename, item)
            }
        }
        const traverse = (item, filename)=>{
            if(item.url) {
                applyCallbacks(item, filename)
            }
            else {
                for(let key in item){
                    traverse(item[key], key)
                }
            }
        }
        if(filename)
            applyCallbacks(rootItem, filename)
        else{
            for(let key in rootItem){
                traverse(rootItem[key], key)
            }
        }
    }

    setResources(resources){
        if(this.__resources){
            this.__resources = mergeDeep(this.__resources, resources);
        }
        else {
            this.__resources = resources
        }
        this.__applyCallbacks(resources);
    }

    freeData(buffer){
        // Note: Explicitly transfer data to a web worker and then 
        // terminate the worker. (hacky way to free TypedArray memory explicitly)
        // let worker = new FreeMemWorker();
        // worker.postMessage(buffer, [buffer]);
        // worker.terminate();
    }

    addResourceURL(resourcePath, url) {

        const parts = resourcePath.split('/');
        const filename = parts.pop();
        if(parts[0] == '.')
            parts.shift();
        let curr = this.__resources;
        for(let part of parts){
            if(part in curr)
                curr = curr[part];
            else{
                let dir = {};
                curr[part] = dir;
                curr = dir;
            }
        }
        curr[filename] = { url };
        this.__applyCallbacks(curr[filename], filename);
    }

    __constructWorkers() {
        let __constructWorker = ()=>{
            let worker = new ResourceLoaderWorker();
            worker.onmessage = (event) => {
                if(event.data.type == 'loaded') {
                    this.addWorkDone(event.data.name, 1); // loading done...
                }
                else if(event.data.type == 'finished') {
                    this.__onFinishedReceiveFileData(event.data);
                }
            };
            return worker;
        }
        for(let i=0; i<3; i++){
            this.__workers.push(__constructWorker());
        }
    }

    __terminateWorkers() {
        for (let worker of this.__workers)
            worker.terminate();
        this.__workers = [];
    }

    resolveFile(filePath) {
        if(!this.__resources)
            throw("Resources dict not provided");
        const parts = filePath.split('/');
        if(parts[0] == '.' || parts[0] == '')
            parts.shift();
        let curr = this.__resources;
        for(let part of parts){
            if(part in curr)
                curr = curr[part];
            else{
                // console.warn("Unable to resolve URL:" + filePath);
                return null;
            }
        }
        return curr;
    }
    
    resolveURL(filePath) {
        const file = this.resolveFile(filePath)
        if(file)
            return file.url;
    }
    
    resourceAvailable(filePath) {
        return this.resolveFile(filePath) != null;
    }

    // Add work to the total work pile... We never know how big the pile will get.
    addWork(name, amount){
        this.__totalWork += amount;
        this.progressIncremented.emit((this.__doneWork / this.__totalWork) * 100);
    }

    //Add work to the 'done' pile. The done pile should eventually match the total pile.
    addWorkDone(name, amount){
        this.__doneWork += amount;
        this.progressIncremented.emit((this.__doneWork / this.__totalWork) * 100);
        if(this.__doneWork > this.__totalWork) {
            throw("Mismatch between work loaded and work done.")
        }
        if(this.__doneWork == this.__totalWork) {
            this.allResourcesLoaded.emit();
        }
    }

    loadResource(name, callback, addLoadWork=true) {

        const file = this.resolveFile(name);
        if(!file){
            throw("Invalid name:'"+ name + "' not found in Resources:" + JSON.stringify(this.__resources, null, 2));
        }

        this.loadURL(name, file.url, callback, addLoadWork)
    }

    loadURL(name, url, callback, addLoadWork=true) {

        // If the loader was suspended, resume. 
        if(asyncLoading) {
            if(this.__workers.length == 0){
                this.__constructWorkers();
            }
        }

        if(addLoadWork){ 
            this.addWork(name, 3);// Add work in 2 chunks. Loading, unpacking, parsing.
        }
        else{
            // the work for loading and parsing the work is already registered..
            // See BinAsset. It knows that it will load a sequwnce of files
            // and has already registered this work once is determined the 
            // toal number of files in the stream.
        }

        if(!(name in this.__callbacks))
            this.__callbacks[name] = [];
        this.__callbacks[name].push(callback);

        ///////////////////////////////////////////////
        if(asyncLoading) {
            this.__workers[this.__nextWorker].postMessage({
                name,
                url
            });
            this.__nextWorker = (this.__nextWorker+1)%this.__workers.length;
        }
        else {
            ///////////////////////////////////////////////
            ResourceLoaderWorker_onmessage({
                name,
                url
            },()=>{
                this.addWorkDone(name, 1); // loading done...
            }, (result, transferables)=>{
                if(result.type == 'finished')
                    this.__onFinishedReceiveFileData(result);
            });
        }
    }

    __onFinishedReceiveFileData(fileData) {
        const name = fileData.name;
        this.addWorkDone(name, 1); // unpacking done...
        const callbacks = this.__callbacks[name];
        if(callbacks) {
            for(let callback of callbacks){
                callback(fileData.entries);
            }
            delete this.__callbacks[name];
        }
        this.loaded.emit(name);
        this.addWorkDone(name, 1); // parsing done...

    }

    suspend() { 
        this.__terminateWorkers();
    }

};

const resourceLoader = new ResourceLoader();
export {
    resourceLoader
};