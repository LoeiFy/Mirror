#!/usr/bin/env node

'use strict';

const program = require('commander')
const path = require('path')
const fs = require('fs-extra')
const yaml = require('yamljs')

const commands = 'version init build'
const ignore = `Thumbs.db
.DS_Store
*.swp
`
const config = `# site title
title:

# user name or organization name
user:

# issue repository
repository:

# multi-author
authors:

# token
# token should be separated by '#'
# example: 5#c31bffc137f44faf7efc4a84da827g7ca2cfeaa
token:

# posts per page
perpage:


# advance config

# organization repository (?)
organization: false

# post order
# order by create time" or "update time"
# 'UPDATED_AT' or 'CREATED_AT'
order: 'UPDATED_AT'
`

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
.action(() => console.log(require('../package.json').version))

program
.command('init [folder]')
.description('Create a new Mirror blog')
.action((folder = '') => {
  const files = [
    { path: '.gitignore', data: ignore },
    { path: 'config.yml', data: config },
    { path: 'CNAME', data: '' }
  ]

  fs.copySync(path.resolve(__dirname, '../dist'), path.join(process.cwd(), folder))
  outputFile(folder, files)

  console.log('Success, modify "config.yml" and start your blog')
})

program
.command('build')
.description('Build the blog')
.action(function() {
  const config = yaml.load(`${process.cwd()}/config.yml`)
  const html = fs.readFileSync(`${process.cwd()}/index.html`, 'utf-8')

  if (!config.title || !config.user || !config.repository || !config.perpage || !config.token) {
    return console.log('Configure infomation error')
  }

  const content = html.replace('$config', JSON.stringify(config))
  fs.outputFileSync(`${process.cwd()}/index.html`, content)

  console.log('Finished building the blog')
})

program.parse(process.argv)

if (!program.args.length || commands.indexOf(process.argv[2]) == -1) {
  program.help()
}
