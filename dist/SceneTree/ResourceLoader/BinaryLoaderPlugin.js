function checkStatus(response) {
    if (!response.ok) {
        return false;
    }
    return response;
}
/**
 * Binary loader plugin.
 */
class BinaryLoaderPlugin {
    init(resourceLoader) {
        this.resourceLoader = resourceLoader;
    }
    /**
     * The type of file this plugin handles.
     * @return The type of file.
     */
    getType() {
        return 'binary';
    }
    loadFile(url) {
        this.resourceLoader.incrementWorkload(1);
        const promise = new Promise((resolve, reject) => {
            fetch(url).then((response) => {
                this.resourceLoader.incrementWorkDone(1);
                if (checkStatus(response))
                    resolve(response.arrayBuffer());
                else
                    reject(`loadBinary: ${response.status} - ${response.statusText} : ${url}`);
            });
        }
        // () => {}
        );
        return promise;
    }
}
export { BinaryLoaderPlugin };
//# sourceMappingURL=BinaryLoaderPlugin.js.map