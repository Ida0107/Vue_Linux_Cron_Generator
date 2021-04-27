module.exports = {
    moduleFileExtensions: [
        'js',
        'jsx',
        'json',
        'vue',
        'ts',
        'tsx',
    ],

    transform: {
        '.*\\.vue$': '<rootDir>/node_modules/vue-jest',
        '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest',
        '^.+\\.(js|jsx)?$': '<rootDir>/node_modules/babel-jest',
    },

    transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!vuetify)',
    ],

    moduleNameMapper: {
        '^vue$': 'vue/dist/vue.common.js',
        '@/(.*)$': '<rootDir>/src/$1',
    },

    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
};
