let _ = require ('lodash');

module.exports = {
    attributes: {
        project: {
            type: 'Project'
        },
        ref: {
            type: 'string'
        },
        instanceId: {
            type: 'number'
        },
        path: {
            type: 'string'
        },
        status: {
            type: 'string',
            enum: ['preinit', 'starting', 'stopped', 'running']
        }
    }
};