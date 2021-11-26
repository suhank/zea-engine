/**
 * Binary loader plugin.
 */
declare class BinaryLoaderPlugin {
    protected resourceLoader: any;
    init(resourceLoader: any): void;
    /**
     * The type of file this plugin handles.
     * @return The type of file.
     */
    getType(): string;
    loadFile(url: string): Promise<unknown>;
}
export { BinaryLoaderPlugin };
