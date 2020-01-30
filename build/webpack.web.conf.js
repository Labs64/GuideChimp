const merge = require('webpack-merge');
const pkg = require('../package.json');
const baseWebpackConfig = require('./webpack.base.conf');

const { name } = pkg;

module.exports = merge(
    baseWebpackConfig,
    {
        target: 'web',
        entry: {
            [name]: './src',
            [`${name}.min`]: './src',
        },
    },
);
