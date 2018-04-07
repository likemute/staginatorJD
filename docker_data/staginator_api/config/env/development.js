/**
 * For more best practices and tips, see:
 * https://sailsjs.com/docs/concepts/deployment
 */

module.exports = {

    port: process.env.APPLICATION_PORT,

    datastores: {
        default: {
            url: 'mongodb://localhost:27017/staginator'
        }
    },
    session: {
        url: 'redis://172.18.0.2:6379/1'
    },
    sockets: {
        url: 'redis://172.18.0.2:6379/2',
    }
};