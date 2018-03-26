/**
 * For more best practices and tips, see:
 * https://sailsjs.com/docs/concepts/deployment
 */

module.exports = {

    models: {
        migrate: 'safe',
    },

    /***************************************************************************
     *                                                                          *
     * Configure your security settings for production.                         *
     *                                                                          *
     * IMPORTANT:                                                               *
     * If web browsers will be communicating with your app, be sure that        *
     * you have CSRF protection enabled.  To do that, set `csrf: true` over     *
     * in the `config/security.js` file (not here), so that CSRF app can be     *
     * tested with CSRF protection turned on in development mode too.           *
     *                                                                          *
     ***************************************************************************/
    security: {

        /***************************************************************************
         *                                                                          *
         * If this app has CORS enabled (see `config/security.js`) with the         *
         * `allowCredentials` setting enabled, then you should uncomment the        *
         * `allowOrigins` whitelist below.  This sets which "origins" are allowed   *
         * to send cross-domain (CORS) requests to your Sails app.                  *
         *                                                                          *
         * > Replace "https://example.com" with the URL of your production server.  *
         * > Be sure to use the right protocol!  ("http://" vs. "https://")         *
         *                                                                          *
         ***************************************************************************/
        cors: {
            // allowOrigins: [
            //   'https://example.com',
            //   'https://staging.example.com',
            // ]
        },

    },

    log: {
        level: 'warn'
    }
};