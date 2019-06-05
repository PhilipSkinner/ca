const createController = function(app, config, openssl) {
    this.app = app;
    this.config = config;
    this.openssl = openssl;
};

createController.prototype.setup = function(endpoint) {
    this.app.post(endpoint, this.response.bind(this));
};

createController.prototype.response = function(req, res) {
    if (typeof(req.body.validFor) === 'undefined' || req.body.validFor === null) {
        res.status(400);
        return res.json(require('../../models/errors/int/createNoDays'));
    }

    req.body.ca = req.params.id;

    this.openssl.generateIntermediate(req.body).then((intId) => {
        //set our location header for our newly created intermediate
        res.header('Location', '/ca/' + req.params.id + '/intermediate/' + intId);
        res.status(201);
        res.end();
    }).catch((err) => {
        console.log(err);

        res.status(500);
        return res.json(require('../../models/errors/int/createOpensslError'));
    });
};

module.exports = function(app, config, openssl) {
    if (!config) {
        config = require('../../lib/config')();
    }

    if (!openssl) {
        openssl = require('../../lib/openssl')();
    }

    return new createController(app, config, openssl);
};