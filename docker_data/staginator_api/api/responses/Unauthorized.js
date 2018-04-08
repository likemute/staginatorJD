module.exports = function () {
    return this.res.status(401).json({"result": false, "auth": false});
};