'use strict'; // eslint-disable-line

const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackAssetsManifest = require('webpack-assets-manifest');

const plugins = {
  clean: require('clean-webpack-plugin'),
  extractText: require('extract-text-webpack-plugin'),
  styleLint: require('stylelint-webpack-plugin'),
  copyGlobs: require('copy-globs-webpack-plugin'),
  friendlyErrorsWebpack: require('friendly-errors-webpack-plugin')
}

const desire = require('./util/desire');
const config = require('./config');

const assetsFilenames = (config.enabled.cacheBusting) ? config.cacheBusting : '[name]';

let cssLoaders = [
  { loader: 'cache' },
  { loader: 'css', options: { sourceMap: config.enabled.sourceMaps } },
  {
    loader: 'postcss', options: {
      config: { path: __dirname, ctx: config },
      sourceMap: config.enabled.sourceMaps,
    },
  }
]

let webpackConfig = {
  context: config.paths.assets,
  entry: config.entry,
  devtool: (config.enabled.sourceMaps ? '#source-map' : undefined),
  output: {
    path: config.paths.dist,
    publicPath: config.publicPath,
    filename: `scripts/${assetsFilenames}.js`,
  },
  stats: {
    hash: false,
    version: false,
    timings: false,
    children: false,
    errors: false,
    errorDetails: false,
    warnings: false,
    chunks: false,
    modules: false,
    reasons: false,
    source: false,
    publicPath: false,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        include: config.paths.assets,
        use: 'eslint',
      },
      {
        enforce: 'pre',
        test: /\.(js|s?[ca]ss)$/,
        include: config.paths.assets,
        loader: 'import-glob',
      },
      {
        test: /\.js$/,
        exclude: [/node_modules(?![/|\\](bootstrap|foundation-sites))/],
        use: [
          { loader: 'cache' },
          { loader: 'buble', options: { objectAssign: 'Object.assign' } },
        ],
      },
      {
        test: /\.css$/,
        include: config.paths.assets,
        use: plugins.extractText.extract({
          fallback: 'style',
          use: cssLoaders,
        }),
      },
      {
        test: /\.scss$/,
        include: config.paths.assets,
        use: plugins.extractText.extract({
          fallback: 'style',
          use: [
            ...cssLoaders,
            { loader: 'resolve-url', options: { sourceMap: config.enabled.sourceMaps } },
            {
              loader: 'sass', options: {
                sourceMap: config.enabled.sourceMaps,
                sourceComments: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
        include: config.paths.assets,
        loader: 'url',
        options: {
          limit: 4096,
          name: `[path]${assetsFilenames}.[ext]`,
        },
      },
      {
        test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
        include: /node_modules/,
        loader: 'url',
        options: {
          limit: 4096,
          outputPath: 'vendor/',
          name: `${config.cacheBusting}.[ext]`,
        },
      },
    ],
  },
  resolve: {
    modules: [
      config.paths.assets,
      'node_modules',
    ],
    enforceExtension: false,
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  externals: {
    jquery: 'jQuery',
  },
  plugins: [
    new plugins.clean([config.paths.dist], {
      root: config.paths.root,
      verbose: false,
    }),
    /**
     * It would be nice to switch to copy-webpack-plugin, but
     * unfortunately it doesn't provide a reliable way of
     * tracking the before/after file names
     */
    new plugins.copyGlobs({
      pattern: config.copy,
      output: `[path]${assetsFilenames}.[ext]`,
      manifest: config.manifest,
    }),
    new plugins.extractText({
      filename: `styles/${assetsFilenames}.css`,
      allChunks: true,
      // disable: (config.enabled.watcher),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: 'popper.js/dist/umd/popper.js',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: config.enabled.optimize,
      // debug: config.enabled.watcher,
      stats: { colors: true },
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.s?css$/,
      options: {
        output: { path: config.paths.dist },
        context: config.paths.assets,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.js$/,
      options: {
        eslint: { failOnWarning: false, failOnError: true },
      },
    }),
    new plugins.styleLint({
      failOnError: !config.enabled.watcher,
      syntax: 'scss',
    }),
    new plugins.friendlyErrorsWebpack(),
  ],
};


if (config.enabled.optimize) {
  webpackConfig = merge(webpackConfig, require('./webpack.config.optimize'));
}

if (config.env.production) {
  webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
}

if (config.enabled.cacheBusting) {
  webpackConfig.plugins.push(
    new WebpackAssetsManifest({
      output: 'manifest.json',
      space: 2,
      writeToDisk: false,
      assets: config.manifest,
      replacer: require('./util/assetManifestsFormatter'),
    })
  );
}

/**
 * During installation via sage-installer (i.e. composer create-project) some
 * presets may generate a preset specific config (webpack.config.preset.js) to
 * override some of the default options set here. We use webpack-merge to merge
 * them in. If you need to modify Sage's default webpack config, we recommend
 * that you modify this file directly, instead of creating your own preset
 * file, as there are limitations to using webpack-merge which can hinder your
 * ability to change certain options.
 */
module.exports = merge.smartStrategy({
  'module.loaders': 'replace',
})(webpackConfig, desire(`${__dirname}/webpack.config.preset`));
