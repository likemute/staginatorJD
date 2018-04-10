module.exports = {
    attributes: {
        project: {
            type: 'Project',
            unique: true
        },
        awsImage: {
            type: 'string'
        },
        awsType: {
            type: 'string'
        }
    },

    customToJSON: function() {
        return _.omit(this, ['']);
    }
};