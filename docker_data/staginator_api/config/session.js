/**
 * For all available options, see:
 * http://sailsjs.com/config/session
 */

module.exports.session = {

    /***************************************************************************
     *                                                                          *
     * Session secret is automatically generated when your new app is created   *
     * Replace at your own risk in production-- you will invalidate the cookies *
     * of your users, forcing them to log in again.                             *
     *                                                                          *
     ***************************************************************************/
    secret: '5f3816c8f572a5ds10e8a6ac453b472b',
    adapter: 'connect-redis',
    url: 'redis://redis:6379/1',
    cookie: {
        // secure: true,
        maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    }
    /***************************************************************************
     *                                                                          *
     * Customize when built-in session support will be skipped.                 *
     *                                                                          *
     * (Useful for performance tuning; particularly to avoid wasting cycles on  *
     * session management when responding to simple requests for static assets, *
     * like images or stylesheets.)                                             *
     *                                                                          *
     * http://sailsjs.com/config/session                                        *
     *                                                                          *
     ***************************************************************************/
    // isSessionDisabled: function (req){
    //   return !!req.path.match(req._sails.LOOKS_LIKE_ASSET_RX);
    // },

};