const { NODE_ENV } = process.env

const output = {}

if (NODE_ENV === 'docs') {
  output.filename = 'index.[hash:8].js'
}

module.exports = {
  npm: {
    registry: 'https://registry.npm.taobao.org',
  },
  mode: NODE_ENV ? 'production' : 'development',
  esModules: false,
  output,
  sourceMap: false,
  targets: { ios: 10 },
}
