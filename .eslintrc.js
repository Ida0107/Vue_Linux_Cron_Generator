module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        'jest/globals': true,
    },
    extends: ['plugin:vue/recommended'],
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    rules: {
        indent: ['error', 4],
        '@typescript-eslint/indent': 0,
        'vue/html-indent': ['error', 4, {
            attribute: 1,
            baseIndent: 1,
            closeBracket: 0,
            alignAttributesVertically: true,
            ignores: [],
        }],
    },
    plugins: [
        'vue', 
        'jest'
    ],
    'extends': [
      'plugin:vue/recommended',
      '@vue/typescript'
    ]
};
