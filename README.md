# webpack-config

My boilerplate with Webpack based setup that allow build web apps and sites much faster.




### Tools

Check that the latest version of [Nodejs](https://nodejs.org/en/download/) is installed :
```sh
$ node -v
```

Check that the latest version of [Yarn](https://yarnpkg.com/en/docs/install) is installed :
```sh
$ yarn -v
```



### Webpack installation

Install webpack from CLI
```sh
$ yarn add webpack --dev
```



### Available Webpack commands

* `yarn run dev` — Compile assets for developing when file changes are made
* `yarn run prod` — Compile and optimize the files in assets directory for production




### Initialize a project

Clone the depot and install all the dependencies :
```sh
$ yarn install
```




### Features

* [Webpack](https://webpack.js.org/)
* [Bootstrap](http://getbootstrap.com/) the most popular HTML, CSS and JS framework
* [Font Awesome 5](https://fontawesome.com/) the web's most popular icon set and toolkit
* [Postcss](https://postcss.org/) A tool for transforming CSS with JavaScript
* [Babel](https://babeljs.io/) toolchain to convert ES6+ code into a backwards compatible
* [Eslint](https://eslint.org/) a fully pluggable tool for identifying and reporting on patterns in JavaScript
* [Stylelint](https://eslint.org/)  mighty, modern linter that helps you avoid errors and enforce conventions in your styles
* [browserslist](https://github.com/browserslist/browserslist) live reloading (browser update after changes)
* [Autoprefixer](https://github.com/postcss/autoprefixer) plugin to parse CSS and add vendor prefixes
* [cssnano](https://cssnano.co/) formatted CSS and runs it through many focused optimisations
* [webpack-dev-server](https://webpack.js.org/configuration/dev-server) live reloading (browser update after changes)




### Loaders

* [babel-loader](https://webpack.js.org/loaders/babel-loader) this package allows transpiling JavaScript files using Babel and webpack.
* [eslint-loader](https://webpack.js.org/loaders/eslint-loader) a fully pluggable tool for identifying and reporting on patterns in JavaScript
* [file-loader](https://webpack.js.org/loaders/file-loader) The file-loader resolves import/require() on a file into a url and emits the file into the output directory
* [css-loader](https://webpack.js.org/loaders/css-loader) The css-loader interprets @import and url() like import/require() and will resolve them.
* [resolve-url-loader](https://github.com/bholloway/resolve-url-loader) resolves relative paths in url() statements based on the original source file
* [url-loader](https://webpack.js.org/loaders/url-loader) transforms files into base64 URIs
* [sass-loader](https://webpack.js.org/loaders/sass-loader) Loads a Sass/SCSS file and compiles it to CSS
* [postcss-loader](https://webpack.js.org/loaders/postcss-loader) process CSS with PostCSS
* [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader) optimize the images files
* [html-loader](https://webpack.js.org/loaders/html-loader) HTML is minimized when the compiler is demand




### Plugins

* [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) extracts CSS into separate files
* [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin) generate an HTML5 file
* [webpack-manifest-plugin](https://github.com/danethurber/webpack-manifest-plugin) generating an asset manifest
* [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin) clean public folder before building
* [stylelint-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)  mighty, modern linter that helps you avoid errors and enforce conventions in your styles




### Development and Production environment

* clean public folder before building
* has alias for assets types (scss, css, js)
* Optimize the images files
* compiles everything with relative paths
* compiles sass/scss to the css file
* compiles es6 to the syntax that every browser can understand
* reporting on patterns in js




### Development environment

* run webpack-dev-server
* builds source-maps




### Production environment

* add an hash to the assets files
* minifies html, css and js
* minifies multiple image types (gif, png, jpg, jpeg, svg)
* copies all web fonts
* generating an asset manifest