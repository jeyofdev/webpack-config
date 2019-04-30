# webpack-config

My webpack configuration

### Webpack installation

Install webpack from yarn or npm

```sh
$ yarn add webpack --dev
$ npm install webpack --save-dev

```



### Compile custom js file

Install packages

```sh
$ yarn add babel-loader @babel/preset-env @babel/core --dev
$ npm install babel-loader @babel/preset-env @babel/core --save-dev
```

Then edit webpack.config.js

```javascript
const path = require('path');

module.exports = function (env, argv) {
    let dev = env.development ? true : false
   
    return {
        entry: {
            app: './src/app.js'
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].js'
        },
        devtool: dev ? 'cheap-module-eval-source-map' : 'source-map',
        resolve: {
            alias: {
                '@js': path.resolve(__dirname, './src/js/')
            }
        },
        watch: dev,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        }
    }
}
```



### Compile sass & css file

Install packages

```sh
$ yarn add css-loader style-loader sass-loader node-sass --dev
$ npm install css-loader style-loader sass-loader node-sass --save-dev
```

Then edit webpack.config.js

```javascript
const path = require('path');

module.exports = function (env, argv) {
    let dev = env.development ? true : false
   
    return {
        entry: {
            app: './src/app.js'
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].js'
        },
        devtool: dev ? 'cheap-module-eval-source-map' : 'source-map',
        resolve: {
            alias: {
                '@scss': path.resolve(__dirname, './src/scss/'),
                '@css': path.resolve(__dirname, './src/css/')
            }
        },
        watch: dev,
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                }
            ]
        }
    }
}
```



### Use postCss

Install packages

```sh
$ yarn add postcss-loader autoprefixer --dev
$ npm install postcss-loader autoprefixer --save-dev
```

Then edit webpack.config.js

```javascript
const path = require('path');

// the loaders to the css
let cssLoaders = [
    'style-loader',
    { loader: 'css-loader', options: { importLoaders: 1 } }
]

module.exports = (env, argv) => {
    // check that we are in development or production mode
    let dev = env.development ? true : false

    // apply postcss-loader only in production mode
    if (!dev) { cssLoaders.push('postcss-loader') }
   
    return {
        entry: {
            app: './src/app.js'
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].js'
        },
        devtool: dev ? 'cheap-module-eval-source-map' : 'source-map',
        resolve: {
            alias: {
                '@scss': path.resolve(__dirname, './src/scss/'),
                '@css': path.resolve(__dirname, './src/css/')
            }
        },
        watch: dev,
        module: {
            rules: [
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
                }
            ]
        }
    }
}
```



### Extract css

Install packages

```sh
$ yarn add mini-css-extract-plugin --dev
$ npm install mini-css-extract-plugin --save-dev
```

Edit html file

```html
<link rel="stylesheet" href="/dist/app.css">
```

Then edit webpack.config.js

```javascript
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// the loaders to the css
let cssLoaders = [
    { loader: MiniCssExtractPlugin.loader },
    { loader: 'css-loader', options: { importLoaders: 1 } }
]

module.exports = (env, argv) => {
    // check that we are in development or production mode
    let dev = env.development ? true : false

    // apply postcss-loader only in production mode
    if (!dev) { cssLoaders.push('postcss-loader') }
   
    return {
        entry: {
            app: './src/app.js'
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].js'
        },
        devtool: dev ? 'cheap-module-eval-source-map' : 'source-map',
        resolve: {
            alias: {
                '@scss': path.resolve(__dirname, './src/scss/'),
                '@css': path.resolve(__dirname, './src/css/')
            }
        },
        watch: dev,
        module: {
            rules: [
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
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css'
            })
        ]
    }
}
```



### Define the relative links of assets to css

Install packages

```sh
$ yarn add url-loader file-loader resolve-url-loader --dev
$ npm install url-loader file-loader resolve-url-loader --save-dev
```


Then edit webpack.config.js

```javascript
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
   
    return {
        entry: {
            app: [
                './src/app.js',
                './src/scss/main.scss',
                './src/css/app.css'
            ]
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].js'
        },
        devtool: dev ? 'cheap-module-eval-source-map' : 'source-map',
        resolve: {
            alias: {
                '@scss': path.resolve(__dirname, './src/scss/'),
                '@css': path.resolve(__dirname, './src/css/')
            }
        },
        watch: dev,
        module: {
            rules: [
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
            })
        ]
    }
}
```


