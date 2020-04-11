# webpack-config

My boilerplate with Webpack based setup that allow build web apps and sites much faster.




## Tools

Check that [Nodejs](https://nodejs.org/en/download/) is installed :
```sh
$ node -v
```

Check that [Yarn](https://yarnpkg.com/en/docs/install) is installed :
```sh
$ yarn -v
```




## Initialize a project

Clone the depot and install all the dependencies :
```sh
$ yarn install
```

Set the proxyTarget property in ressources/compiler/config.js:
```js
module.exports = {
    ...
    proxyTarget: 'http://localhost:8000',
    ...
}
```



## Generate the assets
### Dev mode :
```sh
$ cd /yoursitepath/wp-content/themes/yourthemename/ressources
$ yarn start
```

### Production mode :
```sh
$ cd /yoursitepath/wp-content/themes/yourthemename/ressources
$ yarn build
```