module.exports = function(data) {
    data = data || null;
    let result = {"result": true};
    if (data) {
        result.data = data;
    }
    return this.res.json(200, result);
};