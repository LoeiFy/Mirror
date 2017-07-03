#!/usr/bin/env node

'use strict';

const program = require('commander')
const path = require('path')
const fs = require('fs-extra')
const yaml = require('yamljs')

const commands = 'version init build'
const ignore = 'Thumbs.db\n.DS_Store\n*.swp\ntoken.txt'
const config = '# site title\ntitle:\n\n# github user\nuser:\n\n# issue repository\nrepository:\n\n# multi-author\nauthors:\n\n# posts per page\nperpage:\n'

function outputFile(folder, files) {
  files.forEach((file) => {
    const filePath = path.join(process.cwd(), folder, file.path)
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
.action(function(folder = '') {
  const files = [
    { path: '.gitignore', data: ignore },
    { path: 'config.yml', data: config },
    { path: 'token.txt', data: '' },
    { path: 'CNAME', data: '' }
  ]

  fs.copySync(path.join(__dirname, 'dist'), path.join(process.cwd(), folder))
  outputFile(folder, files)

  console.log('Success, modify "config.yml" and start your blog')
})

program
.command('build')
.description('Build the blog')
.action(function() {
  const config = yaml.load(`${process.cwd()}/config.yml`)
  let index = fs.readFileSync(`${process.cwd()}/index.html`, 'utf-8')
  let token = fs.readFileSync(`${process.cwd()}/token.txt`, 'utf-8')

  if (!config.title || !config.user || !config.repository || !config.perpage || !token) {
    return console.log('Configure infomation error')
  }

  token = token.replace(/[\r\n]+/g, '')
  config.token = `${token.charAt(0)}#${token.substr(1)}`
  index = index.replace('$config', JSON.stringify(config))
  fs.outputFileSync(`${process.cwd()}/index.html`, index)

  console.log('Finished building the blog')
})

program.parse(process.argv)

if (!program.args.length || commands.indexOf(process.argv[2]) == -1) {
  program.help()
}
