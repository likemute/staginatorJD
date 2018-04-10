let Raven = require('raven');

module.exports = function (sails){

    return {

        defaults: {
        },

        initialize: function (cb) {
            sails.sentry = Raven.config(sails.config.sentry.dsn).install();
            cb();
        }
    };
};