let Passport = require('passport').constructor;
let Refresh = require('passport-oauth2-refresh');
let GitLabStrategy = require('passport-gitlab2').Strategy;
let url = require('url');

/**
 * Passport  hook
 */

module.exports = function (sails){

    return {

        defaults: {
            passport: {
                // Default to look for a model w/ identity 'user'
                userModelIdentity: 'user'
            }
        },

        initialize: function (cb) {
            let err;

            // Validate `userModelIdentity` config
            if (typeof sails.config.passport.userModelIdentity !== 'string') {
                sails.config.passport.userModelIdentity = 'user';
            }
            sails.config.passport.userModelIdentity = sails.config.passport.userModelIdentity.toLowerCase();

            // We must wait for the `orm` hook before acquiring our user model from `sails.models`
            // because it might not be ready yet.
            if (!sails.hooks.orm) {
                err = new Error();
                err.code = 'E_HOOK_INITIALIZE';
                err.name = 'Passport Hook Error';
                err.message = 'The "passport" hook depends on the "orm" hook- cannot load the "passport" hook without it!';
                return cb(err);
            }
            sails.after('hook:orm:loaded', function (){

                // Look up configured user model
                let UserModel = sails.models[sails.config.passport.userModelIdentity];

                if (!UserModel) {
                    err = new Error();
                    err.code = 'E_HOOK_INITIALIZE';
                    err.name = 'Passport Hook Error';
                    err.message = 'Could not load the passport hook because `sails.config.passport.userModelIdentity` refers to an unknown model: "'+sails.config.passport.userModelIdentity+'".';
                    if (sails.config.passport.userModelIdentity === 'user') {
                        err.message += '\nThis option defaults to `user` if unspecified or invalid- maybe you need to set or correct it?';
                    }
                    return cb(err);
                }

                // Create a passport instance to use
                sails.passport = new Passport();
                sails.refresh = Refresh;

                /* Teach our Passport how to serialize/dehydrate a user object into an id
                 * Serializing user happens after creation of user and user is the one stored in db. */
                sails.passport.serializeUser(function(user, done) {
                    done(null, user);
                });

                // Teach our Passport how to deserialize/hydrate an id back into a user object
                sails.passport.deserializeUser(function(user, done) {
                    done(null, user);
                });

                let gitLabStrategy = new GitLabStrategy({
                        clientID: sails.config.gitlab.appId,
                        clientSecret: sails.config.gitlab.secret,
                        callbackURL: url.resolve(sails.config.http.url, 'user/gitlabCallback'),
                        baseURL: sails.config.gitlab.host
                    },
                    function(accessToken, refreshToken, profile, cb) {
                        return cb(null, {
                            "accessToken" : accessToken,
                            "refreshToken": refreshToken,
                            "profile": profile
                        });
                    }
                );

                sails.passport.use(gitLabStrategy);
                sails.refresh.use(gitLabStrategy);

                sails.refresh.requestNewGitlabAccessToken = function(refreshToken, next){
                    return sails.refresh.requestNewAccessToken('gitlab', refreshToken, function(error, accessToken, refreshToken) {
                        if  (error) {
                            return next(error);
                        }
                        if (req.user && req.session) {
                            req.session.user.accessToken = accessToken;
                            req.session.user.refreshToken = refreshToken;
                            req.session.save();
                        }
                        next(null, {
                            accessToken: accessToken,
                            refreshToken: refreshToken
                        });
                    });
                };

                // It's very important to trigger this callback method when you are finished
                // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
                cb();

            });

        },

        routes:{
            before: {
                '/*': function configurePassport(req, res, next) {
                    req = _extendReq(req);
                    sails.passport.initialize()(req,res,function(err){
                        if (err) return res.negotiate(err);
                        sails.passport.session()(req,res, function (err){
                            if (err) return res.negotiate(err);
                            next();
                        });
                    });
                }
            }
        }
    };
};

/**
 * Normally these methods are added to the global HTTP IncomingMessage
 * prototype, which breaks encapsulation of Passport core.
 * This function is a patch to override this and also attach them to the local req/res.
 * This allows these methods to work for incoming socket requests.
 * @param  {[type]} req [description]
 * @return {[type]}     [description]
 */
function _extendReq(req) {

    /**
     * Intiate a login session for `user`.
     *
     * Options:
     *   - `session`  Save login state in session, defaults to _true_
     *
     * Examples:
     *
     *     req.logIn(user, { session: false });
     *
     *     req.logIn(user, function(err) {
   *       if (err) { throw err; }
   *       // session saved
   *     });
     *
     * @param {User} user
     * @param {Object} options
     * @param {Function} done
     * @api public
     */

    /**
     * Terminate an existing login session.
     *
     * @api public
     */
    req.logout =
        req.logOut = function() {
            req[req._passport.instance._userProperty] = null;
            if (req._passport && req._passport.session) {
                delete req._passport.session.user;
            }
        };

    /**
     * Test if request is authenticated.
     *
     * @return {Boolean}
     * @api public
     */
    req.isAuthenticated = function() {
        return !!(req[req._passport.instance._userProperty]);
    };

    /**
     * Test if request is unauthenticated.
     *
     * @return {Boolean}
     * @api public
     */
    req.isUnauthenticated = function() {
        return !req.isAuthenticated();
    };

    return req;
}