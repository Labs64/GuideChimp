const merge = require('webpack-merge');
const webWebpackConfig = require('./webpack.web.conf');

const webpackConfig = merge(webWebpackConfig, {
    mode: 'development',
    devtool: '#source-map',
});

module.exports = webpackConfig;

