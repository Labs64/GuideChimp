const path = require('path');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pkg = require('../package.json');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        library: 'GuideChimp',
        libraryTarget: 'umd',
    },
    entry: {
        [pkg.name]: './src',
        [`${pkg.name}.min`]: './src',
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
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                            // if hmr does not work, this is a forceful method.
                            reloadAll: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    'sass-loader',
                ],
            },
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
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
};
