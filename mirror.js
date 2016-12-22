#!/usr/bin/env node

'use strict';

var program = require('commander')
var path = require('path')
var fs = require('fs-extra')
var yaml = require('yamljs')

var commands = 'version init build'
var ignore = 'Thumbs.db\n.DS_Store\n*.swp\ntoken.txt'
var config = '# site title\ntitle:\n\n# github user\nuser:\n\n# issue repo\nrepo:\n\n# per page\nper_page:'

function outputFile(folder, files) {
    files.forEach(function(file) {
        var filePath = path.join(process.cwd(), folder, file.path)
        if (!fs.existsSync(filePath)) {
            fs.outputFileSync(filePath, file.data)
        }
    })
}

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
        folder = folder || ''

        var files = [
            { path: '.gitignore', data: ignore },
            { path: 'config.yml', data: config },
            { path: 'token.txt', data: '' },
            { path: 'CNAME', data: '' }
        ]

        fs.copySync(path.join(__dirname, 'dist'), path.join(process.cwd(), folder))
        outputFile(folder, files)

        console.log('Success, modify "config.yml" to configure your blog')
    })

program
    .command('build')
    .description('Build the blog')
    .action(function() {
        try {
            var token = fs.readFileSync(process.cwd() +'/token.txt', 'utf-8')
        } catch(e) {
            return console.log(e)
        }

        var config = yaml.load(process.cwd() +'/config.yml')
        var index = fs.readFileSync(process.cwd() +'/index.html', 'utf-8')

        if (!config.title || !config.user || !config.repo || !config.per_page || !token) {
            return console.log('Configure infomation error')
        }

        token = token.replace(/[\r\n]+/g, '')
        config.token = token.charAt(0) +'#'+ token.substr(1)
        index = index.replace('$config', JSON.stringify(config))
        fs.outputFileSync(process.cwd() +'/index.html', index)

        console.log('Finished building the blog')
    })

program.parse(process.argv)

if (!program.args.length || commands.indexOf(process.argv[2]) == -1) {
    program.help()
}
