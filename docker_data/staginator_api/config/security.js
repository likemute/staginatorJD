/**
 * For additional options and more information, see:
 * https://sailsjs.com/documentation/concepts/security
 * https://sailsjs.com/config/security
 */

module.exports.security = {

    /***************************************************************************
     *                                                                          *
     * CORS is like a more modern version of JSONP-- it allows your application *
     * to circumvent browsers' same-origin policy, so that the responses from   *
     * your Sails app hosted on one domain (e.g. example.com) can be received   *
     * in the client-side JavaScript code from a page you trust hosted on _some *
     * other_ domain (e.g. trustedsite.net).                                    *
     *                                                                          *
     * For additional options and more information, see:                        *
     * https://sailsjs.com/docs/concepts/security/cors                          *
     *                                                                          *
     ***************************************************************************/

    // cors: {
    //   allRoutes: false,
    //   allowOrigins: '*',
    //   allowCredentials: false,
    // },


    /****************************************************************************
     *                                                                           *
     * By default, Sails' built-in CSRF protection is disabled to facilitate     *
     * rapid development.  But be warned!  If your Sails app will be accessed by *
     * web browsers, you should _always_ enable CSRF protection before deploying *
     * to production.                                                            *
     *                                                                           *
     * To enable CSRF protection, set this to `true`.                            *
     *                                                                           *
     * For more information, see:                                                *
     * https://sailsjs.com/docs/concepts/security/csrf                           *
     *                                                                           *
     ****************************************************************************/

    csrf: true

};