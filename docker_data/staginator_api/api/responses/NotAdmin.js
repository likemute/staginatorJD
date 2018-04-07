module.exports = function unauthorized (opts) {
    return this.res.json(403, {"result": false, "error": "You must be admin to perform that operation", "isAdmin": false});
};