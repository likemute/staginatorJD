module.exports = function unauthorized (opts) {
    return this.res.json({"result": false, "error": "You must be admin to perform that operation", "isAdmin": false});
};