/*
  USUAGE:
  run "yarn start/build" to generate the typedoc api files
  run "yarn extract-api" to update the API folder.

  yarn start/yarn build:
    creates a flat hierarchy of api items in typedoc-out/
  move_rename_api_files.js:
    takes files from typedoc-out/classes and moves to docs/API/ in a structure that reflects the directory structure of the engine
  update_link.js
    goes through all of the files and all of the lines of thos files in docs/API/ and replaces the links procedurally.
*/

const fs = require('fs')
const path_lib = require('path')
const API_folder = './docs/API/'
let valid_folders

module.exports = function () {
  var filename = path_lib.basename(__filename)
  console.log(filename)
  console.log('... updating links in ' + API_folder + '\n')
  // find all folders in the directory -- could use Set instead of object
  valid_folders = addFoldersToMap(API_folder, {})
  // call to readDir, checks all lines of all files of all directories to find links and then replaces links if appropriate
  readDir(API_folder)
}
/*
  recurses through directory to establishes valid folders
*/
function addFoldersToMap(dir, folders) {
  fs.readdirSync(dir).forEach((file) => {
    const file_path = dir + file
    var stats = fs.statSync(file_path)
    if (stats.isDirectory()) {
      folders[file] = true
      addFoldersToMap(file_path + '/', folders)
    }
  })
  return folders
}

/*
  recurses through directory to find all files.
*/
function readDir(dir) {
  fs.readdir(dir, (err, files) => {
    files.forEach((file) => {
      const file_path = dir + file
      var stats = fs.statSync(file_path)
      if (stats.isDirectory()) {
        readDir(file_path + '/')
      } else {
        // operations on individual files
        readFile_replaceLink(file_path)
      }
    })
  })
}

/*
  Notes: currently reads whole file into memory and then constructs a result. Would be faster to edit in place.
*/
function readFile_replaceLink(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    var result = processFile(data, path)
    fs.writeFileSync(path, result)
  })
}

function processFile(file, path) {
  let lines = file.split(/\r?\n/)
  let result = ''

  for (let line of lines) {
    result += replaceLine(line, path) + '\n'
  }

  return result
}

/*
  Replaces old API file links with new ones. 
*/
function replaceLine(line, currentDir) {
  let temp = line

  // remove classes and interfaces from path to have them in the same directory as classes since there are so few.
  if (temp.includes('../classes/')) {
    temp = temp.replace(/..\/(classes)\//g, '')
  } else if (line.includes('../interfaces/')) {
    temp = temp.replace(/..\/(interfaces)\//g, '')
  } else if (line.includes('../enums/')) {
    temp = temp.replace(/..\/(enums)\//g, '')
  }

  var str = temp.split('(')
  for (var i = 1; i < str.length; i++) {
    const path = str[i].split(')')[0]
    const dir = path.split('.')[0]
    const folders = dir.replace(/_/g, '/')

    // check path of link, to make sure it's a part of the API, otherwise don't replace.
    if (check_folders(folders)) {
      const path_to_other_file = './docs/API/' + folders + '.md'
      const relative_path = getRelativePath(currentDir, path_to_other_file)
      const new_link = relative_path + path
      temp = temp.replace(path, new_link)
    } else if (line.includes('../modules/')) {
      // forget about the 'modules' link.
      temp = ''
    }
  }

  return temp
}

//filters out links that aren't related to api files
function check_folders(folders) {
  const folders_check = folders.split('/').slice(0, -1)
  if (folders_check.length == 0) return false
  for (var folder of folders_check) {
    if (!(folder in valid_folders)) {
      return false
    }
  }
  return true
}

//given two links, get the relative path from 'from' to 'to'
function getRelativePath(from, to) {
  let relativePath = path_lib.relative(path_lib.dirname(from), path_lib.dirname(to))
  relativePath = relativePath.replace(/\\/g, '/')
  if (relativePath != '') {
    relativePath = relativePath + '/'
  }
  return relativePath
}
