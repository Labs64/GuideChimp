// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack
const merge = require('webpack-merge');
const webpackConfig = require('../build/webpack.conf.js');

const browsers = ['Chrome'];

module.exports = function karmaConfig(config) {
    config.set({
        // to run in additional browsers:
        // 1. install corresponding karma launcher
        //    http://karma-runner.github.io/0.13/config/browsers.html
        // 2. add it to the `browsers` array below.
        browsers,
        customLaunchers: {
            Chrome: {
                base: 'ChromeHeadless',
            },
        },
        frameworks: ['jasmine'],
        reporters: ['spec'],
        files: [
            './index.js',
        ],
        preprocessors: {
            './index.js': ['babel', 'webpack', 'sourcemap'],
        },
        babelPreprocessor: {
            options: {
                presets: ['@babel/preset-env'],
                sourceMap: 'inline',
            },
            filename(file) {
                return file.originalPath.replace(/\.js$/, '.es5.js');
            },
            sourceFileName(file) {
                return file.originalPath;
            },
        },
        webpack: merge(webpackConfig, { mode: 'development', devtool: 'inline-source-map' }),
        webpackMiddleware: {
            noInfo: true,
        },
        coverageReporter: {
            dir: './coverage',
            reporters: [
                {
                    type: 'lcov',
                    subdir: '.',
                },
                {
                    type: 'text-summary',
                },
            ],
        },
    });
};
