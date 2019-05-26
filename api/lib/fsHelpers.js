const fsHelpers = function(fs, path, glob) {
	this.fs = fs;
	this.path = path;
	this.glob = glob;
};

fsHelpers.prototype.listFiles = function(filter) {
	return new Promise((resolve, reject) => {
		this.glob(filter, (err, results) => {			
			return resolve(results);
		});
	});
};

fsHelpers.prototype.removeFile = function(file) {
	return new Promise((resolve, reject) => {
		this.fs.unlink(file, (err) => {
			if (err) {
				return reject(err);
			}

			return resolve();
		});
	});
};

fsHelpers.prototype.removeAll = function(filter) {
	return this.listFiles(filter).then((files) => {
		if (files.length === 0) {
			return Promise.reject(new Error('No files found to remove'));
		}

		return Promise.all(files.map((f) => {
			return this.removeFile(f);
		}));
	});
};

module.exports = function(fs, path, glob) {
	if (!fs) {
		fs = require('fs');
	}

	if (!path) {
		path = require('path');
	}

	if (!glob) {
		glob = require('glob');
	}

	return new fsHelpers(fs, path, glob);
};