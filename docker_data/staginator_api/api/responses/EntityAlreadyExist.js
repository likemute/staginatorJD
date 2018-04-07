module.exports = function() {
    return this.res.json(422, {"result": false, "error": "Entity already exist"});
};