const assert = require('power-assert')
const pathFn = require('path')
const puppeteer = require('puppeteer')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('../webpack.config')

function sleep(t = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, t)
  })
}

function getPostLength() {
  return document.querySelectorAll('.post').length
}

const compiler = webpack(webpackConfig)
const devServerOptions = Object.assign({}, webpackConfig.devServer)
const server = new WebpackDevServer(compiler, devServerOptions)

server.listen(1234, '127.0.0.1', () => {
  console.log('Server on http://127.0.0.1:1234')
})

describe('acyort', async () => {
  it('run', async function () {
    this.timeout(20000)

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://127.0.0.1:1234')
    const watch = page.mainFrame().waitForFunction(`document.documentElement.classList.contains('loading')===false`)
    await watch
    await sleep(1000)

    const postLength = await page.evaluate(getPostLength)
    assert(postLength === 5)

    // const post = await page.$('.post')
    // await post.click()
    await browser.close()
    server.close()
  })
})
