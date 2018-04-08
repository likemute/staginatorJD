module.exports = function() {
    return this.res.status(400).json({"result": false, "error": "Wrong payload"});
};