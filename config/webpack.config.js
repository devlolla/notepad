
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssExtract = require('mini-css-extract-plugin')

const config = require('./config')

const { paths, devServer } = config
const { PROD, DEV } = config.compilerGlobals

const webpackConfig = {
  entry: {
    app: [
      paths.src('index.js')
    ],
    vendor: [
      ...config.compilerVendors
    ]
  },
  devtool: config.compilerDevTool,
  mode: PROD ? 'production' : 'development',
  output: {
    filename: '[name].[hash].js',
    pathinfo: true,
    path: config.compilerOutputPath,
    publicPath: config.compilerPublicPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: CssExtract.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
    ]
  },
  externals: config.webpackExternals,
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          minChunks: 2
        }
      }
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Notepad',
      template: paths.src('index.html'),
      minify: { collapseWhitespace: PROD },
      chunks: ['app', 'vendor']
    }),
    new CssExtract({
      filename: '[id].[hash].css'
    })
  ],
  resolve: {
    modules: [
      paths.base(),
      'node_modules'
    ]
  },
  performance: {
    hints: false
  },
  devServer
}

if (DEV) {
}

if (PROD) {
  webpackConfig.optimization.minimizer = [
    new TerserPlugin()
  ]
}

module.exports = webpackConfig
