class Signal {
    constructor() {
        this.__slots = []
    }

    connect(fn, scope = this) {
        if (fn == undefined)
            throw("a function callback must be passed to Signal.connect");
        this.__slots.push({"fn": fn, "scope": scope});
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
        this.__slots.forEach(function (item) {
            item["fn"].call(item["scope"], ...data);
        });
    }
};

export {
    Signal
};



