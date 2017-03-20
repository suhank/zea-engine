import {
    Signal
} from '../Math';
import {
    RefCounted
} from './RefCounted.js';

class ProceduralSky extends RefCounted {
    constructor(params={}) {
        super();
        
        this.updated = new Signal();
    }


};

export {
    ProceduralSky
};