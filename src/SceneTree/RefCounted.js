
import {
    Signal
} from '../Math/Math.js';

class RefCounted {
    constructor() {
        this.__refs = [];
        this.destructing = new Signal();
    }

    numRefs(){
        return this.__refs.length;
    }

    addRef(referer) {
        if(!referer)
            throw("Error in RefCounted.addRef: Must provide a referer");
        // console.log(this.constructor.name + " addRef:" + referer.constructor.name);
        this.__refs.push(referer);
    }

    removeRef(referer) {
        if(!referer)
            throw("Error in RefCounted.removeRef: Must provide a referer");
        // console.log(this.constructor.name + " removeRef:" + referer.constructor.name);
        let index = this.__refs.indexOf(referer);
        this.__refs.splice(index, 1);
        if(this.__refs.length == 0){
            this.destroy();
        }
    }

    destroy(){
        // console.log(this.constructor.name + " destructing");
        this.destructing.emit(this);
    }
};

export {
    RefCounted
};
