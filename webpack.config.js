let webpack = require('webpack');
let UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
let path = require('path');
let fs = require('fs');
let env = require('yargs').argv.mode;


let package_json = JSON.parse(fs.readFileSync('package.json'));
let libraryName = package_json.name;

let plugins = [], outputFile = package_json.name;

let webpackOptions;
let macrosfile;
switch(env){
  case 'devES5':
    outputFile = outputFile + '-dev.js';
    webpackOptions = {
      presets: ['es2015'],
      plugins: ['babel-plugin-add-module-exports']
    };
    macrosfile = 'dev_macros.json';
  case 'buildES5':
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = outputFile+'-'+package_json.version+'.min.js';
    webpackOptions = {
      presets: ['es2015'],
      plugins: ['babel-plugin-add-module-exports']
    };
    macrosfile = 'release_macros.json';
    break;
  case 'devES6':
    outputFile = outputFile + '-dev.js';
    webpackOptions =  {
      plugins: ["transform-es2015-modules-commonjs"]
    }
    macrosfile = 'dev_macros.json';
    break;
  case 'buildES6':
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = outputFile+'-'+package_json.version+'.min.js';
    webpackOptions =  {
      plugins: ["transform-es2015-modules-commonjs"]
    }
    macrosfile = 'release_macros.json';
    break;
  default:
    throw("Invalid build configuration")
}
console.log("Building: " + outputFile);

let srcPath = path.resolve('./src');
let config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,

        // Options to configure babel with
        query: webpackOptions
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader!macro-loader?config=' + path.join(__dirname, macrosfile),
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    root: srcPath,
    extensions: ['', '.js']
  },
  plugins: plugins
};

module.exports = config;
