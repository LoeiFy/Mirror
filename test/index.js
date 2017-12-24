const fs = require('fs')
const path = require('path')

const token = process.env.TOKEN
if (token) {
  const config = `module.exports = {
  organization: false,
  order: 'UPDATED_AT',
  title: 'Mirror',
  user: 'LoeiFy',
  repository: 'Recordum',
  authors: '',
  token: '${token}',
  perpage: 5
}`
  fs.writeFileSync(path.join(process.cwd(), 'src', 'config.js'), config)
}

const assert = require('power-assert')
const puppeteer = require('puppeteer')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('../webpack.config')

const compiler = webpack(webpackConfig)
const devServerOptions = Object.assign({}, webpackConfig.devServer)
const server = new WebpackDevServer(compiler, devServerOptions)
server.listen(1234, '127.0.0.1', () => console.log('Runing at => http://127.0.0.1:1234'))

function sleep(t = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, t)
  })
}

const loaded = `document.documentElement.classList.contains('loading')===false`

describe('Mirror', async () => {
  it('run', async function () {
    this.timeout(20000)

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://127.0.0.1:1234')
    const watch = page.mainFrame().waitForFunction(loaded)

    await watch
    await sleep(500)

    async function getButtonLength() {
      return await page.evaluate(() => document.querySelectorAll('.button').length)
    }

    async function getPostsLength() {
      return await page.evaluate(() => document.querySelectorAll('.post').length)
    }

    if (await getButtonLength()) {
      assert((await getPostsLength()) === 5)
      const allPostsLength = await page.evaluate(() => {
        return Number(document.querySelector('.button')
          .textContent
          .split('/')[1]
          .split(')')[0]
          .trim())
      })

      for (let i = 0; i < allPostsLength / 5; i += 1) {
        const ifMorePosts = await page.evaluate(() => {
          const more = document.querySelector('#posts .button')
          if (!more) {
            return false
          }
          if (more.textContent.indexOf('More Posts') === -1) {
            return false
          }
          return true
        })

        if (ifMorePosts) {
          await page.evaluate(() => document.querySelector('.button').click())
          await watch
          await sleep(500)
        }
      }

      assert((await getPostsLength()) === allPostsLength)
    }

    await watch
    await sleep(500)

    const title = await page.evaluate(() => {
      return document.querySelectorAll('.post h2')[1].textContent
    })

    await page.evaluate(() => {
      document.querySelectorAll('.post')[1].click()
    })

    await watch
    await sleep(500)

    const h1 = await page.evaluate(() => {
      return document.querySelector('#post > h1').textContent
    })

    assert(title === h1)

    const body = await page.evaluate(() => {
      return document.querySelector('.markdown-body').childNodes.length
    })

    await(body >= 1)

    const allCommentsLength = await page.evaluate(() => {
      if (!document.querySelector('.button').textContent.indexOf('(') === -1) {
        return 0
      }

      return Number(document.querySelector('.button')
        .textContent
        .split('(')[1]
        .split(')')[0]
        .trim())
    })

    if (allCommentsLength) {
      await page.evaluate(() => document.querySelector('.button').click())
      await watch
      await sleep(500)
    }

    if (allCommentsLength > 10) {
      for (let i = 0; i < allCommentsLength / 10; i += 1) {
        const ifMore = await page.evaluate(() => {
          const more = document.querySelector('#comments .button')
          if (!more) {
            return false
          }
          if (more.textContent.indexOf('Load More') === -1) {
            return false
          }
          return true
        })

        if (ifMore) {
          await page.evaluate(() => document.querySelector('#comments .button').click())
          await watch
          await sleep(500)
        }
      }
    }

    const commentsList = await page.evaluate(() => {
      return document.querySelectorAll('.comment-list li').length
    })

    assert(commentsList === allCommentsLength)

    await browser.close()
    server.close()
  })
})
