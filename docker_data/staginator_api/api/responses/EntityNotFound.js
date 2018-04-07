module.exports = function() {
    return this.res.json(404, {"result": false, "error": "Entity not found"});
};