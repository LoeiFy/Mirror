const fs = require('fs-extra')
const archiver = require('archiver')
const path = require('path')

const files = fs.readdirSync(path.join(process.cwd(), 'dist')).filter(file => file !== 'index.npm.html')
const output = fs.createWriteStream(path.join(process.cwd(), 'release/mirror.zip'))
const archive = archiver('zip', { zlib: { level: 9 } })

output.on('close', () => console.log(`mirror.zip [${archive.pointer()} bytes]`))
archive.on('error', err => { throw err })
archive.pipe(output)
files.forEach(file => archive.file(path.join(process.cwd(), `dist/${file}`), { name: file }))
archive.finalize()
