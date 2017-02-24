/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Megrez Lu <lujiajing1126@gmail.com>
*/

'use strict';

var loaderUtils = require('loader-utils');
var path = require('path');
var fs = require('graceful-fs');
var _ = require('lodash');

function Preprocessor(source,config) {
	this.source = source;
	this.config = config;
}

Preprocessor.prototype.processMacro = function() {
	this._processDefinedMacro();
	return this.source;
}

Preprocessor.prototype._processDefinedMacro = function() {
	// return ["match_str1","match_str2"]

	// Extract all the literals and keep them in an array
	// This is to avoid the modification of literal strings.(GLSL code)
	let literals = [];
	while (true) {
	    var result = this.source.match(/`([^`]+)`/);
	    if (!result)
	        break;
	    let literalKey = '{TEMPLATE_LITERAL_STR'+literals.length+'}';
	    literals.push(result[0]);
	    this.source = this.source.replace(result[0], literalKey);
	}

	var resArr = this.source.match(/#ifdef(?:[\s\S]*?)#endif/gi);
	var self = this;
	var isSet = function(macro) {
		return self.config.indexOf(macro) > -1;
	};
	if(resArr) {
		_.each(resArr,function(str) {
			// has else
			if(/#else/.test(str)) {
				var tmp = str.match(/#ifdef (.*)\n([\s\S]*?)\n(?:#else\n)([\s\S]*?)\n#endif/i);
				var macroTest = tmp[1];
				self.source = self.source.replace(str,isSet(macroTest) ? tmp[2] : tmp[3]);
			} else {
				// the following macro fails for some reason I don't understand.(basic tests work)
				// var tmp = str.match(/#ifdef (.*)\n([\s\S]*?)\n#endif/i);
				var macroTest = str;//tmp[1];
				self.source = self.source.replace(str,isSet(macroTest) ? tmp[2] : "");
			}
		});
	}

	// Put all the template literals back unmodified. 
	for(let i=0;i<literals.length; i++){
	    this.source = this.source.replace('{TEMPLATE_LITERAL_STR'+i+'}', literals[i]);
	}
}

module.exports = function(content) {
	this.cacheable && this.cacheable();
	var queryString = loaderUtils.parseQuery(this.query);
	var source = content;
	var opt = {
		file: queryString.config,
		processor: null,
		config: null
	};
	if(opt.file) {
		try {
			opt.config = JSON.parse(fs.readFileSync(opt.file));
		} catch(err) {
			throw new Error('Macro Preprocessor Error: [CONFIG FILE ERR]' + err);
		}
	}

	if(opt.config) {
		opt.processor = new Preprocessor(content,opt.config);
		source = opt.processor.processMacro();
	}

	return source;
}

module.exports._Preprocessor = Preprocessor;