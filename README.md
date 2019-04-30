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

