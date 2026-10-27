const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
    {
        ignores: [
            'build/**',
            'dist/**',
            'node_modules/**',
            'docs/**',
            '.github/**',
            'plugins/_boilerplate/**',
        ],
    },
    {
        ...js.configs.recommended,
        files: ['**/*.js'],
        languageOptions: {
            ...js.configs.recommended.languageOptions,
            globals: globals.browser,
        },
        rules: {
            ...js.configs.recommended.rules,
            indent: ['error', 4, { SwitchCase: 1 }],
            'linebreak-style': 'off',
            'max-len': ['error', 120, { ignoreComments: true }],
            'no-debugger': 'error',
            'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
            'object-curly-newline': ['error', { consistent: true }],
        },
    },
    {
        files: ['test/**/*.js'],
        languageOptions: {
            globals: globals.vitest,
        },
    },
];
