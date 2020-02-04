

class TestingHarness {
  constructor() {
    this.__tests = {};
    this.__resources = {};
  }

  registerTest(name, fn) {

    const parts = name.split('/');
    const testname = parts.pop();
    let parentObj  = this.__tests;
    for (let part of parts) {
      if (!(part in parentObj)) {
        parentObj[part] = {};
      }
      parentObj = parentObj[part];
    }
    parentObj[testname] = fn;
  }

  runTest(name) {
    name = name.replace(new RegExp("%20", 'g'), " ");

    const parts = name.split('/');
    const testname = parts.pop();
    let parentObj  = this.__tests;
    for (let part of parts) {
      if (!(part in parentObj)) {
        return false;
      }
      parentObj = parentObj[part];
    }

    document.title = 'Zea Engine Test:' + name;
    const canvas = testingHarness.addCanvas();
    parentObj[testname](canvas, this.__resources);
  }

  log(txt) {
    document.body.appendChild(document.createTextNode(txt));
    document.body.appendChild(document.createElement('br'));
  }

  addCanvas(width, height) {
    const resizeDiv = document.createElement("div");
    resizeDiv.id = 'canvasHolder';
    if (width == undefined) {
        resizeDiv.style.width = '100%';
        resizeDiv.style.height = '100%';
        resizeDiv.style.position = 'fixed';
        resizeDiv.style.top = 0;
        resizeDiv.style.left = 0;
        // resizeDiv.style.overflow = 'hidden';
    } else {
        resizeDiv.style.position = 'relative';
        resizeDiv.style.width = width + 'px';
        resizeDiv.style.height = height + 'px';
    }
    document.body.appendChild(resizeDiv);
    if (width !== undefined) {
        document.body.appendChild(document.createElement("br"));
    }
    return resizeDiv;
  }

  setResources(resources) {
    this.__resources = resources;
  }

  addResource(resourcePath, url) {

    const hashStr = function(str) {
      var hash = 0,
        i, chr, len;
      if (str.length === 0) return hash;
      for (i = 0, len = str.length; i < len; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return Math.abs(hash);
    };

    const parts = resourcePath.split('/');
    const filename = parts.pop();
    if (!url) {

      let rootURL = window.location.href.split('#')[0];
      rootURL = rootURL.split('?')[0];
      if (rootURL.endsWith('.html') || rootURL.endsWith('.html')) {
        rootURL = rootURL.substring(0, rootURL.lastIndexOf('/')) + '/';
      }
      const base = rootURL;
      if (parts[0] == '.')
        parts.shift();
      else if (parts[0] == '..') {
        item = item.substring(3);
        const baseparts = base.split('/');
        baseparts.pop();
        baseparts.pop();
        base = baseparts.join('/') + '/';
      }
      url = base + resourcePath
    }
    let parentId;
    for (let part of parts) {
      const key = hashStr(part);
      if (!(key in this.__resources)) {
        this.__resources[key] = {
          name: part,
          type: 'folder',
          parent: parentId
        };
      }
      parentId = key;
    }

    const key = hashStr(filename);
    const resource = {
      name: filename,
      url,
      parent: parentId,
      id: key
    };
    this.__resources[key] = resource;
  }
  
  genTOC(){
    const ul = document.createElement('ul');
    
    function isObject (value) {
      return value && typeof value === 'object' && value.constructor === Object;
    }

    const traverse = (obj, ul, path) => {
      for(let name in obj){
        if(isObject(obj[name])) {
          const sub_ul = document.createElement('ul');
          traverse(obj[name], sub_ul, (path !== "" ? path+'/' : "")+name);
          const li = document.createElement('a');
          const linkText = document.createTextNode(name);
          li.appendChild(linkText);
          li.appendChild(sub_ul);
          ul.appendChild(li);
        }
        else {
          const li = document.createElement('a');
          const a = document.createElement('a');
          const linkText = document.createTextNode(name);
          a.appendChild(linkText);
          a.title = name;
          a.href = window.location.href + "?test=" + path+'/'+name;
          li.appendChild(a);
          ul.appendChild(li);
        }
      }
    }
    traverse(this.__tests, ul, "");
    document.body.appendChild(ul);
  }
}

window.testingHarness = new TestingHarness();
