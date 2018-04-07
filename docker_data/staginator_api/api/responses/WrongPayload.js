module.exports = function() {
    return this.res.json(400, {"result": false, "error": "Wrong payload"});
};