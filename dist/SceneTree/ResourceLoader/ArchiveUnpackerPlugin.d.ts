/**
 * Archive unpacker plugin.
 */
declare class ArchiveUnpackerPlugin {
    protected __callbacks: Record<string, any>;
    protected __workers: any[];
    protected __nextWorker: number;
    protected resourceLoader: any;
    constructor();
    init(resourceLoader: any): void;
    /**
     * The type of file this plugin handles.
     * @return The type of file.
     */
    getType(): string;
    /**
     * The __getWorker method.
     * @return - The return value.
     * @private
     */
    __getWorker(): any;
    /**
     * The __terminateWorkers value.
     * @private
     */
    __terminateWorkers(): void;
    /**
     * Loads an archive file, returning a promise that resolves to the JSON data value.
     * Note: using the resource loader to centralize data loading enables progress to be tracked and displayed
     * @param url - The url of the data to load.
     * @return - The promise value.
     */
    loadFile(url: string): Promise<unknown>;
    /**
     * The __onFinishedReceiveFileData method.
     * @param fileData - The fileData value.
     * @private
     */
    __onFinishedReceiveFileData(fileData: Record<string, any>): void;
    shutDownWorkers(): void;
}
export { ArchiveUnpackerPlugin };
