import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import { camelize, createViteConfig } from '../vite.config.mjs';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const watch = process.argv.includes('--watch');

const entries = [
    {
        entry: 'src/index.js',
        fileName: 'guidechimp',
        libraryName: 'GuideChimp',
        outDir: 'dist',
    },
    ...fs.readdirSync(path.join(rootDir, 'plugins'), { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
        .map(({ name }) => ({
            entry: `plugins/${name}/index.js`,
            fileName: name,
            libraryName: camelize(`GuideChimp plugin ${name}`),
            outDir: 'dist/plugins',
        })),
];

const builds = entries.flatMap((entry) => [
    { ...entry, minify: false },
    { ...entry, fileName: `${entry.fileName}.min`, minify: true },
]);

console.log(`${watch ? 'Watching' : 'Building'} GuideChimp with Vite...`);

for (const [index, options] of builds.entries()) {
    const config = createViteConfig(options);

    await build({
        configFile: false,
        ...config,
        build: {
            ...config.build,
            emptyOutDir: index === 0,
            watch: watch ? {} : null,
        },
    });
}

console.log(watch ? 'Vite is watching for changes.' : 'Build complete.');
