let Docker = require('dockerode');

module.exports = function (sails){

    return {

        defaults: {
        },

        initialize: function (cb) {
            sails.docker = new Docker({socketPath: sails.config.docker.socket});
            cb();
        }
    };
};