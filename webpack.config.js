const path = require('path');
let fs = require('fs');

let package_json = JSON.parse(fs.readFileSync('package.json'));
let libraryName = package_json.name;
let outputFile = package_json.name;

const prod = process.argv.indexOf('-p') !== -1;


module.exports = {
  entry: './src/index.js',
  output: {
    filename: `${outputFile}-${prod ? package_json.version : 'dev'}${prod ? '.min' : ''}.js`,
    path: path.resolve(__dirname, 'lib'),
  	library: libraryName
  },
  devtool: 'source-map'
};