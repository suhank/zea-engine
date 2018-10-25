# Visualive WebGL


Install the httpserver
 npm install http-server -g


## Getting started

1. Install Git
1. Install Git LFS
  https://git-lfs.github.com/
  
2. Install Nodejs
  * from here: https://nodejs.org/en/download/
  * Use default options. It should be straight forward.
3. Install dependencies. 
  * Run `npm install`
4. Run the HTTP Server
4. Build:
  * See npm scripts section below.


## Scripts

* `npm run build` - produces development version of Visualive.
* `npm run build:dev` - produces development version of Visualive and runs a watcher.  Edited source code should auto-recompile.
* `npm run build:production` - produces a production version of Visualive under the `lib` folder.


## Typical development workflow

1. Open Git Bash Terminal
  * Open a Terminal in the repo root (from Source Tree using the icon in the top right)
2. Build Visualive in development mode
  * Run `npm run build:dev`. This command will generate an non-minified version of Visualive and will run a watcher so you get re-compilation on file changes.
3. Run the HTTP Server
  * See server section above.
4. Run the tests/demos. 
  * Open [http://localhost:8080/](http://localhost:8080/) in Chrome
  * Be sure to disable caching in the Chrome Developer Tools. 


## Publishing a new build

1. install yarn. 
2. build production. 
3. `yarn publish`

