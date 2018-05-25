
import {
    StateEvent
} from '../StateEvent.js';


class KeyPressedEvent extends StateEvent  {
    constructor(state) {
        super(state)
        this.onKeyPressed = this.onKeyPressed.bind(this);
    }

    setKey(key){
        this.__key = key;
    }


    onKeyPressed(event) {
        console.log(event.key);
        if(event.key == this.__key) {
            this.__onEvent();
        }
    }

    activate() {
        document.addEventListener('keyup', this.onKeyPressed);
    }

    deactivate() {
        document.removeEventListener('keyup', this.onKeyPressed);
    }

};


export {
    KeyPressedEvent
};
