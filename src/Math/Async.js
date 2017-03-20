
import {
    Signal
} from '../Math';

class Async {
    constructor() {
        this.__asyncCount = 0;
        this.ready = new Signal();
    }

    incAsyncCount(count=1) {
        this.__asyncCount+=count;
    }

    decAsyncCount() {
        if (this.__asyncCount > 0){
            this.__asyncCount--;
            if (this.__asyncCount == 0) {
                this.__asyncsCompleted();
            }
        }
    }

    __asyncsCompleted(){
        this.ready.emit();
    }
};

export {
    Async
};
