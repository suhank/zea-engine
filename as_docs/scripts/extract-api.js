var move = require('./move_rename_api_files.js')
var update = require('./update_links.js')

/*
  USAGE:
  run "yarn start/build" to generate the typedoc api files -- wait for the folder to be generated...
  run "yarn extract-api" to update the API folder with the newest api.

  yarn start/yarn build:
    creates a flat hierarchy of api items in typedoc-out/
  move_rename_api_files.js:
    takes files from typedoc-out/classes and moves to docs/API/ in a structure that reflects the directory structure of the engine
  update_link.js
    goes through all of the files and all of the lines of those files in docs/API/ and replaces the links procedurally.
*/

if (move()) {
  update()
}
