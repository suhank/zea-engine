class SGFactory {
    constructor() {
        this.__registeredClasses = {};
        this.__classNames = {};
    }

    registerClass(classname, cls){
        this.__registeredClasses[classname] = { cls, callbacks:[] };
        this.__classNames[cls.name] = classname;
    }

    registerCallback(classname, callback){
        const classData = this.__registeredClasses[classname];
        if(!classData){
            console.warn("Factory not registered:"+ classname);
            return;
        }
        classData.callbacks.push(callback);
    }

    getClass(classname){
        return this.__registeredClasses[classname].cls;
    }

    getClassName(inst){
        if(this.__classNames[inst.constructor.name])
            return this.__classNames[inst.constructor.name];
        return inst.constructor.name;
    }

    constructClass(classname/*, ...args*/){
        const classData = this.__registeredClasses[classname];
        if(!classData){
            if(!classData){
                console.warn("Factory not registered:"+ classname);
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

