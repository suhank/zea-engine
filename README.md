# Visualive WebGL



## Getting started

1. Install Python 2.7.x
  * from here: https://www.python.org/downloads/
  * You might have to add Python to the PATH environment variables.
2. Install Nodejs
  * from here: https://nodejs.org/en/download/
  * Use default options. It should be straight forward.
3. Install dependencies. 
  * Run `npm install`
4. Run the HTTP Server
4. Build:
  * See npm scripts section below.


## Scripts

* `npm run devES6` - produces development ES6 version of Visualive and runs a watcher.  Edited source code should auto-recompile.
* `npm run dev` - produces development ES5 version of Visualive and runs a watcher.  Edited source code should auto-recompile.
* `npm run build` - produces a production version of Visualive under the `lib` folder.
* `npm run test` - run the tests. Note: builds an ES5 version for testing against.


## Typical development workflow

1. Open Git Bash Terminal
  * Open a Terminal in the repo root (from Source Tree using the icon in the top right)
2. Build Visualive in development mode
  * Run `npm run devES6`. This command will generate an non-minified version of Visualive and will run a watcher so you get re-compilation on file changes.
3. Run the HTTP Server
  * See server section above.
4. Run the tests/demos. 
  * Open [http://localhost:8080/](http://localhost:8080/) in Chrome
  * Be sure to disable caching in the Chrome Developer Tools. 

