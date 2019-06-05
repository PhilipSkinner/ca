const certs = function(fs, pkijs, asnjs, path) {
	this.fs = fs;
	this.pkijs = pkijs;
	this.asnjs = asnjs;
	this.path = path;

	this.types = {
		"2.5.4.8" : "state",
		"2.5.4.7" : "town",
		"2.5.4.6" : "country",
		"2.5.4.3" : "commonName",
		"2.5.4.11" : "organisationalUnit",
		"2.5.4.10" : "organisation",
		"1.2.840.113549.1.9.1" : "email"
	}
};

certs.prototype.getDetails = function(certPath, caId, intermediateId) {
	return new Promise((resolve, reject) => {
		this.fs.readFile(certPath, (err, raw) => {
			if (err) {
				return reject(err);
			}
		    
		    const asn1 = this.asnjs.fromBER(new Uint8Array(Buffer.from(raw.toString('utf8').replace(/(-----(BEGIN|END) CERTIFICATE-----|[\n\r])/g, ''), 'base64')).buffer);
		    const cert = new this.pkijs.Certificate({ schema: asn1.result });

		    return resolve(this._detailsFactory(cert, certPath, caId, intermediateId));
		});
	});
};

certs.prototype._detailsFactory = function(cert, certPath, caId, intermediateId) {
	const _raw = JSON.parse(JSON.stringify(cert));
	const id = certPath.split('/').slice(-1)[0].split('\\').slice(-1)[0].replace('-cert.pem', '');	

	const ret = {
		id 		: id,
		uri 	: intermediateId && caId 
			? '/ca/' + caId + '/intermediate/' + intermediateId + '/cert/' + id
			: caId 
				? '/ca/' + caId + '/intermediate/' + id 
				: '/ca/' + id,
		issued 	: _raw.notBefore.value,
		expires : _raw.notAfter.value,
		serial 	: parseInt(_raw.serialNumber.valueBlock.valueHex, 16),
	};

	if (_raw.subject && _raw.subject.typesAndValues) {
		ret.subject = {};
		_raw.subject.typesAndValues.forEach((v) => {
			let n = v.type;

			if (this.types[n]) {
				n = this.types[n];
			}

			if (v.value.valueBlock.value) {
				ret.subject[n] = v.value.valueBlock.value;
			}
		});
	}

	if (_raw.issuer && _raw.issuer.typesAndValues) {
		ret.issuer = {};
		_raw.issuer.typesAndValues.forEach((v) => {
			let n = v.type;

			if (this.types[n]) {
				n = this.types[n];
			}

			if (v.value.valueBlock.value) {
				ret.issuer[n] = v.value.valueBlock.value;
			}
		});
	}	

	return ret;
};

module.exports = function(fs, pkijs, ansjs, path) {
	if (!fs) {
		fs = require('fs');
	}	

	if (!pkijs) {
		pkijs = require('pkijs');
	}

	if (!ansjs) {
		asnjs = require('asn1js');
	}

	if (!path) {
		path = require('path');
	}

	return new certs(fs, pkijs, asnjs, path);
}