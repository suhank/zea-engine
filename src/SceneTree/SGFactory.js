class SGFactory {
    constructor() {
        this.__registeredClasses = {};
    }

    registerClass(name, cls){
        this.__registeredClasses[name] = cls;
    }

    getClass(name){
        return this.__registeredClasses[name];
    }

    constructClass(name/*, ...args*/){
        let fact = this.__registeredClasses[name];
        if(!fact){
            fact = Visualive[name];
            if(!fact){
                console.warn("Factory not registered:"+ name);
                return null;
            }
        }
        const args = Array.prototype.slice.call(arguments, 1);
        return new fact(...args);
    }
};

const sgFactory = new SGFactory();
export {
    sgFactory
};
// sgFactory;

