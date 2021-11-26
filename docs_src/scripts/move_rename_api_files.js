/*
  USAGE:
  run "yarn start/build" to generate the typedoc api files
  run "yarn extract-api" to update the API folder.

  yarn start/yarn build:
    creates a flat hierarchy of api items in typedoc-out/
  move_rename_api_files.js:
    takes files from typedoc-out/classes and moves to docs/API/ in a structure that reflects the directory structure of the engine
  update_link.js
    goes through all of the files and all of the lines of those files in docs/API/ and replaces the links procedurally.
*/

const API_src_folders = ['./typedoc-out/classes/', './typedoc-out/interfaces/', './typedoc-out/enums/']
const API_dest_folder = './docs/API/'
const fs = require('fs')
const path_lib = require('path')

module.exports = function () {
  var filename = path_lib.basename(__filename)
  console.log('\n' + filename)

  if (fs.existsSync(API_dest_folder)) {
    fs.rmSync(API_dest_folder, { recursive: true, force: true })
  }
  fs.mkdirSync(API_dest_folder)
  console.log('... creating API/index.md file')
  fs.copyFileSync('./README.md', './docs/API/index.md')

  if (!fs.existsSync('./typedoc-out')) {
    console.warn('\nERROR: run yarn start and wait for the typedoc-out/ folder to be populated.\n')
    return false
  }

  console.log('... Moving/renaming generated files from: ' + API_src_folders + ' to: ' + API_dest_folder)
  console.log('... creating category files for each subdirectory')
  for (var src_folder of API_src_folders) {
    fs.readdirSync(src_folder).forEach((file) => {
      var fileName = file.split('.')[1] + '.md'
      if (fileName !== 'yml.md') {
        var path = file.split('_').slice(0, -1)
        var pathString = ''
        for (var i of path) {
          pathString += i + '/'
          if (pathString != undefined) create_folder(pathString)
        }

        moveFile(src_folder + file, API_dest_folder + pathString + fileName) // fileName
      }
    })
  }
  return true
}

function create_folder(folder_name) {
  const folderName = API_dest_folder + folder_name
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName)
    }
    // make json here
    createCategoryFile(folderName)
  } catch (err) {
    console.error(err)
  }
}

async function moveFile(source, destination) {
  try {
    await fs.copyFileSync(source, destination)
    // console.log(`Moved file from ${source} to ${destination}`)
  } catch (error) {
    console.error(`Got an error trying to move the file: ${error.message}`)
  }
}

function createCategoryFile(folderName) {
  //console.log('writing to: ' + API_dest_folder + folderName + '/_category_.json')
  const folderArray = folderName.split('/').slice(0, -1)
  const name = folderArray[folderArray.length - 1]
  fs.writeFileSync(folderName + '_category_.json', JSON.stringify({ label: name, position: 0 }))
}
