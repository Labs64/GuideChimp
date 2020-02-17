const path = require('path');
const merge = require('webpack-merge');
const pkg = require('../package.json');
const fs = require('fs');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const { name } = pkg;
const libraryName = 'GuideChimp';

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

const baseConfig = {
    mode: 'production',
    devtool: 'source-map',
    context: path.resolve(__dirname, '../'),
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

const libraryConfig = merge(
    baseConfig,
    {
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
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
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
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
        ],
        optimization: {
            minimizer: [
                new OptimizeCSSAssetsPlugin({
                    assetNameRegExp: /\.min\.css$/g,
                }),
            ],
        },
    },
);


const pluginsConfigs = [];

fs.readdirSync(path.resolve(__dirname, '../src/plugins')).forEach(fileName => {
    pluginsConfigs.push(merge(
        baseConfig,
        {
            entry: {
                [fileName]: `./src/plugins/${fileName}`,
                [`${fileName}.min`]: `./src/plugins/${fileName}`,
            },
            output: {
                path: path.resolve(__dirname, '../dist/plugins'),
                filename: '[name].js',
                library: `${camelize(`${libraryName} plugin ${fileName}`)}`,
                libraryTarget: 'umd',
            },
        },
    ));
});

module.exports = [libraryConfig, ...pluginsConfigs];