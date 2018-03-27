module.exports = {

    create: function (req, res) {
        return res.json({"result": true, "project": {}});
    },
    
    list: function (req, res) {
        return res.json({"result": true, "projects": []});
    },
    
    delete: function (req, res) {
        return res.json({"result": true});
    },
    
    update: function (req, res) {
        return res.json({"result": true, "project": {}});
    },

    get: function (req, res) {
        return res.json({"result": true, "project": {}});
    }
};