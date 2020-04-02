// Separates camelCase words, this is needed as elasticlunr does not expand words backwards
function unCamelCase (str){
    return str
    // insert a space between lower & upper
        .replace(/([a-z])([A-Z])/g, '$1 $2')
    // space before last upper in a sequence followed by lower
        .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
    // uppercase the first character
        .replace(/^./, str => str.toUpperCase());
}

function searchDocs(str, file){
    //var elasticlunr = require('elasticlunr');
    //var fs=require('fs');

    //$ jsdoc -r src/ -t node_modules/jsdoc/templates/haruki -d console > index.json
    var query = str;

    if(typeof file === "undefined")
	var file = "index.json";
    var indexFile = file;
    
    //var data = fs.readFileSync(indexFile, 'utf8');
    //JSON.parse(data);
    var index = elasticlunr(function () {
	this.addField('indexName');
	this.addField('description');
	this.setRef('id');
    });

    for ([indexClass, jsonClass] of jsdoc.classes.entries()) {
	// Adds class to index
	var classDoc = {
	    'id'          : indexClass,
	    'indexName'   : unCamelCase(jsonClass.name),
	    'description' : jsonClass.description,
	    'name'        : jsonClass.name,
	}
	index.addDoc(classDoc);
	// Adds class functions to index
	if (!jsonClass.functions) continue;
	for ([indexFunc, jsonFunc] of jsonClass.functions.entries()) {
	    var funcDoc = {
		'id'          : indexClass + '-' + indexFunc,
		'indexName'   : unCamelCase(jsonFunc.name),
		'description' : jsonFunc.description,
		'name'        : jsonFunc.name,
	    }
	    index.addDoc(funcDoc);
	}
    }

    // (expand: true) allows to partially match a word (only suffixes)
    var search = index.search(
	query,
	{ fields: {
	    indexName: {boost: 2},
	    description: {boost: 1} },
	  expand: true });

    var result = [];
    for (i of search) {
	result.push({"className"    : index.documentStore.docs[i.ref.split('-')[0]].name,
		     "functionName" : i.ref !== i.ref.split('-')[0]?
		       index.documentStore.docs[i.ref].name : "",
	   	     "score"        : i.score});
    }
    return result;
}
