let _ = require ('lodash');

module.exports = {
    attributes: {
        provider: {
            type: 'string'
        },
        tokens    : {
            type: 'json'
        },
        data      : {
            type: 'json'
        }
    },

    customToJSON: function() {
        return _.omit(this, []);
    }
};