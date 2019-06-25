const deleteController = function(app, config, fsHelpers, path, certs) {
    this.app = app;
    this.config = config;
    this.fsHelpers = fsHelpers;
    this.path = path;
    this.certs = certs;
};

deleteController.prototype.setup = function(endpoint) {
    this.app.delete(endpoint, this.response.bind(this));
};

deleteController.prototype.response = function(req, res) {
    if (!req.params.id) {
        res.status(400);
        return res.json(require('../../models/errors/certs/idRequired'));
    }

    if (!req.params.intermediate) {
        res.status(400);
        return res.json(require('../../models/errors/certs/idRequired'));
    }

    if (!req.params.cert) {
        res.status(400);
        return res.json(require('../../models/errors/certs/idRequired'));
    }
    
    this.config.read().then((config) => {
        return this.fsHelpers.removeAll(this.path.join(config.store, 'cert', req.params.intermediate, req.params.cert + '*'));
    }).then(() => {
        res.status(204);
        res.end();
    }).catch((err) => {
        res.status(404);
        return res.json(require('../../models/errors/certs/notFound'));
    });
};

module.exports = function(app, config, fsHelpers, path, certs) {
    if (!config) {
        config = require('../../lib/config')();
    }

    if (!fsHelpers) {
    	fsHelpers = require('../../lib/fsHelpers')();
    }

    if (!path) {
    	path = require('path');
    }

    if (!certs) {
    	certs = require('../../lib/certs')();
    }

    return new deleteController(app, config, fsHelpers, path, certs);
};