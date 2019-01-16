


function log(txt) {
  document.body.appendChild(document.createTextNode(txt));
  document.body.appendChild(document.createElement('br'));
} 

class TestingHarness {

    constructor() {
    	this.__tests = {};
    }

    registerTest(name, fn) {
    	this.__tests[name] = fn;
    }

    runTest(name, domElement, resources) {
        name = name.replace(new RegExp("%20", 'g'), " ");
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
