module.exports = function() {
    return this.res.status(404).json({"result": false});
};