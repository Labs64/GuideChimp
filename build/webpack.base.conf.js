const path = require('path');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const pkg = require('../package.json');

const namespace = 'NetLicensing';

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        library: namespace,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'this',
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
};
