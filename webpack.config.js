const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ManifestPlugin = require('webpack-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

// the loaders to the css
let cssLoaders = [
    { loader: MiniCssExtractPlugin.loader },
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
                './src/app.js',
                './src/scss/main.scss',
                './src/css/app.css'
            ]
        },
        output: {
            path: path.resolve(__dirname, './public/assets/'),
            publicPath: (dev) ? '/assets/' : '../assets/',
            filename: '[name].js'
        },
        devtool: dev ? 'cheap-module-eval-source-map' : 'source-map',
        resolve: {
            alias: {
                '@js': path.resolve(__dirname, './src/js/'),
                '@scss': path.resolve(__dirname, './src/scss/'),
                '@css': path.resolve(__dirname, './src/css/')
            }
        },
        watch: dev,
        devServer: {
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
                                name: 'img/[name].[ext]'
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
                                name: 'fonts/[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new CleanWebpackPlugin({
                dry: false,  // set to true to verify that the correct files are targeted
                verbose: true,
            })
        ]
    }

    if(!dev){
        config.plugins.push(new ManifestPlugin({
            fileName: 'manifest.json'
        }))
    }

    return config
}