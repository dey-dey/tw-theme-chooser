var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractLess = new ExtractTextPlugin({
  filename: '[name].css'
});

// fix TW Bootstrap Issue
mkdirp.sync('./node_modules/bootstrap/less/fonts/')
mkdirp.sync('./dist/')
copydir.sync(
  './node_modules/transferwise-iconfont/fonts/',
  './node_modules/bootstrap/less/fonts/'
);
copydir.sync(
  './static/',
  './dist/'
);

module.exports = {
  devtool: 'eval',
  entry: {
		main: './src/index.js'
	},
  module: {
    rules: [{
      test: /.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.less$/,
      use: extractLess.extract({
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'less-loader'
        }],
        // use style-loader in development
        fallback: 'style-loader'
      })
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: [{ loader: 'file-loader?name=./fonts/[name].[ext]'}]
    }]
  },
  plugins: [
    extractLess,
    // new HtmlWebpackPlugin({
    //   template: './index.html'
    // })
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  devServer: {
    contentBase: './dist'
  }
};
