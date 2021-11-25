const path = require('path') //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}

module.exports = {
  publicPath: './',
  outputDir: 'AS-Editor',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://api.aseditor.fun/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('css', resolve('./src/assets/css'))
      .set('iconfont', resolve('./src/assets/iconfont'))
      .set('img', resolve('./src/assets/images'))
      .set('utils', resolve('./src/utils'))
  },
}
