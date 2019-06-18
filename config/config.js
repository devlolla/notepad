const { resolve } = require('path')

const abs = resolve(__dirname, '..')
const base = (...args) => resolve(...[abs, ...args])

const env = process.env.NODE_ENV || 'development'

const DEV = env === 'development'
const PROD = env === 'production'

const paths = {
  base,
  src: base.bind(null, 'src'),
  dist: base.bind(null, 'dist'),
}

const config = {
  paths,
  serverHost: 'localhost',
  serverPort: process.env.PORT || 3000,
  compilerDevTool: 'cheap-source-map',
  compilerGlobals: {
    'process.env': {
      NODE_ENV: JSON.stringify(env)
    },
    DEV,
    PROD
  },
  compilerFailOnWarning: PROD,
  compilerOutputPath: paths.dist(),
  compilerPublicPath: '/',
  compilerVendors: [
    '@babel/polyfill',
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'react-router-dom',
    'react-motion'
  ],
  webpackExternals: { }
}

config.devServer = {
  port: 3000,
  contentBase: paths.dist(),
  historyApiFallback: true
}

module.exports = config
