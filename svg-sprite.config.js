module.exports = {

    dir: './src/assets/icons/common',
    /*
    * The reqex that will be used for the Webpack rule.
    */
    test: /\.(svg)(\?.*)?$/,
    /*
    * @see https://github.com/kisenka/svg-sprite-loader#configuration
    */
    loaderOptions: {
        extract: true,
        spriteFilename: 'media/images/sprites/sprite.svg',
    },
    /*
    * @see https://github.com/kisenka/svg-sprite-loader#configuration
    */
    pluginOptions: {
        plainSprite: true,
    },
};
