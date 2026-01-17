const { environment } = require('@rails/webpacker')

// Force sass-loader to use Dart Sass instead of node-sass
const sassLoader = environment.loaders.get('sass')
const sassLoaderConfig = sassLoader.use.find(el => el.loader === 'sass-loader')
sassLoaderConfig.options.implementation = require('sass')

module.exports = environment
