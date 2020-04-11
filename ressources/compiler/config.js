module.exports = {
    context: 'assets',
    entry: {
        styles: './styles/app.scss',
        scripts: './scripts/app.js'
    },
    devtool: 'cheap-module-eval-source-map',
    outputFolder: '../assets',
    publicFolder: 'assets',
    proxyTarget: 'http://localhost:8000/',
    watch: [
        '../**/*.php'
    ]
}