/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const svgSprite = require('./svg-sprite.config');

module.exports = {
    css: { extract: false },
    filenameHashing: false,
    productionSourceMap: false,
    transpileDependencies: [
        'vuetify',
    ],
    chainWebpack: (config) => {
        config.entry('app').clear();
        config.entry('app').add('./src/main.ts');
        config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
        config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js');
        if (process.env.NODE_ENV === 'production') {
            config.output.filename('app.min.js');
            // production
        } else {
            config.output.filename('app.js');
            // development
        }
        config.module
            .rule('svg-sprite')
            .use('svgo-loader')
            .loader('svgo-loader');
    },
    pluginOptions: { svgSprite },
};
