#!/usr/bin/env node

'use strict';

var program = require('commander')
var fs = require('fs-extra')

var commands = 'version init build'
var ignore = 'Thumbs.db\n.DS_Store\n*.swp\ntoken.txt'
var config = '# site title\ntitle:\n\n# github user\nuser:\n\n# issue repo\nrepo:\n\n# per page\nper_page:'
var token = ''

program
    .allowUnknownOption()
    .usage(' <command>')

program
    .command('version')
    .description('Display Mirror version')
    .action(function() {
        console.log(require('./package.json').version)
    })

program
    .command('init [folder]')
    .description('Create a new Mirror blog')
    .action(function(folder) {
        var name = folder || process.cwd().substring(process.cwd().lastIndexOf('/') + 1) 
        var path = folder ? '/'+ folder : ''

        fs.copySync('./assets', process.cwd() + path)
        fs.outputFileSync(process.cwd() + path +'/.gitignore', ignore)
        fs.outputFileSync(process.cwd() + path +'/config.yml', config)
        fs.outputFileSync(process.cwd() + path +'/token.txt', token)

        console.log('Success, modify "config.yml" to configure your site')
    })

program.parse(process.argv)

if (!program.args.length || commands.indexOf(process.argv[2]) == -1) {
    program.help()
}
