const assert = require('power-assert')
const pathFn = require('path')
const puppeteer = require('puppeteer')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('../webpack.config')

const compiler = webpack(webpackConfig)
const devServerOptions = Object.assign({}, webpackConfig.devServer)
const server = new WebpackDevServer(compiler, devServerOptions)

server.listen(1234, '127.0.0.1', () => {
  console.log('Server on http://127.0.0.1:1234')
})

// const browser = await puppeteer.launch({ headless: false })
// const page = await browser.newPage()
// await page.goto('http://127.0.0.1:1234')
