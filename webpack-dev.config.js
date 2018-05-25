const path = require('path');
let fs = require('fs');

let package_json = JSON.parse(fs.readFileSync('package.json'));
let libraryName = package_json.name;
const plugins = [];

// https://www.npmjs.com/package/copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin')
const builddir = path.resolve(__dirname, 'lib');
const installdir = path.resolve(__dirname, 'projects', 'VisualiveEngine');
console.log(builddir + `\\${libraryName}.js`)
plugins.push(
	new CopyWebpackPlugin([
      	{from: builddir + `\\${libraryName}.js`, to: installdir },
      	{from: builddir + `\\${libraryName}.js.map`, to: installdir },
	], {}));

module.exports = {
  entry: './src/index.js',
  output: {
    filename: `${libraryName}.js`,
    path: builddir,
    library: libraryName
  },
  plugins,
  devtool: 'source-map'
};
