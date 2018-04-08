module.exports = function() {
    return this.res.status(422).json({"result": false, "error": "Entity already exist"});
};