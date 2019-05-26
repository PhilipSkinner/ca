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

openssl.prototype.generateKey = function(keyname, size) {
    return new Promise((resolve, reject) => {
        const proc = this.childProcess.spawn('openssl', [
            'genrsa',
            '-out',
            keyname,
            size || 2048
        ], {
            cwd : process.cwd()
        });

        proc.on('close', (code) => {
            if (code !== 0) {
                return reject(new Error('Unable to generate key'));
            }

            //return our unique id
            return resolve(keyname);
        });
    });
};

openssl.prototype.generateCSR = function(options, keyfile, csrfile) {
    return new Promise((resolve, reject) => {
        const proc = this.childProcess.spawn('openssl', [
            'req',
            '-sha256',
            '-new',
            '-key',
            keyfile,
            '-out',
            csrfile,
            '-passout',
            //todo: this is very temporary!
            'pass:temporary',
            '-subj',
            this.generateSubject(options)
        ], {
            cwd : process.cwd()
        });

        proc.on('close', (code) => {
            if (code !== 0) {
                return reject(new Error('Unable to generate CSR'));
            }

            //return our unique id
            return resolve(csrfile);
        });
    });
};

openssl.prototype.signCSR = function(options, csrfile, certfile, cafile, cakey) {
    return new Promise((resolve, reject) => {
        const proc = this.childProcess.spawn('openssl', [
            'x509',
            '-req',
            '-days',
            options.validFor,
            '-in',
            csrfile,
            '-out',
            certfile,
            '-CA',
            cafile,
            '-CAkey',
            cakey,
            '-CAcreateserial',
            '-sha256',
            '-passin',
            //todo: this is very temporary!
            'pass:temporary',
        ], {
            cwd : process.cwd()
        });      

        proc.on('close', (code) => {
            if (code !== 0) {
                return reject(new Error('Unable to generate CSR'));
            }

            //return our unique id
            return resolve();
        });
    });
};

openssl.prototype.generateIntermediate = function(options) {
    const uniqueId = this.uuid();
    let intermediateDir = null;
    let caPrefix = null;    

    return this.config.read().then((config) => {
        intermediateDir = this.path.join(process.cwd(), config.store, 'int');
        caPrefix = this.path.join(process.cwd(), config.store, 'ca', options.ca);

        try {
            this.fs.statSync(intermediateDir);
        } catch(e) {
            this.fs.mkdirSync(intermediateDir);
        }

        intermediateDir = this.path.join(intermediateDir, options.ca);

        try {
            this.fs.statSync(intermediateDir);
        } catch(e) {
            this.fs.mkdirSync(intermediateDir);
        }        

        //generate the key
        return this.generateKey(this.path.join(intermediateDir, uniqueId + '-key.pem'));        
    }).then((keyfile) => {
        //generate the csr
        return this.generateCSR(options, keyfile, this.path.join(intermediateDir, uniqueId + '-csr.pem'));
    }).then((csrfile) => {
        return this.signCSR(options, csrfile, this.path.join(intermediateDir, uniqueId + '-cert.pem'), caPrefix + '-cert.pem', caPrefix + '-key.pem');
    }).then(() => {
        return Promise.resolve(uniqueId);
    });
}

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