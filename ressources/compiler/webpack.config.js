const path = require('path')
const webpack = require('webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const plugins = {
    miniCssExtractWebpack: require('mini-css-extract-plugin'),
    copyWebpack: require('copy-webpack-plugin'),
    nonJsEntryCleanup: require('./non-js-entry-cleanup-plugin'),
    friendlyErrorsWebpack: require('friendly-errors-webpack-plugin'),
    stylelintWebpack: require('stylelint-webpack-plugin'),
    webpackAssetsManifest: require('webpack-assets-manifest')
}

const { context, entry, devtool, outputFolder, publicFolder } = require('./config')

const HMR = require('./hmr')
const getPublicPath = require('./publicPath')


module.exports = (options) => { 
    const { dev } = options
    const hmr = HMR.getClient()

    return {
        mode: dev ? 'development' : 'production',
        devtool: dev ?  devtool : false,
        context: path.resolve(context),
        entry: {
            'styles/app': dev ? [hmr, entry.styles] : entry.styles,
            'scripts/app': dev ? [hmr, entry.scripts] : entry.scripts
        },
        output: {
            path: path.resolve(outputFolder),
            publicPath: getPublicPath(publicFolder),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        ...(dev ? [{ loader: 'cache-loader' }] : []),
                        { loader: 'eslint-loader' }
                    ]
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        ...(dev ? [
                            { loader: 'cache-loader' },
                            { 
                                loader: 'style-loader'
                            }
                        ] : [plugins.miniCssExtractWebpack.loader]),
                        { 
                            loader: 'css-loader',
                            options: {
                                sourceMap: dev
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                sourceMap: dev,
                                config: { 
                                    ctx: { dev }
                                }
                            }
                        },
                        { 
                            loader: 'resolve-url-loader',
                            options: {
                                sourceMap: dev
                            }
                        },
                        { 
                            loader: 'sass-loader', 
                            options: { 
                                sourceMap: true
                            }
                        },
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg|ico)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                            name: '[path][name].[ext]',
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
                                    quality: [0.65, 0.90],
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
                    test: /\.(ttf|otf|eot|woff2?)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin({
                dry: false,
                dangerouslyAllowCleanPatternsOutsideProject: true,
                cleanOnceBeforeBuildPatterns: true
            }),
            new plugins.copyWebpack([
                {
                    from: path.resolve(`${context}/**/*`),
                    to: path.resolve(outputFolder),
                }
            ], {
                ignore: ['*.js', '*.ts', '*.scss', '*.css']
            }),
            ...(dev ? [
                new webpack.HotModuleReplacementPlugin(),
                new plugins.friendlyErrorsWebpack(),
                new plugins.stylelintWebpack()
            ] : [
                new plugins.miniCssExtractWebpack({
                    filename: '[name].css'
                }),
                new plugins.nonJsEntryCleanup({
                    context: 'styles',
                    extensions: 'js',
                    includeSubfolders: true
                }),
                new plugins.webpackAssetsManifest({
                    space: 4
                })
            ])
        ]
    } 
}