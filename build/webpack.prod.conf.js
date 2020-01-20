const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webWebpackConfig = require('./webpack.web.conf');

const webpackConfig = {
    mode: 'production',
    devtool: 'source-map',
    performance: { hints: false },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                include: /\.min\.js$/,
                uglifyOptions: {
                    compress: {
                        warnings: false,
                    },
                },
                sourceMap: true,
                parallel: true,
            }),
        ],
    },
};

module.exports = [merge(webWebpackConfig, webpackConfig)];
