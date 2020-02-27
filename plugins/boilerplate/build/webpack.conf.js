const path = require('path');
const pkg = require('../package.json');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BannerPlugin } = require('webpack');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

const { name, version } = pkg;
const libraryName = camelize(`guideChimpPlugin ${name}`);

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    context: path.resolve(__dirname, '../'),
    entry: {
        [name]: './src',
        [`${name}.min`]: './src',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        library: libraryName,
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': resolve('src'),
            'test@': resolve('test'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: [resolve('src'), resolve('test')],
            },
            {
                test: /(\.jsx|\.js)$/,
                loader: 'eslint-loader',
                include: [resolve('src'), resolve('test')],
                options: {
                    formatter: eslintFriendlyFormatter,
                    emitWarning: true,
                },
            },
        ],
    },
    plugins: [
        new BannerPlugin({
            banner: `${libraryName} v${version}`,
        }),
    ],
    performance: { hints: false },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                include: /\.min\.js$/,
                sourceMap: true,
                parallel: true,
            }),
        ],
    },
};