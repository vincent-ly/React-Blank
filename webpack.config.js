var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HTML = require('html-webpack-plugin')

let app = [

  './index.js'
]

let sourceMap = 'cheap-module-eval-source-map'

let cssLoader = {
  test: /\.scss$/,
  exclude: /node_modules/,
  use: [{
    loader: 'style-loader'
  }, {
    loader: 'css-loader',
    options: {
      sourceMap: true
    }
  }, {
    loader: 'sass-loader',
    options: {
      sourceMap: true
    }
  }]
}

const plugins = [
  new HTML({
    template: `./index.html`,
    filename: 'index.html',
    inject: 'body'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module) {
      return module.context && module.context.indexOf('node_modules') !== -1
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity
  }),
  new webpack.SourceMapDevToolPlugin({
    filename: '[file].map',
    exclude: ['vendor.js', 'manifest.js']
  })
]

if (process.env.NODE_ENV) {
  sourceMap = 'cheap-module-source-map'
  cssLoader.use = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader!sass-loader',
    publicPath: './dist'
  })

  plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        warnings: false
      },
      comments: false
    }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new ExtractTextPlugin({filename: 'assets/css/styles.css', allChunks: true, disable: false})
  )
} else {
  app.unshift(
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server'
    )

  plugins.unshift(
    new webpack.HotModuleReplacementPlugin()

  )
}

module.exports = {
  entry: {
    app
  },
  context: path.resolve(__dirname, 'src'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']

  },
  devtool: sourceMap,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['react', ['es2015', { 'modules': false }]],
          plugins: ['react-hot-loader/babel']
        }

      },
      cssLoader,
      {

        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader'
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }

    ]
  },
  plugins: plugins,
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true

  }
}
