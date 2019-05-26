const openssl = function(config, childProcess, path, fs, uuid) {
    this.config = config;
    this.childProcess = childProcess;
    this.path = path;
    this.fs = fs;
    this.uuid = uuid;
};

openssl.prototype.generateSubject = function(options) {
    let ret = "";

    if (options.country) {
        ret += "/C=" + options.country;
    }

    if (options.state) {
        ret += "/ST=" + options.state;
    }

    if (options.locality) {
        ret += "/L=" + options.locality;
    }

    if (options.organisation) {
        ret += "/O=" + options.organisation;
    }

    if (options.organisationalUnit) {
        ret += "/OU=" + options.organisationalUnit;
    }

    if (options.commonName) {
        ret += "/CN=" + options.commonName;
    }

    if (options.email) {
        ret += "/emailAddress=" + options.email;
    }

    return ret;
};

openssl.prototype.generateCA = function(options) {
    return this.config.read().then((config) => {
        const caDir = this.path.join(process.cwd(), config.store, 'ca');

        //ensure our dir exists (sync)
        try {
            this.fs.statSync(caDir);
        } catch(e) {
            this.fs.mkdirSync(caDir);
        }        

        const uniqueId = this.uuid();

        return new Promise((resolve, reject) => {
            const proc = this.childProcess.spawn('openssl', [
                'req',
                '-new',
                '-x509',
                '-days',
                options.validFor,
                '-extensions',
                'v3_ca',
                '-keyout',
                uniqueId + '-key.pem',
                '-out',
                uniqueId + '-cert.pem',
                '-passout',
                //todo: this is very temporary!
                'pass:temporary',
                '-subj',
                this.generateSubject(options)
            ], {
                cwd : caDir
            });            

            proc.on('close', (code) => {
                if (code !== 0) {
                    return reject(new Error('Unable to generate CA'));
                }

                //return our unique id
                return resolve(uniqueId);
            });
        });
        
    });    
};

module.exports = function(config, childProcess, path, fs, uuid) {
    if (!config) {
        config = require('./config')();
    }

    if (!childProcess) {
        childProcess = require('child_process');
    }

    if (!path) {
        path = require('path');
    }

    if (!fs) {
        fs = require('fs');
    }

    if (!uuid) {
        uuid = require('uuid/v4');
    }

    return new openssl(config, childProcess, path, fs, uuid);
}