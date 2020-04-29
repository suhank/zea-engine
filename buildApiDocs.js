/* eslint-disable require-jsdoc */
var fs = require('fs');
path = require("path");

const jsdoc2md = require('jsdoc-to-markdown')
// var documentation = require('documentation');


const renderSourceFileToMarkdown = (filepath, tgtDir) => {
  // console.log("renderSourceFileToMarkdown:", filepath)
  const outPath = path.format({
    dir: tgtDir,
    name: path.basename(filepath, '.js'),
    ext: '.md'
  })
  const promise = new Promise((resolve, reject) =>{
    // jsdoc2md.render({ files: filepath }).then(data => {
    //   resolve({ outPath, data })
    // })
  // documentation.build([filepath], {})
  //   .then(documentation.formats.md)
  //   .then(output => {
  //     // output is a string of Markdown data
  //     resolve({ outPath, data: output })
  //   });
    resolve({ outPath })
  })
  return promise
}

const renderSourceFolderToMarkdown = (dir, tgtDir) => {
  const promise = new Promise((resolve) => {
    const fileRenders = []
    const files = fs.readdirSync(dir);
      // if (err) throw err
    files.forEach((file) => {
      const filepath = path.join(dir, file)
      // console.log("filepath:", filepath)
      fileRenders.push(new Promise((resolve) => {
        fs.stat(filepath, (err, stats) => {
          if (stats.isDirectory()) {
            renderSourceFolderToMarkdown(filepath, path.join(tgtDir, file)).then((data)=>{
              resolve(data);
            });
          } else if (stats.isFile()) {
            renderSourceFileToMarkdown(filepath, tgtDir).then((data)=>{
              resolve(data);
            });
          }
        })
      }))
    })
    
    Promise.all(fileRenders).then((datas) => {
      
      const READMEFilestxt = []
      const READMEFoldertxt = []
      datas.forEach(fileRender => {
        console.log(fileRender)
        if (fileRender.type == "folder") {
          if (fileRender.outPath) {
            const parts = fileRender.outPath.split("\\")
            const folderName = parts[parts.length - 2]
            console.log(fileRender.outPath, parts, folderName)
            READMEFoldertxt.push(`- [${folderName}](${fileRender.outPath})`)
          }
        } else {
          READMEFilestxt.push(`- [${path.basename(fileRender.outPath, '.md')}](${fileRender.outPath})`)
        }
      })

      const result = {
        type: 'folder',
        files: datas
      }

      if (READMEFilestxt.length > 0 || READMEFoldertxt.length > 0) {
        let READMEtxt = `# ${path.basename(tgtDir, '.js')}\n`
        if (READMEFilestxt.length > 0) {
          READMEtxt = READMEtxt+ `# Classes\n${READMEFilestxt.join('\n')}\n\n`
        }
        if (READMEFoldertxt.length > 0) {
          READMEtxt = READMEtxt+ `Folder\n${READMEFoldertxt.join('\n')}\n\n`
        }
        const outPath = path.join(tgtDir, "README.md")
        const fullOutPath = path.join("docs", outPath)
        if (!fs.existsSync(fullOutPath)){
          fs.mkdirSync(fullOutPath, { recursive: true });
        }
        fs.writeFileSync(fullOutPath, READMEtxt)

        result.outPath = outPath
      }
      resolve(result)
    });
  })
  return promise;
}

renderSourceFolderToMarkdown('src/Math', 'api').then((data) => {
  console.log("done:")
});


