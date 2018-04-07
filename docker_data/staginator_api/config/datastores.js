/**
 * For more information on configuring datastores, check out:
 * https://sailsjs.com/config/datastores
 */

module.exports.datastores = {
    default: {
        adapter: 'sails-mongo',
        url: 'mongodb://localhost:27017/staginator'
    }
};