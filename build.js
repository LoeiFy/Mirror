const {
  copySync,
  readFileSync,
  outputFileSync,
  readdirSync,
  createWriteStream,
  ensureDirSync,
  removeSync,
} = require('fs-extra') // eslint-disable-line import/no-extraneous-dependencies
const { join } = require('path')
const archiver = require('archiver') // eslint-disable-line import/no-extraneous-dependencies

const dir = (...s) => join(__dirname, ...s)
const index = readFileSync(dir('docs', 'index.html'), 'utf8')

copySync(dir('docs'), dir('temp'), {
  filter(src) {
    return !src.includes('/index.html')
  },
})
outputFileSync(dir('temp', 'index.html'), index.replace(/hash: '.*?',/, 'hash: \'\','))
outputFileSync(dir('temp', 'CNAME'), '')
ensureDirSync(dir('release'))

const files = readdirSync(dir('temp'))
const output = createWriteStream(dir('release', 'mirror.zip'))
const archive = archiver('zip', { zlib: { level: 9 } })

output.on('close', () => {
  global.console.log(`mirror.zip [${archive.pointer()} bytes]`)
  removeSync(dir('temp'))
  copySync(dir('CNAME'), dir('docs', 'CNAME'))
})
archive.on('error', (err) => { throw err })
archive.pipe(output)
files.forEach(file => archive.file(dir('temp', file), { name: file }))
archive.finalize()
