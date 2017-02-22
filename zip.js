var fs = require('fs-extra')
var archiver = require('archiver')

var files = fs.readdirSync(__dirname + '/dist')
var output = fs.createWriteStream(__dirname + '/mirror.zip')
var archive = archiver('zip', {
    zlib: { level: 9 }
})

output.on('close', function() {
    console.log('mirror.zip [' + archive.pointer() + ' bytes]')
})

archive.on('error', function(err) {
    throw err
})

archive.pipe(output)

files.forEach(function(file) {
    archive.file(__dirname + '/dist/' + file, { name: file })
})

archive.finalize()
