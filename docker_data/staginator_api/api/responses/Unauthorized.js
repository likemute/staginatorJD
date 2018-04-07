module.exports = function () {
    return this.res.json(401, {"result": false, "auth": false});
};