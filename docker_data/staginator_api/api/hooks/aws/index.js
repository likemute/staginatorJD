const Staginator = require('./aws');

module.exports = function (sails){

    return {

        defaults: {
        },

        initialize: function (cb) {
            if (!sails.hooks.gitlab) {
                err = new Error();
                err.code = 'E_HOOK_INITIALIZE';
                err.name = 'Staginator Hook Error';
                err.message = 'The "staginator" hook depends on the "gitlab" hook- cannot load the "staginator" hook without it!';
                return cb(err);
            }
            if (!sails.hooks.docker) {
                err = new Error();
                err.code = 'E_HOOK_INITIALIZE';
                err.name = 'Staginator Hook Error';
                err.message = 'The "staginator" hook depends on the "docker" hook- cannot load the "staginator" hook without it!';
                return cb(err);
            }
            sails.after('hook:gitlab:loaded', function (){
                sails.after('hook:docker:loaded', function (){
                    sails.aws = Staginator();
                    // It's very important to trigger this callback method when you are finished
                    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
                    cb();

                });
            });
        }
    };
};