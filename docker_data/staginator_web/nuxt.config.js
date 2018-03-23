const pkg = require('./package');

module.exports = {
    mode: 'universal',

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

    /*
    ** Global CSS
    */
    css: [
        'animate.css/animate.css',
        '~assets/transitions.css'
    ],

    plugins: [
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [,
        // Doc: https://bootstrap-vue.js.org/docs/
        'bootstrap-vue/nuxt'
    ],

    /*
    ** Build configuration
    */
    build: {


        /*
        ** Babel
         */
        babel: {
            'presets': ['vue-app'],
            'plugins': [
                ['component', [{
                    'libraryName': 'element-ui',
                    'styleLibraryName': 'theme-default'
                }]]
            ],
            'comments': false
        },
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