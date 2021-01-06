const https = require('https');
const http = require('http');
const { URL } = require('url');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');

const ora = require('ora');
const chalk = require('chalk');
const pkg = require('../package.json');

const request = (options) => {
    const opt = { ...options };
    const { data, url } = opt;

    const urlPieces = new URL(url);

    delete opt.data;
    delete opt.url;

    const config = {
        method: 'GET',
        headers: {},
        hostname: urlPieces.hostname,
        path: urlPieces.path,
        port: urlPieces.port,

        ...options,
    };

    const defaultHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    config.headers = { ...defaultHeaders, ...config.headers };

    const isGet = (config.method.toLocaleLowerCase() === 'get');
    const isPost = (config.method.toLocaleLowerCase() === 'post');

    const query = (() => {
        if (data && !Object.keys(data).length) {
            return '';
        }

        if (isGet) {
            return querystring.stringify(data);
        }

        return (config.headers['Content-Type'] === 'application/x-www-form-urlencoded')
            ? querystring.stringify(data)
            : JSON.stringify(data);
    })();

    if (isGet) {
        if (query) {
            config.path = `${config.path}?${query}`;
        }
    }

    if (isPost) {
        if (query) {
            config.headers['Content-Length'] = query.length;
        }
    }

    return new Promise((resolve, reject) => {
        const httpProv = urlPieces.protocol === 'http:' ? http : https;

        const req = httpProv.request(config, (res) => {
            const { statusCode } = res;

            if (statusCode < 200 || statusCode >= 300) {
                reject(res);
                return;
            }

            let resData = '';

            res.on('data', (chunk) => {
                resData += chunk;
            });

            res.on('end', () => {
                // remove \n from body
                try {
                    resData = JSON.stringify(JSON.parse(resData));
                } catch (e) {
                    if (!(e instanceof SyntaxError)) {
                        throw e;
                    }
                }

                if (statusCode < 200 || statusCode >= 300) {
                    const e = new Error('Bad request!');
                    e.response = { ...res, data: resData };

                    reject(e);
                } else {
                    resolve({ ...res, data: resData });
                }
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        if (isPost && query) {
            req.write(query);
        }

        // send the request
        req.end();
    });
};

const spinner = ora('Purge CDN cache...\n');
spinner.start();

(async () => {
    try {
        const root = path.resolve(__dirname, '../');
        const dist = path.resolve(__dirname, '../dist');

        const getFilesPaths = (dirPath) => {
            let paths = [];

            fs.readdirSync(dirPath).forEach((name) => {
                const filePath = path.resolve(dirPath, name);

                if (fs.lstatSync(filePath).isDirectory()) {
                    paths = [...paths, ...getFilesPaths(filePath)];
                    return;
                }

                paths.push(filePath);
            });

            return paths;
        };

        const filesPaths = getFilesPaths(dist);

        let purgeUrls = [];

        const versionPieces = pkg.version.split('.');

        while (versionPieces.length) {
            versionPieces.splice(-1, 1);

            const version = versionPieces.join('.') || 'latest';

            purgeUrls = [
                ...purgeUrls,
                ...filesPaths.map((v) => `/npm/guidechimp@${version}${v.replace(root, '').replace(/\\/g, '/')}`),
            ];
        }

        const chunkedPurgeUrls = [];
        const chunkSize = 1;

        for (let i = 0; i < purgeUrls.length; i += chunkSize) {
            chunkedPurgeUrls.push([...purgeUrls].slice(i, i + chunkSize));
        }

        let count = 0;

        for (const urls of chunkedPurgeUrls) {
            const { data } = await request({
                url: 'https://purge.jsdelivr.net',
                method: 'POST',
                data: { path: urls },
            });

            count += urls.length;

            urls.forEach((url) => {
                console.log(chalk.green(`${url} - cache purge requested`));
            })

            console.log(chalk.grey(`> response: ${data}\n`));
        }

        console.log(chalk.cyan(`CDN cache purged (total URLs: ${count})\n`));
    } catch (err) {
        console.error(err);
        console.log(chalk.red('CDN cache purge failed!\n'));
    }

    spinner.stop();
})();
