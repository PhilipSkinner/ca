const details = function(app, config, fsHelpers, path, certs) {
    this.app = app;
    this.config = config;
    this.fsHelpers = fsHelpers;
    this.path = path;
    this.certs = certs;
};

details.prototype.setup = function(endpoint) {
    this.app.get(endpoint, this.response.bind(this));
};

details.prototype.response = function(req, res) {
    if (!req.params.id) {
        res.status(400);
        return res.json(require('../../models/errors/ca/idRequired'));
    }
    
	this.config.read().then((config) => {
        return this.certs.getDetails(this.path.join(config.store, 'ca', req.params.id + '-cert.pem'));			
	}).then((details) => {
		res.send(details);
	}).catch((err) => {
        res.status(404);
		return res.json(require('../../models/errors/ca/notFound'));
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

    return new details(app, config, fsHelpers, path, certs);
};