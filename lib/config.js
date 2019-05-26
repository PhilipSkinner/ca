const config = function(path, fs) {
    this.path = path;
    this.fs = fs;
};

config.prototype.read = function() {
    return new Promise((resolve, reject) => {
        this.fs.readFile(this.path.join(process.cwd(), 'package.json'), (err, data) => {
            if (err) {
                return reject(err);
            }

            let c = null;
            try {
                c = JSON.parse(data);
            } catch(e) {
                return reject(new Error('Could not parse package.json'));
            }                        
            return resolve(c.config);
        });
    });
};

module.exports = function(path, fs) {
    if (!path) {
        path = require('path');
    }

    if (!fs) {
        fs = require('fs');
    }

    return new config(path, fs);
};