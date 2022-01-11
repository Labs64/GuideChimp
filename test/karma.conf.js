// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack
const { merge } = require('webpack-merge');
const isDocker = require('is-docker')();

// eslint-disable-next-line import/extensions
const webpackConfig = require('../build/webpack.conf.js')
    .map((v) => merge(v, { mode: 'development', devtool: 'inline-source-map' }));

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
                // We must disable the Chrome sandbox when running Chrome inside Docker
                // Chrome's sandbox needs more permissions than Docker allows by default
                flags: isDocker ? ['--no-sandbox'] : [],
            },
        },
        frameworks: ['browserify', 'jasmine'],
        reporters: ['spec'],
        files: [
            './specs/*.spec.js',
            '../plugins/**/tests/*.spec.js',
        ],
        preprocessors: {
            './specs/*.spec.js': ['browserify'],
            '../plugins/**/tests/*.spec.js': ['browserify'],
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
