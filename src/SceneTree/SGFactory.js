class SGFactory {
    constructor() {
        this.__registeredClasses = {};
        this.__classNames = {};
    }

    registerClass(name, cls){
        this.__registeredClasses[name] = { cls, callbacks:[] };
        this.__classNames[cls.name] = name;
    }

    registerCallback(classname, callback){
        const classData = this.__registeredClasses[name];
        if(!classData){
            console.warn("Factory not registered:"+ name);
            return;
        }
        classData.callbacks.push(callback);
    }

    getClass(name){
        return this.__registeredClasses[name].cls;
    }

    getClassName(inst){
        if(this.__classNames[inst.constructor.name])
            return this.__classNames[inst.constructor.name];
        return inst.constructor.name;
    }

    constructClass(name/*, ...args*/){
        const classData = this.__registeredClasses[name];
        if(!classData){
            if(!classData){
                console.warn("Factory not registered:"+ name);
                return null;
            }
        }
        const args = Array.prototype.slice.call(arguments, 1);
        const inst = new classData.cls(...args);
        for(let callback of classData.callbacks)
            callback(inst);
        return inst;
    }
};

const sgFactory = new SGFactory();
export {
    sgFactory
};
// sgFactory;

