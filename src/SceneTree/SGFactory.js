class SGFactory {
    constructor() {
        this.__registeredClasses = {};
    }

    registerClass(name, cls){
        console.log("registerClass:" + name);
        this.__registeredClasses[name] = cls;
    }

    getClass(name){
        return this.__registeredClasses[name];
    }

    constructClass(name/*, ...args*/){
        let fact = this.__registeredClasses[name];
        if(!fact){
            
            console.warn("Factory not registered:"+ name);
            return null;
        }
        let args = Array.prototype.slice.call(arguments, 1);
        return new fact(...args);
    }
};

let sgFactory = new SGFactory();
export {
    sgFactory
};
// sgFactory;

