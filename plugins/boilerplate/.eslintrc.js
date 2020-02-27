// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
    },
    env: {
        browser: true,
    },
    extends: ['airbnb-base'],
    // check if imports actually resolve
    settings: {
        'import/resolver': {
            webpack: {
                config: 'build/webpack.conf.js'
            }
        }
    },
    // add your custom rules here
    rules: {
        // allow optionalDependencies
        'import/no-extraneous-dependencies': ['error', {
            optionalDependencies: ['test/index.js']
        }],
        // allow debugger during development
        'no-debugger': 'error',
        //custom spaces rules
        'indent': 'off',
        'indent-legacy': ['error', 4, { SwitchCase: 1 }],
        'linebreak-style': 0,
        'max-len': ['error', 120, { ignoreComments: true }],
        'vue/no-template-key': 'off',
        'object-curly-newline': ['error', { 'consistent': true }],
        'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    },
};
