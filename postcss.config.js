module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-apply')(),
    require('postcss-cssnext')(),
    require('postcss-nesting')()
  ]
}