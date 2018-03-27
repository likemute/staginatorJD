/**
 * Passport  hook
 */

module.exports = function (sails){

    return {

        defaults: {
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

                sails.getGitlabApiClient = async function(token) {
                    return await require('node-gitlab-api')({
                        url:   sails.config.gitlab.host,
                        oauthToken: token
                    })
                };

                // It's very important to trigger this callback method when you are finished
                // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
                cb();

            });

        }
    };
};