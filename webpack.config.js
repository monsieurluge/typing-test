const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/app.js',
  mode: 'development',
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: '8080',
    contentBase: './dist',
    watchOptions: {
      poll: true,
    },
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    })
  ],
}
