/**
 * Class designed to store version data. Widely used in the zea engine for backwards compatibility.
 */
declare class Version {
    major: number;
    minor: number;
    patch: number;
    branch: string;
    /**
     * Creates a version.
     * The version string should have the following structure:
     * major, minor and patch separated by a dot(`.`) and parts separated by a dash(`-`).
     *
     * @param versionStr - The version string value.
     */
    constructor(versionStr?: string);
    /**
     * Compare a version object against a version numbers array.
     *
     * @param numbers - An array containing 3 version numbers. [Major, Minor, Patch]
     * @return - return positive: v1 > v2, zero:v1 == v2, negative: v1 < v2
     */
    compare(numbers: number[]): number;
}
export { Version };
