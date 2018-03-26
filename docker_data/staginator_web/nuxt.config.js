const pkg = require('./package');
const path = require('path');
require('dotenv').load();
require('dotenv').load({
    'path': path.resolve(process.cwd(), '.env.default')
});

module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    loading: { color: '#20a0ff' },

    plugins: [
        'plugins/element-ui.js'
    ],

    /*
    ** Global CSS
    */
    css: [
        'element-ui/lib/theme-chalk/index.css'
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
    ],

    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
};