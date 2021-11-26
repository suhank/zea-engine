declare const getFileFolder: (filePath: string) => string;
declare const loadTextfile: (url: string, onSucceed: (result: string) => void, onFail?: (statusTest: string) => void, onProgress?: (total: number, loaded: number) => void) => void;
declare const loadJSONfile: (url: string, onSucceed: (result: object, xhr: XMLHttpRequest) => void, onFail?: (statusTest: string) => void, onProgress?: (total: number, loaded: number) => void) => void;
declare const loadXMLfile: (url: string, onSucceed: (result: Document) => void, onFail?: (statusTest: string) => void, onProgress?: (total: number, loaded: number) => void) => void;
declare const loadBinfile: (url: string, onSucceed: (result: ArrayBuffer) => void, onFail?: (statusTest: string) => void, onProgress?: (total: number, loaded: number) => void) => void;
export { getFileFolder, loadTextfile, loadJSONfile, loadXMLfile, loadBinfile };
