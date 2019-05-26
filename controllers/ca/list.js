const list = function(app, config) {
    this.app = app;
    this.config = config;
};

list.prototype.setup = function(endpoint) {
    this.app.get(endpoint, this.response.bind(this));
};

list.prototype.response = function(req, res) {
    res.send("doot");
};

module.exports = function(app, config) {
    if (!config) {
        config = require('../../lib/config')();
    }

    return new list(app, config);
};