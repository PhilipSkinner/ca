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

    let config = null;
    
	this.config.read().then((_config) => {
        config = _config;
        return this.certs.getDetails(this.path.join(config.store, 'ca', req.params.id + '-cert.pem'));			
	}).then((details) => {
        //find our intermediates        
        this.fsHelpers.listFiles(this.path.join(config.store, 'int', req.params.id, '**/*-cert.pem')).then((intermediates) => {            
            details.intermediates = intermediates.map((f) => {
                const id = f.split('/').slice(-1)[0].split('\\').slice(-1)[0].replace('-cert.pem', '');
                return {
                    id : id,
                    url : '/ca/' + req.params.id + '/intermediate/' + id
                };                
            });
            res.send(details);
        });		
	}).catch((err) => {
        console.log(err);

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

    return new detailsController(app, config, fsHelpers, path, certs);
};