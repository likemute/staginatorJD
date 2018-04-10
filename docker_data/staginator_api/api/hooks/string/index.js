module.exports = function (sails){

    return {

        defaults: {
        },

        initialize: function (cb) {
            sails.stringHelper = {
                "prepare": function (str) {
                    return str.replace(/[^0-9a-zA-Z\-_]/g, '-').toLowerCase();
                }
            };
            cb();
        }
    };
};