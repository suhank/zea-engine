import Signal from '../Math/Signal';
import { JSON_stringify_fixedPrecision } from '../Math';
import TreeItem from './TreeItem.js';
import GeomItem from './GeomItem.js';
import SelectionManager from './SelectionManager.js';

import Mesh from './Geometry/Mesh.js';
import computeNormalsMessage from './Geometry/ComputeNormalsWorker.js';

class Scene {
    constructor() {

        this.cameras = [];
        this.__root = new TreeItem("root");
        this.__envMap = undefined;
        this.__lightmaps = {};
        this.__selectionManager = new SelectionManager();

        this.childAdded = new Signal();
        this.childRemoved = new Signal();

        let _this = this;
        let propagateChildAdded = function(child) {
            _this.childAdded.emit(child);
        };
        this.__root.childAdded.connect(propagateChildAdded);

        let propagateChildRemoved = function(child) {
            _this.childRemoved.emit(child);
        };
        this.__root.childRemoved.connect(propagateChildRemoved);

    }

    getRoot() {
        return this.__root;
    }

    getEnvMap() {
        return this.__envMap;
    }

    setEnvMap(envMap) {
        this.__envMap = envMap;
    }

    getLightMap(name) {
        return this.__lightmaps[name];
    }

    setLightMap(name, lightmap) {
        this.__lightmaps[name] = lightmap;
    }

    getLightMaps() {
        return this.__lightmaps;
    }

    getCamera(index = 0) {
        return this.cameras[index];
    }

    getSelectionManager() {
        return this.__selectionManager;
    }

    launchThreadPool(){

        var blob = new Blob([computeNormalsMessage]);
        var blobURL = window.URL.createObjectURL(blob);
        
        // Using https://eligrey.com/blog/cpu-core-estimation-with-javascript/
        this.__computeNormalsWorkers = [];
        for(let i=0; i<navigator.hardwareConcurrency-1; i++){
            let worker = new Worker(blobURL);
            worker.id = i;
            worker.postMessage({'msg':'init', 'threadId': i });
            this.__computeNormalsWorkers.push(worker);
        }

    }
    
    computeNormals() {
        let sceneRoot = this.__root;
        let computeNormalsWorkers = this.__computeNormalsWorkers;
        return new Promise(
            // The resolver function is called with the ability to resolve or
            // reject the promise
            function(resolve, reject) {

                let meshes = [];
                let collectMeshes = function(treeItem) {
                    for (let childItem of treeItem.getChildren())
                        collectMeshes(childItem);
                    if (treeItem instanceof GeomItem) {
                        if (treeItem.geom instanceof Mesh && meshes.indexOf(treeItem.geom) == -1 )
                            meshes.push(treeItem.geom);
                    }
                }
                collectMeshes(sceneRoot);


                let asyncCount = computeNormalsWorkers.length;
                let start = performance.now();
                let async = true;
                if(!async){
                    for(let i=0; i<meshes.length; i++){
                        meshes[i].computeVertexNormals();
                    };
                    console.log("computeNormals:" + (performance.now() - start).toFixed(1));
                    resolve();
                    return;
                }

                let computeNormalsDone = function(){
                    asyncCount--;
                    if(asyncCount == 0){
                        console.log("computeNormals:" + (performance.now() - start).toFixed(1));
                        resolve();
                    }
                }
                let remaining = meshes.length;
                let computeNormals = function(index, worker){
                    let mesh = meshes[index];
                    if(mesh.faceCount == 0){
                        remaining--;
                        computeNormals(remaining, worker);
                    }
                    let startMesh = performance.now();
                    worker.onmessage = function(e) {
                        let meshData = e.data.meshData;
                        mesh.fromJSON(meshData);
                        // console.log(index + " round Trip time:" + (performance.now() - startMesh).toFixed(1) + " faceCount:" + mesh.getNumFaces() + " computeTime:" + e.data.computeTime.toFixed(1));
                        if(remaining > 0){
                            remaining--;
                            computeNormals(remaining, worker);
                        }
                        else{
                            // worker.postMessage({'msg':'logTime'} );
                            computeNormalsDone();
                        }
                    };
                    let meshData = mesh.getTransferableData( {'attrList':['positions']});
                    worker.postMessage({ 'msg':'compute', 'meshData': meshData[0] }, meshData[1]);
                }

                for(let i=0; i<computeNormalsWorkers.length; i++){
                    remaining--;
                    computeNormals(remaining, computeNormalsWorkers[i]);
                };
            }
        );

    }

    fromJSON(json) {

    }

    toJSON(json) {
        return {
            "root": this.__root.toJSON(),
            "boundingBox": this.boundingBox.toJSON(),
        }
    }

    toString() {
        return JSON_stringify_fixedPrecision(this.toJSON(), 2)
    }
};

export default Scene;