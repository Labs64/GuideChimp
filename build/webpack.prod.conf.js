const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: 'source-map',
    performance: { hints: false },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                include: /\.min\.js$/,
                sourceMap: true,
                parallel: true,
            }),
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.min\.css$/g,
            }),
        ],
    },
});
