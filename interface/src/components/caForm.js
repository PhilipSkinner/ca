import React, {Component} from 'react';

import Loader from './loader';
import Error from './error';

class CAForm extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
	      ca 		: {},
	      loading 	: false,
	      error 	: null
	    };
	}

	saveCA(event) {
		event.preventDefault();

		this.setState({
			loading : true
		});

		fetch(localStorage.getItem('apiroot') + '/ca', {
        	method : 'POST',
        	headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify(this.state.ca)
        })
        .then((res) => {        	
        	this.props.completed();
        })
        .catch((err) => {
        	this.setState({
        		error 	: err,
        		loading : false
        	});
        });
	}

	commonNameChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.ca);
			ret.commonName = event.target.value;
			return { 
				ca : ret
			};
		});
	}

	emailChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.ca);
			ret.email = event.target.value;
			return { 
				ca : ret
			};
		});
	}

	organisationChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.ca);
			ret.organisation = event.target.value;
			return { 
				ca : ret
			};
		});
	}

	organisationalUnitChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.ca);
			ret.organisationalUnit = event.target.value;
			return { 
				ca : ret
			};
		});
	}

	countryChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.ca);
			ret.country = event.target.value;
			return { 
				ca : ret
			};
		});
	}

	stateChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.ca);
			ret.state = event.target.value;
			return { 
				ca : ret
			};
		});
	}

	localityChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.ca);
			ret.locality = event.target.value;
			return { 
				ca : ret
			};
		});
	}

	validForChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.ca);
			ret.validFor = event.target.value;
			return { 
				ca : ret
			};
		});
	}

	render() {
		const {
			ca,
			loading,
			error
		} = this.state;

		return (
			<div className="container pt-4">
				<div className="row">
					<div className="caForm col-md-12">
						{
							loading && <Loader message="Saving CA..."/>
						}

						{
							error && <Error error={error} />
						}

						{
							!error && !loading &&
							<div className="card">
	  							<div className="card-body">
									<h1 className="h3">Create Certificate Authority</h1>

	  								<p>
	  									Complete the form below to generate your certificate authority. You can use this authority to issue intermediates that will be used to sign your certificates.
	  								</p>

	  								<div className="border-top mt-4 pb-4" />

	  								<form onSubmit={this.saveCA.bind(this)}>
										<div className="form-group">
											<label for="commonname">Common Name</label>
											<input
												value={ca.commonName}
												onChange={this.commonNameChanged.bind(this)}
												id="commonname"
												type="text"
												required
												className="form-control"
												aria-describedby="commonNameHelp"
												placeholder="my.ca.com"
											/>
											<small id="commonNameHelp" className="form-text text-muted">Enter the common name for your CA.</small>
										</div>
										<div className="form-group">
											<label for="email">Email</label>
											<input
												value={ca.email}
												onChange={this.emailChanged.bind(this)}
												id="email"
												type="text"
												required
												className="form-control"
												aria-describedby="emailHelp"
												placeholder="your@email.com"
											/>
											<small id="emailHelp" className="form-text text-muted">Enter the email address for the CA.</small>
										</div>
										<div className="form-group">
											<label for="organisation">Organisation</label>
											<input
												value={ca.organisation}
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
												value={ca.organisationalUnit}
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
												value={ca.country}
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
												value={ca.state}
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
												value={ca.locality}
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
												value={ca.validFor}
												onChange={this.validForChanged.bind(this)}
												id="validFor"
												type="number"
												min="1"
												required
												className="form-control"
												aria-describedby="validForHelp"
												placeholder="3650"
											/>
											<small id="validForHelp" className="form-text text-muted">Enter the number of days this CA should be valid for (make this a large number).</small>
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

export default CAForm;