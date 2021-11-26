/**
 * String functions
 *
 */
declare class StringFunctions {
    /**
     * Replaces all matches in a string.
     *
     * @static
     * @param str -
     * @param pattern -
     * @param replacement -
     * @return -
     */
    static replaceAll(str: string, pattern: string | RegExp, replacement: string): string;
    /**
     * Returns JSON object as a formatted string, but the numeric values are fixed to the specified precision.
     *
     * @static
     * @param val -
     * @param space -
     * @param precision -
     * @return -
     */
    static stringifyJSONWithFixedPrecision(val: Record<string, any>, space?: number, precision?: number): string;
    /**
     * Transforms the given string into a numeric value.
     *
     * @static
     * @param str -
     * @return -
     */
    static hashStr(str: string): number;
}
export { StringFunctions };
