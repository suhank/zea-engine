// import { Registry, AssetLoadContext, Xfo, AssetItem, BinReader } 
import { Xfo } from '../../Math/Xfo';
import { Registry } from '../../Registry';
import { AssetLoadContext } from '../AssetLoadContext';
import { CADAsset } from './CADAsset';
/**
 * Represents a view of PMI data. within a CAD assembly.
 *
 * @extends TreeItem
 */
class XRef extends CADAsset {
    constructor(name) {
        super(name);
    }
    /**
     * The clone method constructs a new XRef, copies its values
     * from this item and returns it.
     *
     * @param {number} flags - The flags param.
     * @return {XRef} - The return value.
     */
    clone(context) {
        const cloned = new XRef();
        cloned.copyFrom(this, context);
        return cloned;
    }
    /**
     * Copies data from the source XRef onto this XRef.
     *
     * @param {XRef} src - The XRef to copy from.
     * @param {object} context - The context value.
     */
    copyFrom(src, context) {
        // Note: the XRef has a localXfo that positions it relative
        // to the parent assembly. We need to avoid losing that values
        // when cloning all the others.
        const localXfo = this.localXfoParam.value;
        super.copyFrom(src, context);
        this.localXfoParam.loadValue(localXfo);
    }
    // ///////////////////////////
    // Persistence
    /**
     * Initializes XRef's asset, material, version and layers; adding current `XRef` Geometry Item toall the layers in reader
     *
     * @paramreader - The reader param.
     * @param context - The load context param.
     */
    readBinary(reader, context) {
        reader.loadStr(); // read type
        const name = reader.loadStr(); // read name
        this.setName(name);
        let relativePath = reader.loadStr();
        if (context.versions['zea-cad'].compare([3, 6, 2]) > 0) {
            const xfo = new Xfo();
            xfo.tr = reader.loadFloat32Vec3();
            xfo.ori = reader.loadFloat32Quat();
            this.localXfoParam.loadValue(xfo);
        }
        else {
            // Note: the SpatialBridge now encodes the 'ReferenceName' into the
            // XRef, while CADEx didn't provide one. Use the name if it is provided.
            if (name == '')
                this.setName(relativePath);
        }
        // @ts-ignore will be fixed in #579
        if (!context.resources[relativePath]) {
            // Generate a path based on the path of the parent CADAsset.
            // const stem = relativePath.substring(0, relativePath.lastIndexOf('.'))
            // context.resources[relativePath] = context.folder + stem + '.zcad'
            if (relativePath.includes('/')) {
                relativePath = relativePath.slice(relativePath.lastIndexOf('/') + 1);
            }
            else if (relativePath.includes('\\')) {
                relativePath = relativePath.slice(relativePath.lastIndexOf('\\') + 1);
            }
            // @ts-ignore will be fixed in #579
            if (!context.resources[relativePath]) {
                // @ts-ignore will be fixed in #579
                context.resources[relativePath] = context.folder + relativePath + '.zcad';
            }
        }
        // @ts-ignore will be fixed in #579
        if (context.resources[relativePath]) {
            // @ts-ignore will be fixed in #579
            console.log('resolving XRef:', relativePath, ' > ', context.resources[relativePath]);
            // @ts-ignore will be fixed in #579
            const url = context.resources[relativePath];
            context.incrementAsync();
            // @ts-ignore will be fixed in #579
            if (context.assets[relativePath]) {
                // @ts-ignore will be fixed in #579
                const xref = context.assets[relativePath];
                if (!xref.isLoaded()) {
                    xref.on('loaded', () => {
                        this.copyFrom(xref);
                        context.decrementAsync();
                    });
                }
                else {
                    this.copyFrom(xref);
                    context.decrementAsync();
                }
            }
            else {
                // @ts-ignore will be fixed in #579
                context.assets[relativePath] = this;
                this.load(url, new AssetLoadContext(context)).then(() => {
                    context.decrementAsync();
                }, () => {
                    console.log(`While Loading ${this.getPath()} unable to resolve ${relativePath}`);
                    context.decrementAsync();
                });
            }
            // }
        }
    }
}
Registry.register('XRef', XRef);
export { XRef };
//# sourceMappingURL=XRef.js.map