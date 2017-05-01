const path = require('path');
let fs = require('fs');

let package_json = JSON.parse(fs.readFileSync('package.json'));
let libraryName = package_json.name;
let outputFile = package_json.name;

const prod = process.argv.indexOf('-p') !== -1;


module.exports = {
  entry: './src/index.js',
  output: {
    filename: `${outputFile}-${package_json.version}${prod ? '.min' : ''}.js`,
    path: path.resolve(__dirname, 'lib')
  },
  devtool: 'source-map'
};