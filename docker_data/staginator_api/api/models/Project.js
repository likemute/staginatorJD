let _ = require ('lodash');

module.exports = {
    attributes: {
        name: {
            type: 'string'
        },
        data      : {
            type: 'json'
        }
    },

    customToJSON: function() {
        return _.omit(this, []);
    }
};