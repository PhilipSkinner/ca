const detailsController = function(app, config, fsHelpers, path, certs) {
    this.app = app;
    this.config = config;
    this.fsHelpers = fsHelpers;
    this.path = path;
    this.certs = certs;
};

detailsController.prototype.setup = function(endpoint) {
    this.app.get(endpoint, this.response.bind(this));
};

detailsController.prototype.response = function(req, res) {
    if (!req.params.id) {
        res.status(400);
        return res.json(require('../../models/errors/ca/idRequired'));
    }

    if (!req.params.intermediate) {
        res.status(400);
        return res.json(require('../../models/errors/int/idRequired'));
    }
    
	this.config.read().then((config) => {
        return this.certs.getDetails(this.path.join(config.store, 'int', req.params.id, req.params.intermediate + '-cert.pem'), req.params.id);			
	}).then((details) => {
		res.send(details);
	}).catch((err) => {
        res.status(404);
		return res.json(require('../../models/errors/int/notFound'));
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

    return new detailsController(app, config, fsHelpers, path, certs);
};