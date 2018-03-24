function httpGetAsync(url, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			callback(xmlHttp.responseText);
	}
	xmlHttp.open("GET", url, true); // true for asynchronous 
	xmlHttp.send(null);
}

function loadScript(url, callback) {
	var script = document.createElement("script");
	script.onload = function() {
		callback();
	};
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', url);
	document.getElementsByTagName('head').item(0).appendChild(script);
}

function resolveURL(filePath, resources) {
	let parts = filePath.split('/');
	if (parts[0] == '.' || parts[0] == '')
		parts.shift();
	let curr = resources;
	for (let part of parts) {
		if (part in curr)
			curr = curr[part];
		else {
			// console.warn("Unable to resolve File:" + filePath);
			return null;
		}
	}
	return curr;
}


function view(viewElement, resources, filePath, visualivePlatform) {
	var ext = filePath.split('.').pop().toLowerCase();
	switch (ext) {
		case "png":
		case "jpg":
			var image = document.createElement("img");
			image.src = resolveURL(filePath, resources).url;
			image.setAttribute("style", "height:100%;width:100%");
			viewElement.appendChild(image);
			const overlay = new AnnotationOverlay(viewElement, visualivePlatform);
			break;
		case "js":
			httpGetAsync(resolveURL(filePath, resources).url, (text) => {
				var t = document.createTextNode(text);
				viewElement.appendChild(t);
				loadScript('https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.1/ace.js', function() {
					var editor = ace.edit(viewElement, {
						mode: "ace/mode/javascript",
						selectionStyle: "text"
					});
					editor.setTheme("ace/theme/monokai");
					editor.setReadOnly(true); // false to make it editable
				});
			});
			break;
		case 'vlexe':
			loadScript(resolveURL(filePath, resources).url, function() {
				vlmain(viewElement, resources, filePath, visualivePlatform)
			});
			break;
		default:
			viewElement.style.display = "block";
			viewElement.style.height = "100%";
			viewElement.style.width = "100%";
			viewElement.style.textAlign = "center";
			viewElement.style.verticalAlign = "middle";
			var h = document.createElement("H1")
			var t = document.createTextNode("No view function provided for:" + filePath);
			viewElement.appendChild(h);
			h.appendChild(t);
	}
}