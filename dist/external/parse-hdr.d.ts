declare function parseHdr(buffer: any): {
    shape: number[];
    exposure: number;
    gamma: number;
    data: Float32Array;
};
export { parseHdr };
