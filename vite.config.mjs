import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const { version } = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));

export function camelize(value) {
    return value.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (
        index === 0 ? word.toLowerCase() : word.toUpperCase()
    )).replace(/\s+/g, '');
}

export function createViteConfig({
    entry = 'src/index.js',
    fileName = 'guidechimp',
    libraryName = 'GuideChimp',
    minify = false,
    outDir = 'dist',
    emptyOutDir = false,
} = {}) {
    return defineConfig({
        css: {
            preprocessorOptions: {
                scss: {
                    loadPaths: [rootDir],
                },
            },
        },
        resolve: {
            alias: {
                '@': path.resolve(rootDir, 'src'),
                'test@': path.resolve(rootDir, 'test'),
            },
        },
        build: {
            cssMinify: minify,
            emptyOutDir,
            lib: {
                entry: path.resolve(rootDir, entry),
                name: libraryName,
                formats: ['umd'],
                fileName: () => `${fileName}.js`,
                cssFileName: fileName,
            },
            minify,
            outDir: path.resolve(rootDir, outDir),
            sourcemap: true,
            target: 'es2015',
            rollupOptions: {
                output: {
                    banner: `/*! ${libraryName} v${version} | Copyright (C) ${new Date().getFullYear()} Labs64 GmbH */`,
                    exports: 'default',
                },
            },
        },
    });
}

export default createViteConfig({ emptyOutDir: true });
