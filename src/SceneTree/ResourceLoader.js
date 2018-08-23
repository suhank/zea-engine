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
        this.__resources = {};
        this.__resourcesTree = { children: {} };

        if(asyncLoading){
            this.__workers = [];
            this.__constructWorkers();
            this.__nextWorker = 0;
        }
    }

    registerResourceCallback(filter, fn) {
        this.__resourceRegisterCallbacks[filter] = fn;
    }

    __applyCallbacks(resourcesDict, filename=undefined) {
        const applyCallbacks = (resource, filename)=>{
            for(let filter in this.__resourceRegisterCallbacks){
                if(resource.name.includes(filter))
                    this.__resourceRegisterCallbacks[filter](resource);
            }
        }
        for(let key in resourcesDict){
            const resource = resourcesDict[key];
            if(resource.url)
                applyCallbacks(resource)
        }
    }

    __buildTree(resources){ 
        const fileSystemEntities = {};

        const buildEntity = (resourceId)=>{
            const resource = Object.assign(resources[resourceId]);
            if (resource.type === 'folder') {
              resource.children = {};
            }
            let parent;
            if(resource.parent) {
                if(!fileSystemEntities[resource.parent]) {
                    buildEntity(resource.parent)
                }
                parent = fileSystemEntities[resource.parent];
            }
            else {
                parent = this.__resourcesTree;
            }
            parent.children[resource.name] = resource;
            fileSystemEntities[resourceId] = resource;
        }

        for(let key in resources){
            buildEntity(key);
        }
    }

    setResources(resources){
        this.__resources = Object.assign(this.__resources, resources);
        this.__buildTree(resources);
        this.__applyCallbacks(resources);
    }

    addResourceURL(resourcePath, url) {

        const parts = resourcePath.split('/');
        const filename = parts.pop();
        if(!url) {

            let rootURL = window.location.href.split('#')[0];
            rootURL = rootURL.split('?')[0];
            if(rootURL.endsWith('.html') || rootURL.endsWith('.html')){
                rootURL = rootURL.substring(0, rootURL.lastIndexOf('/')) + '/';
            }
            const base = rootURL;
            if(parts[0] == '.')
                parts.shift();
            else if(parts[0] == '..'){
                item = item.substring(3);
                const baseparts = base.split('/');
                baseparts.pop();
                baseparts.pop();
                base = baseparts.join('/') + '/';
            }
            url = base+resourcePath
        }
        const resource = { url };
        this.__resources[resourceId] = resource;
        this.__applyCallbacks(resource, filename);
    }



    freeData(buffer){
        // Note: Explicitly transfer data to a web worker and then 
        // terminate the worker. (hacky way to free TypedArray memory explicitly)
        // let worker = new FreeMemWorker();
        // worker.postMessage(buffer, [buffer]);
        // worker.terminate();
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
    
    getFilePath(resourceId) {
        let curr = this.__resources[resourceId];
        const path = [curr.name];
        while(curr.parent){
            curr = this.__resources[curr.parent];
            path.splice(0, 0, curr.name);
        }
        return path.join('/');
    }

    
    resourceAvailable(resourceId) {
        return resourceId in this.__resources;
    }

    getFile(resourceId) {
        return this.__resources[resourceId];
    }

    resolveFilePathToId(filePath) {
        const file = this.resolveFile(filePath);
        if(file)
            return file.id;
    }

    resolveFile(filePath) {
        if(!this.__resourcesTree)
            throw("Resources dict not provided");
        const parts = filePath.split('/');
        if(parts[0] == '.' || parts[0] == '')
            parts.shift();
        let curr = this.__resourcesTree;
        for(let part of parts){
            if(part in curr.children)
                curr = curr.children[part];
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

    loadResource(resourcePath, callback, addLoadWork=true) {

        const file = this.resolveFile(resourcePath);
        if(!file){
            throw("Invalid resource Path:'"+ resourcePath + "' not found in Resources:" + JSON.stringify(this.__resources, null, 2));
        }

        this.loadURL(resourcePath, file.url, callback, addLoadWork)
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