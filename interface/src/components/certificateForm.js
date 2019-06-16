import React, {Component} from 'react';

import Loader from './loader';
import Error from './error';

class CertificateForm extends Component {
	constructor(props) {
	    super(props);	  

	    this.state = {
	    	certificate : {},
	    	loading 	: false,
	    	error 		: null
	    }  
	}	

	commonNameChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.certificate);
			ret.commonName = event.target.value;
			return { 
				certificate : ret
			};
		});
	}

	emailChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.certificate);
			ret.email = event.target.value;
			return { 
				certificate : ret
			};
		});
	}

	organisationChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.certificate);
			ret.organisation = event.target.value;
			return { 
				certificate : ret
			};
		});
	}

	organisationalUnitChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.certificate);
			ret.organisationalUnit = event.target.value;
			return { 
				certificate : ret
			};
		});
	}

	countryChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.certificate);
			ret.country = event.target.value;
			return { 
				certificate : ret
			};
		});
	}

	stateChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.certificate);
			ret.state = event.target.value;
			return { 
				certificate : ret
			};
		});
	}

	localityChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.certificate);
			ret.locality = event.target.value;
			return { 
				certificate : ret
			};
		});
	}

	validForChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.certificate);
			ret.validFor = event.target.value;
			return { 
				certificate : ret
			};
		});
	}

	saveCertificate(event) {
		event.preventDefault();

		this.setState({
			loading : true
		});

		const {
			caId,
			intermediateId
		} = this.props;

		fetch(localStorage.getItem('apiroot') + '/ca/' + caId + '/intermediate/' + intermediateId + '/cert', {
			method : 'POST',
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify(this.state.certificate)
		}).then((res) => {
			this.props.complete();
		}).catch((err) => {
			this.setState({
				loading : false,
				error 	: err
			});
		});
	}

	render() {	
		const {
			certificate,
			loading,
			error
		} = this.state;

		return (
			<div className="container pt-4">
				<div className="row">
					<div className="certificateForm col-md-12">
						{
							loading && <Loader message="Saving Certificate..."/>
						}

						{
							error && <Error error={error} />
						}

						{
							!error && !loading &&
							<div className="card">
								<div className="card-body">
									<h1 className="h3">Issue Certificate</h1>

	  								<p>
	  									Complete the form below to generate your certificate. The certificate can then be exported for use within your applications.
	  								</p>

	  								<div className="border-top mt-4 pb-4" />

	  								<form onSubmit={this.saveCertificate.bind(this)}>
										<div className="form-group">
											<label for="commonname">Common Name</label>
											<input
												value={certificate.commonName}
												onChange={this.commonNameChanged.bind(this)}
												id="commonname"
												type="text"
												required
												className="form-control"
												aria-describedby="commonNameHelp"
												placeholder="my.ca.com"
											/>
											<small id="commonNameHelp" className="form-text text-muted">Enter the common name for your certificate.</small>
										</div>
										<div className="form-group">
											<label for="email">Email</label>
											<input
												value={certificate.email}
												onChange={this.emailChanged.bind(this)}
												id="email"
												type="text"
												required
												className="form-control"
												aria-describedby="emailHelp"
												placeholder="your@email.com"
											/>
											<small id="emailHelp" className="form-text text-muted">Enter the email address for the certificate.</small>
										</div>
										<div className="form-group">
											<label for="organisation">Organisation</label>
											<input
												value={certificate.organisation}
												onChange={this.organisationChanged.bind(this)}
												id="organisation"
												type="text"
												required
												className="form-control"
												aria-describedby="organisationHelp"
												placeholder="Acme Inc."
											/>
											<small id="organisationHelp" className="form-text text-muted">Enter the organisation.</small>
										</div>
										<div className="form-group">
											<label for="organisationalUnit">Organisational Unit</label>
											<input
												value={certificate.organisationalUnit}
												onChange={this.organisationalUnitChanged.bind(this)}
												id="organisationalUnit"
												type="text"
												required
												className="form-control"
												aria-describedby="organisationalUnitHelp"
												placeholder="Development"
											/>
											<small id="organisationalUnitHelp" className="form-text text-muted">Enter the organisation unit (OU).</small>
										</div>
										<div className="form-group">
											<label for="country">Country</label>
											<input
												value={certificate.country}
												onChange={this.countryChanged.bind(this)}
												id="country"
												type="text"
												required
												className="form-control"
												aria-describedby="countryHelp"
												placeholder="GB"
											/>
											<small id="countryHelp" className="form-text text-muted">Enter the two digit country code.</small>
										</div>
										<div className="form-group">
											<label for="state">State (County)</label>
											<input
												value={certificate.state}
												onChange={this.stateChanged.bind(this)}
												id="state"
												type="text"
												required
												className="form-control"
												aria-describedby="stateHelp"
												placeholder="Yorkshire"
											/>
											<small id="stateHelp" className="form-text text-muted">Enter the state/county name.</small>
										</div>
										<div className="form-group">
											<label for="locality">Locality</label>
											<input
												value={certificate.locality}
												onChange={this.localityChanged.bind(this)}
												id="locality"
												type="text"
												required
												className="form-control"
												aria-describedby="localityHelp"
												placeholder="Leeds"
											/>
											<small id="localityHelp" className="form-text text-muted">Enter the locality (town etc).</small>
										</div>
										<div className="form-group">
											<label for="validFor">Valid For</label>
											<input
												value={certificate.validFor}
												onChange={this.validForChanged.bind(this)}
												id="validFor"
												type="number"
												min="1"
												required
												className="form-control"
												aria-describedby="validForHelp"
												placeholder="120"
											/>
											<small id="validForHelp" className="form-text text-muted">Enter the number of days this certificate should be valid for (make this a smallish number).</small>
										</div>
										<button type="submit" class="btn btn-primary">Create</button>
									</form>
								</div>
							</div>							
						}
					</div>
				</div>
			</div>
	  	);
	}
}

export default CertificateForm;