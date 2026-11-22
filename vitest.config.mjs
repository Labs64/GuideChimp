import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(rootDir, 'src'),
            'test@': path.resolve(rootDir, 'test'),
        },
    },
    test: {
        environment: 'happy-dom',
        globals: true,
        include: [
            'test/specs/**/*.spec.js',
            'plugins/**/tests/**/*.spec.js',
        ],
        coverage: {
            provider: 'v8',
            include: ['src/**/*.js'],
            reporter: ['text-summary'],
            // Ratchet: raise these as tests are added; new code is expected at 100%.
            thresholds: {
                statements: 5,
                branches: 2,
                functions: 7,
                lines: 5,
            },
        },
    },
});
