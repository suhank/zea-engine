/**
 * Libraries registry.
 */
declare class LibsRegistry {
    registry: Record<string, unknown>;
    version: string;
    /**
     * Construct a new libraries registry for the specific version.
     * @param version - The version of the Zea Engine that will be validated against the registered libraries.
     */
    constructor(version: string);
    /**
     * Validate and register a library.
     * @param packageJson - The package.json of the library to register.
     */
    registerLib(packageJson: Record<string, any>): void;
    /**
     * List the registered libraries with their versions.
     * @return Libraries list.
     */
    listLibs(): Record<string, unknown>;
}
export { LibsRegistry };
