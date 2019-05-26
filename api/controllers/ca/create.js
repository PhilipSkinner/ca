const list = function(app, config, openssl) {
    this.app = app;
    this.config = config;
    this.openssl = openssl;
};

list.prototype.setup = function(endpoint) {
    this.app.post(endpoint, this.response.bind(this));
};

list.prototype.response = function(req, res) {
    if (typeof(req.body.validFor) === 'undefined' || req.body.validFor === null) {
        res.status(400);
        return res.json(require('../../models/errors/ca/createNoDays'));
    }

    this.openssl.generateCA(req.body).then((caId) => {
        //set our location header for our newly created CA
        res.header('Location', '/ca/' + caId);
        res.status(201);
        res.end();
    }).catch((err) => {
        console.log(err);

        res.status(500);
        return res.json(require('../../models/errors/ca/createOpensslError'));
    });
};

module.exports = function(app, config, openssl) {
    if (!config) {
        config = require('../../lib/config')();
    }

    if (!openssl) {
        openssl = require('../../lib/openssl')();
    }

    return new list(app, config, openssl);
};