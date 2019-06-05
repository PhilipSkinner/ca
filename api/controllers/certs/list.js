const listController = function(app, config, fsHelpers, path, certs) {
    this.app = app;
    this.config = config;
    this.fsHelpers = fsHelpers;
    this.path = path;
    this.certs = certs;
};

listController.prototype.setup = function(endpoint) {
    this.app.get(endpoint, this.response.bind(this));
};

listController.prototype.response = function(req, res) {        
	this.config.read().then((config) => {
		return this.fsHelpers.listFiles(this.path.join(config.store, 'cert', req.params.intermediate, '**/*-cert.pem'));
	}).then((results) => {
		return Promise.all(results.map((r) => {
			return this.certs.getDetails(r, req.params.id, req.params.intermediate);
		}));
	}).then((details) => {
		res.send(details);
	}).catch((err) => {
		res.send("error");
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

    return new listController(app, config, fsHelpers, path, certs);
};