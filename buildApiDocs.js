/* eslint-disable require-jsdoc */
const fs = require('fs')
path = require('path')

const jsdoc2md = require('jsdoc-to-markdown')
// var documentation = require('documentation');

const renderSourceFileToMarkdown = (filepath, tgtDir) => {
  const outPath = path
    .format({
      dir: tgtDir,
      name: path.basename(filepath, '.js'),
      ext: '.md',
    })
    .split('\\')
    .join('/')

  return new Promise((resolve, reject) => {
    jsdoc2md
      .render({
        files: filepath,
      })
      .then((data) => {
        resolve({ outPath, data })
      })
  })
}

const renderSourceFolderToMarkdown = (dir, tgtDir) => {
  const promise = new Promise((resolve) => {
    const fileRenders = []
    const files = fs.readdirSync(dir)

    files.forEach((file) => {
      const filepath = path.join(dir, file)
      fileRenders.push(
        new Promise((resolve) => {
          fs.stat(filepath, (err, stats) => {
            if (stats.isDirectory()) {
              renderSourceFolderToMarkdown(
                filepath,
                path.join(tgtDir, file)
              ).then((data) => {
                resolve(data)
              })
            } else if (stats.isFile()) {
              renderSourceFileToMarkdown(filepath, tgtDir).then((data) => {
                resolve(data)
              })
            }
          })
        })
      )
    })

    Promise.all(fileRenders).then((datas) => {
      const READMEFilestxt = []
      const READMEFoldertxt = []

      const fullOutFolder = path.join('docs', tgtDir)
      if (!fs.existsSync(fullOutFolder)) {
        fs.mkdirSync(fullOutFolder, { recursive: true })
      }

      datas.forEach((fileRender) => {
        if (fileRender.type == 'folder') {
          if (fileRender.outPath) {
            const parts = fileRender.outPath.split('\\')
            const folderName = parts[parts.length - 2]
            READMEFoldertxt.push(`### [${folderName}](${parts.join('/')})`)
          }
        } else {
          if (fileRender.data) {
            READMEFilestxt.push(
              `### [${path.basename(fileRender.outPath, '.md')}](${
                fileRender.outPath
              })`
            )

            const data = fileRender.data
              .replace(/\#{3} ([\w\d ]+\.)?([\w\d ]+).+/gim, '### $2')
              .replace(
                /\* \[[\.]?([\w\d ]+)(\(.*?\))?\]\(.*\)(.*)?/gm,
                (a, b, c, d) => {
                  const cleanedLink = b ? b.replace(' ', '-') : ''
                  return `* [${b}${c || ''}${d || ''}](#${cleanedLink})`
                }
              )

            const fullOutPath = path.join('docs', fileRender.outPath)
            fs.writeFileSync(fullOutPath, data)
          }
        }
      })

      const result = {
        type: 'folder',
        files: datas,
      }

      if (READMEFilestxt.length > 0 || READMEFoldertxt.length > 0) {
        let READMEtxt = `# ${path.basename(tgtDir, '.js')}\n`.toUpperCase()
        if (READMEFilestxt.length > 0) {
          READMEtxt = READMEtxt + `## Classes\n${READMEFilestxt.join('\n')}\n\n`
        }

        if (READMEFoldertxt.length > 0) {
          // eslint-disable-next-line prettier/prettier
          READMEtxt = `${READMEtxt} ## Modules {docsify-ignore} \n${READMEFoldertxt.join('\n')}\n\n`
        }
        const outPath = path.join(tgtDir, 'README.md')
        const fullOutPath = path.join('docs', outPath)

        fs.writeFileSync(fullOutPath, READMEtxt)

        result.outPath = outPath
      }
      resolve(result)
    })
  })
  return promise
}

// ////////////////////////////////
// Entry

fs.rmdirSync('docs/api', { recursive: true })
renderSourceFolderToMarkdown('src', 'api').then((data) => {
  console.log('writing : searchToc.json')

  const searchToc = []
  data.files.forEach((file) => {
    if (!file.outPath) return
    if (file.outPath.endsWith('README.md')) {
      const parts = file.outPath.split('\\')
      parts.pop()
      searchToc.push(parts.join('/') + '/')
    } else {
      searchToc.push(path.basename(file.outPath, '.md').split('\\').join('/'))
    }
  })
  fs.writeFileSync('docs/searchToc.json', JSON.stringify({ searchToc }))
})
