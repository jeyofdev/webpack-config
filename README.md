# webpack-config

My webpack configuration

### Webpack installation

Install webpack from yarn or npm

```sh
$ yarn add webpack --dev
$ npm install webpack --save-dev

```

Install packages

```sh
$ yarn add babel-loader @babel/preset-env @babel/core --dev
$ npm install babel-loader @babel/preset-env @babel/core --save-dev
```



### Compile custom js file

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

