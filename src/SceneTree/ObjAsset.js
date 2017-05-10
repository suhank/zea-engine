import { Vec2 } from '../Math/Vec2';
import { Vec3 } from '../Math/Vec3';
import { Signal } from '../Math/Signal';
import { GeomItem } from './GeomItem';
import { AssetItem } from './AssetItem';
import { Mesh } from './Geometry/Mesh.js';
import { loadTextfile, getFileFolder } from './Utils.js';
import { StandardMaterial } from './Shaders/StandardMaterial.js';


class ObjAsset extends AssetItem {
    constructor(name) {
        super(name);

        this.splitObjects = false;
        this.splitGroupsIntoObjects = false;
        this.loadMtlFile = true;
        this.unitsConversion = 1.0;
        this.__materials = {};

        this.__loadCounter = 0;
        this.loaded = new Signal();
    }

    set defaultMaterial(defaultMaterial) {
        this.__defaultMaterial = defaultMaterial;
    }

    get defaultMaterial() {
        return this.__defaultMaterial;
    }

    __incrementLoadCounter() {
        this.__loadCounter++;
    }

    __decrementLoadCounter() {
        this.__loadCounter--;
        if (this.__loadCounter == 0)
            this.buildChildItems();
    }

    loadURL(url) {
        this.__incrementLoadCounter();
        loadTextfile(url, this.parseObjData, undefined, this);
    }

    // loadFile(filePath) {
    //     this.__incrementLoadCounter();
    //     let fs = require('fs');
    //     fs.readFile(filePath, 'utf8', (err, contents) => {
    //         this.parseObjData(filePath, contents);
    //     });
    // }


