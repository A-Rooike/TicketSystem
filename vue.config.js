module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
    },
  
  },
  lintOnSave:false,
  devServer: {
    proxy: 'http://localhost:3000'
  }
}