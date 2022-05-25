const path = require('path');
const { merge } = require('webpack-merge');
const pkg = require('../package.json');
const fs = require('fs');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BannerPlugin } = require('webpack');

const { name, version } = pkg;
const slug = 'GuideChimp';
const libraryName = 'GuideChimp';

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
        .replace(/\s+/g, '');
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
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    minimize: {
                        caseSensitive: true,
                        collapseWhitespace: true,
                        conservativeCollapse: true,
                        keepClosingSlash: true,
                        minifyCSS: false,
                        minifyJS: true,
                        removeComments: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                    },
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: [resolve('src'), resolve('plugins'), resolve('test')],
            },
            {
                test: /(\.jsx|\.js)$/,
                loader: 'eslint-loader',
                include: [resolve('src'), resolve('plugins'), resolve('test')],
                options: {
                    formatter: eslintFriendlyFormatter,
                    emitWarning: true,
                },
            },
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
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new BannerPlugin({
            banner: `${libraryName} v${version} | Copyright (C) ${(new Date()).getFullYear()} Labs64 GmbH`,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    performance: { hints: false },
    optimization: {
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/,
                parallel: true,
            }),
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.min\.css$/g,
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
    },
);

const pluginsConfigs = [];

fs.readdirSync(path.resolve(__dirname, '../plugins')).forEach((folderName) => {
    // skip all folders starting with underscore
    if (folderName[0] !== '_') {
        pluginsConfigs.push(merge(
            baseConfig,
            {
                entry: {
                    [folderName]: `./plugins/${folderName}`,
                    [`${folderName}.min`]: `./plugins/${folderName}`,
                },
                output: {
                    path: path.resolve(__dirname, '../dist/plugins'),
                    filename: '[name].js',
                    library: `${camelize(`${slug} plugin ${folderName}`)}`,
                    libraryTarget: 'umd',
                },
            },
        ));
    }
});

module.exports = [libraryConfig, ...pluginsConfigs];
