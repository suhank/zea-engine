const path = require('path');
let fs = require('fs');

let package_json = JSON.parse(fs.readFileSync('package.json'));
let libraryName = package_json.name;

module.exports = {
  entry: './src/index.js',
  output: {
    filename: `${libraryName}-dev.js`,
    path: path.resolve(__dirname, 'lib'),
    library: libraryName
  },
  devtool: 'source-map'
};
