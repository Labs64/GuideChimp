// This is the webpack config used for unit tests.
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: '#inline-source-map',
});

module.exports = webpackConfig;
