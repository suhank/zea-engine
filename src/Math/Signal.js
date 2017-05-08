class Signal {
    constructor(toggledSignal=false) {
        this.__slots = [];
        // A toggled signal means that once it is fired, it is toggled to true
        // and never fired again. Any connections are immedietly emitted. 
        // Note: this is emulating the 'promise' system, and I really should
        // investigate using promisses. 
        this.__toggledSignal = toggledSignal;
        this.__toggled = false;
        this.__data = null;

        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.disconnectScope = this.disconnectScope.bind(this);
        this.emit = this.emit.bind(this);
    }

    connect(fn, scope = this) {
        if (fn == undefined)
            throw("a function callback must be passed to Signal.connect");
        this.__slots.push({"fn": fn, "scope": scope});

        if(this.__toggledSignal && this.__toggled){
            // This signal has already been toggled, so we should emit immedietly.
            fn.call(scope, ...this.__data);
        }
    }

    disconnect(fn, scope = this) {
        let length = this.__slots.length;
        this.__slots = this.__slots.filter(
            function (item) {
                if (item["fn"] !== fn || item["scope"] !== scope) {
                    return item;
                }
            }
        );
        if(this.__slots.length != length-1){
            throw("callback :" + fn.name + " was not connected to this signal:" + this.__name);
        }
    }


    disconnectScope(scope) {
        this.__slots = this.__slots.filter(
            function (item) {
                if (item["scope"] !== scope) {
                    return item;
                }
            }
        );
    }

    // emit the signal to all slots(observers)
    emit(...data) {
        if(this.__toggledSignal){
            if(!this.__toggled){
                this.__toggled = true;
                this.__data = data;
            }
            else
                console.warn("Toggled signals should only be fired once.");
        }
        this.__slots.forEach(function (item) {
            item["fn"].call(item["scope"], ...data);
        });
    }
};

export {
    Signal
};
// export default Signal;


