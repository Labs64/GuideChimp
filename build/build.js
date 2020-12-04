const path = require('path');

const ora = require('ora');
const rm = require('rimraf');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfig = require('./webpack.conf.js');

const spinner = ora('Build for production...');
spinner.start();

rm(path.resolve(__dirname, '../dist'), (e) => {
    if (e) throw e;

    webpack(webpackConfig, (err, stats) => {
        spinner.stop();
        if (err) throw err;

        process.stdout.write(`${stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
        })}\n\n`);

        if (stats.hasErrors()) {
            console.log(chalk.red('Build failed with errors.\n'));
            process.exit(1);
        }

        console.log(chalk.cyan('Build complete.\n'));
    });
});
