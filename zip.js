const fs = require('fs-extra')
const archiver = require('archiver')

const files = fs.readdirSync(`${__dirname}/dist`).filter(file => file !== 'index.npm.html')
const output = fs.createWriteStream(`${__dirname}/mirror.zip`)
const archive = archiver('zip', { zlib: { level: 9 } })

output.on('close', () => console.log(`mirror.zip [${archive.pointer()} bytes]`))
archive.on('error', err => { throw err })
archive.pipe(output)
files.forEach(file => archive.file(`${__dirname}/dist/${file}`, { name: file }))
archive.finalize()
