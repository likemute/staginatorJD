module.exports = function unauthorized (opts) {
    return this.res.status(403).json({"result": false, "error": "You must be admin to perform that operation", "isAdmin": false});
};