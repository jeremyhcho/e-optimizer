require('dotenv').config()

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const dotEnv = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('production'),
    'PUSHER_KEY': JSON.stringify(process.env.PUSHER_KEY),
    'STRIPE_KEY': JSON.stringify(process.env.STRIPE_KEY)
  }
})

const VENDOR_LIBS = [
  'axios', 'classnames', 'react', 'react-dom',
  'react-redux', 'redux', 'redux-saga', 'react-router', 'react-router-dom'
]

const config = {
  devtool: 'cheap-module-source-map',
  entry: {
    bundle: [
      'babel-polyfill',
      './src/index.js'
    ],
    styleguide: ['babel-polyfill', './src/styleguide.js'],
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: [
            'transform-react-jsx',
            [
              'react-css-modules',
              {
                exclude: 'node_modules',
                generateScopedName: '[name]__[local]___[hash:base64:5]',
                filetypes: {
                  '.scss': {
                    syntax: 'postcss-scss',
                    plugins: ['postcss-nesting', 'postcss-css-variables']
                  }
                }
              }
            ]
          ]
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader?sourceMap',
          'css-loader?importLoader=1&modules&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: [
          'style-loader?sourceMap',
          'css-loader?sourceMap'
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          'file-loader',
          'image-webpack-loader'
        ]
      },
      {
        test: /\.svg$/,
        loaders: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          },
          {
            loader: 'react-svg-loader',
            query: { jsx: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new ExtractTextPlugin({ filename: 'app.css', allChunks: true }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      chunks: ['bundle', 'vendor', 'manifest'],
      favicon: 'favicon.png'
    }),
    new HtmlWebpackPlugin({
      filename: 'styleguide.html',
      template: 'src/styleguide.html',
      chunks: ['styleguide', 'vendor', 'manifest'],
      favicon: 'favicon.png'
    }),
    dotEnv,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    })
  ],
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/Components'),
      Containers: path.resolve(__dirname, 'src/Containers'),
      Helpers: path.resolve(__dirname, 'src/Helpers'),
      Actions: path.resolve(__dirname, 'src/Actions'),
      Constants: path.resolve(__dirname, 'src/Constants'),
      Reducers: path.resolve(__dirname, 'src/Reducers'),
      Sagas: path.resolve(__dirname, 'src/Sagas'),
      Apis: path.resolve(__dirname, 'src/Apis'),
      Assets: path.resolve(__dirname, 'src/Assets'),
      Config: path.resolve(__dirname, 'src/Config'),
      Layouts: path.resolve(__dirname, 'src/Layouts'),
      Routines: path.resolve(__dirname, 'src/Routines')
    },
    extensions: ['.js', '.scss', '.css']
  }
}

module.exports = config
