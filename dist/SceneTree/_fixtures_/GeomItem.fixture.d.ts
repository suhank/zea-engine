declare const _default: {
    fromJSON: {
        name: string;
        params: {
            BoundingBox: {
                value: {
                    p0: {
                        x: number;
                        y: number;
                        z: number;
                    };
                    p1: {
                        x: number;
                        y: number;
                        z: number;
                    };
                };
            };
            GeomMat: {
                value: number[];
            };
            GeomOffsetXfo: {
                value: {
                    ori: {
                        w: number;
                        x: number;
                        y: number;
                        z: number;
                    };
                    tr: {
                        x: number;
                        y: number;
                        z: number;
                    };
                };
            };
            Geometry: {
                value: {
                    params: {
                        Loops: {
                            range: number[];
                            step: number;
                            value: number;
                        };
                        Radius: {
                            value: number;
                        };
                        Sides: {
                            range: number[];
                            step: number;
                            value: number;
                        };
                    };
                    type: string;
                    vertexAttributes: {};
                };
            };
            GlobalXfo: {
                value: {
                    ori: {
                        w: number;
                        x: number;
                        y: number;
                        z: number;
                    };
                    tr: {
                        x: number;
                        y: number;
                        z: number;
                    };
                };
            };
            LocalXfo: {
                value: {
                    ori: {
                        w: number;
                        x: number;
                        y: number;
                        z: number;
                    };
                    tr: {
                        x: number;
                        y: number;
                        z: number;
                    };
                };
            };
            Material: {
                value: {
                    name: string;
                    params: {
                        BaseColor: {
                            value: {
                                a: number;
                                b: number;
                                g: number;
                                r: number;
                            };
                        };
                        Opacity: {
                            range: number[];
                            value: number;
                        };
                    };
                    shader: string;
                    type: string;
                };
            };
            Visible: {
                value: boolean;
            };
        };
        type: string;
    };
};
export default _default;