    parseMtlData(filePath, fileData) {
        let lines = fileData.split('\n');
        let WHITESPACE_RE = /\s+/;
        let material;

        let parseColor = function(elements) {
            if (elements.length == 3)
                return new Color(parseFloat(elements[0]), parseFloat(elements[1]), parseFloat(elements[2]));
            else
                throw ("Unable to parse a color from the following parts:" + elements.join('_'));
        }

        let parseMap = function(elements) {
            let fileFolder = getFileFolder(filePath);
            return new FileImage2D(elements[0], fileFolder + elements[0]);
        }

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();
            if (line.startsWith('#'))
                continue;
            if (line.indexOf('#') != -1)
                line = line.substring(0, line.indexOf('#')).trim();
            let elements = line.split(WHITESPACE_RE);
            let key = elements.shift();
            switch (key) {
                case 'newmtl':
                    material = new StandardMaterial(elements[0]);
                    this.__materials[elements[0]] = material;
                    break;
                case 'Kd':
                    material.baseColor = parseColor(elements);
                    break;
                case 'map_Kd':
                    material.baseColor = parseMap(elements);
                    break;
                case 'Ks':
                    let specular = (parseFloat(elements[0]) + parseFloat(elements[1]) + parseFloat(elements[2])) / 3.0;
                    material.roughness = 1.0 - specular;
                    material.reflectance = specular;
                    break;
                case 'map_Ks':
                    material.roughness = parseMap(elements /*flags=TEXTURE_INVERT*/ );
                    material.reflectance = 0.2;
                    break;
                case 'd':
                    material.alpha = parseFloat(elements[0]);
                    break;
                case 'map_d':
                    material.alpha = parseMap(elements);
                    break;
                case 'map_bump':
                    material.normal = parseMap(elements /*flags=BUMP_TO_NORMAL*/ );
                    break;
                default:
                    // console.warn("Unhandled material parameter: '" + key +"' in:" + filePath);
            }
        }
        this.__decrementLoadCounter();
    }

    parseObjData(filePath, fileData) {

        //performance.mark("parseObjData");

        // array of lines separated by the newline
        let lines = fileData.split('\n');
        let WHITESPACE_RE = /\s+/;

        this.vertices = new Array();
        this.normals = new Array();
        this.textureCoords = new Array();

        let _this = this;
        this.geomDatas = {};
        let currGeom = undefined;
        let newGeom = function(name) {
            let suffix = 0;
            while (name in _this.geomDatas) {
                suffix++;
                name = name + String(suffix);
            }
            currGeom = {
                "verticesRemapping": {},
                "texCoordsRemapping": {},
                "normalsRemapping": {},
                "vertexIndices": [],
                "texCoordIndices": [],
                "normalIndices": [],
                "numVertices": 0,
                "numTexCoords": 0,
                "numNormals": 0,
                "numTris": 0,
                "numQuads": 0,
                "material": undefined
            };
            _this.geomDatas[name] = currGeom;
        };
        newGeom(this.name);

        let stop = false;
        // let numPolys = 0;
        for (let i = 0; i < lines.length && !stop; i++) {
            let line = lines[i].trim();
            if (line.startsWith('#'))
                continue;
            if (line.indexOf('#') != -1)
                line = line.substring(0, line.indexOf('#')).trim();
            let elements = line.split(WHITESPACE_RE);
            let key = elements.shift();
            switch (key) {
                case '':
                case 's':
                    // ignore shading groups
                    continue;
                case 'mtllib':
                    if (!this.loadMtlFile)
                        continue;
                    // Load and parse the mat lib.
                    this.__incrementLoadCounter();
                    let fileFolder = getFileFolder(filePath);
                    loadTextfile(
                        fileFolder + elements[0],
                        this.parseMtlData,
                        undefined,
                        this
                    );
                    break;
                case 'o':
                    if (this.splitObjects)
                        newGeom(elements[0]);
                    break;
                case 'usemtl':
                    currGeom.setMaterial(elements[0]);
                    break;
                case 'g':
                    if (this.splitGroupsIntoObjects)
                        newGeom(elements.join('_'));
                    break;
                case 'v':
                    this.vertices.push(elements.map(i => parseFloat(i)));
                    break;
                case 'vt':
                    this.textureCoords.push(elements.map(i => parseFloat(i)));
                    break;
                case 'vn':
                    this.normals.push(elements.map(i => parseFloat(i)));
                    break;
                case 'f':
                    {
                        let v_poly = [];
                        let vt_poly = [];
                        let vn_poly = [];
                        for (let j = 0, eleLen = elements.length; j < eleLen; j++) {
                            // v/vt/vn
                            let indices = elements[j].split('/').map(i => parseInt(i) - 1);
                            let v = indices[0];

                            // v_poly.push(v);
                            let v_index = currGeom.verticesRemapping[v];
                            if (v_index == undefined) {
                                v_index = currGeom.numVertices;
                                currGeom.verticesRemapping[v] = v_index;
                                currGeom.numVertices++;
                            }
                            v_poly.push(v_index);

                            if (indices.length > 1 && !isNaN(indices[1])) {
                                let vt = indices[1];
                                vt_poly.push(vt);
                            }
                            if (indices.length > 2 && !isNaN(indices[2])) {
                                let vn = indices[2];
                                vn_poly.push(vn);
                            }
                        }
                        currGeom.vertexIndices.push(v_poly);
                        if (vn_poly.length > 0)
                            currGeom.normalIndices.push(vn_poly);
                        if (vt_poly.length > 0)
                            currGeom.texCoordIndices.push(vt_poly);

                        if (v_poly.length == 3) {
                            currGeom.numTris++;
                        } else {
                            currGeom.numQuads++;
                        }
                        // numPolys++;
                        // if(numPolys == 16000)
                        //     stop = true;
                        break;
                    }
                default:
                    {
                        console.warn("Unhandled line:" + line);
                    }
            }
        }

        
        this.__decrementLoadCounter();
    }

    buildChildItems() {
        //performance.mark("parseObjDataDone");
        //performance.mark("buildObjTree");
        for (let geomName in this.geomDatas) {
            if (this.geomDatas[geomName].numVertices == 0)
                continue;
            this.buildChildItem(geomName, this.geomDatas[geomName]);
        }
        this.loaded.emit();
        //performance.mark("buildObjTreeDone");
    }

    buildChildItem(geomName, geomData) {

        let numVertices = geomData.numVertices;
        let numTris = geomData.numTris;
        let mesh = new Mesh(geomName);
        mesh.setFaceCounts([geomData.numTris, geomData.numQuads]);
        mesh.setNumVertices(numVertices);
        let positionsAttr = mesh.getVertexAttribute('positions');

        for (let vsrc in geomData.verticesRemapping) {
            let vtgt = geomData.verticesRemapping[vsrc];
            positionsAttr.getValueRef(vtgt).set(
                this.vertices[vsrc][0] * this.unitsConversion,
                this.vertices[vsrc][1] * this.unitsConversion,
                this.vertices[vsrc][2] * this.unitsConversion
            );
        }

        let normalsAttr, texCoordsAttr;
        if (geomData.normalIndices.length > 0)
            normalsAttr = mesh.addVertexAttribute('normals', Vec3);
        if (geomData.texCoordIndices.length > 0)
            texCoordsAttr = mesh.addVertexAttribute('texCoords', Vec2);

        for (let i = 0; i < geomData.vertexIndices.length; i++) {
            let v_poly = geomData.vertexIndices[i];
            mesh.setFaceVertexIndices(i, ...v_poly);

            // Set the texCoords and normals...
            if (normalsAttr) {
                let vn_poly = geomData.normalIndices[i];
                for (let j = 0; j < vn_poly.length; j++) {
                    let value = new Vec3(
                        this.normals[vn_poly[j]][0],
                        this.normals[vn_poly[j]][1],
                        this.normals[vn_poly[j]][2]
                    );
                    normalsAttr.setFaceVertexValue(i, j, value);
                }
            }
            if (texCoordsAttr && geomData.texCoordIndices.length == geomData.vertexIndices.length) {
                let vt_poly = geomData.texCoordIndices[i];
                for (let j = 0; j < vt_poly.length; j++) {
                    let value = new Vec2(
                        this.textureCoords[vt_poly[j]][0],
                        this.textureCoords[vt_poly[j]][1]
                    );
                    texCoordsAttr.setFaceVertexValue(i, j, value);
                }
            }
        }

        let geomItem = new GeomItem(geomName, mesh);
        geomItem.selectable = true;

        // Move the transform of the geom item to the center of the geom.
        // This is so that transparent objects can render correctly, and the 
        // transform gizmo becomes centered on each geom(for testing)
        let delta = mesh.boundingBox.center();
        mesh.moveVertices(delta.negate());
        geomItem.localXfo.tr.addInPlace(delta);

        if (geomData.material != undefined && geomData.material in this.__materials) {
            geomItem.setMaterial(this.__materials[geomData.material]);
        } else if (this.__defaultMaterial) {
            geomItem.setMaterial(this.__defaultMaterial);
        } else {
            let material = new StandardMaterial(geomName + 'mat');
            material.baseColor = Color.random(0.5);
            material.roughness = 0.2;
            material.reflectance = 0.2;
            geomItem.setMaterial(material);
        }

        this.addChild(geomItem);
    }
};
export {
    ObjAsset
};
// ObjAsset;