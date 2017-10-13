

class TestingHarness {

    constructor() {
    	this.__tests = {};
    }

    registerTest(name, fn) {
    	this.__tests[name] = fn;
    }

    runTest(name, domElement, resources) {
    	this.__tests[name](domElement, resources);
    }

    getTestNames(){
    	let names = [];
    	for(let name in this.__tests) 
    		names.push(name);
    	return names;
    }
}

var testingHarness = new TestingHarness();
