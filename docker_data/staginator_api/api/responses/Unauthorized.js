module.exports = function unauthorized (opts) {
    return this.res.json({"result": false, "auth": false});
};