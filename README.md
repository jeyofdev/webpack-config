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



### Extract html

Install packages

```sh
$ yarn add html-webpack-plugin --dev
$ npm install html-webpack-plugin --save-dev
```


Then edit webpack.config.js

```javascript
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (env, argv) => {
    // check that we are in development or production mode
    let dev = env.development ? true : false

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
        watch: dev,
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html'
            })
        ]
    }
}
```



### Use the development server

Install packages

```sh
$ yarn add webpack-dev-server --dev
$ npm install webpack-dev-server --save-dev
```


Then edit webpack.config.js

```javascript
const path = require('path')
//...

module.exports = (env, argv) => {
    // check that we are in development or production mode
    let dev = env.development ? true : false

    //...
   
    return {
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
        //...
        devServer: {
            contentBase: path.resolve(__dirname, './public')
        },
        //...
    }
}
```




### Generate asset manifests

Install packages

```sh
$ yarn add webpack-manifest-plugin --dev
$ npm install webpack-manifest-plugin --save-dev
```


Then edit webpack.config.js

```javascript
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ManifestPlugin = require('webpack-manifest-plugin');

//...

module.exports = (env, argv) => {
    // check that we are in development or production mode
    let dev = env.development ? true : false

    //...
   
    let config = {
        //...
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css'
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
```



### Remove/clean build folder

Install packages

```sh
$ yarn add clean-webpack-plugin --dev
$ npm install clean-webpack-plugin --save-dev
```


Then edit webpack.config.js

```javascript
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = (env, argv) => {
    let config = {
        plugins: [
            new CleanWebpackPlugin({
                dry: false,  // set to true to verify that the correct files are targeted
                verbose: true,
            })
        ]
    }

    return config
}
```


### Add eslint

Install packages

```sh
$ yarn add eslint eslint-config-standard --dev
$ npm install eslint eslint-config-standard --save-dev
```

Install eslint-loader

```sh
$ yarn add eslint-loader --dev
$ npm install eslint-loader --save-dev
```

Then edit webpack.config.js

```javascript
const path = require('path')

module.exports = (env, argv) => {
    let config = {
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'eslint-loader'
                    }
                }
            ]
        }
    }

    return config
}
```