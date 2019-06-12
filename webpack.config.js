const webpack = require('webpack')
const path = require('path')

// plugins
const plugins = {
  extractCss: require('mini-css-extract-plugin'),
  html: require('html-webpack-plugin'),
  Manifest: require('webpack-manifest-plugin'),
  clean: require('clean-webpack-plugin'),
  styleLint: require('stylelint-webpack-plugin'),
}

// the loaders to the css
let cssLoaders = [
  { 
    loader: plugins.extractCss.loader,
    options: {
      publicPath: '../',
    }
  },
  { loader: 'css-loader', options: { importLoaders: 1 } },
  'resolve-url-loader',
]



module.exports = (env, argv) => {
  // check that we are in development or production mode
  let dev = env.development ? true : false

  // apply postcss-loader only in production mode
  if (!dev) { cssLoaders.push('postcss-loader') }

  let config = {
    entry: {
      app: [
        './src/js/app.js',
        './src/scss/app.scss',
        './src/css/app.css'
      ]
    },
    output: {
      path: path.resolve(__dirname, './public/'),
      filename: (dev) ? 'js/[name].js' : 'js/[name]-[hash:8].js'
    },
    devtool: (dev) ? 'source-map' : 'cheap-module-eval-source-map',
    resolve: {
      alias: {
        '@js': path.resolve(__dirname, './src/js/'),
        '@scss': path.resolve(__dirname, './src/scss/'),
        '@css': path.resolve(__dirname, './src/css/')
      }
    },
    watch: dev,
    devServer: {
      port: 8800,
      overlay: true,
      contentBase: path.resolve(__dirname, './public')
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'eslint-loader'
          }
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: cssLoaders
        },
        {
          test: /\.scss$/,
          use: [
            ...cssLoaders,
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: (dev) ? 'img/[name].[ext]' : 'img/[name]-[hash:8].[ext]'
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: dev,
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                optipng: {
                  enabled: false
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                },
                gifsicle: {
                  interlaced: false
                }
              }
            }
          ]
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: (dev) ? 'fonts/[name].[ext]' : 'fonts/[name]-[hash:8].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: !dev,
              removeComments: !dev
            }
          }
        }
      ]
    },
    plugins: [
      new plugins.clean({
        dry: false,  // set to true to verify that the correct files are targeted
        verbose: true,
      }),
      new plugins.html({
        template: './src/index.html',
        filename: 'index.html',
      }),
      new plugins.extractCss({
        filename: (dev) ? 'css/[name].css' : 'css/[name]-[hash:8].css'
      }),
      new plugins.styleLint()
    ]
  }

  if(!dev){
    config.plugins.push(new plugins.Manifest({
      fileName: 'manifest.json'
    }))
  }

  return config
}