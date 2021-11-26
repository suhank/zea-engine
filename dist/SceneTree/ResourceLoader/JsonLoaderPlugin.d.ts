/**
 * JSON loader plugin.
 */
declare class JsonLoaderPlugin {
    resourceLoader: any;
    init(resourceLoader: any): void;
    /**
     * The type of file this plugin handles.
     * @return The type of file.
     */
    getType(): string;
    loadFile(url: string): Promise<unknown>;
}
export { JsonLoaderPlugin };
