import {
    TreeItem,
    GeomItem,
    GeomLibrary,
    MaterialLibrary,
    sgFactory,
    LOADFLAGS_SKIP_CHILDREN,
    LOADFLAGS_SKIP_MATERIALS,
    LOADFLAGS_SKIP_GEOMETRIES,
    LOADFLAGS_ASSETTREE_UPDATE
} from './SceneTree';


class Project {
    constructor(name) {
        this.__name = name;
        this.__scene = new Scene();
        this.__renderer = new Visualive.GLSimpleRenderer(addCanvas(350, 256, true));
        // let renderer = new Visualive.GLVisualiveRenderer(addCanvas(1600, 900, true));
        this.__renderer.setScene(this.__scene);
        this.__materialLibraries = {};
    }

    loadDependencies(){

    }

    loadAsset(j, binData) {

        let deletedNodes = [];
        let materialMappings = {};

        let flags = LOADFLAGS_SKIP_CHILDREN | LOADFLAGS_SKIP_MATERIALS | LOADFLAGS_SKIP_GEOMETRIES;

        let loadTreeItem(j) = () => {
            let treeItem = sgFactory.constructClass(j.type);
            treeItem.fromJSON(j, flags);

            if ('materialName' in json) {

                if (json.materialName in materialMappings) {
                    treeItem.material = materialMappings[json.materialName];
                } else {
                    treeItem.material = materialLibrary.getMaterial(json.materialName);
                    if (!treeItem.material) {
                        console.warn("Geom :'" + treeItem.name + "' Material not found:" + json['materialName']);
                        treeItem.material = materialLibrary.getMaterial('DefaultMaterial');
                    }
                }
            }

            if ('geomIndex' in json) {
                this.geom = geomLibrary.getGeom(json.geomIndex);
            }

            if ('children' in j) {
                loadChildren(treeItem, j.children);
            }
        }

        let loadChildren(treeItem, childrenJson) = () => {
            for (let childJson of childrenJson) {
                if(childJson.name in this.__deletedNodes){
                    return continue;
                }
                let childItem = loadTreeItem(treeItem, childJson);
                treeItem.addChild(childItem);
            }
        }

        let asset = new BinAsset();
        asset.getGeometryLibary().loadBin(new BinReader(binData));

        loadChildren(asset, j.children);
    }

    //////////////////////////////////////////
    // Persistence

    fromJSON(j, flags = 0) {}


    loadURL(fileUrl){

        loadTextfile(fileUrl,
            (path, data) => {
                // Load all depenencies, but don't parse thier data till all HXRs have returned 

                let j = JSON.parse(data);

                if(j.materialLibraries != undefined){
                    for(let libPath in j.materialLibraries){
                        let materialLibrary = new MaterialLibrary();
                        materialLibrary.fromJSON(JSON.parse(data));
                        this.__materialLibraries[libPath] = materialLibrary;
                    }
                }
            },
            (path, data) => {

            },
            this);


        loadBinfile(
            fileUrl, 
            (path, data)=>{
                let start = performance.now();

                /////////////////////////////////
                // Unpack the data.
                let unpack = new Unpack(data);
                let entries = unpack.getEntries();
                let assetTreeEntry = (entries[0].name.endsWith('.json') ? entries[0] : (entries[1].name.endsWith('.json') ? entries[1] : undefined));
                let geomDataEntry = (entries[0].name.endsWith('.bin') ? entries[0] : (entries[1].name.endsWith('.bin') ? entries[1] : undefined));
                if(!assetTreeEntry || !geomDataEntry)
                    throw("Invalid Asset resource");
                let assetTree = unpack.decompress(assetTreeEntry.name);
                let geomData = unpack.decompress(geomDataEntry.name);
                if(!assetTree || !geomData)
                    throw("Invalid Asset resource");
                unpack.close();

                let unpacked = performance.now();

                /////////////////////////////////
                // Parse the data.
                this.loadAsset(JSON.parse(new TextDecoder("utf-8").decode(assetTree)), geomData.buffer);

                console.log("Unpack:"+(unpacked - start).toFixed(2) + " Parse:"+(performance.now() - unpacked).toFixed(2));

                this.loaded.emit();
            },
            ()=>{

            },
            this
            );
    }
};

export {
    Project
};