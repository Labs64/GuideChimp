// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack
const isDocker = require('is-docker')();

const webpackConfig = require('../build/webpack.test.conf');

const browsers = ['Chrome'];

if (!isDocker) {
    // browsers.push('Firefox');
}

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
                // We must disable the Chrome sandbox when running Chrome inside Docker
                // Chrome's sandbox needs more permissions than Docker allows by default
                flags: isDocker ? ['--no-sandbox'] : [],
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
        webpack: webpackConfig,
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
