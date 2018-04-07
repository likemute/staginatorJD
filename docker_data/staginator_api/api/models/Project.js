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
        repositoryPath: {
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
        }
    },

    customToJSON: function() {
        return _.omit(this, ['hookSecret']);
    }
};