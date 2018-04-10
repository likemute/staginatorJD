let _ = require ('lodash');

module.exports = {
    attributes: {
        name: {
            type: 'string'
        },
        gitlabId: {
            type: 'number'
        },
        hookId: {
            type: 'number'
        },
        hookSecret: {
            type: 'string'
        },
        registryPath: {
            type: 'string'
        },
        preRunScript: {
            type: 'string'
        },
        useDockerCompose: {
            type: 'boolean'
        },
        postRunScript: {
            type: 'string'
        },
        deployType: {
            type: 'boolean'
        },
        aws: {
            collection:'Aws',
            via: 'project'
        },
        stagings: {
            collection:'Stage',
            via: 'project'
        }
    },

    customToJSON: function() {
        return _.omit(this, ['hookSecret']);
    }
};