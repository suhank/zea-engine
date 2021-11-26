const fs = require('fs')

const header = `---
sidebar_position: 5
---
`

const changelog = fs.readFileSync('./docs/Manual/CHANGELOG.md')

// console.log(header + changelog)

fs.writeFileSync('./docs/Manual/CHANGELOG.md', header + changelog)
