import { EventEmitter } from '../../Utilities/index';
declare global {
    interface Window {
        XLSX: any;
    }
}
/** Class representing a label manager.
 * @private
 */
declare class LabelManager extends EventEmitter {
    protected __language: any;
    protected __foundLabelLibraries: Record<string, any>;
    protected __labelLibraries: Record<string, any>;
    /**
     * Create a label manager.
     */
    constructor();
    /**
     * Load a label library into the manager.
     * @param name - The name of the library.
     * @param url- The json data of of the library.
     */
    loadLibrary(name: string, url: string): void;
    /**
     * Checks if the library is found.
     * @param name - The name of the library.
     * @return - Returns true if the library is found.
     */
    isLibraryFound(name: string): boolean;
    /**
     * Checks if the library is loaded.
     * @param name - The name of the library.
     * @return - Returns true if the library is loaded.
     */
    isLibraryLoaded(name: string): boolean;
    /**
     * The getLabelText method.
     * @param libraryName - The name of the library.
     * @param labelName - The name of the label.
     * @return - The return value.
     */
    getLabelText(libraryName: string, labelName: string): any;
    /**
     * The setLabelText method.
     * @param libraryName - The name of the library.
     * @param labelName - The name of the label.
     * @param labelText - The text of the label.
     */
    setLabelText(libraryName: string, labelName: string, labelText: string): void;
    setLanguage(ln: any): void;
}
declare const labelManager: LabelManager;
export { LabelManager, labelManager };
